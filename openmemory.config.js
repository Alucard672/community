// OpenMemory 配置文件
module.exports = {
  // OpenMemory API 配置
  apiKey: 'om-k1j4d3rrwyz2y80d4raxdty9c3q346j6',
  
  // 项目配置
  project: {
    name: 'community-miniprogram',
    description: '小程序社区项目 - 基于微信云开发',
    tags: ['miniprogram', 'wechat', 'cloud', 'community']
  },
  
  // 记忆配置
  memory: {
    // 记忆类型定义
    types: {
      // 用户偏好记忆
      userPreferences: {
        description: '用户偏好设置',
        tags: ['user', 'preferences'],
        importance: 0.8
      },
      
      // 项目开发记忆
      projectProgress: {
        description: '项目开发进度',
        tags: ['project', 'development'],
        importance: 0.9
      },
      
      // 功能实现记忆
      featureImplementation: {
        description: '功能实现记录',
        tags: ['feature', 'implementation'],
        importance: 0.7
      },
      
      // 问题解决记忆
      problemSolution: {
        description: '问题解决方案',
        tags: ['problem', 'solution'],
        importance: 0.8
      },
      
      // 代码片段记忆
      codeSnippet: {
        description: '常用代码片段',
        tags: ['code', 'snippet'],
        importance: 0.6
      }
    },
    
    // 记忆策略
    strategies: {
      // 自动记忆重要对话
      autoRemember: true,
      
      // 记忆过期时间（天）
      ttl: 30,
      
      // 最大记忆数量
      maxMemories: 1000
    }
  },
  
  // 上下文配置
  context: {
    // 当前项目状态
    currentProject: {
      name: '社区小程序项目',
      status: '开发中',
      currentFeature: '区域管理功能',
      nextSteps: [
        '测试区域管理功能',
        '部署云函数',
        '完善用户界面',
        '添加更多功能模块'
      ]
    },
    
    // 技术栈
    techStack: {
      frontend: ['微信小程序', 'Vue3', 'Element Plus'],
      backend: ['微信云开发', 'Node.js', '云函数'],
      database: ['云数据库', '云存储'],
      tools: ['微信开发者工具', 'Git', 'ESLint', 'Prettier']
    },
    
    // 开发规范
    codingStandards: {
      language: '中文',
      comments: '中文注释',
      naming: '有意义的命名',
      style: 'ESLint + Prettier'
    }
  }
} 