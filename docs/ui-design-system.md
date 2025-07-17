# 微信小程序社区项目 UI 设计系统

## 设计理念

### 设计原则
- **现代化**: 采用最新的设计趋势，包括圆角、阴影、渐变等元素
- **一致性**: 统一的设计语言和交互模式
- **可访问性**: 考虑不同用户的需求，支持深色模式
- **响应式**: 适配不同屏幕尺寸和设备
- **性能优化**: 使用CSS变量和优化的动画效果

### 设计风格
- **清新绿色系**: 主色调采用清新的绿色，传达生机和活力
- **卡片式布局**: 使用卡片组件组织内容，层次分明
- **微交互**: 丰富的交互动画和反馈效果
- **渐变元素**: 适度使用渐变增强视觉层次

## 色彩系统

### 主色调
```css
--primary-color: #00c853;        /* 主绿色 */
--primary-light: #5efc82;        /* 浅绿色 */
--primary-dark: #009624;         /* 深绿色 */
--primary-gradient: linear-gradient(135deg, #00c853, #64dd17); /* 主渐变 */
```

### 辅助色
```css
--secondary-color: #2196f3;      /* 蓝色 */
--accent-color: #ff6b35;         /* 橙色 */
--success-color: #4caf50;        /* 成功色 */
--warning-color: #ff9800;        /* 警告色 */
--error-color: #f44336;          /* 错误色 */
```

### 中性色
```css
--text-primary: #212121;         /* 主要文字 */
--text-secondary: #757575;       /* 次要文字 */
--text-muted: #9e9e9e;           /* 弱化文字 */
--text-disabled: #bdbdbd;        /* 禁用文字 */
```

### 背景色
```css
--bg-primary: #ffffff;           /* 主背景 */
--bg-secondary: #fafafa;         /* 次背景 */
--bg-tertiary: #f5f5f5;          /* 第三级背景 */
--bg-overlay: rgba(0, 0, 0, 0.5); /* 遮罩层 */
```

### 边框色
```css
--border-light: #e0e0e0;         /* 浅边框 */
--border-medium: #bdbdbd;        /* 中等边框 */
--border-dark: #9e9e9e;          /* 深边框 */
```

## 阴影系统

```css
--shadow-sm: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);   /* 小阴影 */
--shadow-md: 0 4rpx 16rpx rgba(0, 0, 0, 0.12);  /* 中等阴影 */
--shadow-lg: 0 8rpx 32rpx rgba(0, 0, 0, 0.16);  /* 大阴影 */
--shadow-xl: 0 16rpx 48rpx rgba(0, 0, 0, 0.24); /* 超大阴影 */
```

## 圆角系统

```css
--radius-sm: 8rpx;               /* 小圆角 */
--radius-md: 16rpx;              /* 中等圆角 */
--radius-lg: 24rpx;              /* 大圆角 */
--radius-xl: 32rpx;              /* 超大圆角 */
--radius-full: 50%;              /* 完全圆角 */
```

## 间距系统

```css
--spacing-xs: 8rpx;              /* 超小间距 */
--spacing-sm: 16rpx;             /* 小间距 */
--spacing-md: 24rpx;             /* 中等间距 */
--spacing-lg: 32rpx;             /* 大间距 */
--spacing-xl: 48rpx;             /* 超大间距 */
--spacing-2xl: 64rpx;            /* 2倍超大间距 */
```

## 字体系统

### 字体大小
```css
--font-size-xs: 20rpx;           /* 超小字体 */
--font-size-sm: 24rpx;           /* 小字体 */
--font-size-md: 28rpx;           /* 中等字体 */
--font-size-lg: 32rpx;           /* 大字体 */
--font-size-xl: 36rpx;           /* 超大字体 */
--font-size-2xl: 42rpx;          /* 2倍大字体 */
--font-size-3xl: 48rpx;          /* 3倍大字体 */
```

### 行高
```css
--line-height-tight: 1.2;        /* 紧凑行高 */
--line-height-normal: 1.5;       /* 正常行高 */
--line-height-relaxed: 1.8;      /* 宽松行高 */
```

### 字体粗细
```css
.font-normal { font-weight: 400; }   /* 正常 */
.font-medium { font-weight: 500; }   /* 中等 */
.font-semibold { font-weight: 600; } /* 半粗 */
.font-bold { font-weight: 700; }     /* 粗体 */
```

## 动画系统

```css
--transition-fast: 0.15s ease;   /* 快速过渡 */
--transition-normal: 0.3s ease;  /* 正常过渡 */
--transition-slow: 0.5s ease;    /* 慢速过渡 */
```

## 组件库

### 按钮组件

