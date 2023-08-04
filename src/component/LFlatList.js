import React, {useCallback, useMemo} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View} from "react-native";

export const LFlatList = (props) => {
  const {refreshing = false, data, hasMore, onRefresh, onLoadMore} = props
  let canLoadMore = true

  const refreshControl = useMemo(() => (
    <RefreshControl
      title={"刷新中..."}
      titleColor={["#2F54EB"]} //只有ios有效
      colors={["#2F54EB"]}
      tintColor={["#2F54EB"]}
      refreshing={refreshing}
      onRefresh={() => onRefresh && onRefresh()}
    />
  ), [refreshing]);

  const footerView = useCallback(() =>
      refreshing || data.length === 0 ? null : hasMore ? (
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
    [data, refreshing, hasMore]
  );

  return (<FlatList
    keyboardShouldPersistTaps="handled"
    keyExtractor={(item, index) => index.toString()}
    // ListEmptyComponent={listEmptyView}
    refreshControl={refreshControl}
    ListFooterComponent={footerView}
    onEndReached={() => {
      if (canLoadMore) {
        onLoadMore && onLoadMore()
        canLoadMore = false;
      }
    }}
    onScrollBeginDrag={() => {
      canLoadMore = true;
    }}
    onEndReachedThreshold={0.1}
    {...props}
  />)
}
const styles = StyleSheet.create({
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
