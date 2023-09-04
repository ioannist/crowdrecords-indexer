import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createUserBalanceTable = async () => {
  const params = {
    TableName: TABLES.USER_BALANCE_TABLE,
    KeySchema: [
      { AttributeName: 'user', KeyType: 'HASH' },
      { AttributeName: 'tokenId', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'user', AttributeType: 'S' },
      { AttributeName: 'tokenId', AttributeType: 'N' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  };

  await createTableIfNotExists(TABLES.USER_BALANCE_TABLE, params);
};

export default createUserBalanceTable;
