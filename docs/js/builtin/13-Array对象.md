## 数组介绍

同大多数编程语言一样, 数组是多个数据的容器对象, 用于描述一系列有序数据的组合

### 创建数组

```js
// 创建数组
const items = new Array();
const books = [];

// 创建指定长度的数组
const week = new Array(5);
```

### 遍历数组

```js
// for/while遍历
const nums = [1, 3, 5, 7];
for (let i = 0; i<items.length; i++) {
  const item = items[i];
  console.log(item);
}

// for of 遍历
const strs = ['a', 'b', 'c', 'd'];
for (let item of strs) {
  console.log(item);
}
```

<!-- @include: ./array/基础学习.md -->
<!-- @include: ./array/数组方法.md -->
<!-- @include: ./array/数组去重.md -->
