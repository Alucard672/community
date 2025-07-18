Component({
  properties: {
    post: {
      type: Object,
      value: {}
    }
  },
  data: {},
  methods: {
    onPostTap() {
      const postId = this.data.post._id;
      wx.navigateTo({
        url: `/pages/post/post?id=${postId}`
      });
    }
  }
});