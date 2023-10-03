import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createOrderCreatedTable = async () => {
  const params = {
    TableName: TABLES.ORDER_CREATED_TABLE,
    KeySchema: [{ AttributeName: 'orderId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'orderId', AttributeType: 'N' },
      { AttributeName: 'communityTokenId', AttributeType: 'N' },
      { AttributeName: 'governanceTokenId', AttributeType: 'N' },
      { AttributeName: 'buyer', AttributeType: 'S' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    GlobalSecondaryIndexes: [
      {
        IndexName: 'searchByCommunityTokenId',
        KeySchema: [{ AttributeName: 'communityTokenId', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'KEYS_ONLY' },
        BillingMode: 'PAY_PER_REQUEST',
      },
      {
        IndexName: 'searchByGovernanceTokenId',
        KeySchema: [{ AttributeName: 'governanceTokenId', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'KEYS_ONLY' },
        BillingMode: 'PAY_PER_REQUEST',
      },
      {
        IndexName: 'searchByBuyer',
        KeySchema: [{ AttributeName: 'buyer', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'KEYS_ONLY' },
        BillingMode: 'PAY_PER_REQUEST',
      },
    ],
  };

  await createTableIfNotExists(TABLES.ORDER_CREATED_TABLE, params);
};

export default createOrderCreatedTable;
