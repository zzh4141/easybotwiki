# 兼容CMI

:::tip 为什么
EasyBot为了实现运行命令,在内部调用借用了`Rcon`的代码,`CMI`为了安全考虑会拦截所有`Rcon`命令执行。

![](./image/why.png)
:::

## 如何解决

:::tip 解决
在 CMI 的配置文件中找到`AllowRconCommands`与`CleanRconCommands`并设置为`true`。

![](./image/how.png)
:::