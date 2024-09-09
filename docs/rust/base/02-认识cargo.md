## Cargo 是什么?

cargo 是 rust 的包管理器, 如 npm 与 node, pip 与 python 的关系

## 创建项目

```sh
# 创建新项目
cargo new rust-demo

# 目录已经存在, 创建 cargo 项目
cargo init
```

## 使用 cargo 运行

+ 编译并运行 src/main.rs

```sh
cargo run # cargo r
```

+ 仅编译

```sh
cargo build # cargo b
```

+ 运行单元测试

```sh
cargo test # cargo t
```


## 使用 cargo 管理依赖

在 rust 中, 第三方的依赖包叫做 `crate` 所谓的 crate 就是 rust 写的包


+ 搜索 , [也可以使用浏览器打开网站搜索](https://crates.io/)

```sh
cargo search rand
```

+ 安装

```sh
cargo add rand
```

+ 移除

```sh
cargo rm rand # cargo remove rand
```

## 采用发布配置自定义构建

## 将 crate 发布到 Crates.io

## Cargo 工作空间

## 使用 cargo install 从 Crates.io 安装二进制文件

## Cargo 自定义扩展命令
