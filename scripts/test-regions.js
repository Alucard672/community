// 测试区域管理功能
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const regionsCollection = db.collection('regions')

// 测试获取区域列表
async function testGetRegions() {
  try {
    console.log('测试获取区域列表...')
    
    const result = await regionsCollection
      .orderBy('isDefault', 'desc')
      .orderBy('createTime', 'desc')
      .get()
    
    console.log('区域列表:', result.data)
    return result.data
  } catch (error) {
    console.error('获取区域列表失败:', error)
  }
}

// 测试获取默认区域
async function testGetDefaultRegion() {
  try {
    console.log('测试获取默认区域...')
    
    const result = await regionsCollection
      .where({
        isDefault: true
      })
      .get()
    
    if (result.data.length > 0) {
      console.log('默认区域:', result.data[0])
      return result.data[0]
    } else {
      console.log('未找到默认区域')
      return null
    }
  } catch (error) {
    console.error('获取默认区域失败:', error)
  }
}

// 测试添加区域
async function testAddRegion() {
  try {
    console.log('测试添加区域...')
    
    const newRegion = {
      name: '测试区域',
      code: 'TEST001',
      parentCode: '',
      level: 3,
      description: '这是一个测试区域',
      isDefault: false,
      status: 1,
      createTime: new Date(),
      updateTime: new Date()
    }
    
    const result = await regionsCollection.add({
      data: newRegion
    })
    
    console.log('添加区域成功:', result)
    return result._id
  } catch (error) {
    console.error('添加区域失败:', error)
  }
}

// 测试删除区域
async function testDeleteRegion(regionId) {
  try {
    console.log('测试删除区域...')
    
    const result = await regionsCollection.doc(regionId).remove()
    
    console.log('删除区域成功:', result)
  } catch (error) {
    console.error('删除区域失败:', error)
  }
}

// 运行测试
async function runTests() {
  console.log('开始测试区域管理功能...\n')
  
  // 测试获取区域列表
  await testGetRegions()
  console.log('')
  
  // 测试获取默认区域
  await testGetDefaultRegion()
  console.log('')
  
  // 测试添加区域
  const newRegionId = await testAddRegion()
  console.log('')
  
  // 测试删除区域
  if (newRegionId) {
    await testDeleteRegion(newRegionId)
    console.log('')
  }
  
  console.log('测试完成！')
}

// 执行测试
runTests() 