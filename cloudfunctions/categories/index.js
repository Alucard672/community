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
      case 'create':
        return await handleCreateCategory(wxContext, data);
      case 'getList':
        return await handleGetCategoryList(data);
      case 'update':
        return await handleUpdateCategory(wxContext, data);
      case 'delete':
        return await handleDeleteCategory(wxContext, data);
      default:
        return {
          success: false,
          message: '未知的操作类型'
        };
    }
  } catch (error) {
    console.error('信息板块云函数错误:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

// 创建信息板块
async function handleCreateCategory(wxContext, data) {
  const { OPENID } = wxContext;
  
  try {
    // 检查管理员权限
    const userResult = await db.collection('users').where({
      openid: OPENID
    }).get();
    
    if (userResult.data.length === 0 || userResult.data[0].userType !== 'admin') {
      return {
        success: false,
        message: '无权限创建信息板块'
      };
    }
    
    // 创建板块
    const categoryData = {
      name: data.name,
      code: data.code,
      description: data.description || '',
      icon: data.icon || '',
      color: data.color || '#3cc51f',
      sortOrder: data.sortOrder || 0,
      isActive: data.isActive !== false,
      settings: {
        allowPublish: data.settings?.allowPublish !== false,
        requireApproval: data.settings?.requireApproval || false,
        maxImages: data.settings?.maxImages || 9,
        maxContentLength: data.settings?.maxContentLength || 2000
      },
      createdBy: OPENID,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('categories').add({
      data: categoryData
    });
    
    return {
      success: true,
      categoryId: result._id,
      message: '信息板块创建成功'
    };
  } catch (error) {
    throw new Error('创建信息板块失败: ' + error.message);
  }
}

// 获取板块列表
async function handleGetCategoryList(data) {
  const { includeInactive = false } = data;
  
  try {
    let query = db.collection('categories');
    
    if (!includeInactive) {
      query = query.where({
        isActive: true
      });
    }
    
    query = query.orderBy('sortOrder', 'desc')
                .orderBy('createdAt', 'desc');
    
    const result = await query.get();
    
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    throw new Error('获取板块列表失败: ' + error.message);
  }
}

// 更新板块
async function handleUpdateCategory(wxContext, data) {
  const { OPENID } = wxContext;
  const { categoryId, updateData } = data;
  
  try {
    // 检查管理员权限
    const userResult = await db.collection('users').where({
      openid: OPENID
    }).get();
    
    if (userResult.data.length === 0 || userResult.data[0].userType !== 'admin') {
      return {
        success: false,
        message: '无权限修改信息板块'
      };
    }
    
    // 更新板块
    await db.collection('categories').doc(categoryId).update({
      data: {
        ...updateData,
        updatedAt: new Date()
      }
    });
    
    return {
      success: true,
      message: '板块更新成功'
    };
  } catch (error) {
    throw new Error('更新板块失败: ' + error.message);
  }
}

// 删除板块
async function handleDeleteCategory(wxContext, data) {
  const { OPENID } = wxContext;
  const { categoryId } = data;
  
  try {
    // 检查管理员权限
    const userResult = await db.collection('users').where({
      openid: OPENID
    }).get();
    
    if (userResult.data.length === 0 || userResult.data[0].userType !== 'admin') {
      return {
        success: false,
        message: '无权限删除信息板块'
      };
    }
    
    // 删除板块
    await db.collection('categories').doc(categoryId).remove();
    
    return {
      success: true,
      message: '板块删除成功'
    };
  } catch (error) {
    throw new Error('删除板块失败: ' + error.message);
  }
} 