import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
// import Navigation from './src/navigation';

import SplashScreen from './src/components/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PartyOrderScreen from './src/screens/PartyOrderScreen';
import SearchScreen from './src/screens/SearchScreen';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import LoginScreen from './src/screens/LoginScreen';
import ListingPage from './src/screens/ListingPage';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import OrderTrackingScreen from './src/screens/OrderTrackingScreen';
import AddressManagementScreen from './src/screens/AddressManagementScreen';
import PDPPage from './src/screens/PDPPage';
import RateUsScreen from './src/screens/RateUsScreen';
import FAQScreen from './src/screens/FAQScreen';
import TermsScreen from './src/screens/TermsScreen';
import PrivacyScreen from './src/screens/PrivacyScreen';
import store from './src/store/store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent isDarkMode={isDarkMode} />
      </SafeAreaProvider>
    </Provider>
  );
}

function AppContent({ isDarkMode }) {
  const safeAreaInsets = useSafeAreaInsets();
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const [active, setActive] = useState('Home');
  const [previousTab, setPreviousTab] = useState('Home'); // Track previous tab for back navigation
  const [showLogin, setShowLogin] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' | 'listing' | 'pdp' | 'checkout' | 'orderHistory' | 'orderTracking' | 'addressManagement'
  const [previousScreen, setPreviousScreen] = useState('home'); // Track where we came from
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSplashFinish = () => {
    setIsSplashFinished(true);
  };
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const products = useSelector(state => state.products.items);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const cartItems = useSelector(state => state.cart.items);

  // Calculate total items and total quantity in cart
  const totalCartItems = cartItems.items?.length || 0;
  const totalCartQuantity = cartItems.items?.reduce((sum, item) => sum + (item.quantity || item.qty || 1), 0) || 0;

  const switchTab = newTab => {
    setPreviousTab(active);
    setActive(newTab);
  };

  const goBackToPreviousTab = () => {
    if (previousTab && previousTab !== active) {
      setActive(previousTab);
    } else {
      setActive('Home'); // Fallback to Home if no previous tab
    }
  };

  // Close login when user logs in
  useEffect(() => {
    if (loggedIn) {
      setShowLogin(false);
    }
  }, [loggedIn]);

  // Load user from storage on app start
  useEffect(() => {
    const { loadUserFromStorage } = require('./src/store/authActions');
    store.dispatch(loadUserFromStorage());
  }, []);

  // When switching tabs, reset navigation state
  useEffect(() => {
    if (active !== 'Home') {
      setCurrentScreen('home');
      setSelectedProduct(null);
    }
  }, [active]);

  // Show splash screen first
  if (!isSplashFinished) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // Show login if explicitly opened and not logged in
  if (showLogin && !loggedIn) {
    return (
      <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
        <LoginScreen onBack={() => setShowLogin(false)} />
      </View>
    );
  }

  // Navigation flow: home -> listing -> pdp
  const renderContent = () => {
    // PDP modal/screen (highest priority)
    if (currentScreen === 'pdp' && selectedProduct) {
      return (
        <PDPPage
          product={selectedProduct}
          onBack={() => setCurrentScreen(previousScreen || 'home')}
          onOpenLogin={() => setShowLogin(true)}
        />
      );
    }

    // Checkout screen
    if (currentScreen === 'checkout') {
      return (
        <CheckoutScreen
          navigation={{
            goBack: () => setCurrentScreen('home'),
            navigate: (screen, params) => {
              if (screen === 'OrderTracking') {
                setSelectedOrderId(params.orderId);
                setCurrentScreen('orderTracking');
              } else if (screen === 'AddressManagement') {
                setPreviousScreen('checkout');
                setCurrentScreen('addressManagement');
              }
            },
          }}
          selectedAddressFromManagement={selectedAddress}
          onOrderComplete={() => {
            setCurrentScreen('home');
            setActive('Home');
            setSelectedAddress(null); // Reset selected address
          }}
        />
      );
    }

    // Order History screen
    if (currentScreen === 'orderHistory') {
      return (
        <OrderHistoryScreen
          navigation={{
            goBack: () => setCurrentScreen('home'),
            navigate: (screen, params) => {
              if (screen === 'OrderTracking') {
                setSelectedOrderId(params.orderId);
                setCurrentScreen('orderTracking');
              }
            },
          }}
        />
      );
    }

    // Order Tracking screen
    if (currentScreen === 'orderTracking') {
      return (
        <OrderTrackingScreen
          route={{ params: { orderId: selectedOrderId } }}
          navigation={{
            goBack: () => setCurrentScreen('orderHistory'),
            navigate: screen => setCurrentScreen(screen),
          }}
        />
      );
    }

    // Address Management screen
    if (currentScreen === 'addressManagement') {
      const selectionMode = previousScreen === 'checkout';
      return (
        <AddressManagementScreen
          navigation={{
            goBack: () => {
              if (previousScreen === 'checkout') {
                setCurrentScreen('checkout');
              } else {
                setCurrentScreen('home');
                setActive('Profile');
              }
            },
            navigate: screen => setCurrentScreen(screen),
          }}
          selectionMode={selectionMode}
          onSelectAddress={(address) => {
            setSelectedAddress(address);
            setCurrentScreen('checkout');
          }}
        />
      );
    }

    // Rate Us screen
    if (currentScreen === 'rateUs') {
      return (
        <RateUsScreen
          navigation={{
            goBack: () => setCurrentScreen('home'),
          }}
        />
      );
    }

    // FAQ screen
    if (currentScreen === 'faq') {
      return (
        <FAQScreen
          navigation={{
            goBack: () => setCurrentScreen('home'),
          }}
        />
      );
    }

    // Terms screen
    if (currentScreen === 'terms') {
      return (
        <TermsScreen
          navigation={{
            goBack: () => setCurrentScreen('home'),
          }}
        />
      );
    }

    // Privacy screen
    if (currentScreen === 'privacy') {
      return (
        <PrivacyScreen
          navigation={{
            goBack: () => setCurrentScreen('home'),
          }}
        />
      );
    }

    // Listing screen
    if (currentScreen === 'listing') {
      return (
        <ListingPage
          products={products}
          onProductSelect={product => {
            setSelectedProduct(product);
            setPreviousScreen('listing');
            setCurrentScreen('pdp');
          }}
          onBack={() => {
            setCurrentScreen('home');
            setSelectedProduct(null);
          }}
        />
      );
    }

    // Main tab screens
    if (active === 'Profile' && loggedIn)
      return (
        <ProfileScreen
          onShowOrderHistory={() => setCurrentScreen('orderHistory')}
          onShowAddressManagement={() => setCurrentScreen('addressManagement')}
          navigation={{
            navigate: screen => setCurrentScreen(screen),
          }}
          onSwitchTab={switchTab}
        />
      );
    if (active === 'Party')
      return <PartyOrderScreen onGoBack={goBackToPreviousTab} />;
    if (active === 'Search')
      return (
        <SearchScreen
          onProductSelect={product => {
            setSelectedProduct(product);
            setPreviousScreen('home');
            setCurrentScreen('pdp');
          }}
        />
      );
    if (active === 'Cart')
      return (
        <CartScreen
          onOpenLogin={() => setShowLogin(true)}
          onGoHome={() => switchTab('Home')}
          onCheckout={() => setCurrentScreen('checkout')}
        />
      );
    if (active === 'Login')
      return <LoginScreen onBack={() => switchTab('Home')} />;

    // Home screen (default)
    return (
      <HomeScreen
        onOpenLogin={() => setShowLogin(true)}
        onExploreMore={() => setCurrentScreen('listing')}
        onProductSelect={product => {
          setSelectedProduct(product);
          setPreviousScreen('home');
          setCurrentScreen('pdp');
        }}
      />
    );
  };

  return (
    <View
      style={[
        isDarkMode ? styles.containerDark : styles.container,
        { paddingTop: safeAreaInsets.top },
      ]}
    >
      <View style={styles.content}>{renderContent()}</View>
      <View
        style={[
          isDarkMode ? styles.tabBarDark : styles.tabBar,
          { paddingBottom: Math.max(12, safeAreaInsets.bottom) },
        ]}
      >
        <TabItem
          name="Home"
          active={active === 'Home'}
          onPress={() => switchTab('Home')}
          isDarkMode={isDarkMode}
        />
        <TabItem
          name="Profile"
          active={active === 'Profile'}
          onPress={() => (loggedIn ? switchTab('Profile') : setShowLogin(true))}
          isDarkMode={isDarkMode}
        />
        <TabItemCenter
          onPress={() => switchTab('Party')}
          active={active === 'Party'}
          isDarkMode={isDarkMode}
          label="Party"
        />
        <TabItem
          name="Search"
          active={active === 'Search'}
          onPress={() => switchTab('Search')}
          isDarkMode={isDarkMode}
        />
        <TabItem
          name="Cart"
          active={active === 'Cart'}
          onPress={() => switchTab('Cart')}
          cartCount={totalCartQuantity}
          isDarkMode={isDarkMode}
        />
      </View>
    </View>
  );
}

