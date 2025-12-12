import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PromoCard from '../components/PromoCard';
import DeliveryTimeModal from '../components/DeliveryTimeModal';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../store/userSlice';
import { fetchCurrentLocation } from '../store/locationActions';
import { fetchProducts } from '../store/productsSlice';

export default function HomeScreen({
  onOpenLogin,
  onExploreMore,
  onProductSelect,
}) {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const productsStatus = useSelector(state => state.products.status);
  const userProfile = useSelector(state => state.user.profile);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const deliveryTime = useSelector(state => state.user.deliveryTime);
  const location = useSelector(state => state.location);
  const cartItems = useSelector(state => state.cart?.items || []);
  const { latitude, longitude, loading, error, readableAddress } = location;

  // Calculate total items and total quantity in cart
  const totalCartItems = Array.isArray(cartItems) ? cartItems.length : 0;
  const totalCartQuantity = Array.isArray(cartItems) ? cartItems.reduce((sum, item) => sum + (item.quantity || item.qty || 1), 0) : 0;

  const [showDeliveryTimeModal, setShowDeliveryTimeModal] = useState(false);
  console.log('HomeScreen products:', products);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const handleHeaderButtonPress = () => {
    if (loggedIn) {
      handleLogout();
    } else {
      onOpenLogin && onOpenLogin();
    }
  };

  // Fetch products from API on mount
  useEffect(() => {
    if (productsStatus === 'idle') {
      console.log('🔄 [HomeScreen] Fetching products from API...');
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

  // Fetch location on mount
  useEffect(() => {
    if (!latitude && !longitude && !loading) {
      console.log('📍 [HomeScreen] Fetching current location...');
      dispatch(fetchCurrentLocation());
    }
  }, [dispatch, latitude, longitude, loading]);

  // Show only first 6 items on home screen
  const homeScreenProducts = products.slice(0, 6);

  useEffect(() => {
    // Fetch current location when component mounts
    console.log('🏠 [HomeScreen] Current location state:', { latitude, longitude, readableAddress, loading, error });
    if (!latitude && !longitude) {
      console.log('🏠 [HomeScreen] No location found, fetching...');
      dispatch(fetchCurrentLocation());
    }
  }, [dispatch, latitude, longitude]);

  // Log location changes
  useEffect(() => {
    console.log('🔔 [HomeScreen] Location state changed:', {
      latitude,
      longitude,
      readableAddress,
      loading,
      error,
    });
  }, [latitude, longitude, readableAddress, loading, error]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Always show location regardless of login status */}
        <View>
          <Text style={styles.locationTitle}>
            {readableAddress
              ? readableAddress === 'Simulator Location'
                ? 'Your Location'
                : readableAddress
              : latitude && longitude
                ? `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
                : 'Getting location...'}
          </Text>
          <Text style={styles.locationSub}>
            {loading
              ? 'Detecting location...'
              : error
                ? 'Location access needed'
                : readableAddress === 'Simulator Location'
                  ? 'Demo location'
                  : 'Delivery location'}
          </Text>
        </View>
        <View style={styles.headerRight}>
          {!loggedIn && (
            <TouchableOpacity
              style={styles.locationButton}
              onPress={() => dispatch(fetchCurrentLocation())}
              disabled={loading}
            >
              <Icon name="map-marker" size={16} color="#b8860b" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleHeaderButtonPress}
          >
            <Text style={styles.loginText}>
              {loggedIn ? 'Logout' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.deliveryBar}
          onPress={() => setShowDeliveryTimeModal(true)}
        >
          <View style={styles.deliveryLeft}>
            <Text style={styles.deliveryLabel}>Delivery Time</Text>
          </View>
          <View style={styles.deliveryRight}>
            <Text style={styles.deliveryTime}>
              {deliveryTime
                ? `${deliveryTime.label} - ${new Date(
                  deliveryTime.time,
                ).toLocaleDateString()}`
                : 'Select delivery time'}
            </Text>
            <Icon
              name="chevron-down"
              size={12}
              color="#b8860b"
              style={styles.dropdownIcon}
            />
          </View>
        </TouchableOpacity>


        <View style={styles.grid}>
          {homeScreenProducts.map(p => (
            console.log("homeScreenProducts", p),
            <PromoCard
              key={p.id}
              title={p.name}
              price={p.price}
              imageUrl={p.images[0]}
              onPress={() => onProductSelect && onProductSelect(p)}
            />
          ))}
        </View>

        {products.length > 6 && (
          <TouchableOpacity
            style={styles.exploreMoreBtn}
            onPress={onExploreMore}
          >
            <Text style={styles.exploreMoreText}>Explore More</Text>
            <Text style={styles.exploreMoreCount}>
              ({products.length - 6} more items)
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ marginTop: 20 }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Categories</Text>
            <TouchableOpacity onPress={() => { }}>
              <Text style={styles.sectionLink}>View Full Menu</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Biryanis at FLAT 269</Text>
            </View>

            <View style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Biryani & Kebab combo</Text>
            </View>

            <View style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Biryani Thali FLAT 259</Text>
            </View>
          </ScrollView>
        </View>

        <View style={{ marginTop: 24 }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dastaan-E-Kebab</Text>
            <TouchableOpacity onPress={() => { }}>
              <Text style={styles.sectionLink}>Explore this Collection</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.kebabWrap}>
            <View style={styles.kebabCard}>
              <View style={styles.kebabImg} />
              <Text style={styles.kebabTitle}>
                Murgh Kefta (Chicken Meatball Kebab)
              </Text>
              <View style={styles.kebabBottom}>
                <Text style={styles.kebabPrice}>₹159</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => { }}>
                  <Text style={styles.addTxt}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.kebabCard}>
              <View style={styles.kebabImg} />
              <Text style={styles.kebabTitle}>Beetroot & Peanut Kebab</Text>
              <View style={styles.kebabBottom}>
                <Text style={styles.kebabPrice}>₹139</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => { }}>
                  <Text style={styles.addTxt}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Delivery Time Modal */}
      <DeliveryTimeModal
        visible={showDeliveryTimeModal}
        onClose={() => setShowDeliveryTimeModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scroll: { padding: 12, paddingBottom: 40 },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationTitle: { color: '#fff', fontSize: 16, fontWeight: '800' },
  locationSub: { color: '#d0c6c6', fontSize: 12, marginTop: 2 },
  profileSection: { flex: 1 },
  profileName: { color: '#fff', fontSize: 16, fontWeight: '800' },
  profilePhone: { color: '#d0c6c6', fontSize: 12, marginTop: 2 },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationButton: {
    backgroundColor: '#fef9f0',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#b8860b',
  },
  cartButton: {
    backgroundColor: '#fef9f0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#b8860b',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  loginButton: {
    backgroundColor: '#f5e9d2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  loginText: { color: '#3b2b10', fontWeight: '700' },

  // Delivery Bar
  deliveryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2b231b',
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  deliveryLeft: {
    backgroundColor: '#f5e9d2',
    padding: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  deliveryLabel: { color: '#3b2b10', fontWeight: '700' },
  deliveryRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deliveryTime: {
    color: '#fff',
    fontSize: 12,
    flex: 1,
  },
  dropdownIcon: {
    marginLeft: 8,
  },

  // Banner
  bannerPlaceholder: {
    height: 140,
    backgroundColor: '#1a0f0b',
    borderRadius: 10,
    marginBottom: 12,
  },

  // Cart Summary
  cartSummary: {
    backgroundColor: '#1a0f0b',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  cartSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cartSummaryTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
    flex: 1,
  },
  cartSummaryQuantity: {
    color: '#c4a650',
    fontSize: 12,
    fontWeight: '600',
  },
  cartItemsScroll: {
    marginTop: 8,
  },
  cartItemCard: {
    backgroundColor: '#28150d',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    minWidth: 140,
  },
  cartItemName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  cartItemQuantity: {
    color: '#c4a650',
    fontSize: 11,
    marginBottom: 4,
  },
  cartItemPrice: {
    color: '#b8860b',
    fontSize: 14,
    fontWeight: '700',
  },

  // Promo Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exploreMoreBtn: {
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#1a0f0b',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreMoreText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#b8860b',
  },
  exploreMoreCount: {
    fontSize: 12,
    color: '#c4a650',
    marginTop: 4,
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  sectionLink: { color: '#c4a650', fontWeight: '700' },

  // Category Cards
  categoryCard: {
    width: 180,
    padding: 12,
    backgroundColor: '#1a0f0b',
    borderRadius: 10,
    marginRight: 10,
  },
  categoryTitle: { color: '#fff', fontWeight: '700', fontSize: 14 },

  // Kebab Cards
  kebabWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  kebabCard: {
    width: '48%',
    backgroundColor: '#1a0f0b',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  kebabImg: {
    height: 120,
    borderRadius: 10,
    backgroundColor: '#28150d',
    marginBottom: 10,
  },
  kebabTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  kebabBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kebabPrice: { color: '#fff', fontSize: 16, fontWeight: '700' },
  addBtn: {
    backgroundColor: '#f5e9d2',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addTxt: { color: '#3b2b10', fontWeight: '800' },
});
