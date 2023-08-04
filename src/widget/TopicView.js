import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    RefreshControl,
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    FlatList
} from 'react-native';

import {Const} from "../config/Const";
import AndroidBackPress from "../navigator/AndroidBackPress";
import {findBall, findList, hotTopic, topicDetail} from "../config/Http";
import {Carousels, imageHeight} from "../widget/Carousel";
import SnapCarousel, {ParallaxImage} from "react-native-snap-carousel";
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";
import {HotCarousels} from "../widget/HotCarousel";
import {Longlist} from "beeshell";
import {hp, viewportWidth} from "../utils/utils";

export const TopicView = (props) => {
    const {item} = props
    const [url, setUrl] = useState("");
    useEffect(() => {
        detail();
    }, [item?.resourceId]);
    const detail = async () => {
        const res = await topicDetail({
            cookie: Const.token,
            actid: item?.resourceId
        })
        setUrl(res?.sharePicUrl)
    }
    return (<View
        style={{
            margin: 5, alignItems: 'center',
            flexDirection: 'row',
            height: 120, width: viewportWidth * 2 / 3,
            backgroundColor: item?.uiElement?.rcmdShowType,
        }}
    >
        <View>
            <Text numberOfLines={1} style={{marginTop: 5, maxWidth: 120}}>
                {item?.uiElement?.mainTitle?.title}
            </Text>
            <Text numberOfLines={1} style={{marginTop: 5}}>
                {item?.uiElement?.subTitle?.title}
            </Text>
        </View>
        {Boolean(url) && <Image source={{uri: url}} style={{width: 60, height: 60,borderRadius:5}}/>}
    </View>)
}
