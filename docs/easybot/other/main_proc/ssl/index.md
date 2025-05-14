# 为EasyBot启用SSL

:::tip 提示
EasyBot支持您绑定多个地址，您可以在地址中指定证书。

- 我们推荐您使用的证书格式是`pfx`
:::

:::warning 注意
EasyBot内部开启了强制HTTPS，如果您设置了SSL证书，以后的访问将会强制使用HTTPS。
:::


## 启用SSL

:::info 准备
1. 下载您的证书，格式为`pfx`
2. 将证书文件拷贝到`EasyBot`根目录
:::

打开`EasyBot`根目录下的`appsettings.json` 添加一个Endpoint，示例如下：

```json
  "Kestrel": {
    "Endpoints": {
      "web_app": {
        "Url": "http://127.0.0.1:5000",
        "Protocols": "Http1"
      },
      //highlight-start
      "HttpsInlineCertFile": {
        "Url": "https://0.0.0.0:5001",
        "Certificate": {
          "Path": "./chongqing.hualib.com.pfx",
          "Password": "密码"
        }
      }
      //highlight-end
    }
  }
```