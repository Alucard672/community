// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { action, data } = event;
  const wxContext = cloud.getWXContext();

  try {
    switch (action) {
      case 'login':
        return await handleLogin(wxContext);
      case 'getUserInfo':
        return await handleGetUserInfo(wxContext);
      case 'updateUserInfo':
        return await handleUpdateUserInfo(wxContext, data);
      case 'applyMerchant':
        return await handleApplyMerchant(wxContext, data);
      default:
        return {
          success: false,
          message: '未知的操作类型'
        };
    }
  } catch (error) {
    console.error('认证云函数错误:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

// 处理登录
async function handleLogin(wxContext) {
  const { OPENID, UNIONID } = wxContext;
  
  try {
    // 查找用户
    const userResult = await db.collection('users').where({
      openid: OPENID
    }).get();
    
    if (userResult.data.length === 0) {
      // 新用户，创建用户记录
      const newUser = {
        openid: OPENID,
        unionid: UNIONID || '',
        nickname: '微信用户',
        avatar: '',
        userType: 'user',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const addResult = await db.collection('users').add({
        data: newUser
      });
      
      return {
        success: true,
        openid: OPENID,
        userInfo: newUser,
        isNewUser: true
      };
    } else {
      // 老用户
      const user = userResult.data[0];
      return {
        success: true,
        openid: OPENID,
        userInfo: user,
        isNewUser: false
      };
    }
  } catch (error) {
    throw new Error('登录失败: ' + error.message);
  }
}

// 获取用户信息
async function handleGetUserInfo(wxContext) {
  const { OPENID } = wxContext;
  
  try {
    const userResult = await db.collection('users').where({
      openid: OPENID
    }).get();
    
    if (userResult.data.length === 0) {
      return {
        success: false,
        message: '用户不存在'
      };
    }
    
    return {
      success: true,
      userInfo: userResult.data[0]
    };
  } catch (error) {
    throw new Error('获取用户信息失败: ' + error.message);
  }
}

// 更新用户信息
async function handleUpdateUserInfo(wxContext, data) {
  const { OPENID } = wxContext;
  
  try {
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    
    await db.collection('users').where({
      openid: OPENID
    }).update({
      data: updateData
    });
    
    return {
      success: true,
      message: '用户信息更新成功'
    };
  } catch (error) {
    throw new Error('更新用户信息失败: ' + error.message);
  }
}

// 申请成为商家
async function handleApplyMerchant(wxContext, data) {
  const { OPENID } = wxContext;
  
  try {
    // 检查用户是否存在
    const userResult = await db.collection('users').where({
      openid: OPENID
    }).get();
    
    if (userResult.data.length === 0) {
      return {
        success: false,
        message: '用户不存在'
      };
    }
    
    // 更新用户类型为商家申请中
    await db.collection('users').where({
      openid: OPENID
    }).update({
      data: {
        userType: 'merchant_pending',
        shopInfo: data.shopInfo,
        updatedAt: new Date()
      }
    });
    
    // 记录申请日志
    await db.collection('admin_logs').add({
      data: {
        type: 'merchant_apply',
        userId: OPENID,
        data: data,
        createdAt: new Date()
      }
    });
    
    return {
      success: true,
      message: '商家申请提交成功，请等待审核'
    };
  } catch (error) {
    throw new Error('申请商家失败: ' + error.message);
  }
} 