import { DBRecord } from './types';

const eventData: {
  Records: Array<{
    eventName: String;
    dynamodb: { NewImage: DBRecord };
  }>;
} = {
  Records: [
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'RecordCreated',
          eventData: JSON.stringify({
            recordId: 1,
            name: 'a',
            image: 'a',
            seedId: 1,
            owner: 'a',
            parentId: 0,
            recordCategory: 'a',
            creationDate: 12345678,
          }),
          blockNumber: 1,
          eventIndex: 0,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'TracksCreated',
          eventData: JSON.stringify({
            owner: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
            trackIds: [1, 2],
            trackData: [
              {
                filehash: 'filehash1',
                filelink: 'filelink1',
                category: 'category1',
              },
              {
                filehash: 'filehash2',
                filelink: 'filelink2',
                category: 'category2',
              },
            ],
          }),
          blockNumber: 1,
          eventIndex: 1,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'ContributionCreated',
          eventData: JSON.stringify({
            contributionId: 1,
            tracks: [1, 2],
            title: 'test',
            creationDate: new Date().getTime(),
            previewFile: 'previewFile',
            previewFileHash: 'previewFileHash',
            recordId: 1,
            seedContribution: true,
            roughMix: false,
            status: 2,
            description: 'description',
            owner: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
          }),
          blockNumber: 1,
          eventIndex: 2,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'ContributionCreated',
          eventData: JSON.stringify({
            contributionId: 2,
            tracks: [3, 4],
            title: 'test',
            creationDate: new Date().getTime(),
            previewFile: 'previewFile',
            previewFileHash: 'previewFileHash',
            recordId: 1,
            seedContribution: false,
            roughMix: false,
            status: 1,
            description: 'description',
            owner: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
          }),
          blockNumber: 1,
          eventIndex: 3,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'ContributionBallotCreated',
          eventData: JSON.stringify({
            requester: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
            contributionId: 3,
            recordId: 1,
            communityReward: 1000000000,
            communityTokenId: 2,
            governanceReward: 1000000000,
            governanceTokenId: 3,
            ballotId: 1,
            creationDate: 12345678,
            depositAmount: 20000000,
            votingEndBlock: 123,
          }),
          blockNumber: 1,
          eventIndex: 4,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'ContributionVoting',
          eventData: JSON.stringify({
            voter: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
            contributionId: 3,
            ballotId: 1,
            vote: true,
          }),
          blockNumber: 1,
          eventIndex: 5,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'NewTokenCreated',
          eventData: JSON.stringify({
            recordId: 1,
            symbol: 'NEW-token',
            image: 'image.com',
            creationDate: new Date().getTime(),
            tokenAmount: 1000000,
            tokenId: 2,
            tokenType: 1,
          }),
          blockNumber: 1,
          eventIndex: 6,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'NewTokenCreated',
          eventData: JSON.stringify({
            recordId: 1,
            symbol: 'NEW-token-COPY',
            image: 'image.com',
            creationDate: new Date().getTime(),
            tokenAmount: 1000000,
            tokenId: 3,
            tokenType: 0,
          }),
          blockNumber: 1,
          eventIndex: 7,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'ContributionVoting',
          eventData: JSON.stringify({
            voter: '0xaaa11245B2bE47EC0449aA84a22e1d547089aaa',
            contributionId: 3,
            ballotId: 1,
            vote: true,
          }),
          blockNumber: 2,
          eventIndex: 0,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'CounterOfferForContribution',
          eventData: JSON.stringify({
            voter: '0xbbb11245B2bE47EC0449aA84a22e1d547089bbb',
            contributionId: 3,
            newGovernanceReward: 10000,
            newCommunityReward: 10000,
          }),
          blockNumber: 2,
          eventIndex: 1,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'CounterOfferAction',
          eventData: JSON.stringify({
            contributionId: 3,
            voter: '0xbbb11245B2bE47EC0449aA84a22e1d547089bbb',
            newGovernanceReward: 10000,
            newCommunityReward: 10000,
            status: 2, // ACCEPTED
          }),
          blockNumber: 2,
          eventIndex: 2,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'ContributionBallotResult',
          eventData: JSON.stringify({
            contributionId: 2,
            ballotId: 1,
            result: true,
            minTurnOut: true,
          }),
          blockNumber: 2,
          eventIndex: 3,
        },
      },
    },

    // *------*---This flow is for the new contribution rejection---*-------*
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'TracksCreated',
          eventData: JSON.stringify({
            owner: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
            trackIds: [1, 2],
            trackData: [
              {
                filehash: 'filehash1',
                filelink: 'filelink1',
                category: 'category1',
              },
              {
                filehash: 'filehash2',
                filelink: 'filelink2',
                category: 'category2',
              },
            ],
          }),
          blockNumber: 2,
          eventIndex: 4,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'ContributionCreated',
          eventData: JSON.stringify({
            contributionId: 3,
            tracks: [3, 4],
            title: 'test',
            creationDate: new Date().getTime(),
            previewFile: 'previewFile',
            previewFileHash: 'previewFileHash',
            recordId: 1,
            seedContribution: false,
            roughMix: false,
            status: 2,
            description: 'description',
            owner: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
          }),
          blockNumber: 2,
          eventIndex: 5,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'ContributionBallotCreated',
          eventData: JSON.stringify({
            requester: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
            contributionId: 3,
            recordId: 1,
            communityReward: 1000000000,
            communityTokenId: 2,
            governanceReward: 1000000000,
            governanceTokenId: 3,
            ballotId: 2,
            creationDate: 12345678,
            depositAmount: 20000000,
            votingEndBlock: 123,
          }),
          blockNumber: 3,
          eventIndex: 1,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'ContributionVoting',
          eventData: JSON.stringify({
            voter: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
            contributionId: 3,
            ballotId: 2,
            vote: false,
          }),
          blockNumber: 3,
          eventIndex: 2,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'ContributionBallotResult',
          eventData: JSON.stringify({
            contributionId: 3,
            ballotId: 1,
            result: false,
            minTurnOut: false,
          }),
          blockNumber: 3,
          eventIndex: 3,
        },
      },
    },
    // *------*------*-------*
    // *------*---This flow is for the new Agreement, expecting rejection---*-------*
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'AgreementCreated',
          eventData: JSON.stringify({
            requester: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
            title: 'Agreement title',
            recordId: 1,
            agreementId: 1,
            ballotId: 1,
            tokenId: 2,
            contractLink: 'asdasd',
            contractHash: 'asdas',
            creationDate: new Date().getTime(),
            isPresent: true,
            depositAmount: 10000000,
            votingEndBlock: 456,
          }),
          blockNumber: 4,
          eventIndex: 1,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'AgreementVoting',
          eventData: JSON.stringify({
            voter: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
            agreementId: 1,
            ballotId: 1,
            vote: true,
          }),
          blockNumber: 4,
          eventIndex: 2,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'AgreementBallotResult',
          eventData: JSON.stringify({
            agreementId: 1,
            ballotId: 1,
            result: true,
            minTurnOut: true,
          }),
          blockNumber: 4,
          eventIndex: 3,
        },
      },
    },
    // *------*------*-------*
    // // *------*---This flow is for the new Agreement, expecting Acceptance---*-------*
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'AgreementCreated',
          eventData: JSON.stringify({
            requester: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
            title: 'Agreement title',
            recordId: 1,
            agreementId: 2,
            ballotId: 2,
            tokenId: 2,
            contractLink: 'asdasd',
            contractHash: 'asdas',
            creationDate: new Date().getTime(),
            isPresent: true,
            depositAmount: 10000000,
            votingEndBlock: 666,
          }),
          blockNumber: 5,
          eventIndex: 1,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'AgreementVoting',
          eventData: JSON.stringify({
            voter: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
            agreementId: 2,
            ballotId: 2,
            vote: false,
          }),
          blockNumber: 5,
          eventIndex: 2,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'AgreementBallotResult',
          eventData: JSON.stringify({
            agreementId: 2,
            ballotId: 2,
            result: true,
            minTurnOut: true,
          }),
          blockNumber: 5,
          eventIndex: 3,
        },
      },
    },
    // *------*------*-------*
  ],
};

export default eventData;