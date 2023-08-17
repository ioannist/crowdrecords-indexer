import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createNewVersionVoting = async () => {
  const params = {
    TableName: TABLES.NEW_VERSION_VOTING_TABLE,
    KeySchema: [
      { AttributeName: 'ballotId', KeyType: 'HASH' },
      { AttributeName: 'voter', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'ballotId', AttributeType: 'N' },
      { AttributeName: 'voter', AttributeType: 'S' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  };

  await createTableIfNotExists(TABLES.NEW_VERSION_VOTING_TABLE, params);
};

export default createNewVersionVoting;
