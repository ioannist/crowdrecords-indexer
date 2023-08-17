import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createUserRoyaltyInfoPerAgreement = async () => {
  const params = {
    TableName: TABLES.USER_ROYALTY_INFO_PER_AGREEMENT,
    KeySchema: [
      { AttributeName: 'user', KeyType: 'HASH' },
      { AttributeName: 'agreementId', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'user', AttributeType: 'S' },
      { AttributeName: 'agreementId', AttributeType: 'N' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  };

  await createTableIfNotExists(TABLES.USER_ROYALTY_INFO_PER_AGREEMENT, params);
};

export default createUserRoyaltyInfoPerAgreement;
