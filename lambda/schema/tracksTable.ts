import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createTracksTable = async () => {
  const params = {
    TableName: TABLES.TRACKS_TABLE,
    KeySchema: [
      { AttributeName: 'trackId', KeyType: 'HASH' },
      { AttributeName: 'owner', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'trackId', AttributeType: 'N' },
      { AttributeName: 'owner', AttributeType: 'S' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  };

  await createTableIfNotExists(TABLES.TRACKS_TABLE, params);
};

export default createTracksTable;
