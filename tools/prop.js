/**
 * 获取属性值
 * Author: Dorange
 */
const fs = require('fs')

const _get = function (targetFile, prop, char) {
  if (!fs.existsSync(targetFile)) {
    console.log(`prop targetFile: ${targetFile} is not exist`)
    return
  }

  if (fs.statSync(targetFile).isDirectory()) {
    console.log(`prop targetFile: ${targetFile} is directory`)
    return
  }

  let result = ''

  let data = fs.readFileSync(targetFile)
  let string = data.toString()

  let reg = new RegExp(`['"]?${prop}['"]?\\s?${char}\\s?['"]?([\u4e00-\u9fa5a-zA-Z0-9_@\\-\.\/:]+)['"]?`)
  let arr = string.match(reg)

  if (arr && arr[1]) {
    result = arr[1]
  }

  return result
}

const getProp = function (targetFile, props, char = '=') {
  if (Array.isArray(props)) {
    let result = {}
    props.forEach(prop => {
      result[prop] = _get(targetFile, prop, char)
    })
    return result
  } else {
    return _get(targetFile, props, char)
  }
}

module.exports = {
  getProp
}