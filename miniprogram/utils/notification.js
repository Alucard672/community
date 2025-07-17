// 消息通知工具
class NotificationManager {
  constructor() {
    this.subscribeMessage()
  }

  // 订阅消息
  subscribeMessage() {
    wx.requestSubscribeMessage({
      tmplIds: [
        'template_id_1', // 新评论通知
        'template_id_2', // 点赞通知
        'template_id_3', // 商家审核通知
        'template_id_4'  // 系统通知
      ],
      success: (res) => {
        console.log('订阅消息成功:', res)
      },
      fail: (err) => {
        console.error('订阅消息失败:', err)
      }
    })
  }

  // 发送通知
  async sendNotification(type, data) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'notification',
        data: {
          action: 'send',
          type: type,
          data: data
        }
      })
      return result
    } catch (error) {
      console.error('发送通知失败:', error)
    }
  }

  // 获取未读消息数
  async getUnreadCount() {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'notification',
        data: {
          action: 'getUnreadCount'
        }
      })
      return result.count || 0
    } catch (error) {
      console.error('获取未读消息数失败:', error)
      return 0
    }
  }
}

export default new NotificationManager() 