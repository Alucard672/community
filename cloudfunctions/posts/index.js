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
        return await handleCreatePost(wxContext, data);
      case 'getList':
        return await handleGetPostList(data);
      case 'getDetail':
        return await handleGetPostDetail(data);
      case 'update':
        return await handleUpdatePost(wxContext, data);
      case 'delete':
        return await handleDeletePost(wxContext, data);
      case 'like':
        return await handleLikePost(wxContext, data);
      case 'unlike':
        return await handleUnlikePost(wxContext, data);
      default:
        return {
          success: false,
          message: '未知的操作类型'
        };
    }
  } catch (error) {
    console.error('帖子云函数错误:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

// 创建帖子
async function handleCreatePost(wxContext, data) {
  const { OPENID } = wxContext;
  
  try {
    // 验证用户
    const userResult = await db.collection('users').where({
      openid: OPENID
    }).get();
    
    if (userResult.data.length === 0) {
      return {
        success: false,
        message: '用户不存在'
      };
    }
    
    const user = userResult.data[0];
    
    // 创建帖子
    const postData = {
      author: OPENID,
      authorInfo: {
        nickname: user.nickname,
        avatar: user.avatar
      },
      type: data.type,
      title: data.title,
      content: data.content,
      images: data.images || [],
      location: data.location || {},
      price: data.price || {},
      tags: data.tags || [],
      contact: data.contact || {},
      status: 'active',
      isPinned: false,
      isTop: false,
      sortOrder: 0,
      stats: {
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('posts').add({
      data: postData
    });
    
    // 更新用户统计
    await db.collection('users').where({
      openid: OPENID
    }).update({
      data: {
        'stats.postsCount': db.command.inc(1),
        updatedAt: new Date()
      }
    });
    
    return {
      success: true,
      postId: result._id,
      message: '帖子发布成功'
    };
  } catch (error) {
    throw new Error('发布帖子失败: ' + error.message);
  }
}

// 获取帖子列表
async function handleGetPostList(data) {
  const { type, page = 1, pageSize = 20, keyword } = data;
  
  try {
    let query = db.collection('posts');
    
    // 按类型筛选
    if (type && type !== 'all') {
      query = query.where({
        type: type
      });
    }
    
    // 关键词搜索
    if (keyword) {
      query = query.where({
        title: db.RegExp({
          regexp: keyword,
          options: 'i'
        })
      });
    }
    
    // 按置顶、排序、时间排序
    query = query.orderBy('isPinned', 'desc')
                .orderBy('isTop', 'desc')
                .orderBy('sortOrder', 'desc')
                .orderBy('createdAt', 'desc');
    
    // 分页
    const skip = (page - 1) * pageSize;
    const result = await query.skip(skip).limit(pageSize).get();
    
    return {
      success: true,
      data: result.data,
      total: result.data.length,
      page,
      pageSize
    };
  } catch (error) {
    throw new Error('获取帖子列表失败: ' + error.message);
  }
}

// 获取帖子详情
async function handleGetPostDetail(data) {
  const { postId } = data;
  
  try {
    const result = await db.collection('posts').doc(postId).get();
    
    if (!result.data) {
      return {
        success: false,
        message: '帖子不存在'
      };
    }
    
    // 增加浏览量
    await db.collection('posts').doc(postId).update({
      data: {
        'stats.views': db.command.inc(1)
      }
    });
    
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    throw new Error('获取帖子详情失败: ' + error.message);
  }
}

// 更新帖子
async function handleUpdatePost(wxContext, data) {
  const { OPENID } = wxContext;
  const { postId, updateData } = data;
  
  try {
    // 检查权限
    const postResult = await db.collection('posts').doc(postId).get();
    if (!postResult.data) {
      return {
        success: false,
        message: '帖子不存在'
      };
    }
    
    if (postResult.data.author !== OPENID) {
      return {
        success: false,
        message: '无权限修改此帖子'
      };
    }
    
    // 更新帖子
    await db.collection('posts').doc(postId).update({
      data: {
        ...updateData,
        updatedAt: new Date()
      }
    });
    
    return {
      success: true,
      message: '帖子更新成功'
    };
  } catch (error) {
    throw new Error('更新帖子失败: ' + error.message);
  }
}

// 删除帖子
async function handleDeletePost(wxContext, data) {
  const { OPENID } = wxContext;
  const { postId } = data;
  
  try {
    // 检查权限
    const postResult = await db.collection('posts').doc(postId).get();
    if (!postResult.data) {
      return {
        success: false,
        message: '帖子不存在'
      };
    }
    
    if (postResult.data.author !== OPENID) {
      return {
        success: false,
        message: '无权限删除此帖子'
      };
    }
    
    // 软删除
    await db.collection('posts').doc(postId).update({
      data: {
        status: 'deleted',
        updatedAt: new Date()
      }
    });
    
    return {
      success: true,
      message: '帖子删除成功'
    };
  } catch (error) {
    throw new Error('删除帖子失败: ' + error.message);
  }
}

// 点赞帖子
async function handleLikePost(wxContext, data) {
  const { OPENID } = wxContext;
  const { postId } = data;
  
  try {
    // 检查是否已点赞
    const likeResult = await db.collection('likes').where({
      userId: OPENID,
      postId: postId
    }).get();
    
    if (likeResult.data.length > 0) {
      return {
        success: false,
        message: '已经点赞过了'
      };
    }
    
    // 添加点赞记录
    await db.collection('likes').add({
      data: {
        userId: OPENID,
        postId: postId,
        createdAt: new Date()
      }
    });
    
    // 更新帖子点赞数
    await db.collection('posts').doc(postId).update({
      data: {
        'stats.likes': db.command.inc(1)
      }
    });
    
    return {
      success: true,
      message: '点赞成功'
    };
  } catch (error) {
    throw new Error('点赞失败: ' + error.message);
  }
}

// 取消点赞
async function handleUnlikePost(wxContext, data) {
  const { OPENID } = wxContext;
  const { postId } = data;
  
  try {
    // 删除点赞记录
    await db.collection('likes').where({
      userId: OPENID,
      postId: postId
    }).remove();
    
    // 更新帖子点赞数
    await db.collection('posts').doc(postId).update({
      data: {
        'stats.likes': db.command.inc(-1)
      }
    });
    
    return {
      success: true,
      message: '取消点赞成功'
    };
  } catch (error) {
    throw new Error('取消点赞失败: ' + error.message);
  }
} 