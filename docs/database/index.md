## 什么是 SQL?

SQL(Structured Query Language:结构化查询语言)是用于管理关系数据库管理系统(RDBMS), 如: MySQL/Postgres/SQLite/Oracle/DB2等,

它是一种数据库系统通用命令式脚本语言, 各个不同的数据库可能实现略有差异

### SQL 命令分类

- DDL: 数据库定义语言(Data Definition Language) 主要包括 `create` `drop` `alter` `truncate` `comment` `rename`
- DQL: 数据查询语言(Data Query Language) 主要是 `select`
- DML: 数据操纵语言(Data Manipulation Language) 主要包括 `insert` `update` `delete` `lock`
- DCL: 数据库控制语言(Data Control Language) 主要包括 `grant` `revoke`
- TCL: 事务处理语言(Transaction Control Language) 主要包括 `begin transaction` `commit` `rollback`

## 什么是数据库?

所谓数据库, 就是用来存储数据的软件

## 数据库数据类型?

其实是为了方便存储和编程实现定义类似编程语言数据类型的概念

## 如何使用数据库?

1. 安装数据库软件
2. 使用编程客户端操作数据
3. 使用 GUI/CLI 客户端查看/操作数据

## 实用客户端

- [usql CLI 客户端](https://github.com/xo/usql)
- [DBeaver GUI 客户端](https://dbeaver.io/)
- [Sequel-Ace GUI 客户端, 仅支持 mysql MacOS](https://github.com/Sequel-Ace/Sequel-Ace)
- [pgadmin GUI客户端, 仅支持 Postgres](https://github.com/pgadmin-org/pgadmin4)
