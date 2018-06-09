 ## 編譯
 
 g++ -std=c++11 a.cpp   
 ./a.out 詞一 詞二

 ## 算法簡介
 
 每次挑選一個字。首先用Bernoulli distribution從兩個詞中挑選一個詞，接著從選中的詞第一字個開始，一樣用Bernoulli distribution決定是否要挑選，若
 為否，則依序往下選擇
 
 
 
 ## 實驗
 
 
 由風 林 火 山 組成風林火山： 15次
 
 
