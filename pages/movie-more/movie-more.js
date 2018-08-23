// pages/movie-more/movie-more.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInTheaters: true,
    showComingSoon: false,
    inTheaters: {},
    comingSoon: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var typeId = options.typeId;
    if(typeId == 'inTheaters') {
      this.setData({
        showInTheaters: true,
        showComingSoon: false
      })
    }else {
      this.setData({
        showInTheaters: false,
        showComingSoon: true
      })
    }
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    this.getMovieList(typeId);
  },
  // 获取电影信息
  getMovieList(typeId) {
    // 资源懒加载需要：offset资源定位，total资源总数
    var offset = this.data[typeId].offset || 0;
    var total = this.data[typeId].total || 999;
    if (offset >= total) {
      return;
    }

    var url = app.globalData.doubanBase + app.globalData[typeId];
    // url = typeId == 'inTheaters' ? 'https://www.easy-mock.com/mock/5ad5b0892491db68a7782f0b/douban/inTheaters' : 'https://www.easy-mock.com/mock/5ad5b0892491db68a7782f0b/douban/comingSoon'; // 手机调试接口,mock数据
    var self = this;
    // 发送请求
    wx.request({
      url,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      data: {
        start: offset,
        count: 5
      },
      success(res) {
        console.log(res);

        var resArr = [];
        var subjects = res.data.subjects;
        subjects.forEach(item => {
          resArr.push({
            allCasts: item.casts.map(i => i.name).join('/'),
            allDirectors: item.directors.map(i => i.name).join('/'),
            allGenres: item.genres.join('/'),
            type: typeId,
            ...item
          })
        })
        var movies = self.data[typeId].movies || [];
        movies = movies.concat(resArr);
        self.setData({
          [typeId]: {
            offset: res.data.start + res.data.count, //请求成功，资源定位加5
            total: res.data.total,
            movies
          }
        }) 
      },
      fail(err) {
        console.log(err);
      },
      complete() {
        wx.hideToast();
      }
    })
  },
  // 切换tab栏
  bindSelect(event) {
    var tabId = event.currentTarget.dataset.tabId;
    if (tabId == 'inTheaters') {
      this.setData({
        showInTheaters: true,
        showComingSoon: false
      })
    } else {
      this.setData({
        showInTheaters: false,
        showComingSoon: true
      })
    }

    // 已经有相应数据就不重新加载
    if (this.data[tabId].movies && this.data[tabId].movies.length > 0) {
      return;
    }

    this.getMovieList(tabId);
  },
  handlelower() {
    var typeId;
    if(this.data.showInTheaters) {
      typeId = 'inTheaters';
    }else {
      typeId = 'comingSoon';
    }

    this.getMovieList(typeId);
  },

  // 跳转详情页
  bindToDetail(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + id
    })
  },
  // 滚动到底，加载更多
  bindToMore() {
    var typeId;
    if(this.data.showInTheaters) {
      typeId = 'inTheaters';
    }else {
      typeId = 'comingSoon';
    }
    this.getMovieList(typeId);
  },
  // 处理购票
  handleBuy() {
    wx.showModal({
      title: '提示',
      content: '用户点击购票',
    })
  },
  // 处理想看
  handleWish() {
    wx.showModal({
      title: '提示',
      content: '那就去看吧',
    })
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