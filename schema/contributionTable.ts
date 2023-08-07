import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createContributionTable = async () => {
  const params = {
    TableName: TABLES.CONTRIBUTION_TABLE,
    KeySchema: [
      { AttributeName: 'contributionId', KeyType: 'HASH' },
      { AttributeName: 'recordId', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'contributionId', AttributeType: 'N' },
      { AttributeName: 'recordId', AttributeType: 'N' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  };

  await createTableIfNotExists(TABLES.CONTRIBUTION_TABLE, params);
};

export default createContributionTable;
