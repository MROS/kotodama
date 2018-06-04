# 言靈


（草稿，待改）
人們將會在我們的 DAPP 中收集、交易「言靈」,言靈的原為日文,代表任何言語之中含有的力量。是的,我們不再如同加密國家系列只能買賣開發者設定好的固定東西(其實它們在以太坊上不過也就是一段詞語),而能夠交易「任意的詞語」。

詞語的數量是無限的,因此勢必有一套機制能夠由舊有的詞語之中產生新詞語,我們將由教育部所公布的常用4800漢字,以一個字形成的詞為基礎,使詞進行交配,產下新的詞。例如若我們使「區」、「塊」兩字交配,就有機會獲得「區塊」此一新詞,但並不是絕對的,我們會引入一些突變法則,使得人們無法輕而易舉的創造出它們想要的長句,也將導致有意義的長句很稀有,增加它們的市場價值。

這個遊戲的樂趣在於投資,究竟哪些詞語會有人想要高價購買?又有哪些詞語能
作為「種馬」,能夠生成出許多有意義的詞語?這都是複雜但思考起來又充滿樂
趣的問題。

## 建置

### 工具安裝
諸多以太坊工具以及前端工具都嚴重依賴於 Node.js （本專案以 9.11.1 以上版本開發），詳細安裝步驟請見 [Node.js 官網](https://nodejs.org/en/download/package-manager/)。

成功安裝 Node.js 之後，以 Node.js 的套件管理器安裝智能合約的建置工具 [truffle](http://truffleframework.com/)。

``` sh
npm install -g truffle # 若有權限問題，請使用 sudo
```

安裝測試用的以太坊環境 [ganache-cli](https://github.com/trufflesuite/ganache-cli)

``` sh
npm install -g ganache-cli # 若有權限問題，請使用 sudo
```

### 開始佈署

``` sh
git clone https://github.com/MROS/kotodama # clone 本 repo
cd kotodama
cd dapp
truffle compile # 編譯智能合約
ganache-cli     # 開啓本地端節點
truffle migrate # 佈署合約到本地端節點
npm install     # 安裝前端所需工具
npm run serve   # 編譯前端程式碼，並開啓一個本地端網頁伺服器
```

## 目錄結構

```
.
├── app            # 前端
├── contracts      # 智能合約
├── migrations     # 佈署腳本
├── test           # 測試
└── truffle.js     # truffle 設定檔

```
