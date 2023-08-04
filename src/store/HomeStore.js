import React from 'react';
import {action, observable} from "mobx";
import {findBall, findList} from "../config/Http";
import {Const} from "../config/Const";

export default class HomeStore {
  cursor = "";
  @observable refreshing = false;
  @observable hasMore = true;
  @observable homeList = [];

  @action
  resetList = () => {
    this.cursor = "";
    this.hasMore = true;
  }
  homeListData = async () => {
    if (this.refreshing) {
      return
    }
    if (!this.hasMore) {
      return
    }
    let ball
    try {
      if (!this.cursor) {
        //下拉刷新
        this.refreshing = true
        ball = await findBall({timestamp: new Date().getTime(), cookie: Const.token});
      }
      const res = await findList({cookie: Const.token, cursor: this.cursor})
      let newData = res.blocks;
      if (!this.cursor && ball) {
        newData.splice(1, 0, {blockCode: 'HEADER_TOP', data: ball})
      }
      if (!this.cursor) {
        this.homeList = newData
      } else {
        this.homeList = [...this.homeList, ...newData];
      }
      if (res?.cursor) {
        this.cursor = res?.cursor
      }
      this.hasMore = res?.hasMore
    }catch (e) {

    }finally {
      this.refreshing = false
    }

  }
}
