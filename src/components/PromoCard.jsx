import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PromoCard({
  title,
  priceTag,
  price,
  subtitle,
  imageUrl,
  onPress,
  discount,
  rating,
  isVeg = false,
  isBestseller = false,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.visualImage} />
        ) : (
          <View style={styles.visualPlaceholder} />
        )}

        {/* Veg/Non-veg Indicator */}
        <View style={styles.vegIndicator}>
          <View style={[styles.vegDot, { borderColor: isVeg ? '#4caf50' : '#e74c3c' }]}>
            {isVeg ? (
              <View style={[styles.vegDotInner, { backgroundColor: '#4caf50' }]} />
            ) : (
              <View style={styles.nonVegTriangle} />
            )}
          </View>
        </View>

        {/* Discount Badge */}
        {discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}% OFF</Text>
          </View>
        )}

        {/* Bestseller Badge */}
        {isBestseller && (
          <View style={styles.bestsellerBadge}>
            <Icon name="star" size={8} color="#fff" />
            <Text style={styles.bestsellerText}>Bestseller</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>

        {/* Rating */}
        {rating && (
          <View style={styles.ratingContainer}>
            <Icon name="star" size={10} color="#ffc107" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        )}

        {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}

        <View style={styles.priceRow}>
          {priceTag ? (
            <Text style={styles.price}>{priceTag}</Text>
          ) : price != null ? (
            <Text style={styles.price}>{`₹${price}`}</Text>
          ) : null}

          {/* Add Button */}
          <TouchableOpacity style={styles.addButton} onPress={onPress}>
            <Icon name="plus" size={12} color="#b8860b" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    width: '48%',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
  },
  visualPlaceholder: {
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  visualImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  },
  vegIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 3,
  },
  vegDot: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vegDotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  nonVegTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#e74c3c',
    transform: [{ rotate: '180deg' }],
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4caf50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  bestsellerBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 3,
  },
  bestsellerText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
    marginLeft: 3,
  },
  info: {
    padding: 10,
  },
  title: {
    color: '#000',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
    lineHeight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 3,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
    marginLeft: 2,
  },
  subtitle: {
    color: '#999',
    fontSize: 11,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    color: '#b8860b',
    fontSize: 16,
    fontWeight: '800',
  },
  addButton: {
    backgroundColor: '#fef9f0',
    borderWidth: 1,
    borderColor: '#b8860b',
    borderRadius: 6,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
