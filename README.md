# serice work缓存测试


## 浏览器设置

- chrome浏览器输入：`chrome://flags/#unsafely-treat-insecure-origin-as-secure`

- 下面的输入框配置填入：`http://localhost:3000`

- 点Enabled

- 点底部的Relaunch

![image](https://user-images.githubusercontent.com/23225539/199379228-53504282-f173-41c6-a593-699db10d77b1.png)

## 本地运行命令

```
pnpm install
pnpm run start
```

访问 http://localhost:3000/index.html

查看node控制台，查看`a.css`和`bg_video.mp4`是否触发缓存
