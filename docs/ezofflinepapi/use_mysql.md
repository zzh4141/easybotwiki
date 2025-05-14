---
title: "教程: 使用MYSQL数据库"
sidebar_position: 3
---

## 先决条件

1. 有MYSQL数据库
2. 有MYSQL数据库的基本知识

## 推荐版本

- MYSQL 5.7.x
- MYSQL 8.x

## 创建数据库

使用任意工具连接数据库,并且创建一个数据库,编码为`utf8mb4` 排序规则为`utf8mb4_bin`

## 配置插件

打开插件配置文件，找到`data_provider`中的`type`,修改为`mysql`, 并且配置必要的参数

```yaml
# 数据库配置
data_provider:
  # 数据库配置
  # sqlite: 本地数据库 (默认)
  # mysql: MySQL数据库
  type: "mysql"
  mysql:
    host: "localhost"
    port: 3306
    database: "ez_offline_papi" # 假设刚刚创建的数据库
    username: "root"
    password: "root"
```

配置完成后，使用`/ezofflinepapi reload`重载插件，即可使用MYSQL数据库。