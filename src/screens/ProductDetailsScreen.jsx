import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

export default function ProductDetailsScreen({ product, onBack, onAddToCart }) {
  const dispatch = useDispatch();
  const [selectedPortion, setSelectedPortion] = useState(
    product.portions[0]?.id,
  );
  const [selectedDips, setSelectedDips] = useState([]);
  const [selectedBeverages, setSelectedBeverages] = useState([]);

  const handleDipToggle = dipId => {
    setSelectedDips(prev =>
      prev.includes(dipId) ? prev.filter(d => d !== dipId) : [...prev, dipId],
    );
  };

  const handleBeverageToggle = bevId => {
    setSelectedBeverages(prev =>
      prev.includes(bevId) ? prev.filter(b => b !== bevId) : [...prev, bevId],
    );
  };

  const calculateTotal = () => {
    let total = product.price;
    if (selectedPortion) {
      const portion = product.portions.find(p => p.id === selectedPortion);
      total += portion?.price || 0;
    }
    selectedDips.forEach(dipId => {
      const dip = product.dips.find(d => d.id === dipId);
      total += dip?.price || 0;
    });
    selectedBeverages.forEach(bevId => {
      const bev = product.beverages.find(b => b.id === bevId);
      total += bev?.price || 0;
    });
    return total;
  };

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id,
      quantity: 1,
      product: product,
      customizations: {
        portion: selectedPortion,
        dips: selectedDips,
        beverages: selectedBeverages,
      },
    };
    dispatch(addToCart(cartItem));
    onAddToCart && onAddToCart();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image */}
        <Image source={{ uri: product.imageUrl }} style={styles.productImage} />

        {/* Product Info */}
        <View style={styles.infoSection}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productDesc}>{product.description}</Text>
          <Text style={styles.basePrice}>Base Price: ₹{product.price}</Text>
        </View>

        {/* Portions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose your Portion</Text>
          <Text style={styles.required}>* Required</Text>
          {product.portions.map(portion => (
            <TouchableOpacity
              key={portion.id}
              style={styles.optionRow}
              onPress={() => setSelectedPortion(portion.id)}
            >
              <View
                style={[
                  styles.radio,
                  selectedPortion === portion.id && styles.radioSelected,
                ]}
              >
                {selectedPortion === portion.id && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Text style={styles.optionName}>{portion.name}</Text>
              <Text style={styles.optionPrice}>
                {portion.price > 0 ? `+₹${portion.price}` : 'Free'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dips Section */}
        {product.dips && product.dips.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose Your Dips</Text>
            <Text style={styles.subText}>
              Select upto {product.dips.length} options
            </Text>
            {product.dips.map(dip => (
              <TouchableOpacity
                key={dip.id}
                style={styles.checkboxRow}
                onPress={() => handleDipToggle(dip.id)}
              >
                <View
                  style={[
                    styles.checkbox,
                    selectedDips.includes(dip.id) && styles.checkboxSelected,
                  ]}
                >
                  {selectedDips.includes(dip.id) && (
                    <Icon name="check" size={12} color="#fff" />
                  )}
                </View>
                <Text style={styles.optionName}>{dip.name}</Text>
                <Text style={styles.optionPrice}>+₹{dip.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Beverages Section */}
        {product.beverages && product.beverages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add Beverage</Text>
            <Text style={styles.subText}>
              Select upto {product.beverages.length} options
            </Text>
            {product.beverages.map(bev => (
              <TouchableOpacity
                key={bev.id}
                style={styles.checkboxRow}
                onPress={() => handleBeverageToggle(bev.id)}
              >
                <View
                  style={[
                    styles.checkbox,
                    selectedBeverages.includes(bev.id) &&
                      styles.checkboxSelected,
                  ]}
                >
                  {selectedBeverages.includes(bev.id) && (
                    <Icon name="check" size={12} color="#fff" />
                  )}
                </View>
                <Text style={styles.optionName}>{bev.name}</Text>
                <Text style={styles.optionPrice}>+₹{bev.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Footer with Total and Add Button */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Grand Total</Text>
          <Text style={styles.totalPrice}>₹{calculateTotal()}</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
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
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  content: { paddingBottom: 120 },
  productImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  infoSection: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  productDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  basePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#b8860b',
  },
  section: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  required: {
    fontSize: 12,
    color: '#ff6b6b',
    marginBottom: 12,
  },
  subText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#b8860b',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#b8860b',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#999',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#b8860b',
    borderColor: '#b8860b',
  },
  optionName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  optionPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#b8860b',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#b8860b',
    padding: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#b8860b',
    fontWeight: '700',
    fontSize: 16,
  },
});
