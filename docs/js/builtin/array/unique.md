## 两次 for 循环去重

```javascript
function uniArray(arr) {
  var res = [];
  var isContain, item;
  for (var i = 0, len = arr.length; i < len; i++) {
    isContain = false;
    item = arr[i];
    // 每遍历一项, 就去res数组中找是否已经存在
    for (var k = 0; k < res.length; k++) {
      if (item === res[k]) {
        isContain = true;
        break;
      }
    }
    // 如果遍历结束都res不存在当前的值, 就直接放入当前的值
    !isContain && res.push(item);
  }
  return res;
}

var arr = [1, 1, 2, 6, 3, 3, 2, 2, 8, 8, 4, 5, 6, 5, 4, 5, 7, 9];
console.info(uniArray(arr).sort()); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## filter 去重

```javascript
function uniArray(arr) {
  // 每次去判断当前item第一次出现的位置是否是当前的索引, 如果是证明没有重复的, 如果不是证明当前item前面有重复的值
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

var arr = [1, 0, 1, 2, 6, 3, 3, 2, 2, 8, 8, 4, 5, 6, 5, 4, 5, 7, 9, 0];
console.info(uniArray(arr).sort()); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

```

## indexOf 去重

```javascript
// 推荐这种, 语法更明确, for 性能略微比 forEach 好
function uniArray(arr) {
  var res = [];
  var item;
  for (var i = 0, l = arr.length; i < l; i++) {
    item = arr[i];
    // 每次循环都判断: res 数组中没有就 item 就直接 res.push(item);
    res.indexOf(item) === -1 && res.push(item);
  }
  
  return res;
}

// 或者这样, 也是可以的
function uniArray(arr) {
  var res = [];
  arr.forEach(item => res.indexOf(item) === -1 && res.push(item));
  return res;
}

var arr = [1, 0, 1, 2, 6, 3, 3, 2, 2, 8, 8, 4, 5, 6, 5, 4, 5, 7, 9, 0];
console.info(uniArray(arr).sort()); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

```

## includes 去重

原理同 indexOf去重, 都是循环然后去判断当前 item 是否存在一个数组中

```javascript
function uniArray(arr) {
  var res = [];
  var item;
  for (var i = 0, l = arr.length; i < l; i++) {
    item = arr[i];
    // 每次判断结果数组中是否包含当前项
    !res.includes(item) && res.push(item);
  }
  return res;
}

var arr = [1, 0, 1, 2, 6, 3, 3, 2, 2, 8, 8, 4, 5, 6, 5, 4, 5, 7, 9, 0];
console.info(uniArray(arr).sort()); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

```

## Map 去重

原理同 indexOf, 都是去循环然后去判断当前 item 值是否存在一个另外一个数据中, 只不过这里利用了 map 对象的特性

```javascript
function uniArray(arr) {
  var res = [];
  var m = new Map();
  var item;
  for (var i = 0, len = arr.length; i < len; i++) {
    item = arr[i];
    if (!m.get(item)) {
      m.set(item, true);
      res.push(item);
    }
  }
  return res;
}

var arr = [1, 0, 1, 2, 6, 3, 3, 2, 2, 8, 8, 4, 5, 6, 5, 4, 5, 7, 9, 0];
console.info(uniArray(arr).sort()); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

```

## sort 去重1(会改变原数组元素的索引)

```javascript
function uniArray(arr) {
  arr.sort();
  var res = [];
  var item, next;
  for (let i = 0, l = arr.length; i < l; i++) {
    // 数组已经排序了, 所以相同的值肯定在一起
    item = arr[i];
    next = arr[i + 1];
    item !== next && res.push(item);
  }
}

var arr = [1, 0, 1, 2, 6, 3, 3, 2, 2, 8, 8, 4, 5, 6, 5, 4, 5, 7, 9, 0];
console.info(uniArray(arr).sort()); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

```

## sort 去重2(会改变原数组元素的索引)

```javascript
function uniArray(arr) {
  arr.sort();
  var res = [];
  var item, lastItem;
  for (let i = 0, l = arr.length; i < l; i++) {
    // 因为 arr 已经排序了, 所有相同的值都在一起
    // 每次都获取 res 中的最后一项去和 arr 遍历到的当前项比较
    // 如果你上一次 push 过了,这一次就不会 push
    item = arr[i];
    lastItem = res[res.length - 1];
    item !== lastItem && res.push(item);
  }
}

var arr = [1, 0, 1, 2, 6, 3, 3, 2, 2, 8, 8, 4, 5, 6, 5, 4, 5, 7, 9, 0];
console.info(uniArray(arr).sort()); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

```

## sort + reduce 去重(会改变原数组元素的索引)

原理同 sort去重2

```javascript
function uniArray(arr) {
  var res = [];
  arr.sort().reduce((prev, item) => {
    item !== prev[prev.length - 1] && res.push(item);
    return prev;
  }, []);
  return res;
}

var arr = [1, 0, 1, 2, 6, 3, 3, 2, 2, 8, 8, 4, 5, 6, 5, 4, 5, 7, 9, 0];
console.info(uniArray(arr).sort()); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

```

## Set 去重(常用)

利用了 set 对象无法添加重复的值的特性

```javascript
function uniArray(arr) {
  return Array.from(new Set(arr));
}

var arr = [1, 0, 1, 2, 6, 3, 3, 2, 2, 8, 8, 4, 5, 6, 5, 4, 5, 7, 9, 0];
console.info(uniArray(arr).sort()); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

```

## 利用对象做映射去重(常用)

原理和 Set 去重类似, 利用对象无法设置两个相同的 key 属性的特性

```javascript
function uniArray(arr) {
  var res = [];
  var uniValues = {};
  var item;
  for (var i = 0, len = arr.length; i < len; i++) {
    item = arr[i];
    if (!uniValues[item]) {
      uniValues[item] = true;
      res.push(res);
    }
  }
  return res;
}

var arr = [1, 0, 1, 2, 6, 3, 3, 2, 2, 8, 8, 4, 5, 6, 5, 4, 5, 7, 9, 0];
console.info(uniArray(arr).sort()); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

```

## 面试题: 将数组扁平化后去重并排序

Q: 写个方法,处理将下列多维数组:

1. 将数组扁平化
2. 数组去重
3. 将数组排序

A: 解题思路:

1. 将原数组复制一份到新的数组 `stack`
2. 循环(扁平化数组 + 去重)
    1. shift弹出数组的第一项, 会改变原数组, 去判断, 然后进行对应的操作
        1. 如果是数组就进行扁平化操作
        2. 如果不是数组就保存结果并且进去去重操作
3. 将最后获得的结果排序返回

```javascript
// 扁平化数组 + 去重 + 排序
function flatUniqueSort(arr, sortCallback) {
  if (typeof sortCallback !== "function" && sortCallback !== undefined) {
    throw new TypeError("sort callback must be a function");
  }

  var stack = [].concat(arr);
  if (stack.length <= 1) {
    return stack;
  }

  // 判断是否是一个数组
  var isArray = function (val) {
    return Object.prototype.toString.call(val) === "[object Array]";
  };

  var res = []; // 存放扁平化和去重后的结果
  var uniMap = {};

  var item;
  while (stack.length) {
    // 每次循环弹出 stack 的第一项, 并且赋值给 item
    item = stack.shift();

    if (isArray(item)) {
      // 如果item是数组: 就进行扁平化操作
      // 直接将 item 这个数组 concat 到 statck,
      // 相当于: [[1, 2], 3] => [3, 1, 2]
      // 那后面再循环的时候, 就不会在进入这个 if 判断
      // 重复执行这个操作: 直到 stack 中的元素全部被弹出, 循环结束
      stack = stack.concat(item);
    } else {
      // 如果 item 不是数组: 就进行保存数据并去重的操作
      // 就判断当前的 item 的值在 uniMap 中是否已经存在了, uniMap 是个对象
      // 对象不能添加2个同样的key, 如果能获取到值, 证明 item 已经存在了
      // 如果 item 不存在, 就将 item 放到结果数组中, 并且在 uniMap 中记录当前 item 的值
      // 下一次循环, 如果 uniMap 中有这个值就不会进入这个 if 语句, 从而达到去重的目的
      if (!uniMap[item]) {
        uniMap[item] = true;
        res.push(item);
      }
    }
  }
 
  // 最后: 排序扁平化并且去重的结果数组, 也可以把这个步骤放到这个函数之外
  typeof sortCallback === "function" ? res.sort(sortCallback) : res.sort();
  return res;
}


var arr = [
  1,
  4,
  [1, 2, 3],
  [0, 3, 4, 5, 5],
  [[4, 7], 0, 6, [5], 7, 9, [5, 8, [1, 2, [5], 5, 6], 9, 1, 5], 3, 4],
  [6, 7, 8, [1, 2, 3, 4], 4, 5, 3],
  [6, 10, [3, 4, 6], 9, 8, [4, 3, 2, 1], 6, 4, 3],
  5,
  3,
];
var res = flatUniqueSort(arr, (a, b) => a - b);
console.info(res); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
