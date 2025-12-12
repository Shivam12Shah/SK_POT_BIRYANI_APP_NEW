import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addOrder } from '../store/ordersSlice';
import { clearCart } from '../store/cartSlice';
import Toast from '../components/Toast';

export default function CheckoutScreen({ navigation, onOrderComplete, selectedAddressFromManagement }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const addresses = useSelector(state => state.addresses);

  // Get default address or use the one passed from address management
  const defaultAddress = addresses.find(a => a.isDefault);
  const [selectedAddress, setSelectedAddress] = useState(selectedAddressFromManagement || defaultAddress || null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Update selected address when coming back from address management
  useEffect(() => {
    if (selectedAddressFromManagement) {
      setSelectedAddress(selectedAddressFromManagement);
    }
  }, [selectedAddressFromManagement]);

  const calculateTotal = () => {
    return (cartItems || []).reduce((total, item) => {
      // Handle both local cart (product) and backend cart (food) structure
      const product = item.product || item.food;
      if (!product) return total;

      let itemTotal = product.price || 0;

      if (item.customizations) {
        if (item.customizations.dips) {
          item.customizations.dips.forEach(dip => {
            if (dip && dip.price) itemTotal += dip.price;
          });
        }
        if (item.customizations.beverages) {
          item.customizations.beverages.forEach(bev => {
            if (bev && bev.price) itemTotal += bev.price;
          });
        }
        if (item.customizations.drinks) {
          item.customizations.drinks.forEach(drink => {
            if (drink && drink.price) itemTotal += drink.price;
          });
        }
      }

      // Handle selectedAddons from backend
      if (item.selectedAddons) {
        if (item.selectedAddons.dip) itemTotal += item.selectedAddons.dip.price || 0;
        if (item.selectedAddons.beverage) itemTotal += item.selectedAddons.beverage.price || 0;
        if (item.selectedAddons.drink) itemTotal += item.selectedAddons.drink.price || 0;
      }

      return total + (itemTotal * (item.quantity || item.qty || 1));
    }, 0);
  };

  const handlePlaceOrder = () => {
    // Validate address is selected
    if (!selectedAddress) {
      setToastMessage('Please select a delivery address to continue');
      setToastType('warning');
      setShowToast(true);
      return;
    }

    // Create order object
    const orderId = `ORD${Date.now()}`;
    const orderDate = new Date().toISOString();
    const total = calculateTotal();

    // Format address string from selected address
    const addressString = `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`;

    const order = {
      id: orderId,
      date: orderDate,
      status: 'placed',
      items: cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        customizations: item.customizations,
      })),
      total: total,
      address: addressString,
      addressDetails: selectedAddress, // Store full address details
      paymentMethod: paymentMethod,
    };

    // Add order to orders history
    dispatch(addOrder(order));

    // Clear the cart
    dispatch(clearCart());

    // Show success toast
    setToastMessage(`Order #${orderId} placed successfully!`);
    setToastType('success');
    setShowToast(true);

    // Navigate to order tracking after delay
    setTimeout(() => {
      if (navigation?.navigate) {
        navigation.navigate('OrderTracking', { orderId });
      }
      if (onOrderComplete) {
        onOrderComplete();
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TouchableOpacity
            style={styles.addressCard}
            onPress={() => {
              if (navigation?.navigate) {
                navigation.navigate('AddressManagement', { selectionMode: true });
              }
            }}
          >
            <Icon name="map-marker" size={20} color="#b8860b" />
            {selectedAddress ? (
              <View style={styles.addressText}>
                <Text style={styles.addressName}>{selectedAddress.type || 'Address'}</Text>
                <Text style={styles.addressDetails}>
                  {selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                </Text>
                <Text style={styles.addressPhone}>{selectedAddress.phone}</Text>
              </View>
            ) : (
              <View style={styles.addressText}>
                <Text style={styles.addressName}>Add Delivery Address</Text>
                <Text style={styles.addressDetails}>
                  Tap to select or add a delivery address
                </Text>
              </View>
            )}
            <Icon name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'cash' && styles.paymentOptionActive,
            ]}
            onPress={() => setPaymentMethod('cash')}
          >
            <Icon
              name="money"
              size={20}
              color={paymentMethod === 'cash' ? '#b8860b' : '#999'}
            />
            <Text
              style={[
                styles.paymentText,
                paymentMethod === 'cash' && styles.paymentTextActive,
              ]}
            >
              Cash on Delivery
            </Text>
            {paymentMethod === 'cash' && (
              <Icon name="check-circle" size={20} color="#b8860b" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartItems.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <Text style={styles.orderItemName}>
                {item.product?.name} x {item.quantity}
              </Text>
              <Text style={styles.orderItemPrice}>
                ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>₹{calculateTotal().toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>

      <Toast
        visible={showToast}
        message={toastMessage}
        type={toastType}
        onHide={() => setShowToast(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  addressText: {
    flex: 1,
    marginLeft: 12,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  addressDetails: {
    fontSize: 14,
    color: '#666',
  },
  addressPhone: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  paymentOptionActive: {
    backgroundColor: '#fff8e1',
    borderWidth: 1,
    borderColor: '#b8860b',
  },
  paymentText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#666',
  },
  paymentTextActive: {
    color: '#b8860b',
    fontWeight: '600',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderItemName: {
    fontSize: 14,
    color: '#666',
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#b8860b',
  },
  placeOrderBtn: {
    backgroundColor: '#b8860b',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
