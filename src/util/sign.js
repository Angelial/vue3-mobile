import md5 from './md5.js'
const toString = Object.prototype.toString

/**
 * 判断给定字面量是否是一个纯对象
 * @param x
 * @returns {boolean}
 */
export function isPlainObj(x) {
  return toString.call(x) === '[object Object]' && x instanceof Object
}

/**
 * 按给定规则给指定对象排序，支持深度遍历
 * @param obj   {Object}  需要重新排序 keys 的对象
 * @param opts  {Object<deep,compare>}  排序规则,opts.deep 是否深度遍历，opts.compare 比较规则
 * @returns {Object}      重新排序后生成新的对象
 */
export function sortKeys(obj, opts = {}) {
  if (!isPlainObj(obj)) {
    throw new TypeError('Expected a plain object')
  }

  const deep = opts.deep
  const seenInput = []
  const seenOutput = []

  const sortKeys = (x) => {
    const seenIndex = seenInput.indexOf(x)
    if (seenIndex !== -1) {
      return seenOutput[seenIndex]
    }

    const ret = {}
    // 排序
    const keys = Object.keys(x).sort()
    seenInput.push(x)
    seenOutput.push(ret)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const val = x[key]
      if (deep && Array.isArray(val)) {
        const retArr = []
        for (let j = 0; j < val.length; j++) {
          retArr[j] = isPlainObj(val[j]) ? sortKeys(val[j]) : val[j]
        }

        ret[key] = retArr
        continue
      }

      ret[key] = deep && isPlainObj(val) ? sortKeys(val) : val
    }

    return ret
  }

  return sortKeys(obj)
}

export function sign(data, ClientSecret) {
  // sorted by ASCII
  const sortedData = sortKeys(data, { deep: true })

  const constructString = (obj) => {
    let ret = []
    const keys = Object.keys(obj)
    keys.forEach((item) => {
      // 如果这个值不存在，null, undefined 或者 none
      // 同样值为空数组或者空对象的字段也不参与签名
      // 则不拼接到生成签名的源字符串上，即此字段不参与签名认证
      const value = obj[item]
      if (
        value === null ||
        value === '' ||
        value === undefined ||
        (Array.isArray(value) && !(value.length > 0)) ||
        (isPlainObj(value) && !(Object.keys(value).length > 0))
      ) {
        return
      }
      ret.push(`${item}=${value}`)
    })

    return ret.join('&').replace(/[!'()*]/g, encodeURI)
  }
  // `key=value` type constructed string

  const str = constructString(sortedData) + ClientSecret
  const constructed = str
  return md5(constructed).toUpperCase()
}
