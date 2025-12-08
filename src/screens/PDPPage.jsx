import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';

export default function PDPPage({ product, onBack }) {
  const dispatch = useDispatch();
  const yourState = useSelector(state => state.yourReducer);
  const [selectedDips, setSelectedDips] = useState([]);
  const [selectedBeverages, setSelectedBeverages] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showAddonsModal, setShowAddonsModal] = useState(false);

  const toggleDip = dipId => {
    setSelectedDips(prev =>
      prev.includes(dipId) ? prev.filter(d => d !== dipId) : [...prev, dipId],
    );
  };

  const toggleBeverage = bevId => {
    setSelectedBeverages(prev =>
      prev.includes(bevId) ? prev.filter(b => b !== bevId) : [...prev, bevId],
    );
  };

  const toggleDrink = drinkId => {
    setSelectedDrinks(prev =>
      prev.includes(drinkId)
        ? prev.filter(d => d !== drinkId)
        : [...prev, drinkId],
    );
  };

  const calculateAddonsPrice = () => {
    let total = 0;
    selectedDips.forEach(dipId => {
      const dip = product.dips?.find(d => d.id === dipId);
      if (dip) total += dip.price;
    });
    selectedBeverages.forEach(bevId => {
      const bev = product.beverages?.find(b => b.id === bevId);
      if (bev) total += bev.price;
    });
    selectedDrinks.forEach(drinkId => {
      const drink = product.drinks?.find(d => d.id === drinkId);
      if (drink) total += drink.price;
    });
    return total;
  };

  const totalPrice = (product.price + calculateAddonsPrice()) * quantity;

  const handleAddToCart = () => {
    const customizations = {
      dips: selectedDips.map(id => product.dips?.find(d => d.id === id) || null).filter(Boolean),
      beverages: selectedBeverages.map(id =>
        product.beverages?.find(b => b.id === id) || null,
      ).filter(Boolean),
      drinks: selectedDrinks.map(id => product.drinks?.find(d => d.id === id) || null).filter(Boolean),
    };

    dispatch(
      addToCart({
        product,
        quantity,
        customizations,
      }),
    );

    alert('Added to cart!');
    setShowAddonsModal(false);
    onBack();
  };

  const handleAddToCartClick = () => {
    // Check if product has any add-ons available
    const hasAddons =
      (product.dips && product.dips.length > 0) ||
      (product.beverages && product.beverages.length > 0) ||
      (product.drinks && product.drinks.length > 0);

    if (!hasAddons) {
      // If no add-ons, add directly to cart
      const customizations = {
        dips: [],
        beverages: [],
        drinks: [],
      };

      dispatch(
        addToCart({
          product,
          quantity,
          customizations,
        }),
      );

      alert('Added to cart!');
      onBack();
    } else {
      // If add-ons available, open modal
      setShowAddonsModal(true);
    }
  };

  const CustomizationItem = ({ item, isSelected, onToggle }) => (
    <TouchableOpacity
      style={[styles.customItem, isSelected && styles.customItemSelected]}
      onPress={onToggle}
    >
      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && <Icon name="check" size={14} color="#fff" />}
      </View>
      <View style={styles.customItemContent}>
        <Text style={styles.customItemName}>{item.name}</Text>
      </View>
      <Text style={styles.customItemPrice}>+₹{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Icon name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{product.name}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <Image source={{ uri: product.image }} style={styles.image} />

        {/* Product Info */}
        <View style={styles.infoCard}>
          <View style={styles.titleSection}>
            <View>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
            <Text style={styles.basePrice}>₹{product.price}</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            style={styles.quantityBtn}
          >
            <Icon name="minus" size={16} color="#b8860b" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            style={styles.quantityBtn}
          >
            <Icon name="plus" size={16} color="#b8860b" />
          </TouchableOpacity>
        </View>

        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Total</Text>
          <Text style={styles.totalPrice}>₹{totalPrice}</Text>
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCartClick}>
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Addons Modal */}
      <Modal
        transparent={true}
        visible={showAddonsModal}
        onRequestClose={() => setShowAddonsModal(false)}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Customize Your Order</Text>
              <TouchableOpacity onPress={() => setShowAddonsModal(false)}>
                <Icon name="times" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.modalScroll}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={true}
            >
              {/* Dips Section */}
              {product.dips && product.dips.length > 0 && (
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Choose Dips</Text>
                  <Text style={styles.modalSectionSubtitle}>Add delicious dips to enhance your meal</Text>
                  <View style={styles.optionsContainer}>
                    {product.dips.map(dip => (
                      <CustomizationItem
                        key={dip.id}
                        item={dip}
                        isSelected={selectedDips.includes(dip.id)}
                        onToggle={() => toggleDip(dip.id)}
                      />
                    ))}
                  </View>
                </View>
              )}

              {/* Beverages Section */}
              {product.beverages && product.beverages.length > 0 && (
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Choose Beverages</Text>
                  <Text style={styles.modalSectionSubtitle}>Select refreshing beverages to complement your meal</Text>
                  <View style={styles.optionsContainer}>
                    {product.beverages.map(bev => (
                      <CustomizationItem
                        key={bev.id}
                        item={bev}
                        isSelected={selectedBeverages.includes(bev.id)}
                        onToggle={() => toggleBeverage(bev.id)}
                      />
                    ))}
                  </View>
                </View>
              )}

              {/* Drinks Section */}
              {product.drinks && product.drinks.length > 0 && (
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Choose Drinks</Text>
                  <Text style={styles.modalSectionSubtitle}>Add traditional drinks and beverages</Text>
                  <View style={styles.optionsContainer}>
                    {product.drinks.map(drink => (
                      <CustomizationItem
                        key={drink.id}
                        item={drink}
                        isSelected={selectedDrinks.includes(drink.id)}
                        onToggle={() => toggleDrink(drink.id)}
                      />
                    ))}
                  </View>
                </View>
              )}

              <View style={{ height: 20 }} />
            </ScrollView>

            {/* Modal Footer */}
            <View style={styles.modalFooter}>
              <View style={styles.modalPriceSection}>
                <Text style={styles.modalPriceLabel}>Total Price</Text>
                <Text style={styles.modalTotalPrice}>₹{totalPrice}</Text>
              </View>
              <TouchableOpacity
                style={styles.modalAddBtn}
                onPress={handleAddToCart}
              >
                <Text style={styles.modalAddBtnText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
  },
  infoCard: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  basePrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#b8860b',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  optionsContainer: {
    marginTop: 8,
  },
  customItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginBottom: 8,
  },
  customItemSelected: {
    backgroundColor: '#fef9f0',
    borderColor: '#b8860b',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#b8860b',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: '#b8860b',
    borderColor: '#b8860b',
  },
  customItemContent: {
    flex: 1,
  },
  customItemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  customItemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#b8860b',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 12,
  },
  quantityBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    minWidth: 20,
    textAlign: 'center',
  },
  priceSection: {
    alignItems: 'flex-end',
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#b8860b',
  },
  addBtn: {
    backgroundColor: '#b8860b',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    flexDirection: 'column',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  modalScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 400,
  },
  modalSection: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  modalSectionSubtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 12,
    marginTop: -5,
  },
  modalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  modalPriceSection: {
    alignItems: 'flex-start',
    marginRight: 12,
    flex: 1,
  },
  modalPriceLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  modalTotalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#b8860b',
  },
  modalAddBtn: {
    backgroundColor: '#b8860b',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalAddBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
