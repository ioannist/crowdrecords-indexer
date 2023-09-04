import { marshall } from '@aws-sdk/util-dynamodb';
import {
  CreateTableCommand,
  CreateTableCommandInput,
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  ListTablesCommand,
  PutItemCommand,
  QueryCommand,
  QueryCommandInput,
  ServiceOutputTypes,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import * as dotenv from 'dotenv';

dotenv.config();

const ddbClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export const putData = (
  tableName: string,
  record: any
): Promise<ServiceOutputTypes> => {
  const params = {
    TableName: tableName,
    Item: marshall(record),
  };

  const command = new PutItemCommand(params);
  return ddbClient.send(command);
};

export const updateData = (
  param: UpdateItemCommandInput
): Promise<ServiceOutputTypes> => {
  const command = new UpdateItemCommand(param);
  return ddbClient.send(command);
};

export const queryData = (param: QueryCommandInput) => {
  const command = new QueryCommand(param);
  return ddbClient.send(command);
};

export const createTableIfNotExists = async (
  tableName: string,
  tableSchema: CreateTableCommandInput
) => {
  // Check if table exists
  const { TableNames } = await ddbClient.send(new ListTablesCommand({}));
  if (TableNames?.includes(tableName)) {
    console.log(`${tableName} Table already exists:`);
    return;
  }

  try {
    const data = await ddbClient.send(new CreateTableCommand(tableSchema));
    console.log(`${tableName} Table Created:`, data);
  } catch (err) {
    console.error(err);
  }
};
