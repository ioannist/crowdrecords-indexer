import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createDilutionRequestBallotTable = async () => {
  const params = {
    TableName: TABLES.DILUTION_REQUEST_BALLOT_TABLE,
    KeySchema: [{ AttributeName: 'ballotId', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'ballotId', AttributeType: 'N' }],
    BillingMode: 'PAY_PER_REQUEST',
  };

  await createTableIfNotExists(TABLES.DILUTION_REQUEST_BALLOT_TABLE, params);
};

export default createDilutionRequestBallotTable;
