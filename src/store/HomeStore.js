import React from 'react';
import {action, observable} from "mobx";
import {findBall, findList} from "../config/Http";
import {Const} from "../config/Const";

export default class HomeStore {
  @observable cursor = "";
  @observable refreshing = false;
  @observable hasMore = true;
  @observable homeList = [];
  @observable total = 0;
  @observable canLoadMore = true;
  @action
  resetHome = () => {
    this.cursor = "";
  }
  @action
  setCanLoadMore = (canLoadMore) => {
    this.canLoadMore = canLoadMore;
  }


  resetHomeListData=()=>{
    this.resetHome();
    this.homeListData();
  }
  homeListData = async () => {
    if (this.refreshing) {
      return
    }
    try {
      this.refreshing = true
      const ball = await findBall(
        {
          timestamp: new Date().getTime(),
          cookie: Const.token
        });
      const res = await findList(
        {
          timestamp: new Date().getTime(),
          cookie: Const.token,
          // offset: 30,
          cursor: this.cursor
        })
      let newData = res.blocks;
      if (!this.cursor) {
        newData.splice(1, 0, {blockCode: 'header_top', data: ball})
      }
      if (!this.cursor) {
        this.homeList = newData
      } else {
        this.homeList = [...this.homeList, ...newData];
      }
      this.cursor = res?.cursor
      this.hasMore = res?.hasMore
      if (res.hasMore) {
        this.total = this.homeList.length + 6
      } else {
        this.total = this.homeList.length
      }
    } catch (e) {

    } finally {
      this.refreshing = false
    }
  }
}
