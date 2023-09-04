import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createDilutionRequestTable = async () => {
  const params = {
    TableName: TABLES.DILUTION_REQUEST_TABLE,
    KeySchema: [{ AttributeName: 'dilutionId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'dilutionId', AttributeType: 'N' },
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

  await createTableIfNotExists(TABLES.DILUTION_REQUEST_TABLE, params);
};

export default createDilutionRequestTable;
