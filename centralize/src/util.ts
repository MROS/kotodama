import * as fs from "fs";

const DICTIONARY_FILE = "./data/everything.txt";

interface CharInfo {
    char: string,      // 字形
    redical: string,   // 部首
    pronounce: string, // 注音
    stroke: number,    // 筆畫
}
interface Dictionary {
    [index: string]: CharInfo
}

function loadDictionary(): Dictionary {
    let str = fs.readFileSync(DICTIONARY_FILE, "utf-8");
    let lines = str.split("\n");
    let dict: Dictionary = {};
    for(let line of lines) {
        let elts = line.split(",");
        let info: CharInfo = {
            char: elts[0],
            redical: elts[1],
            pronounce: elts[3],
            stroke: Number(elts[2])
        };
        dict[info.char] = info;
    }
    return dict;
}

function shuffleString(s: string): string {
    let a_string = Array.from(s);
    for(let i = s.length-1; i >= 0; i--) {
        let rand_index = Math.floor(Math.random() * (i+1));
        let t = a_string[i];
        a_string[i] = a_string[rand_index];
        a_string[rand_index] = t;
    }
    return a_string.join("");
}

export {
    loadDictionary,
    shuffleString
};