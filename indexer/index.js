const { ethers } = require("ethers");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const { CONTRACT_ADDRESS } = require("./src/utils/constants");
const { GLMR_ABI } = require("./src/abis");

dotenv.config();

// AWS configuration
// AWS.config.update({
//     region: process.env.AWS_REGION,
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

const docClient = new AWS.DynamoDB.DocumentClient();
let currentBlock = process.env.START_BLOCK ?? 0;
// Ethereum provider configuration
const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_NODE_URL);
const startBlock = parseInt(currentBlock);
const contractAddress = CONTRACT_ADDRESS;
console.log("🚀 ~ file: index.js:23 ~ GLMR_ABI:", GLMR_ABI);
const contractAbi = JSON.stringify(GLMR_ABI);

const contract = new ethers.Contract(contractAddress, contractAbi, provider);

async function getLastIndexedBlock() {
    // const params = {
    //     TableName: process.env.CONFIG_TABLE_NAME!,
    //     Key: { 'config': 'lastIndexedBlock' }
    // };

    // try {
    //     const data = await docClient.get(params).promise();
    //     return data.Item?.value ?? startBlock;
    // } catch (err) {
    //     console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    //     return startBlock;
    // }
    ++currentBlock;
    return currentBlock;
}

async function saveLastIndexedBlock(blockNumber) {
    // const params = {
    //     TableName: process.env.CONFIG_TABLE_NAME!,
    //     Key: { 'config': 'lastIndexedBlock' },
    //     UpdateExpression: 'set #value = :v',
    //     ExpressionAttributeNames: { '#value': 'value' },
    //     ExpressionAttributeValues: { ':v': blockNumber }
    // };
    // try {
    //     await docClient.update(params).promise();
    //     console.log("Saved last indexed block: ", blockNumber);
    // } catch (err) {
    //     console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    // }
}

async function saveEventToDynamoDB(event) {
    // const params = {
    //     TableName: process.env.EVENTS_TABLE_NAME!,
    //     Item: {
    //         'blockNumber': event.blockNumber,
    //         'event': event.event,
    //         'args': event.args
    //     }
    // };
    // try {
    //     await docClient.put(params).promise();
    //     console.log("Added item:", JSON.stringify(event));
    // } catch (err) {
    //     console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    // }
}

async function main() {
    let lastIndexedBlock = await getLastIndexedBlock();
    console.log("Last indexed block: ", lastIndexedBlock);

    contract.on("*", async (event) => {
        console.log("Received event: ", event);
        await saveEventToDynamoDB(event);
        await saveLastIndexedBlock(event.blockNumber);
    });

    provider.resetEventsBlock(lastIndexedBlock);
}

main().catch(console.error);

