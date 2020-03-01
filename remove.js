/**
 * 删除文件
 */

const fs = require("fs")
const path = require('path')

function removeFile(targetPath) {
  if (!fs.existsSync(targetPath)) {
    console.log(`delete targetPath: ${targetPath} is not exist`)
    return
  }

  let files = [];
  files = fs.readdirSync(targetPath);

  files.forEach(fileName => {
    let current = path.join(targetPath, fileName)
    if (fs.statSync(current).isDirectory()) {
      removeFile(current);
    } else {
      fs.unlinkSync(current);
    }
  })

  fs.rmdirSync(targetPath)

}

module.exports = {
  removeFile
}