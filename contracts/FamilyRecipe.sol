// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FamilyRecipe is ERC721{
  using Counters for Counters.Counter;
  Counters.Counter private _counter;
  mapping(string => uint8) public hashes;
  
  constructor() ERC721('FamilyRecipe', 'REC') {
  }
  
  function mintREC(address recipient, string memory hash) public returns(uint256) {
    require (
      hashes[hash] != 1,
      "Hash has already been used!"
    );

    hashes[hash] = 1;
    _counter.increment();
    uint256 newRECId = _counter.current();
    _mint(recipient, newRECId);
    tokenURI(newRECId);
    return newRECId;
  }
}