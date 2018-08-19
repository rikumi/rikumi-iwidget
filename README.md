# rikumi-iwidget

基于 Vue.js + XenInfo，带动效的 iOS 桌面时间 + 歌词显示插件，需要越狱环境并安装 XenHTML 和 XenInfo。

Based on Vue.js & XenInfo, an iOS widget including date/time and music player, with transitions **everywhere**. You need to have both XenHTML and XenInfo installed on a jailbroken iPhone.

![](https://ws4.sinaimg.cn/large/006tNbRwgy1fueu0xubp3j31kw0pb4i0.jpg)

## 安装 Installation

从 [Release](https://github.com/rikumi/rikumi-iwidget/releases/latest) 下载最新的 zip 包，将其中 `rikumi-iwidget` 目录解压到 iOS 的 `/User/Library/iWidgets/` 下，并使用 XenHTML 加载。

Download latest .zip package from [release](https://github.com/rikumi/rikumi-iwidget/releases/latest), extract `rikumi-iwidget` into `/User/Library/iWidgets/` on iPhone, and load it with XenHTML.

## 功能 Features

- 专辑封面旋转动画 Album cover rotation animation
- 播放暂停按钮（仅正在播放或可以播放时显示） Buttons for play/pause and next track (they are visible only when music is playing or ready to play)
- 音乐信息显示（开启选项后可以支持网易云歌词显示） Music info display (artist - title, or lyrics for Netease CloudMusic, if enabled in widget options)
- 日期/时间滑动淡入淡出动画 Slide and fade when time or date changes
- 切歌淡入淡出动画 Fade in/out animations when track changes
- 音乐信息（歌词）滑动淡入淡出动画 Slide and fade animations when music info (lyrics) changes
- 播放/暂停时专辑封面滑动淡入淡出动画 Slide and fade when play state changes
- 小工具选项支持 Widget options support:
  - 支持修改日期时间格式 Support changing date/time formats
  - 支持开启网易云模式，将专辑解释为歌词（默认关闭） Support explaining album name as lyrics (for CN users with Netease CloudMusic)
    
## 已知问题 Known bugs

音乐信息中带有半角单引号 (') 时，无法正常显示，只能显示封面，这是 XenInfo 的 Bug（参见 https://github.com/JunesiPhone/XenInfo/issues/3 ），目前可以从 [这里](https://github.com/rikumi/XenInfo/releases/latest) 下载我自己的编译版本 XenInfo.dylib 来解决。

Music info cannot be displayed when containing single quotation marks ('). This is a bug with XenInfo (see https://github.com/JunesiPhone/XenInfo/issues/3 ). Temporarily you can download my UNOFFICIAL build of XenInfo.dylib from [here](https://github.com/rikumi/XenInfo/releases/latest).
