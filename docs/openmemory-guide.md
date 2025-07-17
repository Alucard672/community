# OpenMemory 使用指南

## 📋 概述

OpenMemory 是一个强大的记忆管理系统，已经成功安装到您的 Cursor 编辑器中。它可以帮助 AI 助手记住重要的项目信息、开发进度、问题解决方案等。

## 🚀 快速开始

### 1. 安装状态
✅ OpenMemory 已成功安装到 Cursor 编辑器
✅ API Key 已配置: `om-k1j4d3rrwyz2y80d4raxdty9c3q346j6`

### 2. 项目配置
项目已包含以下 OpenMemory 相关文件：
- `openmemory.config.js` - 配置文件
- `utils/openmemory.js` - 工具类
- `examples/openmemory-usage.js` - 使用示例

## 📝 使用方法

### 1. 在 Cursor 中使用

#### 自动记忆
OpenMemory 会自动记住重要的对话内容，包括：
- 项目开发进度
- 功能实现细节
- 问题解决方案
- 代码片段
- 用户偏好

#### 手动记忆
您可以在对话中使用以下关键词来触发记忆：
- "记住这个" - 存储当前对话内容
- "查找关于" - 检索相关记忆
- "更新项目状态" - 更新项目进度

### 2. 在代码中使用

#### 导入工具类
```javascript
import openMemory from './utils/openmemory.js'
```

#### 存储项目进度
```javascript
await openMemory.storeProjectProgress({
  feature: '区域管理功能',
  status: '已完成',
  details: '实现了区域选择、后台管理等功能',
  nextSteps: ['测试功能', '部署云函数']
})
```

#### 存储功能实现
```javascript
await openMemory.storeFeatureImplementation({
  name: '区域选择组件',
  description: '小程序区域选择组件实现',
  files: ['region-picker.js', 'region-picker.wxml'],
  code: 'Component({ ... })',
  notes: '支持双向绑定'
})
```

#### 存储问题解决方案
```javascript
await openMemory.storeProblemSolution({
  issue: 'OpenMemory 安装问题',
  solution: '使用官方安装命令',
  steps: ['运行 npx 命令', '配置 API Key'],
  related: ['OpenMemory', 'Cursor']
})
```

#### 检索记忆
```javascript
// 检索项目进度
const progress = await openMemory.retrieveMemories('项目进度', {
  type: 'projectProgress',
  limit: 5
})

// 检索功能实现
const features = await openMemory.retrieveMemories('功能实现', {
  tags: ['feature', 'implementation']
})
```

## 🎯 实际应用场景

### 1. 项目开发记忆
- **开发进度跟踪**：记录每个功能的开发状态
- **技术决策记录**：记住重要的技术选择原因
- **代码架构记忆**：存储项目结构和设计模式

### 2. 问题解决记忆
- **错误解决方案**：记录常见问题的解决方法
- **调试经验**：存储调试过程中的关键发现
- **最佳实践**：积累开发中的最佳实践

### 3. 代码片段记忆
- **常用代码模板**：存储重复使用的代码片段
- **API 使用示例**：记录各种 API 的使用方法
- **配置模板**：保存常用的配置文件

### 4. 用户偏好记忆
- **开发规范**：记住项目的编码规范
- **工具配置**：存储开发工具的配置偏好
- **工作流程**：记录个人的工作习惯

## 🔧 高级功能

### 1. 记忆分类
OpenMemory 支持多种记忆类型：
- `projectProgress` - 项目进度
- `featureImplementation` - 功能实现
- `problemSolution` - 问题解决方案
- `codeSnippet` - 代码片段
- `userPreferences` - 用户偏好

### 2. 记忆标签
使用标签组织记忆：
```javascript
tags: ['project', 'development', 'miniprogram', 'region']
```

### 3. 重要性评分
设置记忆的重要性（0-1）：
```javascript
importance: 0.9 // 高重要性
importance: 0.5 // 中等重要性
importance: 0.2 // 低重要性
```

### 4. 检索选项
```javascript
{
  limit: 10,           // 限制返回数量
  tags: ['feature'],   // 标签过滤
  type: 'projectProgress', // 类型过滤
  minImportance: 0.7   // 最低重要性
}
```

## 📊 当前项目记忆

### 已存储的记忆
1. **项目进度**：区域管理功能开发完成
2. **功能实现**：区域选择组件、管理后台页面
3. **问题解决**：OpenMemory 安装配置
4. **代码片段**：云函数基础模板
5. **用户偏好**：开发规范、默认区域设置

### 项目上下文
- **项目名称**：社区小程序项目
- **当前状态**：开发中
- **当前功能**：区域管理功能
- **技术栈**：微信小程序、Vue3、Element Plus、微信云开发
- **开发规范**：中文注释、ESLint + Prettier

## 🚀 运行示例

### 1. 运行使用示例
```bash
node examples/openmemory-usage.js
```

### 2. 测试记忆功能
```bash
# 存储项目进度
node -e "
import('./examples/openmemory-usage.js').then(m => m.storeProjectProgress())
"

# 检索记忆
node -e "
import('./examples/openmemory-usage.js').then(m => m.retrieveMemories())
"
```

## 💡 最佳实践

### 1. 记忆设计原则
- **简洁性**：存储关键信息，避免冗余
- **结构化**：使用统一的数据格式
- **可检索性**：添加合适的标签和关键词
- **时效性**：定期更新和清理过期记忆

### 2. 使用建议
- 在完成重要功能后立即存储进度
- 遇到问题时记录解决方案
- 定期检索相关记忆以保持连续性
- 使用描述性的标签便于检索

### 3. 性能优化
- 合理设置记忆重要性
- 定期清理过期记忆
- 使用标签进行高效检索
- 避免存储过多重复信息

## 🔍 故障排除

### 常见问题

1. **记忆存储失败**
   - 检查 API Key 是否正确
   - 确认网络连接正常
   - 查看控制台错误信息

2. **检索结果为空**
   - 检查搜索关键词是否正确
   - 确认标签和类型设置
   - 调整重要性阈值

3. **性能问题**
   - 减少单次检索的数量
   - 使用更精确的搜索条件
   - 定期清理过期记忆

### 获取帮助
- 查看 OpenMemory 官方文档
- 检查项目中的示例代码
- 在 Cursor 中直接询问 AI 助手

## 📈 未来计划

### 计划功能
1. **自动记忆**：根据对话内容自动存储重要信息
2. **智能检索**：基于语义的智能记忆检索
3. **记忆分析**：分析记忆使用模式和趋势
4. **团队协作**：支持团队共享记忆

### 集成计划
1. **Git 集成**：与代码提交记录关联
2. **项目管理工具**：与 Jira、Trello 等集成
3. **文档生成**：自动生成项目文档
4. **知识图谱**：构建项目知识图谱

---

通过合理使用 OpenMemory，您可以：
- 🧠 保持项目开发的连续性
- 📚 积累宝贵的开发经验
- 🔍 快速找到解决方案
- 🚀 提高开发效率

开始使用 OpenMemory 来增强您的开发体验吧！ 