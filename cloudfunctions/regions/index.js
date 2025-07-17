// 区域管理云函数
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const regionsCollection = db.collection('regions')

// 云函数入口函数
exports.main = async (event, context) => {
  const { action, data } = event

  try {
    switch (action) {
      case 'getRegions':
        return await getRegions(data)
      case 'addRegion':
        return await addRegion(data)
      case 'updateRegion':
        return await updateRegion(data)
      case 'deleteRegion':
        return await deleteRegion(data)
      case 'setDefaultRegion':
        return await setDefaultRegion(data)
      case 'getDefaultRegion':
        return await getDefaultRegion()
      default:
        return {
          success: false,
          message: '未知操作'
        }
    }
  } catch (error) {
    console.error('区域管理云函数错误:', error)
    return {
      success: false,
      message: '操作失败',
      error: error.message
    }
  }
}

// 获取区域列表
async function getRegions(data = {}) {
  const { page = 1, pageSize = 20, keyword = '' } = data
  
  try {
    let query = regionsCollection
    
    // 关键词搜索
    if (keyword) {
      query = query.where({
        name: db.RegExp({
          regexp: keyword,
          options: 'i'
        })
      })
    }
    
    // 获取总数
    const countResult = await query.count()
    const total = countResult.total
    
    // 获取列表
    const listResult = await query
      .orderBy('isDefault', 'desc')
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    return {
      success: true,
      data: {
        list: listResult.data,
        total,
        page,
        pageSize
      }
    }
  } catch (error) {
    throw error
  }
}

// 添加区域
async function addRegion(data) {
  const { name, code, parentCode, level, description } = data
  
  try {
    // 检查区域名称是否已存在
    const existResult = await regionsCollection
      .where({
        name: name
      })
      .get()
    
    if (existResult.data.length > 0) {
      return {
        success: false,
        message: '区域名称已存在'
      }
    }
    
    const regionData = {
      name,
      code,
      parentCode: parentCode || '',
      level: level || 1,
      description: description || '',
      isDefault: false,
      status: 1, // 1: 启用, 0: 禁用
      createTime: new Date(),
      updateTime: new Date()
    }
    
    const result = await regionsCollection.add({
      data: regionData
    })
    
    return {
      success: true,
      message: '添加成功',
      data: {
        _id: result._id,
        ...regionData
      }
    }
  } catch (error) {
    throw error
  }
}

// 更新区域
async function updateRegion(data) {
  const { _id, name, code, parentCode, level, description, status } = data
  
  try {
    // 检查区域名称是否已存在（排除自己）
    const existResult = await regionsCollection
      .where({
        name: name,
        _id: db.command.neq(_id)
      })
      .get()
    
    if (existResult.data.length > 0) {
      return {
        success: false,
        message: '区域名称已存在'
      }
    }
    
    const updateData = {
      updateTime: new Date()
    }
    
    if (name !== undefined) updateData.name = name
    if (code !== undefined) updateData.code = code
    if (parentCode !== undefined) updateData.parentCode = parentCode
    if (level !== undefined) updateData.level = level
    if (description !== undefined) updateData.description = description
    if (status !== undefined) updateData.status = status
    
    await regionsCollection.doc(_id).update({
      data: updateData
    })
    
    return {
      success: true,
      message: '更新成功'
    }
  } catch (error) {
    throw error
  }
}

// 删除区域
async function deleteRegion(data) {
  const { _id } = data
  
  try {
    // 检查是否为默认区域
    const regionResult = await regionsCollection.doc(_id).get()
    if (regionResult.data.isDefault) {
      return {
        success: false,
        message: '不能删除默认区域'
      }
    }
    
    await regionsCollection.doc(_id).remove()
    
    return {
      success: true,
      message: '删除成功'
    }
  } catch (error) {
    throw error
  }
}

// 设置默认区域
async function setDefaultRegion(data) {
  const { _id } = data
  
  try {
    // 先取消所有默认区域
    await regionsCollection
      .where({
        isDefault: true
      })
      .update({
        data: {
          isDefault: false,
          updateTime: new Date()
        }
      })
    
    // 设置新的默认区域
    await regionsCollection.doc(_id).update({
      data: {
        isDefault: true,
        updateTime: new Date()
      }
    })
    
    return {
      success: true,
      message: '设置默认区域成功'
    }
  } catch (error) {
    throw error
  }
}

// 获取默认区域
async function getDefaultRegion() {
  try {
    const result = await regionsCollection
      .where({
        isDefault: true
      })
      .get()
    
    if (result.data.length === 0) {
      // 如果没有默认区域，返回夏邑县车站镇
      return {
        success: true,
        data: {
          name: '夏邑县车站镇',
          code: '411426101',
          parentCode: '411426',
          level: 3,
          description: '河南省商丘市夏邑县车站镇',
          isDefault: true
        }
      }
    }
    
    return {
      success: true,
      data: result.data[0]
    }
  } catch (error) {
    throw error
  }
} 