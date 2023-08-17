import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createClaimedRoyaltyInfoTable = async () => {
  const params = {
    TableName: TABLES.CLAIMED_ROYALTY_INFO,
    KeySchema: [
      { AttributeName: 'user', KeyType: 'HASH' },
      { AttributeName: 'royaltyId', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'user', AttributeType: 'S' },
      { AttributeName: 'royaltyId', AttributeType: 'N' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  };

  await createTableIfNotExists(TABLES.CLAIMED_ROYALTY_INFO, params);
};

export default createClaimedRoyaltyInfoTable;
