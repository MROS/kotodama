pragma solidity ^0.4.24;

contract Kotodamas {
    
    event Transfer(address from, address to, uint256 tokenId);
    
    struct Kotodama {
        string content;
        uint256 price;
        address owner;
    }
    
    Kotodama[] kotos;

    // create Kotodama
    function _createKoto(string _content, address _owner) internal returns (uint256)  {
        Kotodama memory newKoto = Kotodama({content: _content, price: 0, owner: 0});
        uint256 newKotoID = kotos.push(newKoto) - 1;
        
        // TODO: KotoID overflow check
        
        // This will assign ownership, and also emit the Transfer event as
        // per ERC721 draft
        _transfer(0, _owner, newKotoID);
        
        return newKotoID;
    }
    
    // set Kotodama price internal function
    function _set_price(uint256 kotoID, uint256 _price) internal returns(bool) {
        kotos[kotoID].price = _price;
        return true;
    }
    
    // public set price function by owner
    function SetPrice(uint256 kotoID, uint256 _price) public returns(bool) {
        // check kotomata owner
        if(msg.sender == kotos[kotoID].owner) {
            // price value check;
            if(_price < 0) return false;
            // TODO: price overflow check
            return _set_price(kotoID, _price);
        } else {
            return false;
        }
    }
    
    // get Kotodama price by kotoID
    function GetPrice(uint256 kotoID) public view returns (uint256) {
        return kotos[kotoID].price;
    }
    
    // get kotodama content by kotoID
    function GetKotoContent(uint256 kotoID) public view returns (string) {
        return kotos[kotoID].content;
    }
    
    function GetOwner(uint256 kotoID) public view returns (address) {
        return kotos[kotoID].owner;
    }
    
    // transfer kotodama from _from to _to by kotoID
    function _transfer(address _from, address _to, uint256 kotoID) internal {
        kotos[kotoID].owner = _to;
        
        // Emit the transfer event.
        emit Transfer(_from, _to, kotoID);
    }
    
}

