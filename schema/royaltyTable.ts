import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createRoyaltyTable = async () => {
  const params = {
    TableName: TABLES.ROYALTY_TABLE,
    KeySchema: [{ AttributeName: 'royaltyId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'royaltyId', AttributeType: 'N' },
      { AttributeName: 'agreementId', AttributeType: 'N' },
      { AttributeName: 'recordId', AttributeType: 'N' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    GlobalSecondaryIndexes: [
      {
        IndexName: 'searchByRecordId',
        KeySchema: [{ AttributeName: 'recordId', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'KEYS_ONLY' },
        BillingMode: 'PAY_PER_REQUEST',
      },
      {
        IndexName: 'searchByRecordIdFilterByAgreement',
        KeySchema: [
          { AttributeName: 'recordId', KeyType: 'HASH' },
          { AttributeName: 'agreementId', KeyType: 'RANGE' },
        ],
        Projection: { ProjectionType: 'KEYS_ONLY' },
        BillingMode: 'PAY_PER_REQUEST',
      },
    ],
  };

  await createTableIfNotExists(TABLES.ROYALTY_TABLE, params);
};

export default createRoyaltyTable;
