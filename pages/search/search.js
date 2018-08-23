// pages/search/search.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInp: '',
    resultArr: [],
    timer: null  //
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // 返回首页
  bindToHome() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 清除输入
  clearInput(e) {
    this.setData({
      searchInp: '',
      resultArr: []
    })
  },
  // 防抖
  debounce(func, wait, immediate) {
    var self = this;
    return function() {
      var _args = arguments;
      clearTimeout(self.timer);

      if(immediate) {
        if(!self.timer) func(..._args);

        self.timer = setTimeout(function() {
          self.timer = null;
        }, wait);
      }else {
        self.timer = setTimeout(function() {
          func(..._args);
        }, wait)
      }
    }
  },
  // 防抖版获取数据: 用防抖函数封装获取数据函数
  debounceSearchMovie(e) {
    return this.debounce(this.searchMovie, 200, false)(e);
  },
  // 获取数据
  searchMovie(e) {
    var self = this;
    var keyWord = e.detail.value;
    var url = app.globalData.doubanBase + app.globalData.searchMovie + keyWord + '&start=0&count=10';
    // url = 'https://www.easy-mock.com/mock/5ad5b0892491db68a7782f0b/douban/movieData';  // 手机调试接口,mock数据
    console.log(url);
    wx.request({
      url,
      method: 'GET',
      header: {
        'content-type': 'json' //不能是application/json 
      },
      success(res) {
        self.arrangeData(res.data.subjects);
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  // 处理接收到的数据
  arrangeData(res) {
    var resultArr = [];
    resultArr = res.map(item => {      
      let totaldir = item.directors.map(i => i.name).join(' / ');
      let total = item.rating.average + '分 / ' + item.year + ' / ' + totaldir; 
      return {
        id: item.id,
        title: item.title,
        image: item.images.small,
        total
      }
    })
    this.setData({
      resultArr
    })
  },
  // 跳转到详情页
  bindToDetail(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + id,
    })
  }  
})