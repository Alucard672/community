// 帖子详情页面逻辑
const app = getApp()

Page({
  data: {
    // 帖子信息
    post: null,
    
    // 评论列表
    comments: [],
    
    // 相关推荐
    relatedPosts: [],
    
    // 评论输入
    showCommentInput: false,
    commentText: '',
    
    // 加载状态
    loading: true
  },

  onLoad(options) {
    const postId = options.id
    if (postId) {
      this.loadPostDetail(postId)
      this.loadComments(postId)
      this.loadRelatedPosts(postId)
    }
  },

  // 加载帖子详情
  async loadPostDetail(postId) {
    try {
      this.setData({ loading: true })
      
      // 模拟加载帖子数据
      const mockPost = {
        id: postId,
        author: {
          id: 1,
          name: '张三',
          avatar: '/images/avatar1.jpg',
          isFollowed: false
        },
        title: 'iPhone 13 Pro Max 256G 深空灰',
        desc: '9成新，无划痕，电池健康度95%，原装充电器，价格可议。机器保养得很好，外观基本无磨损，电池循环次数少，性能强劲。',
        images: [
          '/images/post1.jpg',
          '/images/post2.jpg',
          '/images/post3.jpg'
        ],
        tags: ['数码产品', '苹果', '手机'],
        price: '¥5999',
        location: '北京市朝阳区',
        category: '二手交易',
        time: '2小时前',
        stats: {
          views: '1.2k',
          likes: '89',
          comments: '23'
        },
        isLiked: false
      }
      
      this.setData({
        post: mockPost,
        loading: false
      })
      
      console.log('加载帖子详情成功:', mockPost)
    } catch (error) {
      console.error('加载帖子详情失败:', error)
      this.setData({ loading: false })
    }
  },

  // 加载评论列表
  async loadComments(postId) {
    try {
      // 模拟评论数据
      const mockComments = [
        {
          id: 1,
          author: {
            name: '李四',
            avatar: '/images/avatar2.jpg'
          },
          content: '价格还可以，能再便宜点吗？',
          time: '1小时前',
          likes: 5,
          isLiked: false
        },
        {
          id: 2,
          author: {
            name: '王五',
            avatar: '/images/avatar1.jpg'
          },
          content: '机器看起来不错，有发票吗？',
          time: '30分钟前',
          likes: 3,
          isLiked: true
        }
      ]
      
      this.setData({ comments: mockComments })
      console.log('加载评论成功:', mockComments)
    } catch (error) {
      console.error('加载评论失败:', error)
    }
  },

  // 加载相关推荐
  async loadRelatedPosts(postId) {
    try {
      // 模拟相关推荐数据
      const mockRelated = [
        {
          id: 2,
          title: 'MacBook Pro 2021款 M1芯片',
          cover: '/images/post2.jpg',
          price: '¥8999'
        },
        {
          id: 3,
          title: 'iPad Pro 2023款 11寸',
          cover: '/images/post3.jpg',
          price: '¥5999'
        }
      ]
      
      this.setData({ relatedPosts: mockRelated })
      console.log('加载相关推荐成功:', mockRelated)
    } catch (error) {
      console.error('加载相关推荐失败:', error)
    }
  },

  // 关注作者
  followAuthor() {
    const post = this.data.post
    post.author.isFollowed = true
    this.setData({ post })
    
    wx.showToast({
      title: '关注成功',
      icon: 'success'
    })
  },

  // 取消关注
  unfollowAuthor() {
    const post = this.data.post
    post.author.isFollowed = false
    this.setData({ post })
    
    wx.showToast({
      title: '已取消关注',
      icon: 'success'
    })
  },

  // 切换点赞状态
  toggleLike() {
    const post = this.data.post
    post.isLiked = !post.isLiked
    post.stats.likes = post.isLiked ? 
      (parseInt(post.stats.likes) + 1).toString() : 
      (parseInt(post.stats.likes) - 1).toString()
    
    this.setData({ post })
    
    wx.showToast({
      title: post.isLiked ? '点赞成功' : '已取消点赞',
      icon: 'success'
    })
  },

  // 显示评论输入框
  showCommentInput() {
    this.setData({ showCommentInput: true })
  },

  // 隐藏评论输入框
  hideCommentInput() {
    this.setData({ 
      showCommentInput: false,
      commentText: ''
    })
  },

  // 评论输入
  onCommentInput(e) {
    this.setData({
      commentText: e.detail.value
    })
  },

  // 提交评论
  async submitComment() {
    const { commentText, post } = this.data
    
    if (!commentText.trim()) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
      return
    }

    try {
      // 模拟提交评论
      const newComment = {
        id: Date.now(),
        author: {
          name: '我',
          avatar: '/images/avatar1.jpg'
        },
        content: commentText,
        time: '刚刚',
        likes: 0,
        isLiked: false
      }
      
      const comments = [newComment, ...this.data.comments]
      this.setData({ 
        comments,
        showCommentInput: false,
        commentText: ''
      })
      
      // 更新帖子评论数
      const updatedPost = this.data.post
      updatedPost.stats.comments = (parseInt(updatedPost.stats.comments) + 1).toString()
      this.setData({ post: updatedPost })
      
      wx.showToast({
        title: '评论成功',
        icon: 'success'
      })
    } catch (error) {
      console.error('提交评论失败:', error)
      wx.showToast({
        title: '评论失败，请重试',
        icon: 'none'
      })
    }
  },

  // 点赞评论
  likeComment(e) {
    const commentId = e.currentTarget.dataset.id
    const comments = this.data.comments.map(comment => {
      if (comment.id === commentId) {
        comment.isLiked = !comment.isLiked
        comment.likes = comment.isLiked ? comment.likes + 1 : comment.likes - 1
      }
      return comment
    })
    
    this.setData({ comments })
  },

  // 回复评论
  replyComment(e) {
    const comment = e.currentTarget.dataset.comment
    this.setData({
      showCommentInput: true,
      commentText: `回复 @${comment.author.name}：`
    })
  },

  // 分享帖子
  sharePost() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  // 举报帖子
  reportPost() {
    wx.showActionSheet({
      itemList: ['虚假信息', '违法内容', '垃圾广告', '其他'],
      success: (res) => {
        wx.showToast({
          title: '举报成功',
          icon: 'success'
        })
      }
    })
  },

  // 预览图片
  previewImage(e) {
    const current = e.currentTarget.dataset.url
    const urls = e.currentTarget.dataset.urls
    
    wx.previewImage({
      current,
      urls
    })
  },

  // 跳转到其他帖子
  goToPost(e) {
    const post = e.currentTarget.dataset.post
    wx.navigateTo({
      url: `/pages/post/post?id=${post.id}`
    })
  },

  // 分享给朋友
  onShareAppMessage() {
    const { post } = this.data
    return {
      title: post.title,
      path: `/pages/post/post?id=${post.id}`,
      imageUrl: post.images && post.images.length > 0 ? post.images[0] : ''
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    const { post } = this.data
    return {
      title: post.title,
      imageUrl: post.images && post.images.length > 0 ? post.images[0] : ''
    }
  }
}) 