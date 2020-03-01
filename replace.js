/**
 * 替换属性值
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

  let data= fs.readFileSync(targetFile)
  console.log(data)
  console.log(data.toString())
  const result = data.toString().replace(sourceReg,targetStr)
  console.log('=======================')
  console.log(result)
}

module.exports = {
  replaceFile
}