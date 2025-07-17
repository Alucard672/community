const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  const { shopOpenid, orderId, productName, orderTime } = event

  return cloud.openapi.subscribeMessage.send({
    touser: shopOpenid,
    templateId: '你的模板ID', // 替换为你的实际模板ID
    page: `pages/order-detail/order-detail?id=${orderId}`,
    data: {
      thing1: { value: productName },
      time2: { value: orderTime }
      // ...根据模板字段填写
    }
  })
} 