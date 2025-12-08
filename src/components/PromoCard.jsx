import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export default function PromoCard({
  title,
  priceTag,
  price,
  subtitle,
  imageUrl,
  onPress,
}) {
  const dispatch = useDispatch();
  const yourState = useSelector(state => state.yourReducer);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.visualImage} />
      ) : (
        <View style={styles.visualPlaceholder} />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        {priceTag ? (
          <Text style={styles.price}>{priceTag}</Text>
        ) : price != null ? (
          <Text style={styles.price}>{`₹${price}`}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#061108',
    borderRadius: 10,
    overflow: 'hidden',
    width: '48%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#13321f',
  },
  visualPlaceholder: {
    height: 110,
    backgroundColor: '#0b2b1a',
  },
  visualImage: { height: 110, width: '100%', resizeMode: 'cover' },
  info: { padding: 10 },
  title: { color: '#f7d18a', fontSize: 14, fontWeight: '700' },
  subtitle: { color: '#c7b091', fontSize: 12, marginTop: 4 },
  price: { color: '#fff', fontSize: 18, fontWeight: '800', marginTop: 6 },
});
