import { TABLES } from '../constants';
import { createTableIfNotExists } from '../db/dynamoClient';

const createRecordsTable = async () => {
  const params = {
    TableName: TABLES.RECORDS_TABLES,
    KeySchema: [{ AttributeName: 'recordId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'recordId', AttributeType: 'N' },
      { AttributeName: 'parentId', AttributeType: 'N' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    GlobalSecondaryIndexes: [
      {
        IndexName: 'searchByParentFilterByRecord',
        KeySchema: [
          { AttributeName: 'parentId', KeyType: 'HASH' },
          { AttributeName: 'recordId', KeyType: 'RANGE' },
        ],
        Projection: { ProjectionType: 'KEYS_ONLY' },
        BillingMode: 'PAY_PER_REQUEST',
      },
      {
        IndexName: 'searchByRecordFilterByParent',
        KeySchema: [
          { AttributeName: 'recordId', KeyType: 'HASH' },
          { AttributeName: 'parentId', KeyType: 'RANGE' },
        ],
        Projection: { ProjectionType: 'KEYS_ONLY' },
        BillingMode: 'PAY_PER_REQUEST',
      },
    ],
  };

  await createTableIfNotExists(TABLES.RECORDS_TABLES, params);
};

export default createRecordsTable;
