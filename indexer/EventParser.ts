import {
  Withdrawal,
  AgreementCreated,
  RecordCreated,
  RoyaltyPayment,
  RoyaltyPaymentClaimed,
  AgreementVoting,
  AgreementBallotResult,
  ContributionCreated,
  SetupNewRecordCalled,
  createNewContributionCalled,
  DilutionRequestCreated,
  DilutionVoting,
  DilutionResult,
  BuyOrder,
  SaleBought,
  OrderClose,
  NewVersionTokenStruct,
  RecordStruct,
  VersionRequest,
  NewVersionVoting,
  NewVersionVotingBallotCreated,
  NewVersionTokenDistribution,
  NewVersionRequestResult,
  NewTokenClaimed,
  TrackPayload,
  TracksCreated,
  Snapshot,
  BallotResult,
  BallotCreated,
  CounterOfferCreated,
  CounterOfferResult,
  TokenTransfer,
  NewTokenCreated,
  TokenMinted,
  ContributionBallotCreated,
  ContributionVoting,
  CounterOfferForContribution,
  CounterOfferAction,
  ContributionBallotResult,
  VotingContractAdded,
  Transfer,
  TransferSingle,
  TransferBatch,
} from './types';

const parseWithdrawal = (eventData: Array<string>): Withdrawal => {
  return {
    src: eventData[0],
    wad: eventData[1],
  };
};

const parseAgreementCreated = (eventData: Array<any>): AgreementCreated => {
  return {
    requester: eventData[0],
    title: eventData[1],
    recordId: Number(eventData[2].toString()),
    agreementId: Number(eventData[3].toString()),
    ballotId: Number(eventData[4].toString()),
    tokenId: Number(eventData[5].toString()),
    contractLink: eventData[6],
    contractHash: eventData[7],
    creationDate: eventData[8],
    isPresent: eventData[9],
    depositAmount: eventData[10].toString(),
    votingEndBlock: Number(eventData[11].toString()),
  };
};

const parseRoyaltyPayment = (eventData: Array<any>): RoyaltyPayment => {
  return {
    agreementId: Number(eventData[0].toString()),
    recordId: Number(eventData[1].toString()),
    totalSupplyWei: eventData[2].toString(),
    royaltyAmountWei: eventData[3].toString(),
    royaltyId: Number(eventData[4].toString()),
    tokenId: Number(eventData[5].toString()),
    royaltyPerTokenWei: eventData[6].toString(),
    snapshotId: Number(eventData[7].toString()),
  };
};

const parseRoyaltyPaymentClaimed = (
  eventData: Array<any>
): RoyaltyPaymentClaimed => {
  return {
    agreementId: Number(eventData[0].toString()),
    royaltyId: Number(eventData[1].toString()),
    recordId: Number(eventData[2].toString()),
    rewardAmount: eventData[3].toString(),
    userAddress: eventData[4],
  };
};

const parseAgreementVoting = (eventData: Array<any>): AgreementVoting => {
  return {
    voter: eventData[0],
    agreementId: Number(eventData[1].toString()),
    ballotId: Number(eventData[2].toString()),
    vote: eventData[3],
  };
};

const parseAgreementBallotResult = (
  eventData: Array<any>
): AgreementBallotResult => {
  return {
    agreementId: Number(eventData[0].toString()),
    ballotId: Number(eventData[1].toString()),
    result: eventData[2],
    minTurnOut: eventData[3],
  };
};

const parseContributionCreated = (
  eventData: Array<any>
): ContributionCreated => {
  return {
    contributionId: Number(eventData[0].toString()),
    tracks: eventData[1],
    title: eventData[2],
    creationDate: eventData[3],
    previewFile: eventData[4],
    previewFileHash: eventData[5],
    recordId: Number(eventData[6].toString()),
    seedContribution: eventData[7],
    roughMix: eventData[8],
    status: eventData[9],
    description: eventData[10],
    owner: eventData[11],
  };
};

