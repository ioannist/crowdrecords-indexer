import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createContributionTable = async () => {
  const params = {
    TableName: TABLES.CONTRIBUTION_TABLE,
    KeySchema: [{ AttributeName: 'contributionId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'contributionId', AttributeType: 'N' },
      { AttributeName: 'recordId', AttributeType: 'N' },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'searchByContributionFilterByRecordId',
        KeySchema: [
          { AttributeName: 'contributionId', KeyType: 'HASH' },
          { AttributeName: 'recordId', KeyType: 'RANGE' },
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
    BillingMode: 'PAY_PER_REQUEST',
  };

  await createTableIfNotExists(TABLES.CONTRIBUTION_TABLE, params);
};

export default createContributionTable;
