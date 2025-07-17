// columns.js
Page({
  data: {
    // 页面数据
  },

  onLoad() {
    console.log('分列页面加载完成');
  },

  // 返回首页
  goBack() {
    wx.navigateBack();
  },

  // 演示项目点击
  onDemoItemTap(e) {
    const text = e.currentTarget.dataset.text;
    wx.showToast({
      title: `点击了: ${text}`,
      icon: 'none'
    });
  },

  // 分类项目点击
  onCategoryTap(e) {
    const category = e.currentTarget.dataset.category;
    wx.showToast({
      title: `选择了: ${category}`,
      icon: 'none'
    });
  },

  // 网格项目点击
  onGridItemTap(e) {
    const index = e.currentTarget.dataset.index;
    wx.showToast({
      title: `网格项目 ${index}`,
      icon: 'none'
    });
  },

  // 按钮点击
  onButtonTap(e) {
    const type = e.currentTarget.dataset.type;
    wx.showToast({
      title: `${type}按钮`,
      icon: 'none'
    });
  },

  // 标签点击
  onTagTap(e) {
    const tag = e.currentTarget.dataset.tag;
    wx.showToast({
      title: `标签: ${tag}`,
      icon: 'none'
    });
  },

  // 统计项目点击
  onStatTap(e) {
    const stat = e.currentTarget.dataset.stat;
    wx.showToast({
      title: `统计: ${stat}`,
      icon: 'none'
    });
  },

  // 搜索输入
  onSearchInput(e) {
    const value = e.detail.value;
    console.log('搜索内容:', value);
  },

  // 选择位置
  onLocationTap() {
    wx.showToast({
      title: '选择位置',
      icon: 'none'
    });
  }
}); 