// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./ERC20.sol";
import "./ERC20Burnable.sol";

contract Lucky is ERC20, ERC20Burnable {
    uint256 public token_totalSupply = 1000; // init supply
    address public token_admin;
    uint256 private token_transaction_count = 0;
    uint256 token_transaction_volume = 0;

    struct Transactions {
        uint256 Amount;
        uint256 Volume;
    }

    Transactions private Stat = Transactions(0, 0);

    constructor(address admin, uint256 initSupply)
        ERC20("MintableBurnableLucky", "Lucky")
    {
        token_admin = admin;
        token_totalSupply = initSupply;
        _mint(token_admin, token_totalSupply * 10**uint256(18));
    }

    function _transfer(
        address from,
        address to,
        uint256 value
    ) internal override {
        super._transfer(from, to, value);
        // custom operations added to the basic send
        Stat.Amount++;
        Stat.Volume += value;
    }

    function getStat() public view returns (Transactions memory) {
        return Stat;
    }

    // mintable
    function mint(uint256 amount) public {
        require(
            msg.sender == token_admin,
            "This operation must be executed from admin account only!"
        );
        token_totalSupply = token_totalSupply + amount;
        _mint(token_admin, amount * 10**uint256(18));
    }

    // burnable
    function burn(uint256 amount) public override {
        require(
            msg.sender == token_admin,
            "This operation must be executed from admin account only!"
        );

        if (token_totalSupply > amount) {
            token_totalSupply = token_totalSupply - amount;
        } else token_totalSupply = 0;

        _burn(token_admin, amount * 10**uint256(18));
    }

    // check supply
    function getSupply() public view returns (uint256) {
        return token_totalSupply;
    }
}
