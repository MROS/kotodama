pragma solidity ^0.4.24;

contract test {
 
 function max(uint a, uint b) private pure returns (uint) {
        return a > b ? a : b;
    } 

  
 function mating(uint16[] a, uint16[] b) returns (uint16[]){
     
     uint random =uint256(keccak256(block.timestamp));
     uint a_length = a.length;
     uint b_length = b.length;
     uint total = a_length+b_length;
     uint c_length = max(a_length, b_length)+1;
     uint16[] memory c = new uint16[](a_length+b_length);
     for (uint i = 0; i< a_length; i++){
       
       c[i]=a[i];
     
     }
     
     for ( i = 0; i< b_length; i++){
       
       c[a_length+i]=b[i];
     
     }
     uint index;
     for ( i = 0; i< total-c_length; i++){
       
       index=random%(total-i);
       
       random/=total;
       for (uint l = index; l<c.length-i-1;l++){
            c[l] = c[l+1];
        }
       delete c[c.length-i-1];
       
      }
      
      index = random%c_length;
      random/=c_length;
      
      for (uint m = 0; m<index;m++){
      
       uint s= random%c_length;
       if (s==(c_length-1))
         s-=1;
       uint16 tmp=c[s];
       c[s] = c[s+1];
       c[s+1] = tmp;
      
      }
      uint16[] memory d = new uint16[](c_length);
      
      for (m = 0; m<c_length;m++)
           d[m]=c[m];
      return d;
      
       }
  }
