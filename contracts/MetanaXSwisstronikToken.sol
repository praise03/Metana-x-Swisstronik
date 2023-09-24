//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
/**
 * @title MetanaXSwisstronic ERC20 Token
 * @author Praise
 * 
 */


contract MXSToken is ERC20, ERC20Burnable {

    constructor() ERC20("MetanaXSwisstronik", "MXS") {}


    /**
     * @param to: The address to mint MXS tokent to
     * @param amount: The number of MXS tokens to mint to address "to".
     * @dev amount should be in wei i.e. x10^18
     */
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    
}
