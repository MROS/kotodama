// bernoulli_distribution
#include <iostream>
#include <random>
#include <string.h>
#include <vector>


using namespace std;

int main(int argc, char *argv[])
{
  int wordlength1 = strlen(argv[1])/3;
  int wordlength2 = strlen(argv[2])/3;
  int childlength = (wordlength1+wordlength2)/2+1;
  int index;
  char a[3*childlength];
  int total=0;
  vector<int> word1;
  vector<int> word2;
  for(int i=0; i<wordlength1; i++)
     word1.push_back(i);
  for(int i=0; i<wordlength2; i++)
     word2.push_back(i);
  
  
  std::default_random_engine generator;
  std::bernoulli_distribution distribution(0.7);
  std::bernoulli_distribution distribution2(0.6);
  generator.seed(std::random_device()());
while(total<childlength){
  if(distribution(generator) && word1.size()>0)
 {
   
    index=0;
    while(index<word1.size()){
         if(distribution2(generator))
           {

                a[total*3]=argv[1][3*word1[index]];
                a[total*3+1]=argv[1][3*word1[index]+1];
                a[total*3+2]=argv[1][3*word1[index]+2];
                total++;
                word1.erase(word1.begin()+index);
                break;      

           }
          index++;


    }

}

  else{
          index=0;
    while(index<word2.size()){

         if(distribution2(generator))
           {

                a[total*3]=argv[2][3*word2[index]];
                a[total*3+1]=argv[2][3*word2[index]+1];
                a[total*3+2]=argv[2][3*word2[index]+2];
                total++;
                word2.erase(word2.begin()+index);
                break;

           }
          index++;


    }


} }

  a[total*3]=0;

 
  cout<< a <<endl;
  return 0;
}
