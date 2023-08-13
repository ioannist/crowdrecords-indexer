import { DynamoDBStreamEvent } from 'aws-lambda';
import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  QueryCommandInput,
  ServiceOutputTypes,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import {
  AgreementBallotResult,
  AgreementCreated,
  AgreementVoting,
  ContributionBallotCreated,
  ContributionBallotResult,
  ContributionCreated,
  ContributionVoting,
  CounterOfferAction,
  CounterOfferForContribution,
  DBRecord,
  NewTokenCreated,
  RecordCreated,
  TracksCreated,
} from './types';
import {
  CONTRIBUTION_STATUS_MAP,
  TABLES,
  TOKEN_TYPE,
  VOTING_STATUS_MAP,
} from './constants';
import createRecordsTable from './schema/recordsTable';
import { queryData, putData, updateData } from './db/dynamoClient';
import createGlobalCounterTable from './schema/globalCounterTable';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import createTracksTable from './schema/tracksTable';
import createContributionTable from './schema/contributionTable';
import createContributionBallotTable from './schema/contributionBallotTable';
import eventData from './MockData';
import createContributionCounterOfferTable from './schema/contributionCounterOfferTable';
import createAgreementsTable from './schema/agreementTable';
import createContributionVotesTable from './schema/contributionVotesTable';
import createAgreementBallotTable from './schema/agreementBallotTable';
import createAgreementVotesTable from './schema/agreementVotesTable';
import createTokenDataTable from './schema/tokenDataTable';

const ddbClient = new DynamoDBClient({
  region: 'us-east-2',
  credentials: {
    accessKeyId: 'AKIA2JJGHT7ZFAWRCGNF',
    secretAccessKey: 'lrWnFCvC2O/8eYpEozooM/TcFNwJBpR+ntpjtEDP',
  },
}); // replace REGION with your AWS region

// export default async (event: DynamoDBStreamEvent) => {
//     for (const record of event.Records) {
//         console.log("Processing record: ", record);

//         if (record.eventName === "INSERT") {
//             await processData(record.dynamodb.NewImage);
//         }
//     }
// };

const index = async () => {
  // AgreementCreated | RecordCreated | NewTokenCreated
  const event = eventData;
  let i = 0;
  for (const record of event.Records) {
    if (record.eventName === 'INSERT') {
      await processData(record.dynamodb.NewImage);
    }
  }
};

const getEventAndBlockCheckExpression = () => {
  return `#block < :newBlock OR (#block = :newBlock AND #eventIndex < :newEventIndex) OR (attribute_not_exists(#block) AND attribute_not_exists(#eventIndex))`;
};

const setEventAndBlockExxpression = () => {
  return `SET #block = :newBlock, #eventIndex = :newEventIndex`;
};

const getBlockAttributeNames = () => {
  return { '#block': 'block', '#eventIndex': 'eventIndex' };
};
const getBlockAttributeValues = (blockNumber: number, eventIndex: number) => {
  return { ':newBlock': blockNumber, ':newEventIndex': eventIndex };
};

