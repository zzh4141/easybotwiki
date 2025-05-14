---
id: install_linux
title: 在Linux上安装
---

### 第一步: 安装运行环境

:::info 注意
**EasyBot** 基于 **.NET8** **Blazor** 开发  
你需要安装 **.NET8** 的运行环境
:::

### 安装.NET8

```bash
sudo apt-get upgrade
sudo apt-get install -y dotnet-runtime-8.0
sudo apt-get install -y aspnetcore-runtime-8.0
```

### 下载最新版EasyBot 解压并且运行

```bash
mkdir easybot
# 下载
wget https://files.inectar.cn/d/ftp/easybot/1.4.0-c5859/linux-x64/easybot-1.4.0-c5859.zip -o easybot.zip
# 解压
unzip easybot.zip -d easybot
# 设置执行权限
sudo chmod +x * ./easybot/*
# 运行
cd easybot
./EasyBot
```