const parseSetupNewRecordCalled = (
  eventData: Array<any>
): SetupNewRecordCalled => {
  return {
    caller: eventData[0],
    tracksId: eventData[1].map((e: any) => Number(e.toString())),
    seedId: Number(eventData[2].toString()),
    recordId: Number(eventData[3].toString()),
    govTokenId: Number(eventData[4].toString()),
    commTokenId: Number(eventData[5].toString()),
  };
};

const parseCreateNewContributionCalled = (
  eventData: Array<any>
): createNewContributionCalled => {
  return {
    caller: eventData[0],
    tracksId: eventData[1].map((e: any) => Number(e.toString())),
    contributionId: Number(eventData[2].toString()),
  };
};

const parseDilutionRequestCreated = (
  eventData: Array<any>
): DilutionRequestCreated => {
  return {
    requester: eventData[0],
    recordId: Number(eventData[1].toString()),
    dilutionId: Number(eventData[2].toString()),
    ballotId: Number(eventData[3].toString()),
    tokenId: Number(eventData[4].toString()),
    amount: eventData[5],
    creationDate: eventData[6],
    depositAmount: eventData[7],
    votingEndBlock: Number(eventData[8].toString()),
  };
};

const parseDilutionVoting = (eventData: Array<any>): DilutionVoting => {
  return {
    voter: eventData[0],
    dilutionId: Number(eventData[1].toString()),
    ballotId: Number(eventData[2].toString()),
    vote: eventData[3],
  };
};

const parseDilutionResult = (eventData: Array<any>): DilutionResult => {
  return {
    dilutionId: Number(eventData[0].toString()),
    tokenId: Number(eventData[1].toString()),
    ballotId: Number(eventData[2].toString()),
    result: eventData[3],
    minTurnOut: eventData[4],
  };
};

const parseBuyOrder = (eventData: Array<any>): BuyOrder => {
  return {
    saleId: Number(eventData[0].toString()),
    buyer: eventData[1],
    isLockedInRatio: eventData[2],
    creationDate: eventData[3],
    communityTokenId: Number(eventData[4].toString()),
    communityTokenAmount: eventData[5].toString(),
    communityTokenCRD: eventData[6].toString(),
    governanceTokenId: Number(eventData[7].toString()),
    governanceTokenAmount: eventData[8].toString(),
    governanceTokenCRD: eventData[9].toString(),
    crdBalance: eventData[10].toString(),
  };
};

const parseSaleBought = (eventData: Array<any>): SaleBought => {
  return {
    saleId: Number(eventData[0].toString()),
    seller: eventData[1],
    buyer: eventData[2],
    creationDate: eventData[3],
    communityTokenId: Number(eventData[4].toString()),
    communityTokenAmount: eventData[5].toString(),
    communityTokenCRD: eventData[6].toString(),
    governanceTokenId: Number(eventData[7].toString()),
    governanceTokenAmount: eventData[8].toString(),
    governanceTokenCRD: eventData[9].toString(),
    amountTransferred: eventData[10].toString(),
    purchaseId: Number(eventData[11].toString()),
  };
};

const parseOrderClose = (eventData: Array<any>): OrderClose => {
  return {
    saleId: Number(eventData[0].toString()),
    creationDate: eventData[1],
    remainingBalance: eventData[2].toString(),
  };
};

const parseRecordCreated = (eventData: Array<any>): RecordCreated => {
  return {
    recordId: Number(eventData[0].toString()),
    name: eventData[1],
    image: eventData[2],
    seedId: Number(eventData[3].toString()),
    owner: eventData[4],
    parentId: Number(eventData[5].toString()),
    recordCategory: eventData[6],
    creationDate: eventData[7],
  };
};

