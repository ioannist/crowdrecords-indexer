import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createAgreementsTable = async () => {
  const params = {
    TableName: TABLES.AGREEMENTS_TABLE,
    KeySchema: [{ AttributeName: 'agreementId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'agreementId', AttributeType: 'N' },
      { AttributeName: 'owner', AttributeType: 'S' },
      { AttributeName: 'recordId', AttributeType: 'N' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    GlobalSecondaryIndexes: [
      {
        IndexName: 'searchByUserFilterByAgreement',
        KeySchema: [
          { AttributeName: 'owner', KeyType: 'HASH' },
          { AttributeName: 'agreementId', KeyType: 'RANGE' },
        ],
        Projection: { ProjectionType: 'KEYS_ONLY' },
        BillingMode: 'PAY_PER_REQUEST',
      },
      {
        IndexName: 'searchByRecordId',
        KeySchema: [{ AttributeName: 'recordId', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'KEYS_ONLY' },
        BillingMode: 'PAY_PER_REQUEST',
      },
    ],
  };

  await createTableIfNotExists(TABLES.AGREEMENTS_TABLE, params);
};

export default createAgreementsTable;
