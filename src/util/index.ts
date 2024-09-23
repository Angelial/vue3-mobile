const pad = (num: string | number): string => {
  if (num < 10) {
    return `0${num}`
  } else {
    return num.toString()
  }
}

export const customizeDateToFormat = (
  date: Date | string,
  format = 'yyyy年MM月dd日'
) => {
  if (!date) return date
  let curDate: Date
  if (date instanceof Date) {
    curDate = date
  } else {
    curDate = new Date(date.replace(/-/g, '/'))
  }
  const year: string = curDate.getFullYear().toString()
  const month: string = (curDate.getMonth() + 1).toString()
  const day: string = curDate.getDate().toString()
  const h: string = curDate.getHours().toString()
  const m: string = curDate.getMinutes().toString()
  const s: string = curDate.getSeconds().toString()

  const formatDate: string = format
    .replace('yyyy', year)
    .replace('MM', pad(month))
    .replace('dd', pad(day))
    .replace('hh', pad(h))
    .replace('mm', pad(m))
    .replace('ss', pad(s))
  return formatDate
}

/**
 * @description: 置空json数据
 * @param {*} json
 * @return {*}
 */
export function clearJson(data) {
  const json = data
  let key
  for (key in json) {
    if (json[key] instanceof Array) {
      json[key] = []
    } else if (
      typeof json[key] === 'object' &&
      Object.prototype.toString.call(json[key]).toLowerCase() ===
        '[object object]' &&
      !json[key].length
    ) {
      json[key] = {}
    } else {
      json[key] = undefined
    }
  }
}
