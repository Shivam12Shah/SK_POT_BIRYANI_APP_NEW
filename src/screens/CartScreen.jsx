import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CartScreen({ onOpenLogin, onGoHome, onCheckout }) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const cartDetails = cart.items || [];
  const loggedIn = useSelector(state => state.user.loggedIn);

  console.log('📦 [CartScreen] Cart:', cart);

  const calculateItemTotal = item => {
    // Handle both local cart (product) and backend cart (food) structure
    const product = item.product || item.food;
    if (!product) return 0;

    let total = product.price * (item.quantity || item.qty || 1);

    // Add customizations cost (local cart)
    if (item.customizations) {
      if (item.customizations.dips) {
        item.customizations.dips.forEach(d => {
          total += d.price || 0;
        });
      }
      if (item.customizations.beverages) {
        item.customizations.beverages.forEach(b => {
          total += b.price || 0;
        });
      }
      if (item.customizations.drinks) {
        item.customizations.drinks.forEach(d => {
          total += d.price || 0;
        });
      }
    }

    // Handle selectedAddons from backend
    if (item.selectedAddons) {
      if (item.selectedAddons.dip) total += item.selectedAddons.dip.price || 0;
      if (item.selectedAddons.beverage) total += item.selectedAddons.beverage.price || 0;
      if (item.selectedAddons.drink) total += item.selectedAddons.drink.price || 0;
    }

    return total;
  };

  const total = cartDetails?.reduce((sum, item) => sum + calculateItemTotal(item), 0) || 0;

  const handleRemoveItem = itemId => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    if (!loggedIn) {
      onOpenLogin && onOpenLogin();
    } else {
      // Proceed with checkout
      onCheckout && onCheckout();
    }
  };

  // Show empty cart if no items
  if (!cartDetails || cartDetails.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyContent}>
            {/* Icon with background circle */}
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Icon
                  name="shopping-cart"
                  size={60}
                  color="#b8860b"
                />
              </View>
            </View>

            {/* Main message */}
            <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
            <Text style={styles.emptySubtitle}>
              Looks like you haven't added{'\n'}anything to your cart yet
            </Text>

            {/* Call to action */}
            <TouchableOpacity style={styles.exploreCta} onPress={onGoHome}>
              <Icon name="search" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.exploreCtaText}>Explore Menu</Text>
            </TouchableOpacity>

            {/* Additional info */}
            <View style={styles.infoCards}>
              <View style={styles.infoCard}>
                <Icon name="bolt" size={24} color="#b8860b" />
                <Text style={styles.infoCardTitle}>Fast Delivery</Text>
                <Text style={styles.infoCardText}>Get your food in 30 mins</Text>
              </View>

              <View style={styles.infoCard}>
                <Icon name="star" size={24} color="#b8860b" />
                <Text style={styles.infoCardTitle}>Fresh & Hot</Text>
                <Text style={styles.infoCardText}>Prepared with love</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, width: '100%', padding: 12 }}>
        <Text style={styles.cartTitle}>Cart Items ({cartDetails.length})</Text>
        {cartDetails.map(it => {
          // Handle both local cart (product) and backend cart (food) structure
          const product = it.product || it.food;
          const quantity = it.quantity || it.qty || 1;
          const itemId = it.id || it._id;

          return (
            <View key={itemId} style={styles.cartItem}>
              <Image
                source={{ uri: product?.images?.[0] || product?.image }}
                style={styles.itemImage}
                resizeMode="cover"
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{product?.title || product?.name}</Text>
                <Text style={styles.itemQuantity}>Qty: {quantity}</Text>
                {(it.customizations || it.selectedAddons) && (
                  <View style={styles.customizations}>
                    {/* Handle customizations from local cart */}
                    {it.customizations?.dips && it.customizations.dips.length > 0 && (
                      <Text style={styles.customizationText}>
                        Dips: {it.customizations.dips.map(d => d.name).join(', ')}
                      </Text>
                    )}
                    {it.customizations?.beverages && it.customizations.beverages.length > 0 && (
                      <Text style={styles.customizationText}>
                        Beverages: {it.customizations.beverages.map(b => b.name).join(', ')}
                      </Text>
                    )}
                    {it.customizations?.drinks && it.customizations.drinks.length > 0 && (
                      <Text style={styles.customizationText}>
                        Drinks: {it.customizations.drinks.map(d => d.name).join(', ')}
                      </Text>
                    )}
                    {/* Handle selectedAddons from backend */}
                    {it.selectedAddons?.dip && (
                      <Text style={styles.customizationText}>Dip: {it.selectedAddons.dip.name}</Text>
                    )}
                    {it.selectedAddons?.beverage && (
                      <Text style={styles.customizationText}>Beverage: {it.selectedAddons.beverage.name}</Text>
                    )}
                    {it.selectedAddons?.drink && (
                      <Text style={styles.customizationText}>Drink: {it.selectedAddons.drink.name}</Text>
                    )}
                  </View>
                )}
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemPrice}>
                  ₹{calculateItemTotal(it).toFixed(0)}
                </Text>
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => handleRemoveItem(itemId)}
                >
                  <Icon name="trash" size={16} color="#ff6b6b" />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        <View style={styles.divider} />

        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalPrice}>₹{total.toFixed(0)}</Text>
          </View>
          {cartDetails.deliveryCharges > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Delivery Charges:</Text>
              <Text style={styles.totalPrice}>₹{cartDetails.deliveryCharges}</Text>
            </View>
          )}
          <View style={[styles.totalRow, { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#ddd' }]}>
            <Text style={[styles.totalLabel, { fontSize: 18 }]}>Grand Total:</Text>
            <Text style={[styles.totalPrice, { fontSize: 20, color: '#b8860b' }]}>
              ₹{cartDetails.grandTotal || total.toFixed(0)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>
          {loggedIn ? 'Proceed to Checkout' : 'Login to Checkout'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'space-between',
  },
  cartTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 12,
    color: '#000',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: { flex: 1 },
  itemName: { fontWeight: '600', color: '#000', fontSize: 14 },
  itemQuantity: { color: '#999', fontSize: 12, marginTop: 4 },
  itemRight: { alignItems: 'flex-end' },
  itemPrice: { fontWeight: '700', color: '#b8860b', fontSize: 14 },
  removeBtn: { marginTop: 8 },
  customizations: { marginTop: 6 },
  customizationText: { fontSize: 11, color: '#666', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#ddd', marginVertical: 12 },
  totalSection: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  totalLabel: { fontWeight: '700', fontSize: 16, color: '#000' },
  totalPrice: { fontWeight: '700', fontSize: 18, color: '#000' },
  checkoutBtn: {
    backgroundColor: '#b8860b',
    marginHorizontal: 12,
    marginBottom: 12,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  emptyContent: {
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  exploreCta: {
    flexDirection: 'row',
    backgroundColor: '#b8860b',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#b8860b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  exploreCtaText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  infoCards: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 16,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginTop: 12,
    marginBottom: 4,
  },
  infoCardText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