const parseNewVersionTokenStruct = (
  eventData: Array<any>
): NewVersionTokenStruct => {
  return {
    totalSupply: eventData[0].toString(),
    oldContributorShare: eventData[1].toString(),
    userBalance: eventData[2].toString(),
    symbol: eventData[3],
    image: eventData[4],
  };
};

const parseRecordStruct = (eventData: Array<any>): RecordStruct => {
  return {
    name: eventData[0],
    image: eventData[1],
    seedId: Number(eventData[2].toString()),
    parentId: Number(eventData[3].toString()),
    owner: eventData[4],
    recordCategory: eventData[5],
    creationDate: eventData[6],
    isPresent: eventData[7],
  };
};

const parseVersionRequest = (eventData: Array<any>): VersionRequest => {
  return {
    requestId: Number(eventData[0].toString()),
    recordData: parseRecordStruct(eventData[1]),
    governanceToken: parseNewVersionTokenStruct(eventData[2]),
    communityToken: parseNewVersionTokenStruct(eventData[3]),
    contributionIds: eventData[4].map((e: any) => Number(e.toString())),
    requester: eventData[5],
    oldVersionId: Number(eventData[6].toString()),
    tokenId: Number(eventData[7].toString()),
    ballotId: Number(eventData[8].toString()),
  };
};

const parseNewVersionVoting = (eventData: Array<any>): NewVersionVoting => {
  return {
    voter: eventData[0],
    versionRequestId: Number(eventData[1].toString()),
    ballotId: Number(eventData[2].toString()),
    vote: eventData[3],
  };
};

const parseNewVersionVotingBallotCreated = (
  eventData: Array<any>
): NewVersionVotingBallotCreated => {
  return {
    requester: eventData[0],
    versionRequestId: Number(eventData[1].toString()),
    ballotId: Number(eventData[2].toString()),
    creationDate: eventData[3],
    depositAmount: eventData[4].string(),
    votingEndBlock: Number(eventData[5].string()),
  };
};

const parseNewVersionTokenDistribution = (
  eventData: Array<any>
): NewVersionTokenDistribution => {
  return {
    versionRequestId: Number(eventData[0].toString()),
    totalSupplyWei: eventData[1].toString(),
    rewardAmountWei: eventData[2].toString(),
    tokenId: Number(eventData[3].toString()),
    rewardTokenId: Number(eventData[4].toString()),
    rewardPerTokenWei: eventData[5].toString(),
    snapshotId: Number(eventData[6].toString()),
  };
};

const parseNewTokenClaimed = (eventData: Array<any>): NewTokenClaimed => {
  return {
    versionRequestId: Number(eventData[0].toString()),
    rewardTokenId: Number(eventData[1].toString()),
    rewardAmount: eventData[2].toString(),
    userAddress: eventData[3],
  };
};

const parseTrackPayload = (eventData: Array<any>): TrackPayload => {
  return {
    filehash: eventData[0],
    filelink: eventData[1],
    category: eventData[2],
  };
};

const parseTracksCreated = (eventData: Array<any>): TracksCreated => {
  return {
    trackIds: eventData[0].map((e: any) => Number(e.toString())),
    trackData: eventData[1].map(parseTrackPayload),
    owner: eventData[2],
  };
};

const parseSnapshot = (eventData: Array<any>): Snapshot => {
  return {
    id: Number(eventData[0].toString()),
  };
};

const parseBallotResult = (eventData: Array<any>): BallotResult => {
  return {
    ballotId: Number(eventData[0].toString()),
    result: eventData[1],
    minTurnOut: eventData[2],
  };
};

const parseBallotCreated = (eventData: Array<any>): BallotCreated => {
  return {
    ballotId: Number(eventData[0].toString()),
  };
};

const parseCounterOfferCreated = (
  eventData: Array<any>
): CounterOfferCreated => {
  return {
    ballotId: Number(eventData[0].toString()),
    creator: eventData[1],
  };
};

