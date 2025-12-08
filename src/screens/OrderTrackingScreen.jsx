import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

export default function OrderTrackingScreen({ route, navigation }) {
  const { orderId } = route?.params || {};
  const dispatch = useDispatch();

  // TODO: Fetch order details from Redux store or API
  const order = {
    id: orderId || 'ORD001',
    status: 'Out for Delivery',
    estimatedTime: '30 minutes',
    address: '123 Main Street, City, State 12345',
    items: [
      { name: 'Chicken Biryani', quantity: 2 },
      { name: 'Mutton Biryani', quantity: 1 },
    ],
  };

  const trackingSteps = [
    { id: 1, title: 'Order Placed', status: 'completed', time: '10:00 AM' },
    { id: 2, title: 'Order Confirmed', status: 'completed', time: '10:05 AM' },
    { id: 3, title: 'Preparing', status: 'completed', time: '10:15 AM' },
    { id: 4, title: 'Out for Delivery', status: 'active', time: '10:30 AM' },
    { id: 5, title: 'Delivered', status: 'pending', time: 'Expected 11:00 AM' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.orderInfoCard}>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.estimatedTime}>
            Estimated delivery: {order.estimatedTime}
          </Text>
        </View>

        <View style={styles.trackingCard}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          {trackingSteps.map((step, index) => (
            <View key={step.id} style={styles.trackingStep}>
              <View style={styles.stepIndicator}>
                {step.status === 'completed' && (
                  <Icon name="check-circle" size={24} color="#4caf50" />
                )}
                {step.status === 'active' && (
                  <View style={styles.activeIndicator}>
                    <View style={styles.activeDot} />
                  </View>
                )}
                {step.status === 'pending' && (
                  <View style={styles.pendingIndicator} />
                )}
                {index < trackingSteps.length - 1 && (
                  <View
                    style={[
                      styles.stepLine,
                      step.status === 'completed' && styles.stepLineCompleted,
                    ]}
                  />
                )}
              </View>
              <View style={styles.stepContent}>
                <Text
                  style={[
                    styles.stepTitle,
                    step.status === 'active' && styles.stepTitleActive,
                  ]}
                >
                  {step.title}
                </Text>
                <Text style={styles.stepTime}>{step.time}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.deliveryCard}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressRow}>
            <Icon name="map-marker" size={20} color="#b8860b" />
            <Text style={styles.addressText}>{order.address}</Text>
          </View>
        </View>

        <View style={styles.itemsCard}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>x {item.quantity}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
    padding: 16,
  },
  orderInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  orderId: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  estimatedTime: {
    fontSize: 14,
    color: '#666',
  },
  trackingCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  trackingStep: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepIndicator: {
    alignItems: 'center',
    marginRight: 16,
  },
  activeIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#b8860b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#b8860b',
  },
  pendingIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  stepLine: {
    width: 2,
    height: 30,
    backgroundColor: '#ddd',
    marginTop: 4,
  },
  stepLineCompleted: {
    backgroundColor: '#4caf50',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  stepTitleActive: {
    color: '#b8860b',
  },
  stepTime: {
    fontSize: 12,
    color: '#999',
  },
  deliveryCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  itemsCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontSize: 14,
    color: '#666',
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});
