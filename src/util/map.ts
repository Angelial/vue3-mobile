/**
 *
 * 菲律宾经纬度范围: 纬度 >0 N   <22 N ; 经度 > 116 E     < 128E
 * @param { latitude: 纬度, longitude: 经度 } coords
 * @return
 *  1、能拿到 geolocation 返回是否是在菲律宾 是 => PHP, 否 => NOT
 *  2、不能拿到 geolocation 返回 UNAVAILABLE
 */
function getLocation() {
  return new Promise<any>((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const isPhp =
            coords.latitude > 0 &&
            coords.latitude < 22 &&
            coords.longitude > 116 &&
            coords.longitude < 128

          const str = isPhp ? 'PHP' : 'NOT'
          console.log(coords.latitude, coords.longitude)
          const obj = {
            point: str,
            latitude: coords.latitude,
            longitude: coords.longitude
          }
          resolve(obj)
        },
        (error) => {
          console.log(error)
          const obj = { point: 'UNAVAILABLE' }
          resolve(obj)
        }
      )
    } else {
      const obj = { point: 'UNAVAILABLE' }
      resolve(obj)
    }
  })
}

export default getLocation
