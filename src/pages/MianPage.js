import React, {useEffect, useState,useCallback} from 'react';
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
import SnapCarousel, {ParallaxImage} from "react-native-snap-carousel";
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";
import {HotCarousels} from "../widget/HotCarousel";
import {Longlist} from "beeshell";
import {hp, viewportWidth} from "../utils/utils";
import {TopicView} from "../widget/TopicView";
import HomeStore from "../store/HomeStore";
import {observer, useLocalStore} from "mobx-react";

const MainPage = () => {

  const store = useLocalStore(() => new HomeStore());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(16);
  const [cursor, setCursor] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const androidBack = new AndroidBackPress();
    store.homeListData()
    // findsList(true);
    // top()
    return androidBack.remove;
  }, []);
  const top = async () => {
    const res = await hotTopic({
      timestamp: new Date().getTime(),
      cookie: Const.token
    })
    alert(JSON.stringify(res))
  }
  const findsList = async (isRefresh) => {
    if (isRefresh) {
      setCursor('');
      setData([]);
    }
    Promise.all(
      [findBall(
        {
          timestamp: new Date().getTime(),
          cookie: Const.token
        }), findList(
        {
          timestamp: new Date().getTime(),
          cookie: Const.token,
          offset: 30,
          cursor: cursor
        })])
      .then(function (results) {
        let res = results[1];
        let newData = res.blocks;
        if (isRefresh) {
          const ball = results[0];
          newData.splice(1, 0, {blockCode: 'header_top', data: ball})
        }
        setCursor(res.cursor)
        setData((v) => (isRefresh ? newData : [...data, ...newData]));

        if (res.hasMore) {
          // setTotal(total+6)
        }
      });
  }
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

  const renderResource1 = (resource) => {
    // @ts-ignore
    console.log('resource', resource)
    return <View
      style={{
        margin: 5, alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Image source={{uri: resource?.uiElement?.image?.imageUrl}}
             style={{width: 120, height: 120}}
             containerStyle={styles.containerStyle}
             parallaxFactor={0.4}
             showSpinner
             spinnerColor="rgba(0,0,0,0.25)"/>
      <Text numberOfLines={2} style={{marginTop: 5, maxWidth: 120}}>
        {resource?.uiElement?.mainTitle?.title}
      </Text>
    </View>
  };
  const renderResource = (resource, i) => {
    return (<View key={i}
                  style={{
                    margin: 5, alignItems: 'center',
                    justifyContent: 'center'
                  }}
    >
      <Image source={{uri: resource?.uiElement?.image?.imageUrl}}
             style={{height: 120, width: 120, borderRadius: 5}}/>
      <Text numberOfLines={2} style={{marginTop: 5, maxWidth: 120}}>
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
      // console.log(item?.uiElement?.rcmdShowType)
      view.push(<TopicView key={index} item={item}/>)
    })
    return view;
  }
  const renderCreatives = (data) => {

    let view = [];
    data.forEach((it, i) => {
      let resources = it.resources || []
      // console.log(JSON.stringify(resources[0]))
      // if(i===0){
      //     view.push(<View key={i}
      //                     style={{margin:5, alignItems:'center',
      //                         justifyContent:'center'}}
      //     >
      //         <SnapCarousel
      //             data={resources}
      //             renderItem={(resource,i)=>renderResource1(resource.item)}
      //             sliderWidth={120}
      //             onSnapToItem={(index)=>{
      //                 setActiveSlide(index)
      //             }}
      //             itemWidth={120}
      //             loop
      //             autoplay
      //         />
      //     </View>)
      // }else {
      //
      // }
      view.push(renderResource(resources[0], 10 + i))

    })
    return view
  }
  const renderItem = (item, index) => {
    // console.log(item.blockCode)
    switch (item.blockCode) {
      // case 'HOMEPAGE_BANNER':
      //   if (item.extInfo.banners) {
      //     return (
      //       <Carousels data={item.extInfo.banners}/>)
      //     //   <CarouselView
      //     // entries={item.extInfo.banners}/>)
      //   } else {
      //     return null;
      //   }
      case 'header_top':
        return <ScrollView horizontal={true}>
          {renderHeaderTop(item.data)}
        </ScrollView>
        break;
      case 'HOMEPAGE_BLOCK_PLAYLIST_RCMD':
        // console.log(JSON.stringify(item))
        return <View>
          <View style={{flex: 1, margin: 10, flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'bold', flex: 1}}>
              {item.uiElement?.subTitle?.title}
            </Text>
            <Text style={{fontFamily: 'bold'}}>
              {item.uiElement?.button?.text}
            </Text>
          </View>
          <ScrollView horizontal={true}>
            {renderCreatives(item.creatives)}
          </ScrollView>

        </View>
        break;
      case 'HOMEPAGE_BLOCK_HOT_TOPIC':
        // console.log(JSON.stringify(item.creatives))

        return (
          <View>
            <Text> {item.uiElement?.subTitle?.title}</Text>
            {/*{item.creatives&&<HotCarousels data={item.creatives}/>}*/}
            <ScrollView horizontal={true}>
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
  const refreshControl = () => (
    <RefreshControl
      title={"刷新中..."}
      titleColor={["#2F54EB"]} //只有ios有效
      colors={["#2F54EB"]}
      tintColor={["#2F54EB"]}
      refreshing={store.refreshing}
      onRefresh={() => {
        store.resetHome();
        store.homeListData();
      }}
    />
  );
  const footerView = useCallback(
    () =>
      store.refreshing ? null : store.hasMore ? (
        <View style={styles.indicatorContainerStyle}>
          <ActivityIndicator
            color={"#2F54EB"}
            style={styles.indicatorStyle}
            size={"small"}
            animating={true}
          />
          <Text style={styles.footerTextStyle}>{"正在加载更多数据"}</Text>
        </View>
      ) : data?.length > 0 ? (
        <View style={styles.indicatorContainerStyle}>
          <Text style={styles.footerTextStyle}>{"没有更多数据了"}</Text>
        </View>
      ) : null,
    [store.homeList,  store.refreshing]
  );

  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>
      <StatusBar barStyle="dark-content"/>
      <FlatList
        data={store.homeList}
        style={{flex: 1}}
        extraData={[store.refreshing]}
        keyExtractor={(item, index) => index.toString()}
        // ListEmptyComponent={listEmptyView}
        renderItem={({item, index}) => renderItem(item, index)}
        refreshControl={refreshControl()}
        keyboardShouldPersistTaps="handled"
        ListFooterComponent={footerView}
        onEndReached={
          () => {
            if (store?.canLoadMore) {
              store.setCanLoadMore(false)
            }
          }
        }
        onScrollBeginDrag={() => {
          store.setCanLoadMore(true)
        }}
        onEndReachedThreshold={0.1}
      />
      {/*<Longlist*/}
      {/*  total={store.total}*/}
      {/*  data={store.homeList}*/}
      {/*  extraData={[store.refreshing]}*/}
      {/*  keyExtractor={(item, index) => index.toString()}*/}
      {/*  renderItem={({item, index}) => renderItem(item, index)}*/}
      {/*  onEndReached={() =>  store.homeListData()}*/}
      {/*  onRefresh={() =>store.resetHomeListData()}*/}
      {/*/>*/}
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

