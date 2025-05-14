# 如何修改EasyBot端口?

:::tip
首先你得知道自己需要修改什么的端口，EasyBot有两个端口:

- **Bridge** 这是主程序与插件沟通的桥梁端口，默认为 `26990`
- **Web** 这是网页的端口，默认为 `5000`
:::

## 修改Bridge端口

:::info 位置
打开`EasyBot`根目录下的`appsettings.json`

```json
{
  "ServerOptions": {
    "Host": "127.0.0.1",
    //highlight-next-line
    "Port": 26990,
    "HeartbeatInterval": "0.00:01:00"
  },
}
```
:::

## 修改Web端口

:::info 位置
打开`EasyBot`根目录下的`appsettings.json`

```json
{
  "Kestrel": {
    "Endpoints": {
      "web_app": {
        //highlight-next-line
        "Url": "http://127.0.0.1:5000",
        "Protocols": "Http1"
      }
    }
  }
}
```
:::
