import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createNewTokenClaimedTable = async () => {
  const params = {
    TableName: TABLES.CLAIMED_TOKEN_TABLE,
    KeySchema: [
      { AttributeName: 'user', KeyType: 'HASH' },
      { AttributeName: 'rewardTokenId', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'user', AttributeType: 'S' },
      { AttributeName: 'rewardTokenId', AttributeType: 'N' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  };

  await createTableIfNotExists(TABLES.CLAIMED_TOKEN_TABLE, params);
};

export default createNewTokenClaimedTable;
