import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createTokenDataTable = async () => {
  const params = {
    TableName: TABLES.TOKEN_DATA_TABLE,
    KeySchema: [{ AttributeName: 'tokenId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'tokenId', AttributeType: 'N' },
      { AttributeName: 'recordId', AttributeType: 'N' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    GlobalSecondaryIndexes: [
      {
        IndexName: 'searchByRecord',
        KeySchema: [{ AttributeName: 'recordId', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'KEYS_ONLY' },
        BillingMode: 'PAY_PER_REQUEST',
      },
    ],
  };

  await createTableIfNotExists(TABLES.TOKEN_DATA_TABLE, params);
};

export default createTokenDataTable;
