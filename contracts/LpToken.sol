// contracts/Crowns.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.6.7;

import "./openzeppelin/contracts/access/Ownable.sol";
import "./openzeppelin/contracts/token/ERC20/ERC20.sol";


/// @author Medet Ahmetson
contract LpToken is ERC20, Ownable {

    /**
     * @dev Sets the {name} and {symbol} of token.
     * Initializes {decimals} with a default value of 18.
     * Mints all tokens.
     * Transfers ownership to another account. So, the token creator will not be counted as an owner.
     */
    constructor() public ERC20("LP vSmart v3", "LPTP") {
        uint256 supply        = 1e7 * (10 ** 18);
   
        _mint(_msgSender(),       supply);

        transferOwnership(_msgSender());
    }
}
