import { loadDictionary, shuffleString } from "./src/util";

type Kotodama = string;

const DICTIONARY = loadDictionary();
const TRUNCATE_RATE = 0.5;

function breed(x: Kotodama, y: Kotodama): Kotodama {
    // 打亂重排
    let new_s: Kotodama = shuffleString(x + y);
    // 決定長度
    let new_len = Math.floor(1 + new_s.length * 0.5);
    new_s = new_s.slice(0, new_len);
    // 突變

    return new_s;
}

console.log(breed("加密言", "密言零"));