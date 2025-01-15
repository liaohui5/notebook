## 预处理器介绍

CSS预处理器是一种特殊的编程语言或工具,它可以增强CSS的功能,允许开发者使用类似于编程的语法编写更抽象、模块化、可维护和具有丰富逻辑的样式表。
CSS预处理器提供诸如变量、嵌套规则、混合宏（mixin）、函数运算、循环、条件语句等高级功能,这些都是原生CSS所不具备的。
使用CSS预处理器时,开发者会用预处理器特有的语法编写源文件,如Sass、Less、Stylus 或 PostCSS 等,
然后再通过相应的编译器将这些源文件转换成常规的CSS代码, 以便浏览器可以识别并应用到实际的网页上。
这样的处理方式极大地提高了CSS代码的组织效率和复用性, 降低了大型项目中的样式管理复杂度, 增强了团队协作的一致性。
同时,尽管CSS预处理器引入了额外的抽象层次和编译步骤,
但因为它们输出的是标准的CSS代码,所以无需担心浏览器兼容性问题。

## 为什么使用预处理器?

简而言之就是原生的 css 还不够强大, 比如选择器和属性值只能平铺的写, 无法做到层级分明等一些比较实用且易于维护的功能,
所以我们需要一些更强大的工具来实现这写功能, 但是注意无论是哪个预处理器的代码都无法直接呗浏览器解析运行,
最后都需要编译为 css 才可以被浏览器识别解析运行

::: code-group

```scss [scss 预处理器]
.header {
  width: 100%;
  height: 50px;
  border: 1px solid #eee;
  /* 层次分明,与html结构可以保持一致, 让代码更易于阅读 */
  .links {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    .link-item {
      padding: 0 20px;
      a {
        color: #555;
        text-decoration: none;
        a:hover {
          color: #333;
        }
      }
    }
  }
}
```

```css [css 源码]
.header {
  width: 100%;
  height: 50px;
  border: 1px solid #eee;
}

.header .links {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header .links .link-item {
  padding: 0 20px;
}

.header .links .link-item a {
  color: #555;
  text-decoration: none;
}

.header .links .link-item a:hover {
  color: #333;
}
```

:::

## 预处理器种类

- [less](https://less.bootcss.com/)
- [sass](https://sass-lang.com/) [中文文档](https://www.sass.hk/docs/)
- [stylus](https://www.stylus-lang.cn/)

## 转译工具

和预处理器不同的是, 不会扩展css的语法, 只对源码做转译的操作

- [PostCSS](https://postcss.org/)
- [PostCSS 中文](https://www.postcss.com.cn/)
