import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

export default function OrderTrackingScreen({ route, navigation }) {
  const { orderId } = route?.params || {};
  const dispatch = useDispatch();

  // Fetch order details from Redux store
  const orders = useSelector(state => state.orders);
  const order = orders.find(o => o.id === orderId) || {
    id: orderId || 'ORD001',
    status: 'placed',
    estimatedTime: '30 minutes',
    address: '123 Main Street, City, State 12345',
    items: [],
    total: 0,
  };

  // Delivery partner info (in real app, this would come from the order)
  const deliveryPartner = {
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    vehicle: 'Bike - MH 02 AB 1234',
    rating: 4.8,
  };

  // Location coordinates (example - replace with actual coordinates)
  const restaurantLocation = {
    latitude: 19.0760,
    longitude: 72.8777,
    name: 'SK Pot Biryani Restaurant',
  };

  const deliveryLocation = {
    latitude: 19.0896,
    longitude: 72.8656,
    name: order.address || 'Delivery Location',
  };

  const trackingSteps = [
    { id: 1, title: 'Order Placed', status: 'completed', time: '10:00 AM' },
    { id: 2, title: 'Order Confirmed', status: 'completed', time: '10:05 AM' },
    { id: 3, title: 'Preparing', status: 'completed', time: '10:15 AM' },
    { id: 4, title: 'Out for Delivery', status: 'active', time: '10:30 AM' },
    { id: 5, title: 'Delivered', status: 'pending', time: 'Expected 11:00 AM' },
  ];

  const handleCallDeliveryPartner = () => {
    Linking.openURL(`tel:${deliveryPartner.phone}`);
  };

  const handleOpenMap = () => {
    // Open Google Maps with directions from restaurant to delivery location
    const origin = `${restaurantLocation.latitude},${restaurantLocation.longitude}`;
    const destination = `${deliveryLocation.latitude},${deliveryLocation.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    Linking.openURL(url);
  };

  // Generate Google Maps Static API URL with route
  const getStaticMapUrl = () => {
    const size = '600x300';
    const markers = `markers=color:red%7Clabel:R%7C${restaurantLocation.latitude},${restaurantLocation.longitude}&markers=color:green%7Clabel:D%7C${deliveryLocation.latitude},${deliveryLocation.longitude}`;
    const path = `path=color:0x0000ff%7Cweight:3%7C${restaurantLocation.latitude},${restaurantLocation.longitude}%7C${deliveryLocation.latitude},${deliveryLocation.longitude}`;
    return `https://maps.googleapis.com/maps/api/staticmap?size=${size}&${markers}&${path}&key=YOUR_API_KEY`;
  };

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

        {/* Delivery Partner Card */}
        <View style={styles.deliveryPartnerCard}>
          <View style={styles.partnerHeader}>
            <View style={styles.partnerInfo}>
              <View style={styles.partnerAvatar}>
                <Icon name="user" size={24} color="#fff" />
              </View>
              <View style={styles.partnerDetails}>
                <Text style={styles.partnerName}>{deliveryPartner.name}</Text>
                <Text style={styles.partnerVehicle}>{deliveryPartner.vehicle}</Text>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={12} color="#ffc107" />
                  <Text style={styles.ratingText}>{deliveryPartner.rating}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.callButton}
              onPress={handleCallDeliveryPartner}
            >
              <Icon name="phone" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Map View with Route */}
        <View style={styles.mapCard}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: (restaurantLocation.latitude + deliveryLocation.latitude) / 2,
              longitude: (restaurantLocation.longitude + deliveryLocation.longitude) / 2,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {/* Restaurant Marker */}
            <Marker
              coordinate={{
                latitude: restaurantLocation.latitude,
                longitude: restaurantLocation.longitude,
              }}
              title="SK Pot Biryani Restaurant"
              description="Order pickup location"
              pinColor="red"
            />

            {/* Delivery Location Marker */}
            <Marker
              coordinate={{
                latitude: deliveryLocation.latitude,
                longitude: deliveryLocation.longitude,
              }}
              title="Delivery Location"
              description={order.address}
              pinColor="green"
            />

            {/* Route Polyline */}
            <Polyline
              coordinates={[
                {
                  latitude: restaurantLocation.latitude,
                  longitude: restaurantLocation.longitude,
                },
                {
                  latitude: deliveryLocation.latitude,
                  longitude: deliveryLocation.longitude,
                },
              ]}
              strokeColor="#b8860b"
              strokeWidth={3}
            />
          </MapView>

          <TouchableOpacity style={styles.mapOverlay} onPress={handleOpenMap}>
            <Icon name="external-link" size={16} color="#b8860b" />
            <Text style={styles.mapText}>Open in Google Maps</Text>
          </TouchableOpacity>
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
          {order.items && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={styles.itemName}>{item.product?.name || 'Unknown Item'}</Text>
                <Text style={styles.itemQuantity}>x {item.quantity}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.itemName}>No items found</Text>
          )}
        </View>
      </ScrollView>
    </View >
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
  deliveryPartnerCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  partnerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partnerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  partnerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#b8860b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  partnerDetails: {
    flex: 1,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  partnerVehicle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontWeight: '600',
  },
  callButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4caf50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: 250,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#b8860b',
    borderStyle: 'dashed',
  },
  mapText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#b8860b',
    marginTop: 8,
  },
  mapSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  routeVisualization: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  locationMarker: {
    alignItems: 'center',
    gap: 8,
  },
  markerLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  routeLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
    borderTopWidth: 2,
    borderColor: '#b8860b',
    borderStyle: 'dashed',
    position: 'relative',
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#b8860b',
  },
  mapOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
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