const parseCounterOfferResult = (eventData: Array<any>): CounterOfferResult => {
  return {
    ballotId: Number(eventData[0].toString()),
    creator: eventData[1],
    result: eventData[2],
  };
};

const parseTokenTransfer = (eventData: Array<any>): TokenTransfer => {
  return {
    from: eventData[0],
    to: eventData[1],
    transferDate: eventData[2],
    tokenId: Number(eventData[3].toString()),
    amount: eventData[4].toString(),
    symbol: eventData[5],
  };
};

const parseNewTokenCreated = (eventData: Array<any>): NewTokenCreated => {
  return {
    recordId: Number(eventData[0].toString()),
    symbol: eventData[1],
    image: eventData[2],
    creationDate: eventData[3],
    tokenAmount: eventData[4].toString(),
    tokenId: Number(eventData[5].toString()),
    tokenType: Number(eventData[6].toString()),
  };
};

const parseTokenMinted = (eventData: Array<any>): TokenMinted => {
  return {
    recordId: Number(eventData[0].toString()),
    tokenId: Number(eventData[1].toString()),
    creationDate: eventData[2],
    tokenAmount: eventData[3].toString(),
  };
};

const parseContributionBallotCreated = (
  eventData: Array<any>
): ContributionBallotCreated => {
  return {
    requester: eventData[0],
    contributionId: Number(eventData[1].toString()),
    recordId: Number(eventData[2].toString()),
    communityReward: eventData[3].toString(),
    communityTokenId: Number(eventData[4].toString()),
    governanceReward: eventData[5].toString(),
    governanceTokenId: Number(eventData[6].toString()),
    ballotId: Number(eventData[7].toString()),
    creationDate: eventData[8],
    depositAmount: eventData[9].toString(),
    votingEndBlock: Number(eventData[10].toString()),
  };
};

const parseContributionVoting = (eventData: Array<any>): ContributionVoting => {
  return {
    voter: eventData[0],
    contributionId: Number(eventData[1].toString()),
    ballotId: Number(eventData[2].toString()),
    vote: eventData[3],
  };
};

const parseCounterOfferForContribution = (
  eventData: Array<any>
): CounterOfferForContribution => {
  return {
    contributionId: Number(eventData[0].toString()),
    voter: eventData[1],
    newGovernanceReward: eventData[2].toString(),
    newCommunityReward: eventData[3].toString(),
  };
};

const parseCounterOfferAction = (eventData: Array<any>): CounterOfferAction => {
  return {
    contributionId: Number(eventData[0].toString()),
    voter: eventData[1],
    newGovernanceReward: eventData[2].toString(),
    newCommunityReward: eventData[3].toString(),
    status: Number(eventData[4].toString()),
  };
};

const parseContributionBallotResult = (
  eventData: Array<any>
): ContributionBallotResult => {
  return {
    contributionId: Number(eventData[0].toString()),
    ballotId: Number(eventData[1].toString()),
    result: eventData[2],
    minTurnOut: eventData[3],
  };
};

const parseVotingContractAdded = (
  eventData: Array<any>
): VotingContractAdded => {
  return {
    votingContractAddress: eventData[0],
  };
};

const parseNewVersionRequestResult = (
  eventData: Array<any>
): NewVersionRequestResult => {
  return {
    versionReqId: Number(eventData[0].toString()),
    tokenId: Number(eventData[1].toString()),
    ballotId: Number(eventData[2].toString()),
    result: eventData[3],
    minTurnOut: eventData[4],
    newRecordId: Number(eventData[5].toString()),
  };
};

const parseTransferResult = (eventData: Array<any>): Transfer => {
  return {
    from: eventData[0],
    to: eventData[1],
    value: eventData[2].toString(),
  };
};

const parseTransferSingleResult = (eventData: Array<any>): TransferSingle => {
  return {
    operator: eventData[0],
    from: eventData[1],
    to: eventData[2],
    id: Number(eventData[3].toString()),
    value: eventData[4].toString(),
  };
};

