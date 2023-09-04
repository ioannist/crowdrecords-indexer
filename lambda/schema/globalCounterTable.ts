import { TABLES } from '../constants';
import { createTableIfNotExists, putData } from '../db/dynamoClient';

const createGlobalCounterTable = async () => {
  const params = {
    TableName: TABLES.GLOBAL_COUNTER_TABLE,
    KeySchema: [{ AttributeName: 'key', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'key', AttributeType: 'S' }],
    BillingMode: 'PAY_PER_REQUEST',
  };

  await createTableIfNotExists(TABLES.GLOBAL_COUNTER_TABLE, params);

  // const record1 = {
  //   key: 'SeedContributionCount',
  //   value: 0,
  //   block: 0,
  //   eventIndex: 0,
  // };
  // await putData(TABLES.GLOBAL_COUNTER_TABLE, record1);
};

export default createGlobalCounterTable;
