import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Share } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../store/userSlice';

export default function ProfileScreen({
  onShowOrderHistory,
  onShowAddressManagement,
  navigation,
  onSwitchTab,
}) {
  const userProfile = useSelector(state => state.user.profile);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        {loggedIn && (
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>

      {loggedIn && userProfile && (
        <View style={styles.profileCard}>
          <View style={styles.profileIcon}>
            <Icon name="user-circle" size={60} color="#b8860b" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profilePhone}>{userProfile.phone}</Text>
          </View>
        </View>
      )}

      <View style={styles.card}>
        {/* Order History */}
        <TouchableOpacity
          style={styles.listItem}
          onPress={onShowOrderHistory}
        >
          <View style={styles.listLeft}>
            <Icon name="history" size={18} color="#b8860b" />
            <Text style={styles.listText}>Order History</Text>
          </View>
          <Icon name="chevron-right" size={16} color="#999" />
        </TouchableOpacity>

        {/* Manage Addresses */}
        <TouchableOpacity
          style={styles.listItem}
          onPress={onShowAddressManagement}
        >
          <View style={styles.listLeft}>
            <Icon name="map-marker" size={18} color="#b8860b" />
            <Text style={styles.listText}>Manage Addresses</Text>
          </View>
          <Icon name="chevron-right" size={16} color="#999" />
        </TouchableOpacity>

        {/* Rate Us */}
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation?.navigate && navigation.navigate('rateUs')}
        >
          <View style={styles.listLeft}>
            <Icon name="star" size={18} color="#b8860b" />
            <Text style={styles.listText}>Rate Us</Text>
          </View>
          <Icon name="chevron-right" size={16} color="#999" />
        </TouchableOpacity>

        {/* FAQs */}
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation?.navigate && navigation.navigate('faq')}
        >
          <View style={styles.listLeft}>
            <Icon name="question-circle" size={18} color="#b8860b" />
            <Text style={styles.listText}>FAQs</Text>
          </View>
          <Icon name="chevron-right" size={16} color="#999" />
        </TouchableOpacity>

        {/* Party Order */}
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => onSwitchTab && onSwitchTab('Party')}
        >
          <View style={styles.listLeft}>
            <Icon name="birthday-cake" size={18} color="#b8860b" />
            <Text style={styles.listText}>Party Order</Text>
          </View>
          <Icon name="chevron-right" size={16} color="#999" />
        </TouchableOpacity>

        {/* Share App */}
        <TouchableOpacity
          style={styles.listItem}
          onPress={async () => {
            try {
              await Share.share({
                message:
                  'Order delicious biryani from SK Pot Biryani App! Download now.',
              });
            } catch {}
          }}
        >
          <View style={styles.listLeft}>
            <Icon name="share-alt" size={18} color="#b8860b" />
            <Text style={styles.listText}>Share App</Text>
          </View>
          <Icon name="chevron-right" size={16} color="#999" />
        </TouchableOpacity>

        {/* Terms & Conditions */}
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation?.navigate && navigation.navigate('terms')}
        >
          <View style={styles.listLeft}>
            <Icon name="file-text" size={18} color="#b8860b" />
            <Text style={styles.listText}>Terms & Conditions</Text>
          </View>
          <Icon name="chevron-right" size={16} color="#999" />
        </TouchableOpacity>

        {/* Privacy Policy */}
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation?.navigate && navigation.navigate('privacy')}
        >
          <View style={styles.listLeft}>
            <Icon name="shield" size={18} color="#b8860b" />
            <Text style={styles.listText}>Privacy Policy</Text>
          </View>
          <Icon name="chevron-right" size={16} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  logoutBtn: {
    backgroundColor: '#b8860b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutText: { color: '#fff', fontWeight: '700' },
  profileCard: {
    margin: 12,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  profilePhone: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  card: {
    margin: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  listText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
});
