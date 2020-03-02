## uni-app离线打包

> HTML5+ sdk sdk version 2.6.1

### 必要工具：

- Android Studio

- HBuilderX

- 微信开发者工具（当前版本HBuilderX对微信开发者工具有依赖，且无法关闭）

- 指定版本的`HTML5+ sdk`（与编译器版本保持一致），查看[下载地址](https://ask.dcloud.net.cn/article/103)

- 生成签名证书，查看[如何生成](https://ask.dcloud.net.cn/article/35777)

### 打包步骤：

- 启动HBuilderX，打开项目，点击`发行`->`原生App-本地打包`->`生成本地打包App资源`，等待生成资源成功，如`dist\resources\__UNI__0000001\www`

- 配置根目录下的`uniconfig.txt`，如果没有需手动创建
  ```
  srcDir=D:/Practices/uni-app-set/uni-app-zhihu
  sdkDir=D:/Tools/Android-SDK@2.6.1.74103_20200226
  ```

- 双击`uniapp.bat`，或者在当前目录打开命令行工具执行`node index.js`

- 启动Android Studio，打开生成的资源项目

- 运行`Build`->`Generate Signed Bundle / APK`->`选择APK`->`选择证书文件、别名、密码`->`选择位置、点击release、勾选签名版本V1、V2`->`Finish`