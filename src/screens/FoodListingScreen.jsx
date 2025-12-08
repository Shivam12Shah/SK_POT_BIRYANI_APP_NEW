import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

export default function FoodListingScreen({ onProductSelect, onBack }) {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Group products by category
  const categories = {};
  products.forEach(product => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  });

  const categoryList = Object.keys(categories);

  // Show limited items per category (4) unless "Show All" is clicked
  const getItemsToShow = categoryItems => {
    return showAll ? categoryItems : categoryItems.slice(0, 4);
  };

  const FoodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.foodCard}
      onPress={() => onProductSelect(item)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.foodImage} />
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.title}</Text>
        <Text style={styles.foodDesc} numberOfLines={1}>
          {item.description}
        </Text>
        <Text style={styles.foodPrice}>₹{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.addBtn}>
        <Icon name="plus" size={16} color="#b8860b" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Items</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {categoryList.map(category => (
          <View key={category} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <TouchableOpacity
                onPress={() =>
                  setExpandedCategory(
                    expandedCategory === category ? null : category,
                  )
                }
              >
                <Icon
                  name={
                    expandedCategory === category
                      ? 'chevron-up'
                      : 'chevron-down'
                  }
                  size={18}
                  color="#b8860b"
                />
              </TouchableOpacity>
            </View>

            {(expandedCategory === category || expandedCategory === null) && (
              <View>
                {getItemsToShow(categories[category]).map(item => (
                  <FoodItem key={item.id} item={item} />
                ))}

                {!showAll && categories[category].length > 4 && (
                  <TouchableOpacity
                    style={styles.exploreMore}
                    onPress={() => setShowAll(true)}
                  >
                    <Text style={styles.exploreMoreText}>
                      + {categories[category].length - 4} More Items
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#000' },
  categorySection: {
    marginVertical: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  foodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
    marginRight: 12,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  foodDesc: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
  },
  foodPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#b8860b',
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#b8860b',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  exploreMore: {
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  exploreMoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#b8860b',
  },
});
