# QS库中的核心函数实现

前言:

>  这几天学习AIXOS类库的源码自己尝试的模仿这个库来写一个，虽然bug满屏飞，里面有使用工具的函数想在这里分享一下，其中用的较多的就是参数转换的函数

### url地址的构成

> url地址： http://test.com:80/api?name=bob&age=18#eedde
>
> 1. 协议： http
> 2. 域名:  test.com
> 3. 端口： 80 （默认端口： http->80 https->443)
> 4. 路径:  /api
> 5. 参数： name=bob&age=18
> 6. 哈希值: #eedde (作用：浏览器解读为位置标识符，可以用来在页面上定位)

### QS库的使用和参数处理函数

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

2. 将对象形式的参数换成参数传参的形式

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
   const parseParams = (url,params) => {
     let result = ``;
     for(let attribute in params) {
       if (!params.hasOwnProperty(key)) {
         result += `${params[attribute]}=${attribute}`;
       }
     }
     // 干掉第一个多余的& , 方便接下的处理
     if (result.length >= 1) result  = result.substring(1);
     // 如果原来有?直接使用&拼接， 否则先加一个?
     return (url+`${url.indexOf('?') === -1 ? '?':'?'}{params}`);
   }
   ```

3. 从url问号传参的形式解析出javascript对象

   方案一：自己来封装核心就是字符串处理

   ```js
   const parseToObject = (url)=> {
     const result = {};
     if (!url) return result;
    	let params = url.split('?');
   }
   ```

   方案二：使用QS库

   > 这个库专门用来进行url的参数处理的

   ```js
   
   ```

   