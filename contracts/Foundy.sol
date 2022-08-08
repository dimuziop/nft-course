// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Foundy is ERC721Enumerable {
  using SafeMath for uint256;
  using Strings for uint256;

  address private _owner;
  uint256 private TOKEN_TOTAL_AMOUNT = 50;
  string private baseURI;

  constructor() ERC721("Foundy", "FND") {
    _owner = msg.sender;
    setBaseURI("ipfs://QmcXoQRmgfub7bBkc3Xkx7aoKeDkXopkxbDfaG9TYA5JR7/");
  }

  function setBaseURI(string memory _baseUri) public onlyOwner {
        baseURI = _baseUri;
  }

  function mint(uint256 quantity) public onlyOwner {
      _checkLimitOrFail();
      while (quantity > 0) {
            _checkLimitOrFail();
            _mint();
            quantity --;
      }
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

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        return bytes(_baseURI()).length > 0 ? string(abi.encodePacked(_baseURI(), tokenId.toString(), ".json")) : "";
    }

  function owner() public view returns(address) {
    return _owner;
  }

  modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
  }

  modifier tokenLimit() {
      _checkLimitOrFail();
      _;
  }

  function _checkLimitOrFail() internal view {
      require(totalSupply() < TOKEN_TOTAL_AMOUNT, "Error token limit has been reached");
  }

  function _baseURI() internal view override returns (string memory) {
        return baseURI;
  }
}
