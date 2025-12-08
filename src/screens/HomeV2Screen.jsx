import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Slider from '../components/Slider';
import PromoCard from '../components/PromoCard';

export default function HomeV2Screen() {
  const dispatch = useDispatch();
  const yourState = useSelector(state => state.yourReducer);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.searchBar}>
          <Text style={styles.searchText}>Search for 'Dishes'</Text>
        </View>

        <Slider slides={[1, 2, 3]} />

        <View style={styles.categoriesHeader}>
          <Text style={styles.sectionTitle}>All Categories</Text>
          <Text style={styles.viewMore}>View Full Menu {'>'}</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalCat}
        >
          {[1, 2, 3, 4].map(i => (
            <View key={i} style={styles.catCard}>
              <View style={styles.catVisual} />
              <Text style={styles.catLabel}>Category {i}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Dastaan-E-Kebab</Text>
          <Text style={styles.explore}>Explore this Collection {'>'}</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalCat}
        >
          {[1, 2, 3].map(i => (
            <View key={i} style={styles.productCard}>
              <View style={styles.productVisual} />
              <Text style={styles.productTitle}>Murgh Kefta</Text>
              <Text style={styles.price}>₹159</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.grid}>
          <PromoCard title="Long Lost Biryanis" priceTag="₹269" />
          <PromoCard title="1+1 Biryanis" priceTag="₹250" />
          <PromoCard title="Biryani Serves 2" priceTag="₹499" />
          <PromoCard title="Biryani & Kebab Thalis" priceTag="₹259" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 12, paddingBottom: 40 },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchText: { color: '#333' },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  viewMore: { color: '#b8860b', fontWeight: '700' },
  horizontalCat: { marginBottom: 12 },
  catCard: {
    width: 120,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  catVisual: {
    height: 80,
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 6,
    marginBottom: 8,
  },
  catLabel: { fontSize: 12, textAlign: 'center' },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 6,
  },
  productCard: {
    width: 200,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  productVisual: {
    height: 110,
    backgroundColor: '#333',
    borderRadius: 6,
    marginBottom: 8,
  },
  productTitle: { fontSize: 14, fontWeight: '700' },
  price: { marginTop: 6, fontWeight: '700' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});
