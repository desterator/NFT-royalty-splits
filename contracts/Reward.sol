// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./IwETH.sol";

contract Reward is Ownable {
  IwETH constant public wETH = IwETH(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);
  address public dev;

  constructor(address _dev) {
    dev = _dev;
  }

  receive() external payable { 
    wETH.deposit{value: msg.value}();
  }

  // 50% goes to the dev, 50% goes to the winner
  function distribute(address _winner) external onlyOwner {
    IwETH _wETH = wETH;
    uint256 _amount = _wETH.balanceOf(address(this)) / 2;
    if (_amount == 0) {
      return;
    } 

    _wETH.transfer(dev, _amount);
    _wETH.transfer(_winner, _amount);
  }
}
