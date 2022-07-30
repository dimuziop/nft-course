// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MyNft is ERC721Enumerable {
  using SafeMath for uint256;

  address private _owner;
  uint256 private TOKEN_TOTAL_AMOUNT = 20;
  string private baseURI;

  constructor(string memory name, string memory symbol) ERC721(name, symbol) {
    _owner = msg.sender;
    setBaseURI("ipfs://");
  }

  function setBaseURI(string memory _baseUri) public onlyOwner {
        baseURI = _baseUri;
  }

  function mint() public payable {
        require(
            totalSupply() <= TOKEN_TOTAL_AMOUNT,
            "Error token limit has been reached"
        );
        require(msg.value >= 0.01 ether, "No enough to mint");

        _mint();
  }

  function _mint() private {
        uint256 _id = totalSupply().add(1);
        _safeMint(msg.sender, _id, msg.data);
  }

  function withdraw() public payable onlyOwner {
        (bool hs, ) = payable(owner()).call{value: address(this).balance}("");
        require(hs);
  }

  function changeOwner(address newOwner) public onlyOwner {
    require(newOwner != address(0), "MyNFT: Address cannot be 0");
    _owner = newOwner;
  }

  function owner() public view returns(address) {
    return _owner;
  }

  modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
  }

  function _baseURI() internal view override returns (string memory) {
        return baseURI;
  }
}
