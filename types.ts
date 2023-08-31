export interface DBRecord {
  transactionId: string;
  eventName: string;
  eventData: string;
  eventIndex: number;
  blockNumber: number;
}
export interface AgreementCreated {
  requester: string;
  title: string;
  recordId: number;
  agreementId: number;
  ballotId: number;
  tokenId: number;
  contractLink: string;
  contractHash: string;
  creationDate: number;
  isPresent: boolean;
  depositAmount: string;
  votingEndBlock: number;
}
export interface RoyaltyPayment {
  agreementId: number;
  recordId: number;
  totalSupplyWei: string;
  royaltyAmountWei: string;
  royaltyId: number;
  tokenId: number;
  royaltyPerTokenWei: string;
  snapshotId: number;
}
export interface RoyaltyPaymentClaimed {
  agreementId: number;
  royaltyId: number;
  recordId: number;
  rewardAmount: string;
  userAddress: string;
}
export interface AgreementVoting {
  voter: string;
  agreementId: number;
  ballotId: number;
  vote: boolean;
}
export interface AgreementBallotResult {
  agreementId: number;
  ballotId: number;
  result: boolean;
  minTurnOut: boolean;
}
export interface ContributionCreated {
  contributionId: number;
  tracks: Array<number>;
  title: string;
  creationDate: number;
  previewFile: string;
  previewFileHash: string;
  recordId: number;
  seedContribution: boolean;
  roughMix: boolean;
  status: number;
  description: string;
  owner: string;
}
export interface SetupNewRecordCalled {
  caller: string;
  tracksId: Array<number>;
  seedId: number;
  recordId: number;
  govTokenId: number;
  commTokenId: number;
}
export interface createNewContributionCalled {
  caller: string;
  tracksId: Array<number>;
  contributionId: number;
}
export interface DilutionRequestCreated {
  requester: string;
  recordId: number;
  dilutionId: number;
  ballotId: number;
  tokenId: number;
  amount: string;
  creationDate: number;
  depositAmount: string;
  votingEndBlock: number;
}
export interface DilutionVoting {
  voter: string;
  dilutionId: number;
  ballotId: number;
  vote: boolean;
}
export interface DilutionResult {
  dilutionId: number;
  tokenId: number;
  ballotId: number;
  result: boolean;
  minTurnOut: boolean;
}
export interface BuyOrder {
  saleId: number;
  buyer: string;
  isLockedInRatio: boolean;
  creationDate: number;
  communityTokenId: number;
  communityTokenAmount: string;
  communityTokenCRD: number;
  governanceTokenId: number;
  governanceTokenAmount: string;
  governanceTokenCRD: number;
  crdBalance: string;
}
export interface SaleBought {
  purchaseId: number;
  saleId: number;
  seller: string;
  buyer: string;
  creationDate: number;
  communityTokenId: number;
  communityTokenAmount: string;
  communityTokenCRD: number;
  governanceTokenId: number;
  governanceTokenAmount: string;
  governanceTokenCRD: number;
  amountTransferred: string;
}
export interface OrderClose {
  saleId: number;
  creationDate: number;
  remainingBalance: number;
}
export interface RecordCreated {
  recordId: number;
  name: string;
  image: string;
  seedId: number;
  owner: string;
  parentId: number;
  recordCategory: string;
  creationDate: number;
}
export interface NewVersionTokenStruct {
  totalSupply: string;
  oldContributorShare: string;
  userBalance: string;
  symbol: string;
  image: string;
}
export interface RecordStruct {
  name: string;
  image: string;
  seedId: number;
  parentId: number;
  owner: string;
  recordCategory: string;
  creationDate: number;
  isPresent: boolean;
}
export interface VersionRequest {
  requestId: number;
  recordData: RecordStruct;
  governanceToken: NewVersionTokenStruct;
  communityToken: NewVersionTokenStruct;
  contributionIds: Array<number>;
  requester: string;
  oldVersionId: number;
  tokenId: number;
  ballotId: number;
}
export interface NewVersionVoting {
  voter: string;
  versionRequestId: number;
  ballotId: number;
  vote: boolean;
}
export interface NewVersionVotingBallotCreated {
  requester: string;
  versionRequestId: number;
  ballotId: number;
  creationDate: number;
  depositAmount: string;
  votingEndBlock: number;
}
export interface NewVersionTokenDistribution {
  versionRequestId: number;
  totalSupplyWei: string;
  rewardAmountWei: string;
  tokenId: number;
  rewardTokenId: number;
  rewardPerTokenWei: string;
  snapshotId: number;
}
export interface NewTokenClaimed {
  versionRequestId: number;
  rewardTokenId: number;
  rewardAmount: string;
  userAddress: string;
}
export interface TrackPayload {
  filehash: string;
  filelink: string;
  category: string;
}
export interface TracksCreated {
  trackIds: Array<number>;
  trackData: Array<TrackPayload>;
  owner: string;
}
export interface Snapshot {
  id: number;
}
export interface BallotResult {
  ballotId: number;
  result: boolean;
  minTurnOut: boolean;
}
export interface BallotCreated {
  ballotId: number;
}
export interface BallotResult {
  ballotId: number;
  result: boolean;
  minTurnOut: boolean;
}
export interface CounterOfferCreated {
  ballotId: number;
  creator: string;
}
export interface CounterOfferResult {
  ballotId: number;
  creator: string;
  result: boolean;
}
export interface TokenTransfer {
  from: string;
  to: string;
  transferDate: number;
  tokenId: number;
  amount: string;
  symbol: string;
}
export interface NewTokenCreated {
  recordId: number;
  symbol: string;
  image: string;
  creationDate: number;
  tokenAmount: string;
  tokenId: number;
  tokenType: number;
}
export interface TokenMinted {
  recordId: number;
  tokenId: number;
  creationDate: number;
  tokenAmount: string;
}
export interface ContributionRewardTransferred {
  to: string;
  recordId: number;
  contributionId: number;
  rewardGovernance: number;
  rewardCommunity: number;
}
// export interface DepositCreated {
//   owner: string;
//   ballotId: number;
//   depositAmount: number;
//   isClaimed: boolean;
//   isPresent: boolean;
// }
// export interface DepositClaimed {
//   owner: string;
//   ballotId: number;
//   depositAmount: number;
// }
export interface ContributionBallotCreated {
  requester: string;
  contributionId: number;
  recordId: number;
  communityReward: number;
  communityTokenId: number;
  governanceReward: number;
  governanceTokenId: number;
  ballotId: number;
  creationDate: number;
  depositAmount: string;
  votingEndBlock: number;
}
export interface ContributionVoting {
  voter: string;
  contributionId: number;
  ballotId: number;
  vote: boolean;
}
export interface CounterOfferForContribution {
  contributionId: number;
  voter: string;
  newGovernanceReward: number;
  newCommunityReward: number;
}
export interface CounterOfferAction {
  contributionId: number;
  voter: string;
  newGovernanceReward: number;
  newCommunityReward: number;
  status: number;
}
export interface ContributionBallotResult {
  contributionId: number;
  ballotId: number;
  result: boolean;
  minTurnOut: boolean;
}
export interface VotingContractAdded {
  votingContractAddress: string;
}

export interface NewVersionRequestResult {
  versionReqId: number;
  tokenId: number;
  ballotId: number;
  result: boolean;
  minTurnOut: boolean;
  newRecordId: number;
}
