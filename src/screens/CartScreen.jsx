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

export default function CartScreen({ onOpenLogin, onGoHome }) {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const loggedIn = useSelector(state => state.user.loggedIn);

  const calculateItemTotal = item => {
    let itemTotal = item.product?.price || 0;

    // Add customization prices
    if (item.customizations) {
      // Add dips prices
      if (item.customizations.dips && Array.isArray(item.customizations.dips)) {
        item.customizations.dips.forEach(dip => {
          if (dip && dip.price) itemTotal += dip.price;
        });
      }

      // Add beverages prices
      if (
        item.customizations.beverages &&
        Array.isArray(item.customizations.beverages)
      ) {
        item.customizations.beverages.forEach(bev => {
          if (bev && bev.price) itemTotal += bev.price;
        });
      }

      // Add drinks prices
      if (
        item.customizations.drinks &&
        Array.isArray(item.customizations.drinks)
      ) {
        item.customizations.drinks.forEach(drink => {
          if (drink && drink.price) itemTotal += drink.price;
        });
      }
    }

    return itemTotal * item.quantity;
  };

  const total = items.reduce((s, it) => s + calculateItemTotal(it), 0);

  const handleRemoveItem = itemId => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    if (!loggedIn) {
      onOpenLogin && onOpenLogin();
    } else {
      // Proceed with checkout
      alert('Proceeding to checkout...');
    }
  };

  // Show empty cart if no items
  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.content}>
            <Icon
              name="shopping-cart"
              size={80}
              color="#b8860b"
              style={{ marginBottom: 16 }}
            />
            <Text style={styles.title}>Your Cart is Empty</Text>
            <Text style={styles.subtitle}>
              Looks like you haven't added anything yet.
            </Text>
            <TouchableOpacity style={styles.cta} onPress={onGoHome}>
              <Text style={styles.ctaText}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, width: '100%', padding: 12 }}>
        <Text style={styles.cartTitle}>Cart Items ({items.length})</Text>
        {items.map(it => (
          <View key={it.id} style={styles.cartItem}>
            <Image
              source={{ uri: it.product.image }}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{it.product.name}</Text>
              <Text style={styles.itemQuantity}>Qty: {it.quantity}</Text>
              {it.customizations && (
                <View style={styles.customizations}>
                  {it.customizations.dips &&
                    it.customizations.dips.length > 0 && (
                      <Text style={styles.customizationText}>
                        Dips:{' '}
                        {it.customizations.dips.map(d => d.name).join(', ')}
                      </Text>
                    )}
                  {it.customizations.beverages &&
                    it.customizations.beverages.length > 0 && (
                      <Text style={styles.customizationText}>
                        Beverages:{' '}
                        {it.customizations.beverages
                          .map(b => b.name)
                          .join(', ')}
                      </Text>
                    )}
                  {it.customizations.drinks &&
                    it.customizations.drinks.length > 0 && (
                      <Text style={styles.customizationText}>
                        Drinks:{' '}
                        {it.customizations.drinks.map(d => d.name).join(', ')}
                      </Text>
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
                onPress={() => handleRemoveItem(it.id)}
              >
                <Icon name="trash" size={16} color="#ff6b6b" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>₹{total.toFixed(0)}</Text>
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
  card: { width: '86%', borderRadius: 8, alignItems: 'center' },
  content: { alignItems: 'center', paddingVertical: 24 },
  icon: { width: 120, height: 120, resizeMode: 'contain', marginBottom: 12 },
  title: { marginTop: 8, fontWeight: '700', textAlign: 'center', fontSize: 18 },
  subtitle: { textAlign: 'center', marginVertical: 12, color: '#666' },
  cta: {
    backgroundColor: '#b8860b',
    width: '80%',
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  ctaText: { color: '#fff', fontWeight: '700' },
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  totalLabel: { fontWeight: '700', fontSize: 16, color: '#000' },
  totalPrice: { fontWeight: '700', fontSize: 18, color: '#b8860b' },
  checkoutBtn: {
    backgroundColor: '#b8860b',
    marginHorizontal: 12,
    marginBottom: 12,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
