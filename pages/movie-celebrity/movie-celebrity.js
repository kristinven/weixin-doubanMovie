// pages/movie-cast/movie-cast.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFold: true,
    // 以下几个数据，因为豆瓣api不开放到公开接口，所以暂时伪造数据用于展示
    professions: '导演/制片/编剧/演员',
    summary: `黄渤不但具有专业的表演素质，在他身上更散发着来自内心的真实与质朴。他曾经做过歌手、节目主持人和舞蹈编导，后来又经过了专业的配音学习，这些丰富的人生经历，使他更具备了优于其他演艺新人的专业素质。
    　　黄渤毕业于北京电影学院配音专业。在就读电影学院之前就参加过管虎导演的作品演出，包括大家熟悉的电视电影《上车，走吧》、电视剧《黑洞》。其中《上车，走吧》不但获得了该年度的金鸡奖最佳电视电影奖，黄渤更凭片中的出色演出，受到了业内人士及广大观众对其演技的认可。《生存之民工》是黄渤与导演管虎的第三次合作，两人已默契十足，管虎在黄渤身上发掘出更深层的潜质。剧中他朴实、自然的表演受到了导演和前辈演员们的大力肯定。他还曾为《海底总动员》、《加勒比海盗》、《绿巨人》、《谁陷害了兔子罗杰》等大片做中文配音。
    　　2006年，黄渤出演的两部电影都在暑期上映，一部是《新街口》，另一部是《疯狂的石头》，后者受到票房和口碑的双重好评，而黄渤主演的黑皮更是博得大多数观众的喝彩，在电影方面可以说上了一个新的台阶。
    　　之后黄渤作品不断，两部《大电影》、《大灌篮》、与香港电影人合作的《每当变幻时》、《高兴》等等，都见证着黄渤演技的日益精进。2009年黄渤更是一口气推出《疯狂的赛车》、《斗牛》、《铁人》、《倔强萝卜》等多部影片，风头无两。并凭借在《斗牛》中的精彩表现，获得第46届台湾电影金马奖影帝桂冠。`,
    fans: 12345,
    birthday: '1974-08-26'
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
    this.getCast(id);
  },
  // 获取影人信息
  getCast(id) {
    var url = app.globalData.doubanBase + app.globalData.celebrity + id;
    // url = 'https://www.easy-mock.com/mock/5ad5b0892491db68a7782f0b/douban/celebrity' // 手机调试接口,mock数据
    wx.request({
      url,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: res => {
        this.setData({
          ...res.data
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
  // 展开或收起简介内容
  toggleFold() {
    if(this.data.isFold) {
      this.setData({
        isFold: false
      })
    }else {
      this.setData({
        isFold: true
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