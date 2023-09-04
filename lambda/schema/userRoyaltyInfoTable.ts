import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createUserRoyaltyInfo = async () => {
  const params = {
    TableName: TABLES.USER_ROYALTY_INFO,
    KeySchema: [{ AttributeName: 'user', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'user', AttributeType: 'S' }],
    BillingMode: 'PAY_PER_REQUEST',
  };

  await createTableIfNotExists(TABLES.USER_ROYALTY_INFO, params);
};

export default createUserRoyaltyInfo;
