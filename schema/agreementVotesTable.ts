import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createAgreementVotesTable = async () => {
  const params = {
    TableName: TABLES.AGREEMENTS_VOTE_TABLE,
    KeySchema: [{ AttributeName: 'ballotId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'ballotId', AttributeType: 'N' },
      { AttributeName: 'voter', AttributeType: 'S' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    GlobalSecondaryIndexes: [
      {
        IndexName: 'searchByUserFilterByBallot',
        KeySchema: [
          { AttributeName: 'voter', KeyType: 'HASH' },
          { AttributeName: 'ballotId', KeyType: 'RANGE' },
        ],
        Projection: { ProjectionType: 'KEYS_ONLY' },
        BillingMode: 'PAY_PER_REQUEST',
      },
    ],
  };

  await createTableIfNotExists(TABLES.AGREEMENTS_VOTE_TABLE, params);
};

export default createAgreementVotesTable;
