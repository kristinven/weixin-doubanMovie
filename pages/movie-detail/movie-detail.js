// pages/movie-detail/movie-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFold: true,
    hasWished: false,
    hasWatched: false 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    this.getSubject(id);
  },
  // 获取电影条目信息
  getSubject(id) {
    var url = app.globalData.doubanBase + app.globalData.subject + id;
    // url = 'https://www.easy-mock.com/mock/5ad5b0892491db68a7782f0b/douban/subject';  // 手机调试接口,mock数据
    wx.request({
      url,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: res => {
        var data = res.data;
        let allGenres = data.year + ' /' + data.genres.join(' / ');
        let allCountries = data.countries.join(' / ');
        data.directors.forEach(i => i.type = 'director');
        let direCasts = data.directors.concat(data.casts);
        this.setData({
          allGenres,
          allCountries,
          direCasts,
          ...data
        })
      },
      fail: err => {
        console.log(err);
      },
      complete() {
        wx.hideToast();
      }
    })
  },
  // 展开或收起所有简介
  toggleFold() {
    if(this.data.isFold) {
      this.setData({
        isFold: false
      });
    }else {
      this.setData({
        isFold: true
      })
    }
  },
  // 跳转详情页
  bindToPoster(event) {
    var src = event.currentTarget.dataset.src;
    wx.navigateTo({
      url: '../poster/poster?src=' + src
    })
  },
  // 跳转影人页
  bindToCelebrity(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-celebrity/movie-celebrity?id=' + id
    })
  },
  // 处理想看 
  handleWish() {
    if(!this.data.hasWished) {
      this.setData({
        hasWished: true,
        hasWatched: true
      })
      var newCount = this.data.wish_count + 1;
      this.setData({
        wish_count: newCount
      })
    }
  },
  // 处理看过
  handleDone() {
    if(!this.data.hasWatched) {
      this.setData({
        hasWished: true,
        hasWatched: true
      })
      var newCount = this.data.reviews_count + 1;
      this.setData({
        reviews_count: newCount
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})