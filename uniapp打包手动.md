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

- 打开`src/manifest.json`文件，拷贝appid和name字段，appid为`__UNI__0000001`

- 拷贝一份sdk中的HBuilder-Hello用作打包项目，后面用`MYPROJECT`代替（也可以直接使用HBuilder-Hello）

- 启动Android Studio，打开`MYPROJECT`项目

- 删除`MYPROJECT\app\src\main\assets\apps`中的`HelloH5`文件夹

- 拷贝资源`dist\resources`中的`__UNI__0000001`文件夹到`MYPROJECT\app\src\main\assets\apps`

- 打开`MYPROJECT\app\src\main\assets\data`中`dcloud_control.xml`文件，修改appid为`__UNI__0000001`

- 打开`MYPROJECT\app\src\main`中`AndroidManifest.xml`，全局替换`HelloH5`为`UNI0000001`

- 打开`MYPROJECT\app`中`build.gradle`文件，修改applicationId为`io.dcloud.UNI0000001`

- 打开`MYPROJECT\app\src\main\java\io\dcloud`，重命名文件夹`HelloH5`为`UNI0000001`

- 修改`MYPROJECT\app\src\main\java\io\dcloud\UNI0000001\wxapi`一下java文件中`HelloH5`为`UNI0000001`

- 打开`MYPROJECT\app\src\main\res\drawable-xxhdpi`文件夹，替换App图标、消息图标、启动图

- 打开`MYPROJECT\app\src\main\res\values`中`strings.xml`，修改App名称

- 运行`Build`->`Generate Signed Bundle / APK`->`选择APK`->`选择证书文件、别名、密码`->`选择位置、点击release、勾选签名版本V1、V2`->`Finish`