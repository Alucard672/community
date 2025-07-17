const db = wx.cloud.database()

async function getUserInfo() {
  const { result } = await wx.cloud.callFunction({ name: 'getUserInfo' })
  return result // 包含 role 字段
}

module.exports = { getUserInfo } 