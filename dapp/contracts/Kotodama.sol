pragma solidity ^0.4.16;

contract Kotodama {
    
    event Transfer(address from, address to, uint256 tokenId);
    
    struct Kotodama {
        string content;
    }
    
    Kotodama[] kotos;
    
    mapping (uint256 => address) public KotoIDToOwner;
    mapping (uint256 => uint256) public KotoIDToPrice;
    
    // create Kotodama
    function _createKoto(string _content, address _owner) returns (uint256) {
        Kotodama memory newKoto = Kotodama({content: _content});
        uint256 newKotoID = kotos.push(newKoto) - 1;
        
        KotoIDToPrice[newKotoID] = 0;
        
        // TODO: KotoID overflow check
        
        // This will assign ownership, and also emit the Transfer event as
        // per ERC721 draft
        _transfer(0, _owner, newKotoID);
        
        return newKotoID;
    }
    
    // set Kotodama price
    function set_price(uint256 kotoID, uint256 price) returns(bool) {
        // TODO: price value check;
        KotoIDToPrice[kotoID] = price;
        
        return true;
    }
    
    // get Kotodama price by kotoID
    function get_price(uint256 kotoID) returns (uint256) {
        uint256 price = KotoIDToPrice[kotoID];
        return price;
    }
    
    // get kotodama content by kotoID
    function get_koto(uint256 kotoID) returns (string) {
        return kotos[kotoID].content;
    }
    
    // transfer kotodama from _from to _to by kotoID
    function _transfer(address _from, address _to, uint256 kotoID) internal {
        KotoIDToOwner[kotoID] = _to;
        
        // Emit the transfer event.
        Transfer(_from, _to, kotoID);
    }
    
}
