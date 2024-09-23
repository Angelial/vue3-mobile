/**
 * facebook meta pixel 购买记录⌚️
 * @returns
 */

const url = window.location.href
const tiktok = process.env.VUE_APP_EXAMINE_TIKTOK
const facebook = process.env.VUE_APP_EXAMINE_FACEBOOK
export default function () {
  const fbq = (window as any).fbq
  const ttq = (window as any).ttq
  const metaPixel: any = localStorage.getItem('meta_pixel')

  let metaPixelObj: any = {}
  if (metaPixel) {
    metaPixelObj = JSON.parse(metaPixel)
  }
  const isNewUser = localStorage.getItem('isNewUser')
  /**
   * 购买完成记录
   * @param {number} id 商品id / 盲盒id
   * @param {string} name 商品名称 / 盲盒名称
   * @param {string} type 判断是否 是盲盒 还是 商品  box => 盲盒  goods => 商品
   * @param {string} value 产品价格
   * @param {string} quantity 产品数量 盲盒指收取盲盒数
   * @returns
   */
  const pixelPurchase = ({ id, name, type, value, quantity }) => {
    if (isNewUser && isNewUser === '2') {
      if (metaPixel && metaPixelObj.purchase) {
        if (url.indexOf(tiktok) > -1) {
          ttq.track('CompletePayment', {
            content_type: 'product',
            content_id: id,
            content_name: name,
            currency: 'PHP',
            value,
            price: value,
            num_items: quantity,
            content_category: type
          })
          Object.assign(metaPixelObj, { purchase: false })
          localStorage.setItem('meta_pixel', JSON.stringify(metaPixelObj))
        } else if (url.indexOf(facebook) > -1) {
          fbq('track', 'Purchase', {
            content_type: 'product',
            content_ids: id,
            content_name: name,
            currency: 'PHP',
            value,
            num_items: quantity,
            content_category: type
          })
        }
        Object.assign(metaPixelObj, { purchase: false })
        localStorage.setItem('meta_pixel', JSON.stringify(metaPixelObj))
      }
    }
  }

  /**
   * 发起付款记录
   * @param {number} id 商品id / 盲盒id
   * @param {string} name 商品名称 / 盲盒名称
   * @param {string} type 判断是否 是盲盒 还是 商品  box => 盲盒  goods => 商品
   * @param {string} value 产品价格
   * @param {string} quantity 产品数量 盲盒指收取盲盒数
   * @returns
   */

  const pixelInitiateCheckout = ({ id, name, type, value, quantity }) => {
    if (isNewUser && isNewUser === '2') {
      if (metaPixel && metaPixelObj.initiateCheckout) {
        if (url.indexOf(tiktok) > -1) {
          ttq.track('InitiateCheckout', {
            content_type: 'product',
            content_id: id,
            content_name: name,
            currency: 'PHP',
            value,
            price: value,
            num_items: quantity,
            content_category: type
          })
          Object.assign(metaPixelObj, { initiateCheckout: false })
          localStorage.setItem('meta_pixel', JSON.stringify(metaPixelObj))
        } else if (url.indexOf(facebook) > -1) {
          fbq('track', 'InitiateCheckout', {
            content_type: 'product',
            content_ids: id,
            content_name: name,
            currency: 'PHP',
            value,
            num_items: quantity,
            content_category: type
          })
          Object.assign(metaPixelObj, { initiateCheckout: false })
          localStorage.setItem('meta_pixel', JSON.stringify(metaPixelObj))
        }
      }
    }
  }

  return {
    pixelPurchase,
    pixelInitiateCheckout
  }
}
