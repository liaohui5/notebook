## 正则表达式: regular expression

处理字符串的有逻辑的公式

## 参考

正则表达式: [https://www.w3school.com.cn/jsref/jsref_obj_regexp.asp](https://www.w3school.com.cn/jsref/jsref_obj_regexp.asp)

字符及unicode代码: [https://www.yuque.com/liaohui5/js-dom/kgk6vu?inner=a8486609](https://www.yuque.com/liaohui5/js-dom/kgk6vu?inner=a8486609)

练习网站: [https://regexlearn.com/zh-cn](https://regexlearn.com/zh-cn)

正则可视化解析工具: [https://regex101.com/](https://regex101.com/)

## 转义字符 `\` (转义符号)

> 什么是转义?

转换意义, 改变意义

> 转义的应用?

如果不使用转换字符, 这个`I'm` 中间的 `'` 会被程序识别

为这个 `str`变量的值结束 `'` 符号转义之后, 就会变成了

一个没有特殊意义的普通字符

```javascript
var msg = 'I\'m jackz';
```

JavaScript 默认不支持多行的字符串,可以使用转义的方法,将多行字符

```javascript
// 转义字符会将这个 \后面的字符转义成换行
var str = '111111 \
           222222 \
           333333';
```

## JS中的正则表达式对象

```javascript
// 1. 字面量创建
var reg1 = /match_str/i;

// 2. 使用构造行数创建
var reg2 = new RegExp("match_str", "g");
```

### 正则表达式对象的属性&修饰符

|  修饰符  |  描述  |
| :--- | :--- |
| i |  执行对大小写不敏感的匹配  |
| g |  执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）  |
|  m  |  执行多行匹配  |

|  属性  |  描述  |
| :--- | :--- |
| [global](https://www.w3school.com.cn/jsref/jsref_regexp_global.asp) |  RegExp 对象是否具有标志 g  |
| [ignoreCase](https://www.w3school.com.cn/jsref/jsref_regexp_ignorecase.asp) |  RegExp 对象是否具有标志 i  |
| [lastIndex](https://www.w3school.com.cn/jsref/jsref_lastindex_regexp.asp) |  一个整数，标示开始下一次匹配的字符位置  |
| [multiline](https://www.w3school.com.cn/jsref/jsref_multiline_regexp.asp) |  RegExp 对象是否具有标志 m  |
| [source](https://www.w3school.com.cn/jsref/jsref_source_regexp.asp) |  正则表达式的源文本  |

```javascript
var reg = /test/ig;

// 属性:
console.log(reg.global); // true
console.log(reg.ignoreCase); // true
console.log(reg.multiline); // false
console.log(reg.flags); // ig
console.log(reg.source); // 'test'
console.log(reg.lastIndex); // 0

```

### 方括号

 方括号用于查找某个范围内的字符：

|  表达式  |  描述  |
| :--- | :--- |
| \[\[abc\]\](<https://www.w3school.com.cn/jsref/jsref_regexp_charset.asp>) |  查找方括号之间的任何字符。  |
| \[\[^abc\]\](<https://www.w3school.com.cn/jsref/jsref_regexp_charset_not.asp>) |  查找任何不在方括号之间的字符。  |
|  [0-9]  |  查找任何从 0 至 9 的数字。  |
|  [a-z]  |  查找任何从小写 a 到小写 z 的字符。  |
|  [A-Z]  |  查找任何从大写 A 到大写 Z 的字符。  |
|  [A-z]  |  查找任何从大写 A 到小写 z 的字符。  |
|  [adgk]  |  查找给定集合内的任何字符。  |
|  [^adgk]  |  查找给定集合外的任何字符。  |
|  \(red\|blue\|green\)  |  查找任何指定的选项。  |

```javascript
var str = "a2Aas12Ad3dfB2B";
var reg1 = /[a-zA-Z][0-9][A-Z]/g;
var reg2 =  /[a-z][^0-9][A-Z]/g;

console.info(str.match(reg1)); // ['a2A', 'B2B']
console.info(str.match(reg2)); // ['dfB']

```

### 元字符

 元字符（Metacharacter）是拥有特殊含义的字符：

|  元字符  |  描述  |
| :--- | :--- |
| [.](https://www.w3school.com.cn/jsref/jsref_regexp_dot.asp) |  查找单个字符，除了换行和行结束符  |
| [\w](https://www.w3school.com.cn/jsref/jsref_regexp_wordchar.asp) |  查找单词字符。  |
| [\W](https://www.w3school.com.cn/jsref/jsref_regexp_wordchar_non.asp) |  查找非单词字符。  |
| [\d](https://www.w3school.com.cn/jsref/jsref_regexp_digit.asp) |  查找数字。[0-9]  |
| [\D](https://www.w3school.com.cn/jsref/jsref_regexp_digit_non.asp) |  查找非数字字符。[^0-9]  |
| [\s](https://www.w3school.com.cn/jsref/jsref_regexp_whitespace.asp) |  查找空白字符。[\r\n\f\t\v]  |
| [\S](https://www.w3school.com.cn/jsref/jsref_regexp_whitespace_non.asp) |  查找非空白字符。[^s]  |
| [\b](https://www.w3school.com.cn/jsref/jsref_regexp_begin.asp) |  匹配单词边界。  |
| [\B](https://www.w3school.com.cn/jsref/jsref_regexp_begin_not.asp) |  匹配非单词边界。  |
|  \0  |  查找 NUL 字符。  |
| [\n](https://www.w3school.com.cn/jsref/jsref_regexp_newline.asp) |  查找换行符。  |
|  \f  |  查找换页符。  |
|  \r  |  查找回车符。  |
|  \t  |  查找制表符。  |
|  \v  |  查找垂直制表符。  |
| [\xxx](https://www.w3school.com.cn/jsref/jsref_regexp_octal.asp) |  查找以八进制数 xxx 规定的字符。  |
| [\xdd](https://www.w3school.com.cn/jsref/jsref_regexp_hex.asp) |  查找以十六进制数 dd 规定的字符。  |
| [\uxxxx](https://www.w3school.com.cn/jsref/jsref_regexp_unicode_hex.asp) |  查找以十六进制数 xxxx 规定的 Unicode 字符。简体汉字： \u4e00-\u9fa5    |

### 量词

|  量词  |  描述  |
| :--- | :--- |
| [n+](https://www.w3school.com.cn/jsref/jsref_regexp_onemore.asp) |  匹配任何包含至少一个 n 的字符串。  |
| [n*](https://www.w3school.com.cn/jsref/jsref_regexp_zeromore.asp) |  匹配任何包含零个或多个 n 的字符串。  |
| [n?](https://www.w3school.com.cn/jsref/jsref_regexp_zeroone.asp) |  匹配任何包含零个或一个 n 的字符串。  |
| [n{X}](https://www.w3school.com.cn/jsref/jsref_regexp_nx.asp) |  匹配包含 X 个 n 的序列的字符串。  |
| [n{X,Y}](https://www.w3school.com.cn/jsref/jsref_regexp_nxy.asp) |  匹配包含 X 至 Y 个 n 的序列的字符串。  |
| [n{X,}](https://www.w3school.com.cn/jsref/jsref_regexp_nxcomma.asp) |  匹配包含至少 X 个 n 的序列的字符串。  |
| [n$](https://www.w3school.com.cn/jsref/jsref_regexp_ndollar.asp) |  匹配任何结尾为 n 的字符串。  |
| [^n](https://www.w3school.com.cn/jsref/jsref_regexp_ncaret.asp) |  匹配任何开头为 n 的字符串。  |
| [?=n](https://www.w3school.com.cn/jsref/jsref_regexp_nfollow.asp) |  匹配任何其后紧接指定字符串 n 的字符串。  |
| [?!n](https://www.w3school.com.cn/jsref/jsref_regexp_nfollow_not.asp) |  匹配任何其后没有紧接指定字符串 n 的字符串。  |

## 分类记忆技巧

![](https://cdn.nlark.com/yuque/0/2023/png/380797/1680524062266-f6f056b7-1b7c-4225-b417-07e07b00c570.png)

## RegExp 对象方法

|  方法  |  功能  |
| :--- | :--- |
| [compile](https://www.w3school.com.cn/jsref/jsref_regexp_compile.asp) |  编译正则表达式。  |
| [exec](https://www.w3school.com.cn/jsref/jsref_exec_regexp.asp) |  检索字符串中指定的值。返回找到的值，并确定其位置。  |
| [test](https://www.w3school.com.cn/jsref/jsref_test_regexp.asp) |  检索字符串中指定的值。返回 true 或 false。  |

## 支持正则表达式的 String 对象的方法

|  方法  |  功能  |
| :--- | :--- |
| [search](https://www.w3school.com.cn/jsref/jsref_search.asp) |  检索与正则表达式相匹配的值。  |
| [match](https://www.w3school.com.cn/jsref/jsref_match.asp) |  找到一个或多个正则表达式的匹配。  |
| [replace](https://www.w3school.com.cn/jsref/jsref_replace.asp) |  替换与正则表达式匹配的子串。  |
| [split](https://www.w3school.com.cn/jsref/jsref_split.asp) |  把字符串分割为字符串数组。  |

## 字符串匹配原则

1. 匹配从左至右, 只能从左至右, 不能回头
2. 贪婪模式: 能匹配多个就最多的去匹配

## 正向预查

a(?=b): 查找a, 并且这个a的后面一个字符 必须是 b

a(?!b):  查找a, 并且这个a的后面一个字符 必须不是 b

```javascript
var reg1 = /a(?=b)/g;
var reg2 = /a(?!b)/g;
var str = 'abacbaab';
str.match(reg1); // ["a", "a"] => [a]bacba[a]b
str.match(reg2); // ["a", "a"] => ab[a]cb[a]ab


```

## 捕获分组

```javascript
var str = "abcabcabc",
    reg1 = /(a)(b)(c)/g,
    reg2 = /(a)(?:b)(c)/g; // 匹配的结果中, 不需要这个 (b) 这个子表达式的结果就加上 ?:

console.info(reg1.exec(str)); // ['abc', 'a', 'b', 'c']
console.info(reg2.exec(str)); // ['abc', 'a', 'c'] 没有 (b) 这个子表达式的结果

```

## 贪婪模式/非贪婪模式

默认是贪婪模式

```javascript
var str = "name is {{name}}, age is {{age}}";
var reg = /{{.+}}/g;
var lazyReg = /{{.+?}}/g;
console.info(str.match(reg)); // ['{{name}}, age is {{age}}']
console.info(str.match(lazyReg)); // ['{{name}}', '{{age}}']

```

## 子表达式和反向引用

1. 子表达式有记忆功能(可用于检查字符串是否符合某种格式, 比如成语)

```javascript
var reg = /([0-9])\1\1([a-z])\2/;
// 子表达式1: [0-9] 引用子表达式: \1 \1
// 子表达式2: [a-z] 引用子表达式: \2

// 第一个是字符是 "5", 那么第二个和第三个就必须都是5, 第4个是a, 第5个字符也必须是a
reg.test('555aa'); // true
reg.test('556aa'); // false
reg.test('555ab'); // false


// 匹配 aabb 成语: 高高兴兴 断断续续 开开心心 兢兢业业
var aabbReg = /([\u4e00-\u9fa5])\1([\u4e00-\u9fa5])\2/g;

// 匹配 abab 成语: 学习学习 彼此彼此 说道说道 意思意思
var ababReg = /([\u4e00-\u9fa5])([\u4e00-\u9fa5])\1\2/g;

// 匹配 aabc 成语: 刀刀见血 喋喋不休 楚楚可怜 津津乐道
var aabcReg = /([\u4e00-\u9fa5])\1[\u4e00-\u9fa5]{2}/g;

// 匹配 abac 成语: 不三不四 不知不觉 不仁不义 不忠不孝
var abacReg = /([\u4e00-\u9fa5])[\u4e00-\u9fa5]\1[\u4e00-\u9fa5]/g;

```

## replace 方法的特性

1. replace 不会全局匹配
2. 第二个参数可以是一个字符串, 也可以是一个方法(方法的参数,匹配到的内容,子表达式匹配到的列表)
    1. replace(reg, function($, $1, $2, $3) {})
        1. $: `reg`这个正则表达式匹配到的值
        2. $1: 子表达式1匹配到的值
        3. $2: 子表达式2匹配到的值
        4. $3: 子表达式3匹配到的值

## 正则表达式的应用

### 替换模板字符串

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JavaScript</title>
  </head>
  <body>
    <div id="app"></div>

    <!-- text/tpl 保存模板字符串 -->
    <script type="text/tpl" id="tpl">
      <h2>my name is {{name}}, I'm {{age}} years old.</h2>
    </script>
    
    <script type="text/javascript">
      var tpl = document.getElementById("tpl");
      var data = {
        name: "jack",
        age: 15,
      };
      var reg = /\{\{(.*?)\}\}/g;
      var res = tpl.textContent.replace(reg, function (node, key){
        // node:{{name}}  key:name
        return data[key];
   });
      console.info(res); // <h2>my name is jack, I'm 15 years old.</h2>
    </script>
  </body>
</html>

```

### 验证邮箱格式

```javascript
// 12345@qq.com  lh500@qq.com  lh500@qq.com.cn
/^[a-z0-9_\-]+@[a-z0-9._\-]+.[a-z]+$$/i
```

### 验证手机号码

```javascript
// 18712341234
/^1{10}$/
```

### 验证身份证号码

```javascript
// 430421199912224171  43042119991222417X
/^\d{17}(\d|x|X)$/
```

### 日期

```javascript
// 1991/01/12  1991/1/1  1992.12.12  1994-01-12
/^\d{4}([\.\-\/])\d{1,2}\1\d{1,2}$/
```

### 16进制的颜色代码

```javascript
/^#([abedef0-9]{3}|[abedef0-9]{6})/i
```

### 车牌号

不包括港澳台, 因为港澳台的车牌验证规则和大陆是不一样的

```javascript
// 京ABC123
/^[京津沪渝冀晋辽吉黑苏浙皖川闽赣鲁豫鄂湘粤琼黔滇陕甘青蒙桂藏宁新]{1}[A-Z]{1}[A-Z0-9]{5}$/
```

## RegExp 工具网站

[https://regex101.com/](https://regex101.com/)

[https://ihateregex.io/?q](https://ihateregex.io/?q)

## JS 中支持正则表达式的方法

所属/方法名/作用/返回值/

| 所属 | 函数名 | 功能 | 返回值 |
| --- | --- | --- | --- |
| String.prototype | match | 根据正则匹配,并将匹配到的结果放到一个新的数组中, 如果正则中没有`g`修饰符, 则返回数组:<br/>`[0:匹配到的, index:索引值, input:原字符串, group: 分组]` | Array |
| String.prototype | matchAll | 根据正则匹配(必须有`g`修饰符), 并且换回一个迭代对象 | Array |
| String.prototype | replace | 根据正则替换字符串, 第二个参数可以是 callback, 这个callback 的参数就是匹配的到的结果 | String |
| String.prototype | search | 根据正则匹配字符串,返回找到的第一个符合规则的字符串的位置,没有找到返回 `-1` | Number |
| String.prototype | split | 根据正则匹配, 然后根据匹配到的值去切割数组 | Array |
| RegExp.prototype | test | 利用正则匹配匹配字符串, 返回字符串是否符规则 | Boolean |
| RexExp.prototype | exec | 根据正则匹配并把执行的信息返回一个带有属性的特殊数组<br/>`[0:匹配到的, index:索引值, input:原字符串, group: 分组]` | Array | null |
