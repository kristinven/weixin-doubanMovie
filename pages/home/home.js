// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: [],
    comingSoon: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var inTheatersUrl = app.globalData.doubanBase + app.globalData.inTheaters + '?start=0&count=10';
    var comingSoonUrl = app.globalData.doubanBase + app.globalData.comingSoon + '?start=0&count=10';

    // inTheatersUrl = 'https://www.easy-mock.com/mock/5ad5b0892491db68a7782f0b/douban/inTheaters';  // 手机调试接口,mock数据
    // comingSoonUrl = 'https://www.easy-mock.com/mock/5ad5b0892491db68a7782f0b/douban/comingSoon';  // 手机调试接口,mock数据
     
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    this.getDataList(inTheatersUrl, 'inTheaters');
    this.getDataList(comingSoonUrl, 'comingSoon');
  },
  getDataList(url, type) {
    var self = this;
    wx.request({
      url,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {
        self.setData({[type]: res.data.subjects})
      },
      fail(err){
        console.log(err);
      },
      complete(){
        wx.hideToast();
      }
    })
  },

  bindToSearch() {
    wx.navigateTo({
      url: '../search/search',
    })
  },

  // 更多
  bindToMore(event) {
    var typeId = event.currentTarget.dataset.typeId;
    wx.navigateTo({
      url: '../movie-more/movie-more?typeId=' + typeId
    });
  },
  // 跳转详情页
  bindToDetail(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + id
    })
  }



})