#### 基础按钮
```html
<button class="btn btn-primary">主要按钮</button>
<button class="btn btn-secondary">次要按钮</button>
<button class="btn btn-outline">轮廓按钮</button>
<button class="btn btn-ghost">幽灵按钮</button>
```

#### 按钮尺寸
```html
<button class="btn btn-primary btn-sm">小按钮</button>
<button class="btn btn-primary">正常按钮</button>
<button class="btn btn-primary btn-lg">大按钮</button>
```

#### 按钮状态
```html
<button class="btn btn-primary btn-full">全宽按钮</button>
<button class="btn btn-primary btn-disabled">禁用按钮</button>
```

### 卡片组件

#### 基础卡片
```html
<div class="card">
  <div class="card-header">卡片标题</div>
  <div class="card-body">卡片内容</div>
  <div class="card-footer">卡片底部</div>
</div>
```

#### 卡片变体
```html
<div class="card card-elevated">提升卡片</div>
```

### 输入框组件

#### 基础输入框
```html
<div class="input-group">
  <input class="input" placeholder="请输入内容" />
</div>
```

#### 带图标的输入框
```html
<div class="input-group">
  <div class="input-prefix">🔍</div>
  <input class="input input-with-prefix" placeholder="搜索" />
</div>
```

#### 输入框状态
```html
<input class="input input-error" placeholder="错误状态" />
<input class="input input-success" placeholder="成功状态" />
<input class="input input-disabled" placeholder="禁用状态" />
```

### 标签组件

```html
<span class="tag tag-primary">主要标签</span>
<span class="tag tag-secondary">次要标签</span>
<span class="tag tag-success">成功标签</span>
<span class="tag tag-warning">警告标签</span>
<span class="tag tag-error">错误标签</span>
<span class="tag tag-outline">轮廓标签</span>
```

### 徽章组件

```html
<span class="badge badge-primary">99+</span>
<span class="badge badge-secondary">新</span>
<span class="badge badge-success">完成</span>
<span class="badge badge-warning">警告</span>
```

### 头像组件

```html
<div class="avatar avatar-sm">A</div>
<div class="avatar avatar-md">B</div>
<div class="avatar avatar-lg">C</div>
<div class="avatar avatar-xl">D</div>
<div class="avatar avatar-lg avatar-ring">E</div>
```

### 加载组件

```html
<div class="loading">
  <div class="loading-spinner"></div>
  <span>加载中...</span>
</div>
```

### 空状态组件

```html
<div class="empty">
  <image class="empty-icon" src="/images/empty.png" />
  <div class="empty-title">暂无数据</div>
  <div class="empty-desc">这里还没有任何内容</div>
  <button class="empty-btn">立即创建</button>
</div>
```

## 工具类

### 文本颜色
```css
.text-primary    /* 主要文字 */
.text-secondary  /* 次要文字 */
.text-muted      /* 弱化文字 */
.text-disabled   /* 禁用文字 */
.text-brand      /* 品牌色文字 */
.text-success    /* 成功色文字 */
.text-warning    /* 警告色文字 */
.text-error      /* 错误色文字 */
```

### 文本大小
```css
.text-xs         /* 超小字体 */
.text-sm         /* 小字体 */
.text-md         /* 中等字体 */
.text-lg         /* 大字体 */
.text-xl         /* 超大字体 */
.text-2xl        /* 2倍大字体 */
.text-3xl        /* 3倍大字体 */
```

### 文本对齐
```css
.text-left       /* 左对齐 */
.text-center     /* 居中对齐 */
.text-right      /* 右对齐 */
```

### Flexbox 布局
```css
.flex            /* 弹性布局 */
.flex-inline     /* 行内弹性布局 */
.flex-col        /* 垂直方向 */
.flex-row        /* 水平方向 */
.flex-wrap       /* 换行 */
.flex-nowrap     /* 不换行 */

.items-start     /* 顶部对齐 */
.items-center    /* 居中对齐 */
.items-end       /* 底部对齐 */
.items-stretch   /* 拉伸对齐 */

.justify-start   /* 左对齐 */
.justify-center  /* 居中对齐 */
.justify-end     /* 右对齐 */
.justify-between /* 两端对齐 */
.justify-around  /* 环绕对齐 */
.justify-evenly  /* 均匀对齐 */
```

