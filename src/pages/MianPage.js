import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  FlatList
} from 'react-native';

import {Const} from "../config/Const";
import AndroidBackPress from "../navigator/AndroidBackPress";
import {findBall, findList, hotTopic} from "../config/Http";
import {Carousels, imageHeight} from "../widget/Carousel";
import {TopicView} from "../widget/TopicView";
import HomeStore from "../store/HomeStore";
import {observer, useLocalStore} from "mobx-react";
import {LFlatList} from "../component/LFlatList";

const MainPage = () => {
  const store = useLocalStore(() => new HomeStore());

  useEffect(() => {
    const androidBack = new AndroidBackPress();
    store.homeListData()
    return androidBack.remove;
  }, []);

  const renderHeaderTop = (data) => {
    let view = [];
    data.forEach((it, i) => {
      view.push(<View key={i}
                      style={{
                        margin: 10, padding: 10, alignItems: 'center',
                        justifyContent: 'center'
                      }}
      >
        <View style={{
          backgroundColor: '#FEF2F2', borderRadius: 50,
          width: 50, height: 50,
          marginBottom: 8,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image source={{uri: it.iconUrl}} style={{tintColor: '#FB5B5F', height: 40, width: 40}}/>
        </View>
        <Text>
          {it.name}
        </Text>
      </View>)
    })
    return view
  }
  const renderResource = (resource, i, size) => {
    return (<View key={i}
                  style={{
                    margin: 5, alignItems: 'center',
                    marginLeft: i === 0 ? 15 : 5,
                    marginRight: i === size - 1 ? 15 : 5,
                    justifyContent: 'center',
                  }}
    >
      <Image source={{uri: resource?.uiElement?.image?.imageUrl}}
             style={{height: 120, flex: 1, width: 120, borderRadius: 5}}/>
      <Text numberOfLines={2} style={{marginTop: 5, height: 44, maxWidth: 120}}>
        {resource?.uiElement?.mainTitle?.title}
      </Text>
    </View>)
  }
  const renderHotView = (creatives) => {
    let data = [];
    creatives?.map((creative) => {
      creative?.resources?.forEach((resource) => {
        data.push(resource)
      })
    })
    let view = [];
    data?.forEach((item, index) => {
      view.push(<TopicView key={index} item={item}/>)
    })
    return view;
  }
  const renderCreatives = (data) => {
    let view = [];
    data.forEach((it, i) => {
      let resources = it.resources || []
      view.push(renderResource(resources[0], i, data.length))
    })
    return view
  }
  const renderItem = (item, index) => {
    switch (item.blockCode) {
      case 'HOMEPAGE_BANNER':
        if (!Boolean(item?.extInfo?.banners)) {
          return null;
        }
        return (
          <Carousels data={item.extInfo.banners}/>)
      case 'HEADER_TOP':
        return (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {renderHeaderTop(item.data)}
          </ScrollView>)
        break;
      case 'HOMEPAGE_BLOCK_PLAYLIST_RCMD':
        // console.log(JSON.stringify(item))
        return <View>
          <View
            style={{flex: 1, marginHorizontal: 15, marginVertical: 5, flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, flex: 1}}>
              {item?.uiElement?.subTitle?.title + " >"}
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              {item?.uiElement?.button?.text}
            </Text>
          </View>
          <ScrollView
            bouncesZoom={true}
            horizontal={true}
            minimumZoomScale={100}
            snapToInterval={130}
            snapToAlignment={"end"}
            showsHorizontalScrollIndicator={false}>
            {renderCreatives(item?.creatives)}
          </ScrollView>
        </View>
        break;
      case 'HOMEPAGE_BLOCK_HOT_TOPIC':
        return (
          <View>
            <Text> {item.uiElement?.subTitle?.title}</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {renderHotView(item.creatives)}
            </ScrollView>
          </View>)
        break;
      case 'HOMEPAGE_BLOCK_STYLE_RCMD':
        // console.log(JSON.stringify(item))
        return (<View>

        </View>)
        break;
      default:
        // console.log(JSON.stringify(item.blockCode),item.uiElement?.subTitle?.title)
        return (<Text style={{fontFamily: 'bold', flex: 1}}>
          {item.uiElement?.subTitle?.title}
        </Text>)
    }

  }
  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>
      <StatusBar barStyle="dark-content"/>
      <LFlatList
        data={store.homeList}
        style={{flex: 1}}
        refreshing={store.refreshing}
        hasMore={store.hasMore}
        extraData={[store.homeList]}
        // ListEmptyComponent={listEmptyView}
        renderItem={({item, index}) => renderItem(item, index)}
        onRefresh={() => {
          store.resetList();
          store.homeListData();
        }}
        onLoadMore={() => {
          store.homeListData();
        }}
      />
    </View>
  );
}
export default observer(MainPage);
const styles = StyleSheet.create({

  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain'
  },
  containerStyle: {
    width: 120,
    height: imageHeight,
    borderRadius: 8,
  },
  paginationView: {
    justifyContent: "center",
    alignItems: "center",
  },
  paginationContainer: {
    position: "absolute",//绝对定位
    top: -20,
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainerStyle: {
    marginHorizontal: 6,
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.92)"
  },
  indicatorContainerStyle: {
    alignItems: "center",
    paddingVertical: 10,
  },
  indicatorStyle: {
    margin: 10,
  },
  footerTextStyle: {
    fontSize: 12,
    color: '#000',
    marginBottom: 5,
  },

});

