/**
 * uni-app-to-as
 * author Dorange
 * version 2.6.1
 */

const path = require('path')
const copy = require('./tools/copy')
const remove = require('./tools/remove')
const replace = require('./tools/replace')
const prop = require('./tools/prop')

const CONFIGDIR = './uniconfig.txt'

try {
  // 获取配置
  console.log('获取配置信息..........')
  const DIRCONFIG = prop.getProp(CONFIGDIR, ['srcDir', 'sdkDir'])
  const SRCDIR = DIRCONFIG.srcDir;
  const SDKDIR = DIRCONFIG.sdkDir;
  console.log(`SRCDIR = ${SRCDIR}`)
  console.log(`SDKDIR = ${SDKDIR}`)

  // 打开`src/manifest.json`文件，拷贝appid和name字段，appid为`__UNI__0000001`
  console.log('获取APP信息..........')
  const APPINFO = prop.getProp(path.join(SRCDIR, 'src/manifest.json'), ['name', 'appid'], ':')
  const APPID = APPINFO.appid
  const APPNAME = APPINFO.name
  console.log(`APPID = ${APPID}`)
  console.log(`APPNAME = ${APPNAME}`)

  // 拷贝一份sdk中的HBuilder-Hello用作打包项目，后面用`MYPROJECT`代替（也可以直接使用HBuilder-Hello）
  console.log('生成新项目..........')
  const PROJECTNAME = APPID
  console.log(`PROJECTNAME = ${PROJECTNAME}`)
  remove.removeFile(path.join(SDKDIR, PROJECTNAME))
  copy.copyFile(path.join(SDKDIR, 'HBuilder-Hello'), path.join(SDKDIR, PROJECTNAME))
  console.log(`新项目路径为${path.join(SDKDIR, PROJECTNAME)}`)

  // 删除`MYPROJECT/app/src/main/assets/apps`中的`HelloH5`文件夹
  console.log('删除默认资源文件..........')
  remove.removeFile(path.join(SDKDIR, PROJECTNAME, 'app/src/main/assets/apps/HelloH5'))

  // 拷贝资源`dist/resources`中的`__UNI__0000001`文件夹到`MYPROJECT/app/src/main/assets/apps`
  console.log('复制新资源文件..........')
  copy.copyFile(path.join(SRCDIR, 'dist/resources', APPID), path.join(SDKDIR, PROJECTNAME, 'app/src/main/assets/apps', APPID))

  // 打开`MYPROJECT/app/src/main/assets/data`中`dcloud_control.xml`文件，修改appid为`__UNI__0000001`
  const PACKAGE = APPID.replace(/_/g, '')
  const PACKAGENAME = 'io.dcloud.' + PACKAGE
  console.log(`PACKAGE = ${PACKAGE}`)
  console.log(`PACKAGENAME = ${PACKAGENAME}`)
  console.log('修改dcloud_control.xml..........')
  replace.replaceFile(path.join(SDKDIR, PROJECTNAME, 'app/src/main/assets/data/dcloud_control.xml'), /HelloH5/g, APPID)

  // 打开`MYPROJECT/app/src/main`中`AndroidManifest.xml`,全局替换`HelloH5`为`UNI0000001`
  console.log('修改AndroidManifest.xml..........')
  replace.replaceFile(path.join(SDKDIR, PROJECTNAME, 'app/src/main/AndroidManifest.xml'), /io\.dcloud\.HelloH5/g, PACKAGENAME)

  // 打开`MYPROJECT/app`中`build.gradle`文件，修改applicationId为`io.dcloud.UNI0000001`
  console.log('修改build.gradle..........')
  replace.replaceFile(path.join(SDKDIR, PROJECTNAME, 'app/build.gradle'), /io\.dcloud\.HelloH5/g, PACKAGENAME)

  // 打开`MYPROJECT/app/src/main/java/io/dcloud`，重命名文件夹`HelloH5`为`UNI0000001`
  console.log('拷贝微信api..........')
  copy.copyFile(path.join(SDKDIR, PROJECTNAME, 'app/src/main/java/io/dcloud/HelloH5'), path.join(SDKDIR, PROJECTNAME, 'app/src/main/java/io/dcloud', PACKAGE))
  remove.removeFile(path.join(SDKDIR, PROJECTNAME, 'app/src/main/java/io/dcloud/HelloH5'))

  // 修改`MYPROJECT/app/src/main/java/io/dcloud/UNI0000001/wxapi`一下java文件中`HelloH5`为`UNI0000001`
  console.log('修改微信api..........')
  replace.replaceFile(path.join(SDKDIR, PROJECTNAME, 'app/src/main/java/io/dcloud',PACKAGE,'wxapi/WXEntryActivity.java'), /io\.dcloud\.HelloH5/g, PACKAGENAME)
  replace.replaceFile(path.join(SDKDIR, PROJECTNAME, 'app/src/main/java/io/dcloud',PACKAGE,'wxapi/WXPayEntryActivity.java'), /io\.dcloud\.HelloH5/g, PACKAGENAME)

  // 打开`MYPROJECT/app/src/main/res/drawable-xxhdpi`文件夹，替换App图标、消息图标、启动图
  console.log('修改app图标、消息图标、启动图..........')
  remove.removeFile(path.join(SDKDIR, PROJECTNAME, 'app/src/res/drawable-xxhdpi'))
  copy.copyFile(path.join(SRCDIR, 'src/static/drawable-xxhdpi'), path.join(SDKDIR, PROJECTNAME, 'app/src/res/drawable-xxhdpi'))

  // 打开`MYPROJECT/app/src/main/res/values`中`strings.xml`，修改App名称
  console.log('修改app名称..........')
  replace.replaceFile(path.join(SDKDIR, PROJECTNAME, 'app/src/main/res/values/strings.xml'), 'HBuilder-Hello', APPNAME)

  console.log(`资源生成成功，使用as打开${path.join(SDKDIR, PROJECTNAME)}`)
} catch (error) {
  console.log(`ERROR INFO START---------------`)
  console.log(error)
  console.log(`ERROR INFO END-----------------`)
}
