// pages/home-video/index.js
import { getTopMV } from "../../network/api_video";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMVs: [],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTopMVData(0)
  },
  

  //下拉刷新
  onPullDownRefresh: function (params) {
    this.getTopMVData(0)
  },

  // 滑动到底部，加载数据
   onReachBottom() {
    this.getTopMVData(this.data.topMVs.length)
  },

  //网络请求方法封装
  async getTopMVData(offset) {
    // 判断是否可以请求
    if (!this.data.hasMore && offset !== 0) return

    // 展示加载动画
    wx.showNavigationBarLoading()

    // 真正的请求
    const res = await getTopMV(offset)
    let newData = this.data.topMVs
    if (offset == 0 ) {
      newData = res.data
    } else {
      newData = newData.concat(res.data)
    }
    this.setData( { topMVs: newData})
    this.setData( { hasMore: res.hasMore})
    wx.hideNavigationBarLoading()
    if (offset == 0) {
      wx.stopPullDownRefresh()
    }
  },


  // 事件处理方法
  handleItemClick (event) {
    const id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/detail-video/index?id=' + id,
    })
  }



})