const parseTransferBatchResult = (eventData: Array<any>): TransferBatch => {
  return {
    operator: eventData[0],
    from: eventData[1],
    to: eventData[2],
    ids: eventData[3].map((e: any) => Number(e.toString())),
    values: eventData[4].map((e: any) => e.toString()),
  };
};

export const convertIntoObject = (event: any): any => {
  switch (event?.name) {
    case 'Withdrawal':
      return parseWithdrawal(event.args);
    case 'AgreementCreated':
      return parseAgreementCreated(event.args);
    case 'RoyaltyPayment':
      return parseRoyaltyPayment(event.args);
    case 'RoyaltyPaymentClaimed':
      return parseRoyaltyPaymentClaimed(event.args);
    case 'AgreementVoting':
      return parseAgreementVoting(event.args);
    case 'AgreementBallotResult':
      return parseAgreementBallotResult(event.args);
    case 'ContributionCreated':
      return parseContributionCreated(event.args);
    case 'SetupNewRecordCalled':
      return parseSetupNewRecordCalled(event.args);
    case 'createNewContributionCalled':
      return parseCreateNewContributionCalled(event.args);
    case 'DilutionRequestCreated':
      return parseDilutionRequestCreated(event.args);
    case 'DilutionVoting':
      return parseDilutionVoting(event.args);
    case 'DilutionResult':
      return parseDilutionResult(event.args);
    case 'BuyOrder':
      return parseBuyOrder(event.args);
    case 'SaleBought':
      return parseSaleBought(event.args);
    case 'OrderClose':
      return parseOrderClose(event.args);
    case 'RecordCreated':
      return parseRecordCreated(event.args);
    case 'NewVersionTokenStruct':
      return parseNewVersionTokenStruct(event.args);
    case 'RecordStruct':
      return parseRecordStruct(event.args);
    case 'VersionRequest':
      return parseVersionRequest(event.args);
    case 'NewVersionVoting':
      return parseNewVersionVoting(event.args);
    case 'NewVersionVotingBallotCreated':
      return parseNewVersionVotingBallotCreated(event.args);
    case 'NewVersionTokenDistribution':
      return parseNewVersionTokenDistribution(event.args);
    case 'NewTokenClaimed':
      return parseNewTokenClaimed(event.args);
    case 'TracksCreated':
      return parseTracksCreated(event.args);
    case 'Snapshot':
      return parseSnapshot(event.args);
    case 'BallotResult':
      return parseBallotResult(event.args);
    case 'BallotCreated':
      return parseBallotCreated(event.args);
    case 'CounterOfferCreated':
      return parseCounterOfferCreated(event.args);
    case 'CounterOfferResult':
      return parseCounterOfferResult(event.args);
    case 'TokenTransfer':
      return parseTokenTransfer(event.args);
    case 'NewTokenCreated':
      return parseNewTokenCreated(event.args);
    case 'TokenMinted':
      return parseTokenMinted(event.args);
    case 'ContributionBallotCreated':
      return parseContributionBallotCreated(event.args);
    case 'ContributionVoting':
      return parseContributionVoting(event.args);
    case 'CounterOfferForContribution':
      return parseCounterOfferForContribution(event.args);
    case 'CounterOfferAction':
      return parseCounterOfferAction(event.args);
    case 'ContributionBallotResult':
      return parseContributionBallotResult(event.args);
    case 'VotingContractAdded':
      return parseVotingContractAdded(event.args);
    case 'NewVersionRequestResult':
      return parseNewVersionRequestResult(event.args);
    case 'Transfer':
      return parseTransferResult(event.args);
    case 'TransferSingle':
      return parseTransferSingleResult(event.args);
    case 'TransferBatch':
      return parseTransferBatchResult(event.args);
    default:
      throw Error('Event cannot be parsed');
      return;
  }
};
