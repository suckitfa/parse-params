const qs = require('qs');
const testCase = [
    'http://test.com?name=bb#112',
    'http://test.com/api?name=bob&age=90',
    'http://test.com',
]

// 我们需要干的事情就是从url中分出参数部分即可   
const getParamFromUrl = (url) => {
    const startIndex = url.indexOf('?');
    const endIndex = url.indexOf('#')
    if (startIndex === -1) return '';
    if (endIndex === -1) return url.substring(startIndex + 1);
    else return url.substring(startIndex + 1, endIndex);
};


// testCase.forEach(item => {
//     console.log(getParamFromUrl(item));
// })

const parseParams = (url, params) => {
    let result = ``;
    for (let attribute in params) {
        if (!params.hasOwnProperty(attribute)) break;
        result += `&${attribute}=${params[attribute]}`;
    }
    // 干掉第一个多余的& , 方便接下的处理
    if (result.length >= 1) result = result.substring(1);
    // 如果原来有?直接使用&拼接， 否则先加一个?
    // 未考虑是否有hashcode的情况？？？
    const hashStartIndex = url.indexOf('#');

    // 没有hash值
    if (!(hashStartIndex === -1)) {
        return (url + `${url.indexOf('?') === -1 ? '?':'?'}${result}`);
    } else {
        const hashValue = url.substring(hashStartIndex); //#131r
        url = url.substring(0, hashStartIndex);
    }

}

let myurl = 'http://test.com';
let params = {
    name: "bob",
    age: 19
};
console.log(parseParams(myurl, params));