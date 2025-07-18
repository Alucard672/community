Component({
  properties: {
    shop: {
      type: Object,
      value: {}
    }
  },
  data: {},
  methods: {
    onShopTap() {
      const shopId = this.data.shop._id;
      wx.navigateTo({
        url: `/pages/shop-detail/shop-detail?id=${shopId}`
      });
    }
  }
});