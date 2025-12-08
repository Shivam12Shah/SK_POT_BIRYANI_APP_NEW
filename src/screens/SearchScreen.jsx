import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

export default function SearchScreen() {
  const dispatch = useDispatch();
  const yourState = useSelector(state => state.yourReducer);

  return (
    <View style={styles.container}>
      <View style={styles.appbarWrap}>
        <View style={styles.appbar}>
          <TouchableOpacity style={styles.back} onPress={() => {}}>
            {/* <Text style={styles.icon}>{'<'}</Text> */}
          </TouchableOpacity>
          <View style={styles.searchBox}>
            <TextInput
              placeholder="Try 'Burger'"
              placeholderTextColor="#333"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.close} onPress={() => {}}>
            <Text style={styles.icon}> Search </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Trending Near You</Text>
        <View style={styles.chipsRow}>
          {['Burger', 'Pizza', 'Biryani', 'Cheesecake'].map(c => (
            <TouchableOpacity key={c} style={styles.chip} onPress={() => {}}>
              <Icon
                name="line-chart"
                size={14}
                color="#333"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.chipText}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>What's on your mind?</Text>
        <View style={styles.productRow}>
          <View style={styles.productCard}>
            {/* <Image
              source={require('../assets/home.png')}
              style={styles.productImage}
              resizeMode="cover"
            /> */}
            <Text numberOfLines={1} style={styles.productTitle}>
              Starters & Kebabs
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  appbarWrap: { backgroundColor: '#f3e8ff', padding: 12 },
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3e8ff',
    borderRadius: 14,
    padding: 8,
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    height: 44,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#b6a1f0',
  },
  searchInput: {
    flex: 1,
    padding: 0,
    color: '#000',
    height: 36,
    textAlignVertical: 'center',
  },
  content: { padding: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    marginRight: 12,
    marginBottom: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  chipIcon: { marginRight: 8, color: '#333' },
  chipText: { color: '#333' },
  productRow: { paddingTop: 8 },
  productCard: {
    width: 120,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    paddingVertical: 8,
  },
  productImage: {
    height: 88,
    width: 88,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  productTitle: { maxWidth: 110, textAlign: 'center' },
});
