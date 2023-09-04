import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createNewVersionTokenDistributionTable = async () => {
  const params = {
    TableName: TABLES.NEW_VERSION_TOKEN_DISTRIBUTION_TABLE,
    KeySchema: [
      { AttributeName: 'versionRequestId', KeyType: 'HASH' },
      { AttributeName: 'tokenId', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'versionRequestId', AttributeType: 'N' },
      { AttributeName: 'tokenId', AttributeType: 'N' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  };

  await createTableIfNotExists(
    TABLES.NEW_VERSION_TOKEN_DISTRIBUTION_TABLE,
    params
  );
};

export default createNewVersionTokenDistributionTable;
