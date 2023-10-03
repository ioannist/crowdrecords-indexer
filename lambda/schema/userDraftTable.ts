import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const userDraftTable = async () => {
  const params = {
    TableName: TABLES.DRAFTS_TABLE,
    KeySchema: [
      { AttributeName: 'address', KeyType: 'HASH' },
      { AttributeName: 'type', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'address', AttributeType: 'S' },
      { AttributeName: 'type', AttributeType: 'S' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  };

  await createTableIfNotExists(TABLES.DRAFTS_TABLE, params);
};

export default userDraftTable;
