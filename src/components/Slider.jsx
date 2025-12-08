import React, { useRef, useState } from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const { width } = Dimensions.get('window');

export default function Slider({ slides = [1, 2, 3] }) {
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const yourState = useSelector(state => state.yourReducer);

  const onScroll = e => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(i);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        {slides.map((s, i) => (
          <View key={i} style={[styles.slide, { width }]}>
            <View style={styles.visual} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, index === i && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  slide: { height: 160, paddingHorizontal: 12 },
  visual: { flex: 1, borderRadius: 10, backgroundColor: '#2b1b0f' },
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 6,
  },
  dotActive: { backgroundColor: '#b8860b' },
});
