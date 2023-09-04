import * as ethers from 'ethers';
import * as dotenv from 'dotenv';
import constants from './src/utils/constants';
import ABI from './src/abis';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { Withdrawal } from './types';
import { convertIntoObject } from './EventParser';

dotenv.config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient();
const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_NODE_URL);

const startBlock = Number(process.env.START_BLOCK);
const endBlock = startBlock + 1000;

const contractsList: Record<string, any> = Object.entries(ABI.MAPPING).reduce(
  (acc, value) => {
    const [k, v] = value;
    if (ABI.MAPPING[k] && v) {
      const contract = new ethers.Contract(k, v.abi, provider);
      return { ...acc, [k]: contract };
    }
    return acc;
  },
  {}
);

let counter = 0;

async function saveLastIndexedBlock(blockNumber: number): Promise<void> {
  const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: constants.CONFIG_TABLE,
    Key: { config: 'lastIndexedBlock' },
    UpdateExpression: 'set #value = :v',
    ExpressionAttributeNames: { '#value': 'value' },
    ExpressionAttributeValues: { ':v': blockNumber },
  };

  try {
    // await docClient.update(params).promise();
    counter = 0;
  } catch (err) {
    console.error('Error saving last indexed block:', err);
  }
}

function replacer(key: string, value: any) {
  if (typeof value === 'bigint') {
    return value.toString() + 'n'; // append "n" to indicate it's a BigInt
  } else {
    return value;
  }
}

async function saveEventToDynamoDB(
  eventName: string,
  eventData: string,
  blockNumber: number,
  transactionId: string
): Promise<void> {
  try {
    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: constants.EVENTS_TABLE,
      Item: {
        transactionId: transactionId,
        eventName: eventName,
        eventData: eventData,
        eventIndex: counter,
        blockNumber: blockNumber,
      },
    };
    counter++;

    await docClient.put(params).promise();
  } catch (err) {
    console.error('Error saving event to DynamoDB:', err);
  }
}

const parseLogs = (contractAddress: String, log: ethers.ethers.Log): any => {
  return contractsList[
    contractAddress.toLowerCase() as string
  ].interface.parseLog(log);
};

async function scanBlocks(startBlock: number, endBlock: number): Promise<void> {
  for (let i = startBlock; i <= endBlock; i++) {
    console.log(`Scanning block ${i}`);

    try {
      const block = await provider.getBlock(i);
      if (!block) {
        continue;
      }
      const txs = block.transactions.map((tx: string) =>
        provider.getTransactionReceipt(tx)
      );
      const receipts = await Promise.all(txs);
      // console.log(
      //   '🚀 ~ file: indexer.ts:107 ~ scanBlocks ~ receipts:',
      //   receipts
      // );

      for (const receipt of receipts) {
        if (receipt?.to && contractsList[receipt?.to.toLowerCase()]) {
          for (const log of receipt?.logs || []) {
            try {
              // const event = contract.interface.parseLog(log as any);
              const event = parseLogs(receipt?.to, log);

              const eventObject = convertIntoObject(event);

              if (!event || !eventObject) {
                continue;
              }
              const eventData = JSON.stringify(eventObject, replacer, 2);
              console.log(
                '🚀 ~ file: indexer.ts:116 ~ scanBlocks ~ eventData:',
                eventData,
                event
              );
              console.log(`Event: ${event.name}`);
              await saveEventToDynamoDB(
                event.name,
                eventData,
                i,
                receipt?.hash ?? ''
              );
            } catch (err) {
              console.error(
                ` Unknown Log Encountered, Error parsing log:`,
                err
              );
            }
          }
        }
      }
    } catch (err) {
      console.error(`Error processing block ${i}:`, err);
    }

    await saveLastIndexedBlock(i);
  }
}

scanBlocks(startBlock, endBlock)
  .then(() => console.log('Scan complete'))
  .catch((err) => console.error('Scan failed:', err));

//TODO : we need to modify the parsing logic to save the bignumbers as number and balances as string
