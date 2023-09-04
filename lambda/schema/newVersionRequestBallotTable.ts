import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createNewVersionRequestBallot = async () => {
  const params = {
    TableName: TABLES.NEW_VERSION_REQUEST_BALLOT_TABLE,
    KeySchema: [{ AttributeName: 'ballotId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'ballotId', AttributeType: 'N' },
      { AttributeName: 'versionRequestId', AttributeType: 'N' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    GlobalSecondaryIndexes: [
      {
        IndexName: 'searchByVersionRequestId',
        KeySchema: [{ AttributeName: 'versionRequestId', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'KEYS_ONLY' },
        BillingMode: 'PAY_PER_REQUEST',
      },
    ],
  };

  await createTableIfNotExists(TABLES.NEW_VERSION_REQUEST_BALLOT_TABLE, params);
};

export default createNewVersionRequestBallot;
