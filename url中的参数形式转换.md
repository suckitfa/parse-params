# QS库中的核心函数实现

前言:

>  这几天学习AIXOS类库的源码自己尝试的模仿这个库来写一个，虽然bug满屏飞，里面有使用工具的函数想在这里分享一下，其中用的较多的就是参数转换的函数



### 1. 将服务器返回的头部信息从字符串解析成对象形式

1. 将将getAllResponseHeaders()中返回的服务器头部信息结果解析成JavaScript对象形式

   > 关键点： 每一条数据由换行符隔开，然后数据成键值对形式。

   ```js
   const getHeaders = (plainTextHeaders)=>{
   	const result = {};
     const headersArray = plainTextHeaders.split(/\n/);
     headersArray.forEach((item,index)=>{
       	// 每个键值对是由 冒号 隔开
       	const [key,value] = item.split(':');
       	// 使用trim将前后的空格去除
       	result[key.trim()] = value.trim();
     });
     return result;
   }
   ```





### 2. url地址的构成

> url地址： http://test.com:80/api?name=bob&age=18#eedde
>
> 1. 协议： http
> 2. 域名:  test.com
> 3. 端口： 80 （默认端口： http->80 https->443)
> 4. 路径:  /api
> 5. 参数： name=bob&age=18
> 6. 哈希值: #eedde (作用：浏览器解读为位置标识符，可以用来在页面上定位)



### 3. URL的参数形式转换

1. 将对象形式的参数换成参数传参的形式

   >params:{
   >
   >​	name:"Bob",
   >
   >​	age:18
   >
   >}
   >
   >转为: http://test.com?name=bob&age=18

   ```js
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
        return `${url}${}`
    }

}
   ```

2. 从url问号传参的形式解析出javascript对象

   用到的工具函数: 从url中提取参数部分 (下面两个方案中使用其来进行二次封装)

   > 如果存在参数部分，返回示例： name=bob&age=19 (x-www-form-endcoded)
   >
   > 如果没有，返回空字符串

   ```js
   // 我们需要干的事情就是从url中分出参数部分即可   
   const getParamFromUrl = (url) => {
     let result = '';
     // 使用标志符号 ？ # 来定位
     const startIndex = url.indexOf('?');
     const endIndex = url.indexOf('#')
     if (startIndex === -1) return '';
     // 这里加1是将?干掉
     if (endIndex === -1) return url.substring(startIndex+1);
     else return url.substring(startIndex + 1,endIndex)
   }
   ```

   

   方案一：自己来封装核心就是字符串处理

   ```js
   const parseToObject = (url)=> {
     const result = {};
     if (!url) return result;
   }
   
   
   const mystringfy = (url) => {
     
   }
   ```

   方案二：使用QS库
   > 这个库专门用来进行url的参数处理的
   > 将url的参数转化为object对象
   > 例如：
   >
   > 1. a=5&b=6 => { a:5,b:6 }
   > 	将对象转为url参数格式
   > 2. {a:5,b:6} => a=5&b=6

   ```js
// 这里需要依赖 qs库
const qs = require('qs');
// 这里借用其qs中的parse函数封装
const myparse = (url) => qs.parse(getParamFromurl(url));
const mystringfy (url) => qs.stringfy(getParamsFromUrl(url));
   ```

   