### 间距工具类
```css
.m-0, .mt-0, .mb-0, .ml-0, .mr-0     /* 0间距 */
.m-xs, .mt-xs, .mb-xs, .ml-xs, .mr-xs /* 超小间距 */
.m-sm, .mt-sm, .mb-sm, .ml-sm, .mr-sm /* 小间距 */
.m-md, .mt-md, .mb-md, .ml-md, .mr-md /* 中等间距 */
.m-lg, .mt-lg, .mb-lg, .ml-lg, .mr-lg /* 大间距 */
.m-xl, .mt-xl, .mb-xl, .ml-xl, .mr-xl /* 超大间距 */

.p-0, .pt-0, .pb-0, .pl-0, .pr-0     /* 0内边距 */
.p-xs, .pt-xs, .pb-xs, .pl-xs, .pr-xs /* 超小内边距 */
.p-sm, .pt-sm, .pb-sm, .pl-sm, .pr-sm /* 小内边距 */
.p-md, .pt-md, .pb-md, .pl-md, .pr-md /* 中等内边距 */
.p-lg, .pt-lg, .pb-lg, .pl-lg, .pr-lg /* 大内边距 */
.p-xl, .pt-xl, .pb-xl, .pl-xl, .pr-xl /* 超大内边距 */
```

### 圆角工具类
```css
.rounded-none    /* 无圆角 */
.rounded-sm      /* 小圆角 */
.rounded-md      /* 中等圆角 */
.rounded-lg      /* 大圆角 */
.rounded-xl      /* 超大圆角 */
.rounded-full    /* 完全圆角 */
```

### 阴影工具类
```css
.shadow-none     /* 无阴影 */
.shadow-sm       /* 小阴影 */
.shadow-md       /* 中等阴影 */
.shadow-lg       /* 大阴影 */
.shadow-xl       /* 超大阴影 */
```

### 显示工具类
```css
.hidden          /* 隐藏 */
.block           /* 块级显示 */
.inline          /* 行内显示 */
.inline-block    /* 行内块显示 */
```

### 定位工具类
```css
.relative        /* 相对定位 */
.absolute        /* 绝对定位 */
.fixed           /* 固定定位 */
.sticky          /* 粘性定位 */
```

### 变换工具类
```css
.scale-0         /* 缩放0 */
.scale-50        /* 缩放50% */
.scale-75        /* 缩放75% */
.scale-90        /* 缩放90% */
.scale-100       /* 缩放100% */
.scale-110       /* 缩放110% */
.scale-125       /* 缩放125% */
.scale-150       /* 缩放150% */
```

### 动画工具类
```css
.transition      /* 正常过渡 */
.transition-fast /* 快速过渡 */
.transition-slow /* 慢速过渡 */
```

## 页面设计

### 首页设计
- **导航栏**: 固定顶部，毛玻璃效果
- **搜索栏**: 粘性定位，圆角设计
- **分类区域**: 卡片式布局，渐变图标
- **商家推荐**: 横向滚动，阴影效果
- **内容列表**: 卡片式帖子，丰富交互

### 分类页面设计
- **搜索功能**: 顶部搜索栏
- **主要分类**: 垂直列表，大图标
- **热门分类**: 网格布局，小卡片
- **悬浮按钮**: 发布功能入口

### 个人中心设计
- **用户卡片**: 渐变背景，用户信息
- **统计信息**: 网格布局，数据展示
- **功能菜单**: 图标+文字，分类清晰
- **商家管理**: 状态展示，操作按钮
- **设置选项**: 列表式布局，开关控件

## 响应式设计

### 断点设置
```css
/* 小屏幕 */
@media (max-width: 750rpx) {
  /* 小屏幕样式 */
}

/* 大屏幕 */
@media (min-width: 751rpx) {
  /* 大屏幕样式 */
}
```

### 响应式工具类
```css
.sm\:hidden      /* 小屏幕隐藏 */
.lg\:hidden      /* 大屏幕隐藏 */
```

## 深色模式

### 深色模式变量
```css
@media (prefers-color-scheme: dark) {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-tertiary: #3d3d3d;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --text-muted: #808080;
  --border-light: #404040;
  --border-medium: #505050;
}
```

## 动画效果

### 淡入动画
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 旋转动画
```css
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

## 使用指南

### 1. 引入设计系统
在 `app.wxss` 中引入全局样式变量和组件样式。

### 2. 使用组件
根据需求选择合适的组件和工具类。

### 3. 自定义样式
可以通过修改CSS变量来调整主题色彩。

### 4. 响应式适配
使用响应式工具类和媒体查询适配不同屏幕。

### 5. 深色模式
系统自动检测并应用深色模式样式。

## 最佳实践

1. **一致性**: 保持设计语言的一致性
2. **可访问性**: 确保足够的对比度和可读性
3. **性能**: 合理使用动画和阴影效果
4. **维护性**: 使用CSS变量便于主题切换
5. **扩展性**: 设计系统支持功能扩展

## 更新日志

### v1.0.0 (2024-01-XX)
- 初始版本发布
- 基础组件库
- 响应式设计
- 深色模式支持
- 动画效果 