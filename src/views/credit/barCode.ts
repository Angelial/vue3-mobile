import axios from 'axios'
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://mysteryboxes.mojomojo.net'
    : process.env.NODE_ENV === 'test'
    ? 'http://dev.mojo-java.leapgen.net'
    : '/api'

async function blobValidate(data) {
  try {
    const text = await data.text()
    JSON.parse(text)
    return false
  } catch (error) {
    return true
  }
}

export default function fetchBlob({ userId, amount, contractNumber }) {
  const url = baseURL + '/api/skypay/getBarCode'
  return new Promise<string | boolean>((resolve) => {
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      params: {
        userId,
        amount,
        contractNumber
      }
    })
      .then(async (res: any) => {
        const isBlob = await blobValidate(res.data)
        if (isBlob) {
          const blob = new Blob([res.data])
          const blobUrl = window.URL.createObjectURL(blob)
          resolve(blobUrl)
        } else {
          resolve(false)
        }
      })
      .catch(() => {
        resolve(false)
      })
  })
}
