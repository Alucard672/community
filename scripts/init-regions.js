// 初始化区域数据脚本
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const regionsCollection = db.collection('regions')

// 默认区域数据
const defaultRegions = [
  {
    name: '夏邑县车站镇',
    code: '411426101',
    parentCode: '411426',
    level: 3,
    description: '河南省商丘市夏邑县车站镇',
    isDefault: true,
    status: 1,
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    name: '夏邑县',
    code: '411426',
    parentCode: '411400',
    level: 2,
    description: '河南省商丘市夏邑县',
    isDefault: false,
    status: 1,
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    name: '商丘市',
    code: '411400',
    parentCode: '410000',
    level: 1,
    description: '河南省商丘市',
    isDefault: false,
    status: 1,
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    name: '河南省',
    code: '410000',
    parentCode: '',
    level: 0,
    description: '河南省',
    isDefault: false,
    status: 1,
    createTime: new Date(),
    updateTime: new Date()
  }
]

// 初始化区域数据
async function initRegions() {
  try {
    console.log('开始初始化区域数据...')
    
    // 检查是否已有数据
    const countResult = await regionsCollection.count()
    
    if (countResult.total > 0) {
      console.log('区域数据已存在，跳过初始化')
      return
    }
    
    // 批量插入区域数据
    for (const region of defaultRegions) {
      await regionsCollection.add({
        data: region
      })
      console.log(`添加区域: ${region.name}`)
    }
    
    console.log('区域数据初始化完成！')
    console.log('默认区域: 夏邑县车站镇')
    
  } catch (error) {
    console.error('初始化区域数据失败:', error)
  }
}

// 执行初始化
initRegions() 