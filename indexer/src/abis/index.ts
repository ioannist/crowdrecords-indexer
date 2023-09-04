import GLMR_ABI from './erc20.json';
import CONTRIBUTION_ABI from './ContributionContract.json';
import RECORDS_VOTING_ABI from './RecordsVotingContract.json';
import RECORDS_ABI from './RecordsContract.json';
import TRACKS_ABI from './TracksContract.json';
import CRD_TOKEN_ABI from './CrdTokenContract.json';
import TREASURY_ABI from './TreasuryContract.json';
import TREASURY_CORE_ABI from './TreasuryCoreContract.json';
import CONTRIBUTION_VOTING_ABI from './ContributionVotingContract.json';
import ORDERS_ABI from './OrdersContract.json';
import AGREEMENT_ABI from './AgreementContract.json';
import DILUTION_ABI from './DilutionContract.json';
import VOTING_HUB_ABI from './VotingHubContract.json';
import CROWDRECORDS_GOVERNANCE_ABI from './CrowdrecordsGovernor.json';
import CONTROLLER_ABI from './ControllerContract.json';
import constants from '../utils/constants';

const ABI = {
  GLMR_ABI,
  MAPPING: {
    '0xc3da629c518404860c8893a66ce3bb2e16bea6ec': GLMR_ABI,
    [constants.CONTRACT_ADDRESS]: GLMR_ABI,
    [constants.CONTRIBUTION_ADDRESS]: CONTRIBUTION_ABI,
    [constants.RECORD_VOTING_ADDRESS]: RECORDS_VOTING_ABI,
    [constants.RECORDS_ADDRESS]: RECORDS_ABI,
    [constants.TRACKS_ADDRESS]: TRACKS_ABI,
    [constants.CRD_TOKEN_ADDRESS]: CRD_TOKEN_ABI,
    [constants.TREASURY_ADDRESS]: TREASURY_ABI,
    [constants.TREASURY_CORE_ADDRESS]: TREASURY_CORE_ABI,
    [constants.CONTRIBUTION_VOTING_ADDRESS]: CONTRIBUTION_VOTING_ABI,
    [constants.ORDERS_ADDRESS]: ORDERS_ABI,
    [constants.AGREEMENT_ADDRESS]: AGREEMENT_ABI,
    [constants.DILUTION_ADDRESS]: DILUTION_ABI,
    [constants.VOTING_HUB_ADDRESS]: VOTING_HUB_ABI,
    [constants.CROWDRECORDS_ADDRESS]: CROWDRECORDS_GOVERNANCE_ABI,
    [constants.CONTROLLER_ADDRESS]: CONTROLLER_ABI,
  },
};

export default ABI;
