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

async function saveLastIndexedBlock(blockNumber: number): Promise<void> {
  const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: constants.CONFIG_TABLE,
    Key: { config: 'lastIndexedBlock' },
    UpdateExpression: 'set #value = :v',
    ExpressionAttributeNames: { '#value': 'value' },
    ExpressionAttributeValues: { ':v': blockNumber },
  };

  try {
    await docClient.update(params).promise();
  } catch (err) {
    console.error('Error saving last indexed block:', err);
  }
}

async function getLastIndexedBlock(): Promise<number | null> {
  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: constants.CONFIG_TABLE,
    Key: { config: 'lastIndexedBlock' },
  };

  try {
    const result = await docClient.get(params).promise();
    if (result.Item && result.Item.value !== undefined) {
      return result.Item.value as number;
    }
    return startBlock; // or throw an error, or return a default value
  } catch (err) {
    console.error('Error retrieving last indexed block:', err);
    throw err; // or return null or a default value depending on your use-case
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
  eventIndex: number
): Promise<void> {
  try {
    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: constants.EVENTS_TABLE,
      Item: {
        eventName: eventName,
        eventData: eventData,
        eventIndex: eventIndex,
        blockNumber: blockNumber,
      },
    };

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

const contractsData = Object.entries(ABI.MAPPING).reduce(
  (acc, value, index) => {
    const [k, v] = value;
    if (ABI.MAPPING[k] && v) {
      const contract = new ethers.Contract(k, v.abi, provider);
      return { ...acc, [k]: contract };
    }
    return acc;
  },
  {}
);

function getEventTopic(eventName: string, abi: any): string {
  const event = abi.find(
    (item: any) => item.type === 'event' && item.name === eventName
  );

  if (!event) {
    throw new Error(`Event ${eventName} not found in ABI`);
  }

  const signature = `${event.name}(${event.inputs
    .map((input: any) => input.type)
    .join(',')})`;

  return ethers.id(signature);
}

const fetchEvents = async (
  contract: ethers.Contract,
  address: string,
  eventList: Array<string>,
  fromBlock: number,
  toBlock: number
) => {
  let allEvents: Array<any> = [];
  const topicList: Array<any> = [];
  for (const event of eventList) {
    const topic = getEventTopic(event, ABI.MAPPING[address].abi);
    if (topic) {
      topicList.push(topic);
    }
  }

  try {
    const logs = await provider.getLogs({
      topics: topicList,
      fromBlock,
      toBlock,
      address: address,
    });

    const events = logs.map((log: any) => ({
      args: { ...contract.interface.parseLog(log)?.args },
      blockNumber: log.blockNumber,
      eventIndex: log.index,
      name: contract.interface.parseLog(log)?.name,
    }));

    allEvents.push(...events);
  } catch (err) {
    console.log('🚀 ~ file: indexer.ts:222 ~ err:', err);
  }

  return allEvents;
};

const startChainScan = async (fromBlock: number, toBlock: number) => {
  const eventsToScan = [
    {
      contract: constants.CONTRIBUTION_ADDRESS,
      eventNames: ['ContributionCreated'],
    },
    {
      contract: constants.RECORD_VOTING_ADDRESS,
      eventNames: [
        'VersionRequest',
        'NewVersionVoting',
        'NewVersionVotingBallotCreated',
        'NewVersionRequestResult',
        'NewVersionTokenDistribution',
        'NewTokenClaimed',
      ],
    },
    {
      contract: constants.RECORDS_ADDRESS,
      eventNames: ['RecordCreated'],
    },
    {
      contract: constants.TRACKS_ADDRESS,
      eventNames: ['TracksCreated'],
    },
    {
      contract: constants.CRD_TOKEN_ADDRESS,
      eventNames: ['Transfer'],
    },
    {
      contract: constants.TREASURY_CORE_ADDRESS,
      eventNames: [
        'TokenTransfer',
        'NewTokenCreated',
        'TokenMinted',
        'ContributionRewardTransferred',
      ],
    },
    {
      contract: constants.CONTRIBUTION_VOTING_ADDRESS,
      eventNames: [
        'ContributionBallotCreated',
        'ContributionVoting',
        'CounterOfferForContribution',
        'CounterOfferActionForContribution',
        'ContributionBallotResult',
      ],
    },
    {
      contract: constants.ORDERS_ADDRESS,
      eventNames: ['BuyOrder', 'SaleBought', 'OrderClose'],
    },
    {
      contract: constants.AGREEMENT_ADDRESS,
      eventNames: [
        'AgreementCreated',
        'RoyaltyPayment',
        'RoyaltyPaymentClaimed',
        'AgreementVoting',
        'AgreementBallotResult',
      ],
    },
    {
      contract: constants.DILUTION_ADDRESS,
      eventNames: [
        'DilutionRequestCreated',
        'DilutionVoting',
        'DilutionResult',
      ],
    },
    {
      contract: constants.CONTROLLER_ADDRESS,
      eventNames: ['SetupNewRecordCalled', 'CreateNewContributionCalled'],
    },
  ];

  const events = eventsToScan.map((e) => {
    return fetchEvents(
      contractsList[e.contract],
      e.contract,
      e.eventNames,
      fromBlock,
      toBlock
    );
  });

  return (await Promise.all(events)).flat();
};

function sortEvents(events: any) {
  return events.sort((a: any, b: any) => {
    if (a.blockNumber !== b.blockNumber) {
      return a.blockNumber - b.blockNumber;
    }

    if (a.eventIndex === b.eventIndex) {
      throw new Error("Two events can't have the same transaction index");
    }

    return a.eventIndex - b.eventIndex;
  });
}

const saveData = async (data: any) => {
  data.map(async (e: any) => {
    try {
      const object = convertIntoObject(e);

      if (object) {
        const eventData = JSON.stringify(object, replacer, 2);
        const res = await saveEventToDynamoDB(
          e.name,
          eventData,
          e.blockNumber,
          e.eventIndex
        );
      }
    } catch (err) {
      console.log('🚀 ~ file: indexer.ts:352 ~ data.map ~ err:', err);
    }
  });
};

const newBlockScanner = async () => {
  // let lastScannedBlock = await getLastIndexedBlock();
  // console.log(
  //   '🚀 ~ file: indexer.ts:354 ~ newBlockScanner ~ lastScannedBlock:',
  //   lastScannedBlock
  // );

  // while (true) {
  //   const latestBlockNumber = await provider.getBlockNumber();
  //   if (latestBlockNumber - lastScannedBlock === 0) {
  //     // sleep for 10 sec
  //   } else if (latestBlockNumber - lastScannedBlock > 0) {
  //   }
  //   if (lastScannedBlock) {
  //   }
  //   const eventData = await startScan(lastScannedBlock, 5057806);
  // }

  const eventData = await startChainScan(5052434, 5057806);

  const sortedData = sortEvents(eventData);

  await saveData(sortedData);
};

newBlockScanner();
