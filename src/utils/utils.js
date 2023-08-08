import React from 'react';
import {Dimensions} from "react-native";

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage: number) {
    const value = (percentage * viewportWidth) / 100;
    //四舍五入
    return Math.round(value);
}

function hp(percentage: number) {
    const value = (percentage * viewportHeight) / 100;
    //四舍五入
    return Math.round(value);
}

function formatTime(seconds: number) {
    const m = parseInt((seconds % (60 * 60)) / 60 + '', 10);
    const s = parseInt((seconds % 60) + '', 10);
    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}

export {viewportWidth, viewportHeight, wp, hp,formatTime};
