import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createTokenMintedTable = async () => {
  const params = {
    TableName: TABLES.TOKEN_MINTED_TABLE,
    KeySchema: [
      { AttributeName: 'blockNumber', KeyType: 'HASH' },
      { AttributeName: 'eventIndex', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'blockNumber', AttributeType: 'N' },
      { AttributeName: 'eventIndex', AttributeType: 'N' },
      { AttributeName: 'recordId', AttributeType: 'N' },
      { AttributeName: 'tokenId', AttributeType: 'N' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    GlobalSecondaryIndexes: [
      {
        IndexName: 'searchByRecordId',
        KeySchema: [{ AttributeName: 'recordId', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'KEYS_ONLY' },
        BillingMode: 'PAY_PER_REQUEST',
      },
      {
        IndexName: 'searchByTokenId',
        KeySchema: [{ AttributeName: 'tokenId', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'KEYS_ONLY' },
        BillingMode: 'PAY_PER_REQUEST',
      },
    ],
  };

  await createTableIfNotExists(TABLES.TOKEN_MINTED_TABLE, params);
};

export default createTokenMintedTable;