function TabItem({ name, active, onPress, disabled, cartCount, isDarkMode }) {
  return (
    <TouchableOpacity
      style={styles.tabItem}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={{ position: 'relative' }}>
        <Icon
          name={
            name === 'Profile'
              ? 'user'
              : name === 'Cart'
                ? 'shopping-cart'
                : name === 'Search'
                  ? 'search'
                  : name === 'Party'
                    ? 'birthday-cake'
                    : 'home'
          }
          size={18}
          color={
            active
              ? '#b8860b'
              : disabled
                ? isDarkMode
                  ? '#888'
                  : '#ccc'
                : isDarkMode
                  ? '#999'
                  : '#666'
          }
          style={{ marginBottom: 4 }}
        />
        {name === 'Cart' && cartCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>
              {cartCount > 99 ? '99+' : cartCount}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.tabLabelContainer}>
        <Text
          style={[
            isDarkMode ? styles.tabLabelDark : styles.tabLabel,
            active && styles.tabLabelActive,
            disabled &&
            (isDarkMode
              ? styles.tabLabelDisabledDark
              : styles.tabLabelDisabled),
          ]}
        >
          {name === 'Party' ? 'Party' : name}
        </Text>
        {active && (
          <Icon
            name="circle"
            size={6}
            color="#b8860b"
            style={styles.activeIndicator}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

function TabItemCenter({ onPress, active, isDarkMode }) {
  return (
    <TouchableOpacity
      style={[styles.centerButtonContainer]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={[styles.centerButton, active && styles.centerButtonActive]}>
        <Icon
          name="birthday-cake"
          size={24}
          color={active ? '#fff' : '#b8860b'}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1 },
  tabBar: {
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    // borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    marginTop: 6,
  },
  containerDark: { flex: 1, backgroundColor: '#000' },
  tabBarDark: {
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    // borderTopWidth: 0.5,
    borderTopColor: '#333',
    backgroundColor: '#000',
    marginTop: 6,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  icon: { width: 22, height: 22, tintColor: '#666', marginBottom: 4 },
  iconActive: { tintColor: '#b8860b' },
  tabLabel: { fontSize: 11, color: '#666' },
  tabLabelActive: { color: '#b8860b', fontWeight: '700' },
  tabLabelDisabled: { color: '#ccc' },
  tabLabelDark: { fontSize: 11, color: '#999' },
  tabLabelDisabledDark: { color: '#888' },
  tabLabelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  activeIndicator: {
    marginTop: 2,
  },
  centerButtonContainer: { width: 72, alignItems: 'center', marginTop: -26 },
  centerButton: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderWidth: 3,
    borderColor: '#fff',
  },
  centerButtonActive: { backgroundColor: '#f6d365' },
  centerIcon: { width: 36, height: 36, resizeMode: 'contain' },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#b8860b',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  centerLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    fontWeight: '600',
  },
  centerLabelActive: {
    color: '#b8860b',
  },
});

export default App;