async function processData(data: DBRecord) {
  try {
    const blockNumber = data.blockNumber;
    const eventIndex = data.eventIndex;
    switch (data.eventName) {
      case 'RecordCreated':
        {
          console.log('RecordCreated');
          const recordCreated: RecordCreated = JSON.parse(data.eventData);

          const tableData = {
            recordId: recordCreated.recordId,
            name: recordCreated.name,
            image: recordCreated.image,
            seedId: recordCreated.seedId,
            owner: recordCreated.owner,
            parentId: recordCreated.parentId,
            category: recordCreated.recordCategory,
            creationDate: recordCreated.creationDate,
            governanceTokenId: -1,
            communityTokenId: -1,
            pendingAgreementCount: 0,
            acceptedAgreementCount: 0,
            rejectedAgreementCount: 0,
            pendingContributionCount: 0,
            rejectedContributionCount: 0,
            acceptedContributionCount: 0, // the seed contribution will be considered as accepted only if the seed contribution was created, i.e incase of new record version it will still be 0, so this will be incremented in the ContributionCreated section
          };

          const params: UpdateItemCommandInput = {
            TableName: TABLES.GLOBAL_COUNTER_TABLE,
            Key: marshall({
              key: 'RecordCount',
            }),
            ExpressionAttributeNames: {
              '#v': 'value',
              ...getBlockAttributeNames(),
            },
            ExpressionAttributeValues: marshall({
              ':inc': 1,
              ...getBlockAttributeValues(blockNumber, eventIndex),
            }),
            ConditionExpression: getEventAndBlockCheckExpression(),
            UpdateExpression: `ADD #v :inc ${setEventAndBlockExxpression()}`,
            ReturnValues: 'UPDATED_NEW',
          };

          await putData(TABLES.RECORDS_TABLES, tableData);
          try {
            await updateData(params);
          } catch (err: any) {
            checkError(err);
          }
        }
        break;
      case 'NewTokenCreated':
        {
          const tokenData: NewTokenCreated = JSON.parse(data.eventData);
          const tokenDataEntry = {
            tokenId: tokenData.tokenId,
            tokenAmount: tokenData.tokenAmount,
            recordId: tokenData.recordId,
            symbol: tokenData.symbol,
            image: tokenData.image,
            creationDate: tokenData.creationDate,
            tokenType:
              tokenData.tokenType === TOKEN_TYPE.GOVERNANCE
                ? 'GOVERNANCE'
                : 'COPYRIGHT',
          };
          await putData(TABLES.TOKEN_DATA_TABLE, tokenDataEntry);

          // This operation doesn't need to have the event check as this operation will only occur
          // once and it's a SET command so no value issue will occur
          const params: UpdateItemCommandInput = {
            TableName: TABLES.RECORDS_TABLES,
            Key: { recordId: { N: tokenData.recordId.toString() } },
            ExpressionAttributeNames: {
              '#N':
                tokenData.tokenType === TOKEN_TYPE.GOVERNANCE
                  ? 'governanceTokenId'
                  : 'communityTokenId',
            },
            ExpressionAttributeValues: marshall({
              ':n': tokenData.tokenId,
            }),
            UpdateExpression: 'SET #N = :n',
          };

          try {
            await updateData(params);
          } catch (err: any) {
            checkError(err);
          }
        }
        break;
      case 'TracksCreated':
        {
          const trackData: TracksCreated = JSON.parse(data.eventData);

          const tracks = trackData.trackData.map((e, i) => {
            return {
              trackId: trackData.trackIds[i],
              filehash: e.filehash,
              filelink: e.filelink,
              category: e.category,
              owner: trackData.owner,
            };
          });

          for (const track of tracks) {
            await putData(TABLES.TRACKS_TABLE, track);
          }

          const params: UpdateItemCommandInput = {
            TableName: TABLES.GLOBAL_COUNTER_TABLE,
            Key: marshall({
              key: 'TrackCount',
            }),
            ExpressionAttributeNames: {
              '#v': 'value',
              ...getBlockAttributeNames(),
            },
            ExpressionAttributeValues: marshall({
              ':inc': tracks.length,
              ...getBlockAttributeValues(blockNumber, eventIndex),
            }),
            ConditionExpression: getEventAndBlockCheckExpression(),
            UpdateExpression: `ADD #v :inc ${setEventAndBlockExxpression()}`,
            ReturnValues: 'UPDATED_NEW',
          };

          try {
            await updateData(params);
          } catch (err: any) {
            checkError(err);
          }
        }
        break;
      case 'ContributionCreated':
        {
          const contributionData: ContributionCreated = JSON.parse(
            data.eventData
          );

          const newContributionEntry = {
            contributionId: contributionData.contributionId,
            tracksId: contributionData.tracks,
            title: contributionData.title,
            recordId: contributionData.recordId,
            creationDate: contributionData.creationDate,
            owner: contributionData.owner,
            previewFile: contributionData.previewFile,
            previewFileHash: contributionData.previewFileHash,
            status: CONTRIBUTION_STATUS_MAP[contributionData.status],
            seedContribution: contributionData.seedContribution,
            roughMix: contributionData.roughMix,
            description: contributionData.description,
            contributionballotId: -1,
          };

          await putData(TABLES.CONTRIBUTION_TABLE, newContributionEntry);

          /// block, event index
          if (contributionData.seedContribution) {
            // If contribution is seed then increment the seedContribution count
            const params: UpdateItemCommandInput = {
              TableName: TABLES.GLOBAL_COUNTER_TABLE,
              Key: marshall({
                key: 'SeedContributionCount',
              }),
              ExpressionAttributeNames: {
                '#v': 'value',
                ...getBlockAttributeNames(),
              },
              ExpressionAttributeValues: marshall({
                ':inc': 1,
                ...getBlockAttributeValues(blockNumber, eventIndex),
              }),
              ConditionExpression: getEventAndBlockCheckExpression(),
              UpdateExpression: `ADD #v :inc ${setEventAndBlockExxpression()}`,
              ReturnValues: 'UPDATED_NEW',
            };

            try {
              await updateData(params);
            } catch (err: any) {
              checkError(err);
            }

            // Changing the count of the accepted contribution counter
            const updateRecordData: UpdateItemCommandInput = {
              TableName: TABLES.RECORDS_TABLES,
              Key: marshall({
                recordId: contributionData.recordId,
              }),
              ExpressionAttributeNames: {
                '#v': 'acceptedContributionCount',
                ...getBlockAttributeNames(),
              },
              ExpressionAttributeValues: marshall({
                ':inc': 1,
                ...getBlockAttributeValues(blockNumber, eventIndex),
              }),
              ConditionExpression: getEventAndBlockCheckExpression(),
              UpdateExpression: `ADD #v :inc ${setEventAndBlockExxpression()}`,
              ReturnValues: 'UPDATED_NEW',
            };

            try {
              await updateData(updateRecordData);
            } catch (err: any) {
              checkError(err);
            }
          } else {
            // The contribution is not seed so it's new contribution
            const params: UpdateItemCommandInput = {
              TableName: TABLES.GLOBAL_COUNTER_TABLE,
              Key: marshall({
                key: 'ContributionCount',
              }),
              ExpressionAttributeNames: {
                '#v': 'value',
                ...getBlockAttributeNames(),
              },
              ExpressionAttributeValues: marshall({
                ':inc': 1,
                ...getBlockAttributeValues(blockNumber, eventIndex),
              }),
              ConditionExpression: getEventAndBlockCheckExpression(),
              UpdateExpression: `ADD #v :inc ${setEventAndBlockExxpression()}`,
              ReturnValues: 'UPDATED_NEW',
            };

            try {
              await updateData(params);
            } catch (err: any) {
              checkError(err);
            }

            // Changing the count of the pending contribution counter
            const updateRecordData: UpdateItemCommandInput = {
              TableName: TABLES.RECORDS_TABLES,
              Key: marshall({
                recordId: contributionData.recordId,
              }),
              ExpressionAttributeNames: {
                '#v': 'pendingContributionCount',
                ...getBlockAttributeNames(),
              },
              ExpressionAttributeValues: marshall({
                ':inc': 1,
                ...getBlockAttributeValues(blockNumber, eventIndex),
              }),
              ConditionExpression: getEventAndBlockCheckExpression(),
              UpdateExpression: `ADD #v :inc ${setEventAndBlockExxpression()}`,
              ReturnValues: 'UPDATED_NEW',
            };

            try {
              await updateData(updateRecordData);
            } catch (err: any) {
              checkError(err);
            }
          }
        }
        break;
      //---------------------------------***------------------------------------------//
      case 'ContributionBallotCreated':
        {
          const contributionBallotData: ContributionBallotCreated = JSON.parse(
            data.eventData
          );

          const newBallotEntry = {
            contributionBallotId: contributionBallotData.ballotId,
            creator: contributionBallotData.requester,
            contributionId: contributionBallotData.contributionId,
            recordId: contributionBallotData.recordId,
            communityReward: contributionBallotData.communityReward,
            communityTokenId: contributionBallotData.communityTokenId,
            governanceReward: contributionBallotData.governanceReward,
            governanceTokenId: contributionBallotData.governanceTokenId,
            ballotId: contributionBallotData.ballotId,
            isDeclared: false, // by default the result declared status is false
            creationDate: contributionBallotData.creationDate,
          };

          await putData(TABLES.CONTRIBUTION_BALLOT_TABLE, newBallotEntry);
        }
        break;
      case 'ContributionVoting':
        {
          const voteData: ContributionVoting = JSON.parse(data.eventData);

          const newVoteEntry = {
            voter: voteData.voter,
            contributionId: voteData.contributionId,
            ballotId: voteData.ballotId,
            vote: voteData.vote,
          };

          await putData(TABLES.CONTRIBUTION_VOTING_TABLE, newVoteEntry);
        }
        break;
      case 'CounterOfferForContribution':
        {
          const counterOfferData: CounterOfferForContribution = JSON.parse(
            data.eventData
          );

          const counterOfferEntry = {
            contributionId: counterOfferData.contributionId,
            voter: counterOfferData.voter,
            newGovernanceReward: counterOfferData.newGovernanceReward,
            newCommunityReward: counterOfferData.newCommunityReward,
            status: VOTING_STATUS_MAP[1], // By default pending
          };

          await putData(TABLES.CONTRIBUTION_COUNTER_OFFERS, counterOfferEntry);
        }
        break;
      case 'CounterOfferActionForContribution':
        {
          const counterOfferAction: CounterOfferAction = JSON.parse(
            data.eventData
          );

          // Changing the count of the pending contribution counter
          const updateRecordData: UpdateItemCommandInput = {
            TableName: TABLES.CONTRIBUTION_COUNTER_OFFERS,
            Key: marshall({
              contributionId: counterOfferAction.contributionId,
              voter: counterOfferAction.voter,
            }),
            ExpressionAttributeNames: {
              '#v': 'status',
            },
            ExpressionAttributeValues: marshall({
              ':status': VOTING_STATUS_MAP[counterOfferAction.status],
            }),
            UpdateExpression: `SET #v :status`,
            ReturnValues: 'UPDATED_NEW',
          };

          try {
            await updateData(updateRecordData);
          } catch (err: any) {
            checkError(err);
          }
        }
        break;
      case 'ContributionBallotResult':
        {
          const ballotResult: ContributionBallotResult = JSON.parse(
            data.eventData
          );

          // Changing the count of the pending contribution counter
          const updateBallotData: UpdateItemCommandInput = {
            TableName: TABLES.CONTRIBUTION_BALLOT_TABLE,
            Key: marshall({
              ballotId: ballotResult.ballotId,
            }),
            ExpressionAttributeNames: {
              '#result': 'result',
              '#minTurnOut': 'minTurnOut',
            },
            ExpressionAttributeValues: marshall({
              ':result': ballotResult.result,
              ':minTurnOut': ballotResult.minTurnOut,
            }),
            UpdateExpression: `SET #result = :result, #minTurnOut = :minTurnOut`,
            ReturnValues: 'UPDATED_NEW',
          };

          try {
            await updateData(updateBallotData);
          } catch (err: any) {
            checkError(err);
          }

          const queryCommand: QueryCommandInput = {
            TableName: TABLES.CONTRIBUTION_TABLE,
            KeyConditionExpression: '#contributionId = :contributionId',
            ExpressionAttributeNames: {
              '#contributionId': 'contributionId',
            },
            ExpressionAttributeValues: marshall({
              ':contributionId': ballotResult.contributionId,
            }),
          };

          const contributionData = await queryData(queryCommand);

          const contribution = contributionData.Items?.map((item) => {
            return unmarshall(item);
          })[0];

          if (contribution) {
            const expressionAttrName: { [string: string]: string } =
              ballotResult.result
                ? {
                    '#acceptedContributionCount': 'acceptedContributionCount',
                  }
                : {
                    '#rejectedContributionCount': 'rejectedContributionCount',
                  };

            const expressionAttrValue: { [string: string]: number } =
              ballotResult.result
                ? {
                    ':acceptedContributionCount': 1,
                  }
                : {
                    ':rejectedContributionCount': 1,
                  };

            const updateExpression: string = ballotResult.result
              ? '#acceptedContributionCount :acceptedContributionCount'
              : '#rejectedContributionCount :rejectedContributionCount';

            // Changing the count of the pending contribution counter
            const updateRecordData: UpdateItemCommandInput = {
              TableName: TABLES.RECORDS_TABLES,
              Key: marshall({
                recordId: contribution.recordId,
              }),
              ExpressionAttributeNames: {
                '#pendingContributionCount': 'pendingContributionCount',
                ...expressionAttrName,
                ...getBlockAttributeNames(),
              },
              ExpressionAttributeValues: marshall({
                ':dec': -1,
                ...expressionAttrValue,
                ...getBlockAttributeValues(blockNumber, eventIndex),
              }),
              ConditionExpression: getEventAndBlockCheckExpression(),
              UpdateExpression: `ADD #pendingContributionCount :dec, ${updateExpression} ${setEventAndBlockExxpression()}`,
              ReturnValues: 'UPDATED_NEW',
            };
            try {
              await updateData(updateRecordData);
            } catch (err: any) {
              checkError(err);
            }
          } else {
            console.error(
              'Error: Found ContributionBallotResult event but no contribution found. BallotId = ',
              ballotResult.ballotId
            );
          }
        }
        break;
      //---------------------------------*** 2***------------------------------------------//
      case 'AgreementCreated':
        {
          //Insert the data into the agreements table
          const agreementCreated: AgreementCreated = JSON.parse(data.eventData);

          const agreementEntry = {
            agreementId: agreementCreated.agreementId,
            owner: agreementCreated.requester,
            recordId: agreementCreated.recordId,
            ballotId: agreementCreated.ballotId,
            title: agreementCreated.title,
            contractLink: agreementCreated.contractLink,
            contractHash: agreementCreated.contractHash,
            creationDate: agreementCreated.creationDate,
          };

          await putData(TABLES.AGREEMENTS_TABLE, agreementEntry);

          //Insert the data into the agreements ballot table
          const agreementBallotEntry = {
            ballotId: agreementCreated.ballotId,
            agreementId: agreementCreated.agreementId,
            owner: agreementCreated.requester,
            recordId: agreementCreated.recordId,
            tokenId: agreementCreated.tokenId,
            creationDate: agreementCreated.creationDate,
            depositAmount: agreementCreated.depositAmount,
            votingEndBlock: agreementCreated.votingEndBlock,
          };

          await putData(TABLES.AGREEMENTS_BALLOT_TABLE, agreementBallotEntry);

          const params: UpdateItemCommandInput = {
            TableName: TABLES.GLOBAL_COUNTER_TABLE,
            Key: marshall({
              key: 'AgreementCount',
            }),
            ExpressionAttributeNames: {
              '#v': 'value',
              ...getBlockAttributeNames(),
            },
            ExpressionAttributeValues: marshall({
              ':inc': 1,
              ...getBlockAttributeValues(blockNumber, eventIndex),
            }),
            ConditionExpression: getEventAndBlockCheckExpression(),
            UpdateExpression: `ADD #v :inc ${setEventAndBlockExxpression()}`,
            ReturnValues: 'UPDATED_NEW',
          };

          try {
            await updateData(params);
          } catch (err: any) {
            checkError(err);
          }

          const updateRecordData: UpdateItemCommandInput = {
            TableName: TABLES.RECORDS_TABLES,
            Key: marshall({
              recordId: agreementCreated.recordId,
            }),
            ExpressionAttributeNames: {
              '#v': 'pendingAgreementCount',
              ...getBlockAttributeNames(),
            },
            ExpressionAttributeValues: marshall({
              ':inc': 1,
              ...getBlockAttributeValues(blockNumber, eventIndex),
            }),
            ConditionExpression: getEventAndBlockCheckExpression(),
            UpdateExpression: `ADD #v :inc ${setEventAndBlockExxpression()}`,
            ReturnValues: 'UPDATED_NEW',
          };

          try {
            await updateData(updateRecordData);
          } catch (err: any) {
            checkError(err);
          }
        }
        break;
      case 'AgreementVoting':
        {
          const voteData: AgreementVoting = JSON.parse(data.eventData);

          const newVoteEntry = {
            voter: voteData.voter,
            agreementId: voteData.agreementId,
            ballotId: voteData.ballotId,
            vote: voteData.vote,
          };

          await putData(TABLES.AGREEMENTS_VOTE_TABLE, newVoteEntry);
        }
        break;
      case 'AgreementBallotResult':
        {
          const ballotResult: AgreementBallotResult = JSON.parse(
            data.eventData
          );

          // Changing the count of the pending contribution counter
          const updateBallotData: UpdateItemCommandInput = {
            TableName: TABLES.CONTRIBUTION_BALLOT_TABLE,
            Key: marshall({
              ballotId: ballotResult.ballotId,
            }),
            ExpressionAttributeNames: {
              '#result': 'result',
              '#minTurnOut': 'minTurnOut',
            },
            ExpressionAttributeValues: marshall({
              ':result': ballotResult.result,
              ':minTurnOut': ballotResult.minTurnOut,
            }),
            UpdateExpression: `SET #result = :result, #minTurnOut = :minTurnOut`,
            ReturnValues: 'UPDATED_NEW',
          };

          try {
            await updateData(updateBallotData);
          } catch (err: any) {
            checkError(err);
          }

          const queryCommand: QueryCommandInput = {
            TableName: TABLES.AGREEMENTS_BALLOT_TABLE,
            KeyConditionExpression: '#ballotId = :ballotId',
            ExpressionAttributeNames: {
              '#ballotId': 'ballotId',
            },
            ExpressionAttributeValues: marshall({
              ':ballotId': ballotResult.ballotId,
            }),
          };

          const agreementBallotQueryRes = await queryData(queryCommand);

          const agreementBallot = agreementBallotQueryRes.Items?.map((item) => {
            return unmarshall(item);
          })[0];

          if (agreementBallot) {
            const expressionAttrName: { [string: string]: string } =
              ballotResult.result
                ? {
                    '#acceptedAgreementCount': 'acceptedAgreementCount',
                  }
                : {
                    '#rejectedAgreementCount': 'rejectedAgreementCount',
                  };

            const expressionAttrValue: { [string: string]: number } =
              ballotResult.result
                ? {
                    ':acceptedAgreementCount': 1,
                  }
                : {
                    ':rejectedAgreementCount': 1,
                  };

            const updateExpression: string = ballotResult.result
              ? '#acceptedAgreementCount :acceptedAgreementCount'
              : '#rejectedAgreementCount :rejectedAgreementCount';

            // Changing the count of the pending contribution counter
            const updateRecordData: UpdateItemCommandInput = {
              TableName: TABLES.RECORDS_TABLES,
              Key: marshall({
                recordId: agreementBallot.recordId,
              }),
              ExpressionAttributeNames: {
                '#pendingAgreementCount': 'pendingAgreementCount',
                ...expressionAttrName,
                ...getBlockAttributeNames(),
              },
              ExpressionAttributeValues: marshall({
                ':dec': -1,
                ...expressionAttrValue,
                ...getBlockAttributeValues(blockNumber, eventIndex),
              }),
              ConditionExpression: getEventAndBlockCheckExpression(),
              UpdateExpression: `ADD #pendingAgreementCount :dec, ${updateExpression} ${setEventAndBlockExxpression()}`,
              ReturnValues: 'UPDATED_NEW',
            };
            try {
              await updateData(updateRecordData);
            } catch (err: any) {
              checkError(err);
            }
          } else {
            console.error(
              `Error: Found AgreementBallotResult event but no Agreement Ballot found. BallotId : ${ballotResult.ballotId} agreementId : ${ballotResult.agreementId}}`
            );
          }
        }
        break;
      //---------------------------------*** 3***------------------------------------------//
    }
  } catch (err: any) {
    checkError(err);
  }
  return data;
}
function checkError(err: any) {
  if (
    err.__type ===
    'com.amazonaws.dynamodb.v20120810#ConditionalCheckFailedException'
  ) {
    console.log('Conditional check failed');
  } else {
    console.log(err);
  }
}

(async () => {
  await createTokenDataTable();
  await createRecordsTable();
  await createGlobalCounterTable();
  await createTracksTable();
  await createContributionVotesTable();
  await createContributionTable();
  await createContributionBallotTable();
  await createContributionCounterOfferTable();
  await createAgreementsTable();
  await createAgreementBallotTable();
  await createAgreementVotesTable();
  await index();
})();
