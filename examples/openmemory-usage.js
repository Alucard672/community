// OpenMemory 使用示例
import openMemory from '../utils/openmemory.js'

// 示例1: 存储项目进度
async function storeProjectProgress() {
  await openMemory.storeProjectProgress({
    feature: '区域管理功能',
    status: '已完成',
    details: `
      完成了区域管理功能的开发：
      1. 创建了区域管理云函数 (cloudfunctions/regions/)
      2. 实现了管理后台区域管理页面 (admin/src/views/Regions.vue)
      3. 创建了小程序区域选择组件 (miniprogram/components/region-picker/)
      4. 设置了默认区域为夏邑县车站镇
      5. 添加了区域选择页面 (miniprogram/pages/region-select/)
    `,
    nextSteps: [
      '测试区域管理功能',
      '部署云函数到云端',
      '完善用户界面交互',
      '添加更多功能模块'
    ]
  })
}

// 示例2: 存储功能实现
async function storeFeatureImplementation() {
  await openMemory.storeFeatureImplementation({
    name: '区域选择组件',
    description: '小程序区域选择组件，支持区域列表展示、选择、确认等功能',
    files: [
      'miniprogram/components/region-picker/region-picker.js',
      'miniprogram/components/region-picker/region-picker.wxml',
      'miniprogram/components/region-picker/region-picker.wxss',
      'miniprogram/components/region-picker/region-picker.json'
    ],
    code: `
      // 区域选择组件示例代码
      Component({
        properties: {
          value: { type: Object, value: null },
          show: { type: Boolean, value: false }
        },
        methods: {
          selectRegion(e) {
            const { region } = e.currentTarget.dataset
            this.setData({ selectedRegion: region })
            this.triggerEvent('change', region)
          }
        }
      })
    `,
    notes: '组件支持双向绑定，可以通过 value 属性传入当前选中区域，通过 change 事件获取选择结果'
  })
}

// 示例3: 存储问题解决方案
async function storeProblemSolution() {
  await openMemory.storeProblemSolution({
    issue: 'OpenMemory 安装和配置',
    solution: '使用 npx @openmemory/install 命令安装 OpenMemory 客户端',
    error: '之前尝试使用 npm install openmemory 但发现应该使用官方安装命令',
    steps: [
      '运行 npx @openmemory/install --client cursor --env OPENMEMORY_API_KEY=xxx',
      '确认安装到 Cursor 编辑器',
      '创建配置文件 openmemory.config.js',
      '创建工具类 utils/openmemory.js',
      '在项目中使用记忆功能'
    ],
    related: ['OpenMemory', 'Cursor', 'API Key', '配置']
  })
}

// 示例4: 存储代码片段
async function storeCodeSnippet() {
  await openMemory.storeCodeSnippet({
    name: '云函数基础模板',
    description: '微信云开发云函数的基础模板代码',
    code: `
      // 云函数入口函数
      const cloud = require('wx-server-sdk')
      
      cloud.init({
        env: cloud.DYNAMIC_CURRENT_ENV
      })
      
      const db = cloud.database()
      
      exports.main = async (event, context) => {
        const { action, data } = event
        try {
          switch (action) {
            case 'getList':
              return await getList(data)
            case 'add':
              return await add(data)
            case 'update':
              return await update(data)
            case 'delete':
              return await delete(data)
            default:
              return { success: false, message: '未知操作' }
          }
        } catch (error) {
          return { success: false, message: error.message }
        }
      }
    `,
    language: 'javascript',
    usage: '创建新的云函数时使用此模板，根据具体需求修改 action 和数据处理逻辑',
    tags: ['云函数', '微信云开发', '模板']
  })
}

// 示例5: 存储用户偏好
async function storeUserPreferences() {
  await openMemory.storeUserPreference({
    category: 'development',
    key: 'coding_style',
    value: {
      language: '中文',
      comments: '中文注释',
      naming: '有意义的命名',
      style: 'ESLint + Prettier'
    },
    context: '项目开发规范偏好'
  })

  await openMemory.storeUserPreference({
    category: 'project',
    key: 'default_region',
    value: '夏邑县车站镇',
    context: '项目默认区域设置'
  })
}

// 示例6: 检索相关记忆
async function retrieveMemories() {
  // 检索项目进度
  const projectProgress = await openMemory.retrieveMemories('项目进度', {
    type: 'projectProgress',
    limit: 5
  })
  console.log('项目进度记忆:', projectProgress)

  // 检索功能实现
  const features = await openMemory.retrieveMemories('功能实现', {
    tags: ['feature', 'implementation'],
    limit: 10
  })
  console.log('功能实现记忆:', features)

  // 检索问题解决方案
  const solutions = await openMemory.retrieveMemories('问题解决', {
    type: 'problemSolution',
    minImportance: 0.7
  })
  console.log('问题解决方案:', solutions)
}

// 示例7: 获取项目上下文
async function getProjectContext() {
  const context = await openMemory.getProjectContext()
  console.log('项目上下文:', context)
}

// 运行示例
async function runExamples() {
  console.log('🚀 开始运行 OpenMemory 使用示例...\n')

  try {
    // 存储各种类型的记忆
    await storeProjectProgress()
    await storeFeatureImplementation()
    await storeProblemSolution()
    await storeCodeSnippet()
    await storeUserPreferences()

    console.log('\n📋 记忆存储完成，开始检索...\n')

    // 检索记忆
    await retrieveMemories()
    await getProjectContext()

    console.log('\n✅ 所有示例运行完成！')
  } catch (error) {
    console.error('❌ 运行示例时出错:', error)
  }
}

// 导出示例函数
export {
  storeProjectProgress,
  storeFeatureImplementation,
  storeProblemSolution,
  storeCodeSnippet,
  storeUserPreferences,
  retrieveMemories,
  getProjectContext,
  runExamples
}

// 如果直接运行此文件，执行示例
if (import.meta.url === `file://${process.argv[1]}`) {
  runExamples()
} 