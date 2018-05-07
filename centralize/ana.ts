import fs = require("fs");

function zhSet(str) {
    let set = new Set();

    for (let i = 0; i < str.length; i++) {
        set.add(str[i]);
    }

    return set;

}

if (process.argv.length == 3) {
    const str = fs.readFileSync(process.argv[2], "utf-8");
    const set = zhSet(str);

    console.log(`總字數：${str.length}`);
    console.log(`不重複用字數：${set.size}`);
}  else if (process.argv.length == 4) {
    const name1 = process.argv[2];
    const name2 = process.argv[3];
    const str1 = fs.readFileSync(name1, "utf-8");
    const str2 = fs.readFileSync(name2, "utf-8");

    const set1 = zhSet(str1);
    const set2 = zhSet(str2);

    console.log(set1);

    const diff1 = Array.from(new Set(Array.from(set1).filter(x => !set2.has(x))));
    const diff2 = Array.from(new Set(Array.from(set2).filter(x => !set1.has(x))));

    console.log(`「${name1}」有但「${name2}」沒有：${diff1}`);
    console.log(`「${name2}」有但「${name1}」沒有：${diff2}`);

} else {
    console.log("用法1： node ana.js [文件路徑]")
    console.log("用法2： node ana.js [文件路徑] [文件路徑]")
    process.exit(1);
}