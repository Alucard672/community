// 举报功能工具
class ReportManager {
  // 举报类型
  static REPORT_TYPES = {
    SPAM: 'spam',           // 垃圾信息
    ILLEGAL: 'illegal',     // 违法信息
    FRAUD: 'fraud',         // 诈骗信息
    HARASSMENT: 'harassment', // 骚扰信息
    COPYRIGHT: 'copyright',  // 版权问题
    OTHER: 'other'          // 其他
  }

  // 举报内容
  async reportContent(contentType, contentId, reason, description = '') {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'report',
        data: {
          action: 'report',
          contentType: contentType, // post, comment, user, shop
          contentId: contentId,
          reason: reason,
          description: description
        }
      })
      
      if (result.success) {
        wx.showToast({
          title: '举报成功',
          icon: 'success'
        })
        return true
      } else {
        wx.showToast({
          title: result.message || '举报失败',
          icon: 'none'
        })
        return false
      }
    } catch (error) {
      console.error('举报失败:', error)
      wx.showToast({
        title: '举报失败，请稍后重试',
        icon: 'none'
      })
      return false
    }
  }

  // 显示举报对话框
  showReportDialog(contentType, contentId) {
    const reportTypes = [
      { value: ReportManager.REPORT_TYPES.SPAM, label: '垃圾信息' },
      { value: ReportManager.REPORT_TYPES.ILLEGAL, label: '违法信息' },
      { value: ReportManager.REPORT_TYPES.FRAUD, label: '诈骗信息' },
      { value: ReportManager.REPORT_TYPES.HARASSMENT, label: '骚扰信息' },
      { value: ReportManager.REPORT_TYPES.COPYRIGHT, label: '版权问题' },
      { value: ReportManager.REPORT_TYPES.OTHER, label: '其他' }
    ]

    wx.showActionSheet({
      itemList: reportTypes.map(item => item.label),
      success: (res) => {
        const selectedType = reportTypes[res.tapIndex]
        this.showReportDetailDialog(contentType, contentId, selectedType.value)
      }
    })
  }

  // 显示举报详情对话框
  showReportDetailDialog(contentType, contentId, reason) {
    wx.showModal({
      title: '举报详情',
      content: '请描述举报原因（选填）',
      editable: true,
      placeholderText: '请输入举报原因...',
      success: (res) => {
        if (res.confirm) {
          this.reportContent(contentType, contentId, reason, res.content)
        }
      }
    })
  }
}

export default new ReportManager() 