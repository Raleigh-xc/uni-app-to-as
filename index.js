const path = require('path')
const copy = require('./copy')
const remove = require('./remove')
const replace = require('./replace')
const prop = require('./prop')

try {
  // 获取配置
  console.log('获取配置信息..........')
  const DIRCONFIG = prop.getProp('./config.txt', ['srcDir', 'sdkDir'])
  const SRCDIR = DIRCONFIG.srcDir;
  const SDKDIR = DIRCONFIG.sdkDir;
  console.log(`SRCDir = ${SRCDIR}`)
  console.log(`SDKDIR = ${SDKDIR}`)

  // 打开`src/manifest.json`文件，拷贝appid和name字段
  console.log('获取APP信息..........')
  const APPINFO = prop.getProp(path.join(SRCDIR, 'src/manifest.json'), ['name', 'appid'], ':')
  const APPID = APPINFO.appid
  const APPNAME = APPINFO.name
  console.log(`APPID = ${APPID}`)
  console.log(`APPNAME = ${APPNAME}`)

  // 拷贝一份HBuilder-Hello作为新项目
  console.log('生成新项目..........')
  remove.removeFile(path.join(SDKDIR, APPID))
  copy.copyFile(path.join(SDKDIR, 'HBuilder-Hello'), path.join(SDKDIR, APPID))
  console.log(`新项目路径为${SDKDIR}/${APPID}`)

  // 删除`HBuilder-Hello/app/src/main/assets/apps`中的`HelloH5`文件夹
  // remove.removeFile(path.join(targetDir,'HBuilder-Hello/app/src/main/assets/apps/HelloH5'))
  // 拷贝资源`dist/resources`中的`__UNI__79204BE`文件夹到`HBuilder-Hello/app/src/main/assets/apps`

  // 打开`HBuilder-Hello/app/src/main/assets/apps/__UNI__79204BE/www`中`manifest.json`文件，拷贝id字段，一般为`__UNI__79204BE`

  // 打开`HBuilder-Hello/app/src/main/assets/data`中`dcloud_control.xml`文件，修改appid为`__UNI__79204BE`

  // 打开`HBuilder-Hello/app/src/main`中`AndroidManifest.xml`,全局替换`HelloH5`为`UNI79204BE`

  // 打开`HBuilder-Hello/app`中`build.gradle`文件，修改applicationId为`io.dcloud.UNI79204BE`

  // 打开`HBuilder-Hello/app/src/main/java/io/dcloud`，重命名文件夹`HelloH5`为`UNI79204BE`

  // 修改`HBuilder-Hello/app/src/main/java/io/dcloud/UNI79204BE/wxapi`一下java文件中`HelloH5`为`UNI79204BE`

  // 打开`HBuilder-Hello/app/src/main/res/drawable-xxhdpi`文件夹，替换App图标、消息图标、启动图

  // 打开`HBuilder-Hello/app/src/main/res/values`中`strings.xml`，修改App名称

  // console.log(prop.getProp(targetFile, 'id', ':'))
} catch (error) {
  console.log(`ERROR INFO START---------------`)
  console.log(error)
  console.log(`ERROR INFO END-----------------`)
}