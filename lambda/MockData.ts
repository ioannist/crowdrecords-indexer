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
            depositAmount: '20000000',
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
            depositAmount: '20000000',
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
            depositAmount: '10000000',
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
    // *------*---This flow is for the new Agreement, expecting Acceptance---*-------*
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
            depositAmount: '10000000',
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
    // *------*---This flow is dependent on above flow, needs accepted agreement, expecting Royalty payment and then claiming by 2 users ---*-------*
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'RoyaltyPayment',
          eventData: JSON.stringify({
            agreementId: 1,
            recordId: 1,
            totalSupplyWei: '1000000000000000000000000', // 1000000 ETH
            royaltyAmountWei: '1000000000',
            royaltyId: 1,
            tokenId: 2,
            royaltyPerTokenWei: '1000',
            snapshotId: 1,
          }),
          blockNumber: 6,
          eventIndex: 1,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'RoyaltyPaymentClaimed',
          eventData: JSON.stringify({
            agreementId: 1,
            recordId: 1,
            royaltyId: 1,
            rewardAmount: '500000000',
            userAddress: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
          }),
          blockNumber: 6,
          eventIndex: 2,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'RoyaltyPaymentClaimed',
          eventData: JSON.stringify({
            agreementId: 1,
            recordId: 1,
            royaltyId: 1,
            rewardAmount: '500000000',
            userAddress: '0xd6F211245B2bE47EC0449aA84a22e1d54708995B',
          }),
          blockNumber: 6,
          eventIndex: 3,
        },
      },
    },

    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'RoyaltyPayment',
          eventData: JSON.stringify({
            agreementId: 1,
            recordId: 1,
            totalSupplyWei: '1000000000000000000000000', // 1000000 ETH
            royaltyAmountWei: '2000000000',
            royaltyId: 2,
            tokenId: 2,
            royaltyPerTokenWei: '2000',
            snapshotId: 1,
          }),
          blockNumber: 6,
          eventIndex: 4,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'RoyaltyPaymentClaimed',
          eventData: JSON.stringify({
            agreementId: 1,
            recordId: 1,
            royaltyId: 2,
            rewardAmount: '1000000000',
            userAddress: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
          }),
          blockNumber: 6,
          eventIndex: 5,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'RoyaltyPaymentClaimed',
          eventData: JSON.stringify({
            agreementId: 1,
            recordId: 1,
            royaltyId: 2,
            rewardAmount: '500000000',
            userAddress: '0xe1F211245B2bE47EC0449aA84a22e1d54708995B',
          }),
          blockNumber: 6,
          eventIndex: 6,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'RoyaltyPaymentClaimed',
          eventData: JSON.stringify({
            agreementId: 1,
            recordId: 1,
            royaltyId: 2,
            rewardAmount: '500000000',
            userAddress: '0xe2F211245B2bE47EC0449aA84a22e1d54708995B',
          }),
          blockNumber: 6,
          eventIndex: 7,
        },
      },
    },
    // *------*------*-------*
    // *------*---This flow is for new version creation---*-------*
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'VersionRequest',
          eventData: JSON.stringify({
            requestId: 1,
            recordData: {
              name: 'Record version 1',
              image: 'version 1 image',
              seedId: 1,
              parentId: 1,
              owner: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
              recordCategory: 'category',
              creationDate: new Date().getTime(),
              isPresent: true,
            },
            governanceToken: {
              totalSupply: '1000000000000000000000000',
              oldContributorShare: '250000000000000000000000',
              userBalance: '250000000000000000000000',
              symbol: 'New Version Gov',
              image: 'New Version Gov Image 1',
            },
            communityToken: {
              totalSupply: '1000000000000000000000000',
              oldContributorShare: '250000000000000000000000',
              userBalance: '250000000000000000000000',
              symbol: 'New Version Comm',
              image: 'New Version Comm Image 1',
            },
            contributionIds: [2, 3],
            requester: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
            oldVersionId: 1,
            tokenId: 2,
            ballotId: 1,
          }),
          blockNumber: 7,
          eventIndex: 1,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'NewVersionVotingBallotCreated',
          eventData: JSON.stringify({
            requester: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
            versionRequestId: 1,
            ballotId: 1,
            creationDate: new Date().getTime(),
            depositAmount: '10000',
            votingEndBlock: 123456,
          }),
          blockNumber: 7,
          eventIndex: 2,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'NewVersionRequestVoting',
          eventData: JSON.stringify({
            voter: '0xe1F211245B2bE47EC0449aA84a22e1d54708994A',
            versionRequestId: 1,
            ballotId: 1,
            vote: true,
          }),
          blockNumber: 7,
          eventIndex: 2,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'NewVersionRequestVoting',
          eventData: JSON.stringify({
            voter: '0xe2F211245B2bE47EC0449aA84a22e1d54708994A',
            versionRequestId: 1,
            ballotId: 1,
            vote: true,
          }),
          blockNumber: 7,
          eventIndex: 3,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'NewVersionRequestVoting',
          eventData: JSON.stringify({
            voter: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
            versionRequestId: 1,
            ballotId: 1,
            vote: true,
          }),
          blockNumber: 7,
          eventIndex: 4,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'NewVersionRequestResult',
          eventData: JSON.stringify({
            versionReqId: 1,
            tokenId: 2,
            ballotId: 1,
            result: true,
            minTurnOut: true,
            newRecordId: 3,
          }),
          blockNumber: 7,
          eventIndex: 5,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'NewVersionTokenDistribution',
          eventData: JSON.stringify({
            versionRequestId: 1,
            totalSupplyWei: '1000000000000000000000000',
            rewardAmountWei: '250000000000000000000000',
            tokenId: 2,
            rewardTokenId: 4,
            rewardPerTokenWei: '250000000000000000',
            snapshotId: 2,
          }),
          blockNumber: 7,
          eventIndex: 6,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'NewVersionTokenDistribution',
          eventData: JSON.stringify({
            versionRequestId: 1,
            totalSupplyWei: '1000000000000000000000000',
            rewardAmountWei: '250000000000000000000000',
            tokenId: 2,
            rewardTokenId: 4,
            rewardPerTokenWei: '250000000000000000',
            snapshotId: 2,
          }),
          blockNumber: 7,
          eventIndex: 7,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'NewTokenClaimed',
          eventData: JSON.stringify({
            versionRequestId: 1,
            rewardTokenId: 4,
            rewardAmount: '25000000000000000000',
            userAddress: '0xe1F211245B2bE47EC0449aA84a22e1d54708994A',
          }),
          blockNumber: 7,
          eventIndex: 8,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'NewTokenClaimed',
          eventData: JSON.stringify({
            versionRequestId: 1,
            rewardTokenId: 4,
            rewardAmount: '25000000000000000000',
            userAddress: '0xe2F211245B2bE47EC0449aA84a22e1d54708994A',
          }),
          blockNumber: 7,
          eventIndex: 9,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'NewTokenClaimed',
          eventData: JSON.stringify({
            versionRequestId: 1,
            rewardTokenId: 4,
            rewardAmount: '25000000000000000000',
            userAddress: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
          }),
          blockNumber: 7,
          eventIndex: 10,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'NewTokenClaimed',
          eventData: JSON.stringify({
            versionRequestId: 1,
            rewardTokenId: 5,
            rewardAmount: '25000000000000000000',
            userAddress: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
          }),
          blockNumber: 7,
          eventIndex: 11,
        },
      },
    },
    // *------*------*-------*
    // *------*---This flow is for testing the new Dilution request---*-------*
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'DilutionRequestCreated',
          eventData: JSON.stringify({
            requester: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
            recordId: 1,
            dilutionId: 1,
            ballotId: 1,
            tokenId: 3,
            amount: '1000000000000',
            creationDate: new Date().getTime(),
            depositAmount: '1000000000000',
            votingEndBlock: 456456,
          }),
          blockNumber: 8,
          eventIndex: 1,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'DilutionVoting',
          eventData: JSON.stringify({
            voter: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
            dilutionId: 1,
            ballotId: 1,
            vote: true,
          }),
          blockNumber: 8,
          eventIndex: 2,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'DilutionVoting',
          eventData: JSON.stringify({
            voter: '0xe1F211245B2bE47EC0449aA84a22e1d54708994A',
            dilutionId: 1,
            ballotId: 1,
            vote: true,
          }),
          blockNumber: 8,
          eventIndex: 3,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'DilutionVoting',
          eventData: JSON.stringify({
            voter: '0xe2F211245B2bE47EC0449aA84a22e1d54708994A',
            dilutionId: 1,
            ballotId: 1,
            vote: true,
          }),
          blockNumber: 8,
          eventIndex: 4,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'DilutionResult',
          eventData: JSON.stringify({
            dilutionId: 1,
            tokenId: 3,
            ballotId: 1,
            result: true,
            minTurnOut: true,
          }),
          blockNumber: 8,
          eventIndex: 5,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'TokenMinted',
          eventData: JSON.stringify({
            recordId: 1,
            tokenId: 3,
            creationDate: new Date().getTime(),
            tokenAmount: '1000000000000',
          }),
          blockNumber: 8,
          eventIndex: 6,
        },
      },
    },
    // *------*------*-------*
    // *------*---This flow is for testing order creation and order placement---*-------*
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'BuyOrder',
          eventData: JSON.stringify({
            saleId: 1,
            buyer: '0xe1F211245B2bE47EC0449aA84a22e1d54708994A',
            isLockedInRatio: false,
            creationDate: new Date().getTime(),
            communityTokenId: 2,
            communityTokenAmount: '100000000000000000000', // this is 100 tokens, 1 CRD for 1 community
            communityTokenCRD: '100000000000000000000',
            governanceTokenId: 3,
            governanceTokenAmount: '50000000000000000000', // this is 50 tokens, 2 CRD for 1 governance
            governanceTokenCRD: '100000000000000000000',
            crdBalance: '200000000000000000000',
          }),
          blockNumber: 9,
          eventIndex: 1,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'SaleBought',
          eventData: JSON.stringify({
            purchaseId: 1,
            saleId: 1,
            seller: '0xf7F211245B2bE47EC0449aA84a22e1d54708994A',
            buyer: '0xe1F211245B2bE47EC0449aA84a22e1d54708994A',
            creationDate: new Date().getTime(),
            communityTokenId: 2,
            communityTokenAmount: '10000000000000000000', // this is 10 tokens, 1 CRD for 1 community
            communityTokenCRD: '10000000000000000000',
            governanceTokenId: 3,
            governanceTokenAmount: '5000000000000000000', // this is 5 tokens, 2 CRD for 1 governance
            governanceTokenCRD: '10000000000000000000',
            amountTransferred: '20000000000000000000',
          }),
          blockNumber: 9,
          eventIndex: 2,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'OrderClose',
          eventData: JSON.stringify({
            saleId: 1,
            creationDate: new Date().getTime(),
            remainingBalance: '180000000000000000000',
          }),
          blockNumber: 9,
          eventIndex: 3,
        },
      },
    },
    // *------*------*-------*
    // *------*---This flow is for testing the transfer events---*-------*
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'Transfer', // This transfer is for CRD token
          eventData: JSON.stringify({
            from: '0x00000000',
            to: '0xe1F211245B2bE47EC0449aA84a22e1d54708994A',
            value: '100000000000000000000',
          }),
          blockNumber: 10,
          eventIndex: 1,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'TransferSingle',
          eventData: JSON.stringify({
            operator: '0x00000000',
            from: '0x00000000',
            to: '0xe1F211245B2bE47EC0449aA84a22e1d54708994A',
            id: 1, // This token id is for CRD token
            value: '100000000000000000000',
          }),
          blockNumber: 10,
          eventIndex: 2,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'TransferBatch',
          eventData: JSON.stringify({
            operator: '0x00000000',
            from: '0x00000000',
            to: '0xe1F211245B2bE47EC0449aA84a22e1d54708994A',
            ids: [1, 1], // This token id is for CRD token
            values: ['100000000000000000000', '100000000000000000000'],
          }),
          blockNumber: 10,
          eventIndex: 3,
        },
      },
    },
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: {
          transactionId: 'trx1',
          eventName: 'TransferSingle',
          eventData: JSON.stringify({
            operator: '0x00000000',
            from: '0x00000000',
            to: '0xe1F211245B2bE47EC0449aA84a22e1d54708994A',
            id: 2,
            value: '100000000000000000000',
          }),
          blockNumber: 10,
          eventIndex: 4,
        },
      },
    },
  ],
};

export default eventData;
