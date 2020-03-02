/**
 * 替换文件内容
 * Author: Dorange
 */

const fs = require('fs')

const replaceFile = function (targetFile, sourceReg, targetStr) {
  if (!fs.existsSync(targetFile)) {
    console.log(`replace targetFile: ${targetFile} is not exist`)
    return
  }

  if (fs.statSync(targetFile).isDirectory()) {
    console.log(`replace targetFile: ${targetFile} is directory`)
    return
  }

  let data = fs.readFileSync(targetFile)
  const result = data.toString().replace(sourceReg, targetStr)

  fs.writeFileSync(targetFile, result)
}

module.exports = {
  replaceFile
}