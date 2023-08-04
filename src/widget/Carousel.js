import React from 'react';
import SnapCarousel, { Pagination, ParallaxImage} from 'react-native-snap-carousel';
import {viewportWidth,viewportHeight, wp, hp} from "../utils/utils";
import {Alert, StyleSheet, View} from "react-native";
const sliderWidth = viewportWidth;
const imageWidth = wp(90);
export const imageHeight = hp(17);
const itemWidth = imageWidth + wp(2) * 2;

export class Carousels extends React.Component {
    state = {
        activeSlide: 0,
        data:this.props.data,
    };


    renderItem = ({item}, parallaxProps?) => {
        // @ts-ignore
        return <ParallaxImage source={{uri: item.pic}}
                              style={styles.image}
                              containerStyle={styles.containerStyle}
                              parallaxFactor={0.4}
                              showSpinner
                              spinnerColor="rgba(0,0,0,0.25)"
                              {...parallaxProps}
        />
    };
    onSnapToItem = (index) => {
        this.setState({
            activeSlide: index,
        })
        // @ts-ignore
        let colors=this.state.data[index].colors;
    };

    get pagination() {
        const {activeSlide} = this.state;
        return (<View style={styles.paginationView}>
            <Pagination
                containerStyle={styles.paginationContainer}
                dotContainerStyle={styles.dotContainerStyle}
                dotStyle={styles.dotStyle}
                dotsLength={this.state.data.length}
                inactiveDotScale={0.7}
                activeDotIndex={activeSlide}/>
        </View>)
    }

    render() {
        return (
            <View>
                <SnapCarousel
                    data={this.state.data}
                    renderItem={this.renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    onSnapToItem={this.onSnapToItem}
                    hasParallaxImages
                    loop
                    autoplay
                />
                {this.pagination}
            </View>);
    }
}

const styles = StyleSheet.create({
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
    },
    containerStyle: {
        width: itemWidth,
        height: imageHeight,
        borderRadius: 8,
    },
    paginationView: {
        justifyContent: "center",
        alignItems: "center",
    },
    paginationContainer: {
        position: "absolute",//绝对定位
        top: -16,
        left:5,
        // backgroundColor: "rgba(0,0,0,0.35)",
        // paddingHorizontal: 3,
        paddingVertical: 4,
        borderRadius: 8,
    },
    dotContainerStyle: {
        marginHorizontal: 2,
    },
    dotStyle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.92)"
    }

});
