pragma solidity ^0.6.7;

import {GelatoConditionsStandard} from "./GelatoConditionsStandard.sol";

/**
 * @dev Taken from https://docs.gelato.network/creating-an-automated-dapp
 * @notice Condition to announce Daily Leaderboard Winners.
 */
contract ConditionTime is GelatoConditionsStandard {

    function ok(uint256, bytes calldata _conditionData, uint256)
        public
        view
        virtual
        override
        returns(string memory)
    {
        uint256 timestamp = abi.decode(_conditionData, (uint256));
        return timeCheck(timestamp);
    }

    // Specific implementation
    function timeCheck(uint256 _timestamp) public view virtual returns(string memory) {
        if (_timestamp <= block.timestamp) return OK;
        return "NotOkTimestampDidNotPass";
    }
}