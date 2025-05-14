---
title: MCDR插件配置介绍
---

配置文件目录`plugins/easybot_mcdr/config.yml`

## 默认配置

```json
{
  "token": "",
  "ws": "ws://localhost:26990/bridge",
  "debug": false,
  "message_sync": {
    "ignore_mcdr_command": true
  },
  "message": {
    "start_bind": "§f[§a!§f] 绑定开始,请加群§e12345678§f输入: §a“绑定 #code”§f 进行绑定, 请在§6#time§f完成绑定!",
    "bind_success": "§f[§a!§f] 绑定§f §a#account §f(§a#name§f) 成功!"
  },
  "enable_white_list": false,
  "events": {
    "bind_success": {
      "exec_command": false,
      "add_whitelist": true,
      "comamnds": ["say 玩家#player绑定账号#name（#account）成功"]
    },
    "un_bind": {
      "kick": true,
      "remove_white_list": true,
      "exec_command": false,
      "comamnds": ["say 玩家#player解绑了账号。"]
    },
    "message": {
      "on_at": {
        "exec_command": true,
        "comamnds": [
          "title #player title {\"text\":\"有人@你\", \"color\": \"green\"}",
          "title #player subtitle {\"text\":\"请及时处理\", \"color\": \"green\"}"
        ],
        "sound": {
          "play_sound": true,
          "run": "execute as #player at @s run playsound minecraft:entity.player.levelup player #player ~ ~ ~ 1 2",
          "count": 4,
          "interval_ms": 200
        }
      }
    }
  }
}
```

> ⚠️ 注意：     
>
> 1. 当启用白名单联动（enable_white_list=true）时，add_whitelist/remove_white_list 参数需要设为 true 才能生效        
> 2. 消息模板中的时间变量会自动转换为服务器本地时区     
> 3. 命令执行权限取决于 MCDR 的权限系统配置     


## message_sync

消息同步设置

### ignore_mcdr_command

在消息同步时候，是否忽略所有以`!!`开头的 MCDR 命令

## message

消息配置

### start_bind

绑定开始时的消息

| 变量  | 描述                                                                                                       |
| ----- | ---------------------------------------------------------------------------------------------------------- |
| #code | 验证码,在[社交平台信任模式](/docs/easybot/features/bind/#%E7%BB%91%E5%AE%9A%E8%B4%A6%E5%8F%B7)下为玩家名字 |
| #time | 绑定到期时间,格式为 `年-月-日 时:分:秒`                                                                    |

### bind_success

绑定成功的消息

| 变量     | 描述                    |
| -------- | ----------------------- |
| #account | 绑定的账号(QQ 号)       |
| #name    | 绑定的账号的昵称(QQ 名) |

## enable_white_list

强制绑定模式时或服务器启用白名单时使用,开启后可以与本地的白名单联动

## events

事件触发配置

### bind_success

绑定成功事件配置

| 参数           | 类型 | 说明                          |
| -------------- | ---- | ----------------------------- |
| exec_command   | bool | 是否执行自定义命令（默认 false）|
| add_whitelist  | bool | 是否自动添加白名单（默认 true，需要白名单联动`enable_white_list=true`） |
| commands       | List[str] | 执行命令列表，可用变量：#player(玩家 ID), #name(QQ 昵称), #account(QQ 号) |

### un_bind

解绑事件配置

| 参数              | 类型 | 说明                          |
| ----------------- | ---- | ----------------------------- |
| kick              | bool | 是否在解绑时踢出玩家（默认 true）|
| remove_white_list | bool | 是否移除白名单（默认 true，需要白名单联动`enable_white_list=true`）     |
| exec_command      | bool | 是否执行自定义命令（默认 false）|
| commands          | List[str] | 执行命令列表，可用变量：#player(玩家 ID) |

### message.on_at

群聊@玩家事件配置

| 参数         | 类型 | 说明                          |
| ------------ | ---- | ----------------------------- |
| exec_command | bool | 是否执行自定义命令（默认 true）|
| commands     | List[str] | 执行命令列表，可用变量：#player(玩家 ID) |

#### sound

音效配置

| 参数        | 类型 | 说明                          |
| ----------- | ---- | ----------------------------- |
| play_sound  | bool | 是否播放音效（默认 true）     |
| run         | str  | 音效执行命令，使用 Minecraft 声音格式 |
| count       | int  | 音效播放次数（默认 4）        |
| interval_ms | int  | 播放间隔（毫秒，默认 200）    |