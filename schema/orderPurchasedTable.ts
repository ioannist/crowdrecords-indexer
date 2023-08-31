import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createOrderPurchasedTable = async () => {
  const params = {
    TableName: TABLES.ORDER_PURCHASED_TABLE,
    KeySchema: [{ AttributeName: 'purchaseId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'purchaseId', AttributeType: 'N' },
      { AttributeName: 'orderId', AttributeType: 'N' },
      { AttributeName: 'communityTokenId', AttributeType: 'N' },
      { AttributeName: 'governanceTokenId', AttributeType: 'N' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    GlobalSecondaryIndexes: [
      {
        IndexName: 'searchByOrderId',
        KeySchema: [{ AttributeName: 'orderId', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'KEYS_ONLY' },
        BillingMode: 'PAY_PER_REQUEST',
      },
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
    ],
  };

  await createTableIfNotExists(TABLES.ORDER_PURCHASED_TABLE, params);
};

export default createOrderPurchasedTable;
