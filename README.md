# rikumi-iwidget

基于 Vue.js + XenInfo，带动效的 iOS 桌面时间 + 歌词显示插件

本插件主要为自用，需要前端开发基础，不适合伸手党。

## 开发

推荐使用 yarn 安装依赖，再执行开发脚本。脚本将会监听本地 8080 端口。

```bash
yarn
npm run dev
```

## 部署

1. 先在 `~/.ssh/config` 中添加 ios 项，使得 `ssh ios` 命令可以正确执行；
2. 在手机端 `/Users/Library/iWidget` 中创建 `rikumi-iwidget` 目录，将 `Widget.plist` 复制进去；
3. 执行 `npm run build` 脚本即可完成打包、上传到 iOS、并自动 respring；
4. 在 XenHTML 中添加 `rikumi-iwidget` 即可。