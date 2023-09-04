import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createNewVersionRequestTable = async () => {
  const params = {
    TableName: TABLES.NEW_VERSION_REQUEST_TABLE,
    KeySchema: [{ AttributeName: 'requestId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'requestId', AttributeType: 'N' },
      { AttributeName: 'oldVersionId', AttributeType: 'N' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    GlobalSecondaryIndexes: [
      {
        IndexName: 'searchByOldVersionId',
        KeySchema: [{ AttributeName: 'oldVersionId', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'KEYS_ONLY' },
        BillingMode: 'PAY_PER_REQUEST',
      },
    ],
  };

  await createTableIfNotExists(TABLES.NEW_VERSION_REQUEST_TABLE, params);
};

export default createNewVersionRequestTable;
