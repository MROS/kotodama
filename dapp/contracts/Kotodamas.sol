pragma solidity ^0.4.24;

contract Kotodamas is ERC721 {
    
    event Transfer(address from, address to, uint256 tokenId);
    
    struct Kotodama {
        uint16[] content;
        uint256 price;
        address owner;
    }
    
    mapping (address => uint256) ownershipTokenCount;
    
    ///  Mapping keccak256 hash of content array to kotoID
    mapping (bytes32 => uint256) kotoToID;
    
    ///  Mapping from kotoID to approved address.
    ///  Each kotodama can have only one approved address, a zero value mean no approval.
    mapping (uint256 => address) public kotoIDToApproved;
    
    Kotodama[] kotos;

    ///  Kotodamas Constructor
    constructor() public {
        // TODO something
    }

    ///  Create Kotodama (internal function)
    function _createKoto(uint16[] _content, address _owner) internal returns (uint256)  {
        Kotodama memory newKoto = Kotodama({content: _content, price: 0, owner: 0});
        uint256 newKotoID = kotos.push(newKoto) - 1;
        
        // calculate the hash of content array
        bytes32 _hash = keccak256(abi.encodePacked(_content));
        kotoToID[_hash] = newKotoID;
        
        // TODO: KotoID overflow check
        
        // This will assign ownership, and also emit the Transfer event as
        // per ERC721 draft
        _transfer(0, _owner, newKotoID);
        
        return newKotoID;
    }
    
    ///  Check someone own kotodama
    function _owns(address _owner, uint256 _kotoID) internal view returns(bool) {
        return kotos[_kotoID].owner == _owner;
    }
    
    ///  Set Kotodama price internal function
    function _set_price(uint256 kotoID, uint256 _price) internal returns(bool) {
        kotos[kotoID].price = _price;
        return true;
    }
    
    ///  Transfer kotodama from _from to _to by kotoID
    function _transfer(address _from, address _to, uint256 _kotoID) internal {
        
        kotos[_kotoID].owner = _to;
        ownershipTokenCount[_to]++;
        
        // When creating new koto _from is 0, but we can't account the address.
        if (_from != address(0)) {
            ownershipTokenCount[_from]--;
        }
        
        // Emit the transfer event.
        emit Transfer(_from, _to, _kotoID);
    }
    
    ///  Marks an address as being approved for transferFrom(), overwriting any previous
    ///  approval. Setting _approved to address(0) clears all transfer approval.
    function _approve(uint256 _kotoID, address _approved) internal {
        kotoIDToApproved[_kotoID] = _approved;
    }
    
    ///  Checks if a given address currently has transfer Approval for a Kotodama.
    function _approvedFor(address _claimant, uint256 _kotoID) internal view returns (bool) {
        return kotoIDToApproved[_kotoID] == _claimant;
    }
    
    ///  Public setting price function by owner
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
    
    ///  Get Kotodama price by kotoID
    function GetPrice(uint256 kotoID) public view returns (uint256) {
        return kotos[kotoID].price;
    }
    
    ///  Get kotodama content(uint16 array) by kotoID
    function GetKotoContent(uint256 kotoID) public view returns (uint16[]) {
        return kotos[kotoID].content;
    }
    
    ///  Grant another address the right to transfer a specific Kitty via transferFrom().
    function approve(address _to, uint256 _tokenId) external {
        // Only an owner can grant transfer approval.
        require(_owns(msg.sender, _tokenId));

        // Register the approval (replacing any previous approval).
        _approve(_tokenId, _to);

        // Emit approval event.
        emit Approval(msg.sender, _to, _tokenId);
    }
    
    ///  Public transfer function
    function transfer(address _to, uint256 _kotoID) external {
        
        // Safety check to prevent against an unexpected 0x0 default.
        require(_to != address(0));
        
        // Disallow transfers to this contract to prevent accidental misuse.
        require(_to != address(this));
        
        // You can only send your own Kotodama
        require(_owns(msg.sender, _kotoID));           
        
         // Reassign ownership, clear pending approvals, emit Transfer event.
        _transfer(msg.sender, _to, _kotoID);
    }
    
    ///  Transfer a Kotodama owned by another address, for which the calling address
    ///  has previously been granted transfer approval by the owner.
    function transferFrom(address _from, address _to, uint256 _tokenId) external {
        
        // Safety check to prevent against an unexpected 0x0 default.
        require(_to != address(0));
        
        // Disallow transfers to this contract to prevent accidental misuse.
        require(_to != address(this));
        
        // Check for approval and valid ownership
        require(_approvedFor(msg.sender, _tokenId));
        require(_owns(_from, _tokenId));

        // Reassign ownership (also clears pending approvals and emits Transfer event).
        _transfer(_from, _to, _tokenId);
    }
    
    ///  Get the Owner by kotoID
    function ownerOf(uint256 _tokenId) external view returns (address){
         return kotos[_tokenId].owner;
    }
    
    ///  Return someone's token count
    function balanceOf(address _owner) external view returns (uint256 count) {
        return ownershipTokenCount[_owner];
    }
    
    ///  Return approved address
    function getApproved(uint256 _tokenId) external view returns (address) {
        return kotoIDToApproved[_tokenId];
    }
    
    /// get hash by kotoID
    function GetHash(uint256 _kotoID) public view returns(bytes32) {
        bytes32 _hash = keccak256(abi.encodePacked(kotos[_kotoID].content));
        return _hash;
    }
    
    ///  for @dev test (create koto)
    function add_test(uint16[] content, address owner) public {
        _createKoto(content, owner);
    }
    
}

