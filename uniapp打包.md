uni-app离线打包

必要工具：
Android Studio
HBuilderX
微信开发者工具（HBuilderX2.6.1对微信开发者工具有依赖，且无法关闭）
指定版本（2.6.1）的`HTML5+sdk`[下载地址](https://ask.dcloud.net.cn/article/103)
生成签名证书[如何生成](https://ask.dcloud.net.cn/article/35777)

启动HBuilderX，打开项目，点击`发行`->`原生App-本地打包`->`生成本地打包App资源`，等待生成资源成功，如`dist\resources\__UNI__79204BE\www`

启动Android Studio，打开项目（sdk里面的HBuilder-Hello）
删除`HBuilder-Hello\app\src\main\assets\apps`中的`HelloH5`文件夹
拷贝资源`dist\resources`中的`__UNI__79204BE`文件夹到`HBuilder-Hello\app\src\main\assets\apps`
打开`HBuilder-Hello\app\src\main\assets\apps\__UNI__79204BE\www`中`manifest.json`文件，拷贝id字段，一般为`__UNI__79204BE`
打开`HBuilder-Hello\app\src\main\assets\data`中`dcloud_control.xml`文件，修改appid为`__UNI__79204BE`
打开`HBuilder-Hello\app\src\main`中`AndroidManifest.xml`,全局替换`HelloH5`为`UNI79204BE`
打开`HBuilder-Hello\app`中`build.gradle`文件，修改applicationId为`io.dcloud.UNI79204BE`
打开`HBuilder-Hello\app\src\main\java\io\dcloud`，重命名文件夹`HelloH5`为`UNI79204BE`
修改`HBuilder-Hello\app\src\main\java\io\dcloud\UNI79204BE\wxapi`一下java文件中`HelloH5`为`UNI79204BE`
打开`HBuilder-Hello\app\src\main\res\drawable-xxhdpi`文件夹，替换App图标、消息图标、启动图
打开`HBuilder-Hello\app\src\main\res\values`中`strings.xml`，修改App名称

运行`Build`->`Generate Signed Bundle / APK`->`选择APK`->`选择证书文件、别名、密码`->`选择位置、点击release、勾选签名版本V1、V2`