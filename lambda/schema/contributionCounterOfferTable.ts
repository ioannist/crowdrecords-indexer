import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createContributionCounterOfferTable = async () => {
  const params = {
    TableName: TABLES.CONTRIBUTION_COUNTER_OFFERS,
    KeySchema: [
      { AttributeName: 'contributionId', KeyType: 'HASH' },
      { AttributeName: 'voter', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'contributionId', AttributeType: 'N' },
      { AttributeName: 'voter', AttributeType: 'S' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  };

  await createTableIfNotExists(TABLES.CONTRIBUTION_COUNTER_OFFERS, params);
};

export default createContributionCounterOfferTable;
