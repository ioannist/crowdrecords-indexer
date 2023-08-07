export const TOKEN_TYPE = {
  COMMUNITY: 0,
  GOVERNANCE: 1,
};

export const TABLES = {
  RECORDS_TABLES: 'RecordsTable',
  TOKEN_DATA_TABLE: 'TokenDataTable',
  GLOBAL_COUNTER_TABLE: 'GlobalCounterTable',
  TRACKS_TABLE: 'TracksTable',
  CONTRIBUTION_TABLE: 'ContributionsTable',
  CONTRIBUTION_VOTING_TABLE: 'ContributionsVotingTable',
  CONTRIBUTION_BALLOT_TABLE: 'ContributionBallotTable',
  CONTRIBUTION_COUNTER_OFFERS: 'ContributionCounterOffers',
  AGREEMENTS_TABLE: 'AgreementsTable',
  AGREEMENTS_BALLOT_TABLE: 'AgreementsBallotTable',
  AGREEMENTS_VOTE_TABLE: 'AgreementsVotesTable',

  RECORD_ROYALTY_INFO: 'RecordRoyaltyInfo',
  USER_ROYALTY_INFO: 'UserRoyaltyInfo',
};

export const CONTRIBUTION_STATUS_MAP: { [key: number]: string } = {
  1: 'PENDING',
  2: 'ACCEPTED',
  3: 'REJECTED',
};

export const VOTING_STATUS_MAP: { [key: number]: string } = {
  1: 'PENDING',
  2: 'ACCEPTED',
  3: 'REJECTED',
};
