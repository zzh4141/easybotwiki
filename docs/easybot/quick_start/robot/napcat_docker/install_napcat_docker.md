---
title: NapCat Docker版本
---

<div align="center">
  
![NapCatQQ](https://socialify.git.ci/NapNeko/NapCatQQ/image?font=Jost&logo=https%3A%2F%2Fnapneko.github.io%2Fassets%2Fnewlogo.png&name=1&owner=1&pattern=Diagonal+Stripes&stargazers=1&theme=Auto)
  
</div>

:::tip 环境

#### 请确保您已经安装好以下环境,本教程不演示环境安装过程

- **docker** 用于运行容器
- **docker-compose** 用于管理容器
  :::

## docker-compose 运行

```yml
# docker-compose.yml
version: "3"
services:
  napcat:
    environment:
      - NAPCAT_UID=${NAPCAT_UID}
      - NAPCAT_GID=${NAPCAT_GID}
    ports:
      - 3000:3000
      - 3001:3001
      - 6099:6099
    container_name: napcat
    network_mode: bridge
    restart: always
    image: mlikiowa/napcat-docker:latest
```

## 运行

![](./image/installed.png)

```bash
NAPCAT_UID=$(id -u) NAPCAT_GID=$(id -g) docker-compose up -d
```

## 登录

登录 WebUI 地址：`http://宿主机ip:6099/webui`

:::tip 默认密码
默认密码是 `napcat`
:::

![](../image/napcat_1.png)
![](./image/scan.png)
![](../image/napcat_2.png)

## 配置

在 NapCat 侧边栏选择网络配置,新建一个`Websocket服务器`

![](../image/napcat_setting.png)
![](../image/enable.png)

## 在主程序连接

:::info 注意
如果你的宿主机和EasyBot不在同一台机器上，请将`127.0.0.1`设置为宿主机的`IP`
:::

![](../image/edit.png)

## 启用群聊

:::info 注意
**EasyBot** 默认全群关闭，需要手动启用

![](../image/group_1.png)
![](../image/group_2.png)
:::