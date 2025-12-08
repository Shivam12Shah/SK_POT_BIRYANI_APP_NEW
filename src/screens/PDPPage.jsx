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
import Toast from '../components/Toast';

export default function PDPPage({ product, onBack }) {
  const dispatch = useDispatch();
  const yourState = useSelector(state => state.yourReducer);
  const [selectedDips, setSelectedDips] = useState([]);
  const [selectedBeverages, setSelectedBeverages] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showAddonsModal, setShowAddonsModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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

    setToastMessage('Added to cart!');
    setShowToast(true);
    setShowAddonsModal(false);
    setTimeout(() => onBack(), 1500);
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

      setToastMessage('Added to cart!');
      setShowToast(true);
      setTimeout(() => onBack(), 1500);
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
        {/* Product Image with Overlay */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.imageOverlay} />

          {/* Bestseller Badge */}
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Icon name="star" size={12} color="#fff" />
              <Text style={styles.badgeText}>Bestseller</Text>
            </View>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoCard}>
          <View style={styles.titleSection}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{product.name}</Text>

              {/* Rating Section */}
              <View style={styles.ratingSection}>
                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      key={star}
                      name="star"
                      size={14}
                      color={star <= 4 ? "#ffc107" : "#ddd"}
                      style={{ marginRight: 2 }}
                    />
                  ))}
                </View>
                <Text style={styles.ratingText}>4.0 (250+ ratings)</Text>
              </View>

              <Text style={styles.description}>{product.description}</Text>

              {/* Feature Tags */}
              <View style={styles.featureTags}>
                <View style={styles.featureTag}>
                  <Icon name="leaf" size={12} color="#4caf50" />
                  <Text style={styles.featureTagText}>Fresh</Text>
                </View>
                <View style={styles.featureTag}>
                  <Icon name="fire" size={12} color="#ff5722" />
                  <Text style={styles.featureTagText}>Spicy</Text>
                </View>
                <View style={styles.featureTag}>
                  <Icon name="clock-o" size={12} color="#2196f3" />
                  <Text style={styles.featureTagText}>30 min</Text>
                </View>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.basePrice}>₹{product.price}</Text>
              <Text style={styles.perServing}>per serving</Text>
            </View>
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

      {/* Toast Notification */}
      <Toast
        visible={showToast}
        message={toastMessage}
        type="success"
        onHide={() => setShowToast(false)}
      />
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
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
  },
  badgeContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
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
    fontSize: 24,
    fontWeight: '700',
    color: '#b8860b',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  perServing: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  featureTags: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  featureTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  featureTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    marginLeft: 4,
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
    gap: 12,
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
    marginRight: 16,
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
    backgroundColor: 'transparent',
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
