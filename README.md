# 刘赟楷的个人作品集

用 VS Code 打开此目录。在终端安装依赖并启动开发服务器。

```bash
npm install
npm run dev
```

运行 `npm run build` 得到可部署至静态网站托管服务的 `dist/`。

项目标题、源码链接、截图和演示视频配置在 `src/projects.js`。补充录屏时，把 MP4 放到 `public/media/`，再把对应项目的 `video: null` 改成文件名，例如 `video: 'factory-demo.mp4'`。重新构建并部署后，网页会显示播放按钮。
