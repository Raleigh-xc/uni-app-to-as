/**
 * 拷贝文件
 */

const fs = require('fs')
const path = require('path')

const copyFile = function (fromPath, toPath) {
  if (!fs.existsSync(fromPath)) {
    console.log(`copy targetPath: ${fromPath} is not exist`)
    return
  }

  if(!fs.existsSync(toPath)){
    fs.mkdirSync(toPath);
  }

  let files = [];
  files = fs.readdirSync(fromPath)

  files.forEach(fileName => {
    let current = path.join(fromPath, fileName)
    let target = path.join(toPath, fileName)
    if (fs.statSync(current).isDirectory()) {
      copyFile(current, target)
    } else {
      fs.copyFileSync(current, target)
    }
  })

}

module.exports = {
  copyFile
}
