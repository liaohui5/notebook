## 介绍


JSON(JavaScript Object Notation)是一种轻量级的数据交换格式, 易于人阅读和编写, 同时也易于机器解析和生成

JSON 是基于 JavaScript 的一个子集, 但它的使用范围远不止 JavaScript, 许多编程语言都支持 JSON 格式

## 将 JS 对象序列化为 json 字符串

```js
const obj = {
  id: "1001",
  name: "tom"
};
const str = JSON.stringify(obj); // {"id":"1001","name":"tom"}
console.log(str);
```

## 将 json 字符串解析为 JS 对象

```js
const str = `{"name": "jerry", "id": "1002"}`
const obj = JSON.parse(str); // Object { name: "jerry", id: "1002" }
console.log(obj);
```
