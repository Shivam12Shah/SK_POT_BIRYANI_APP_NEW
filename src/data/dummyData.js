const baseBiryaniItems = [
  {
    id: 'b1',
    name: 'Chicken Biryani',
    description:
      'Fragrant basmati rice cooked with tender chicken pieces and aromatic spices',
    price: 269,
    image:
      'https://j6e2i8c9.delivery.rocketcdn.me/wp-content/uploads/2020/09/Chicken-Biryani-Recipe-01-1.jpg',
    dips: [
      { id: 'd1', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd2', name: 'Green Chutney (100g)', price: 59 },
      { id: 'd3', name: 'Red Chilli Dip (100g)', price: 59 },
      { id: 'd4', name: 'Mint Yogurt Dip (100g)', price: 69 },
    ],
    beverages: [
      { id: 'bev1', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev2', name: 'Sprite 330ml', price: 67 },
      { id: 'bev3', name: 'Thums Up 330ml', price: 67 },
      { id: 'bev4', name: 'Fanta Orange 330ml', price: 67 },
    ],
    drinks: [
      { id: 'dr1', name: 'Lassi (250ml)', price: 79 },
      { id: 'dr2', name: 'Ayran Buttermilk (200ml)', price: 65 },
      { id: 'dr3', name: 'Masala Chai (200ml)', price: 49 },
      { id: 'dr4', name: 'Mango Juice (250ml)', price: 59 },
    ],
    nutrition: { calories: 860, proteins: 29, fats: 38, carbs: 94, sugar: 12 },
  },
  {
    id: 'b2',
    name: 'Veg Biryani',
    description:
      'Mixed vegetables with saffron-infused basmati rice and traditional spices',
    price: 199,
    image:
      'https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg',
    dips: [
      { id: 'd5', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd6', name: 'Green Chutney (100g)', price: 59 },
      { id: 'd7', name: 'Tamarind Dip (100g)', price: 59 },
    ],
    beverages: [
      { id: 'bev5', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev6', name: 'Sprite 330ml', price: 67 },
      { id: 'bev7', name: 'Lemon Soda 250ml', price: 59 },
    ],
    drinks: [
      { id: 'dr5', name: 'Sweet Lassi (250ml)', price: 79 },
      { id: 'dr6', name: 'Jaljeera (250ml)', price: 49 },
      { id: 'dr7', name: 'Lemon Mint Water (300ml)', price: 39 },
    ],
    nutrition: { calories: 720, proteins: 18, fats: 24, carbs: 110, sugar: 10 },
  },

  {
    id: 'b3',
    name: 'Mutton Biryani',
    description:
      'Slow-cooked tender mutton with aromatic rice and traditional spice blend',
    price: 399,
    image:
      'https://www.thehosteller.com/_next/image/?url=https%3A%2F%2Fstatic.thehosteller.com%2Fhostel%2Fimages%2Fimage.jpg%2Fimage-1744199226259.jpg&w=2048&q=75',
    dips: [
      { id: 'd8', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd9', name: 'Mint Chutney (100g)', price: 69 },
      { id: 'd10', name: 'Red Chilli Dip (100g)', price: 59 },
      { id: 'd11', name: 'Lemon Garlic Dip (100g)', price: 69 },
    ],
    beverages: [
      { id: 'bev8', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev9', name: 'Thums Up 330ml', price: 67 },
      { id: 'bev10', name: 'Sprite 330ml', price: 67 },
    ],
    drinks: [
      { id: 'dr8', name: 'Lassi (250ml)', price: 79 },
      { id: 'dr9', name: 'Masala Chai (200ml)', price: 49 },
      { id: 'dr10', name: 'Mango Shake (250ml)', price: 89 },
    ],
    nutrition: { calories: 980, proteins: 32, fats: 55, carbs: 88, sugar: 8 },
  },
  {
    id: 'b4',
    name: 'Fish Biryani',
    description:
      'Fresh fish marinated and cooked with fragrant rice and spices',
    price: 329,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRscnD3T0IkAh9yAnJUdqdfe-5sQRo21talsw&s',
    dips: [
      { id: 'd12', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd13', name: 'Lemon Coriander Dip (100g)', price: 69 },
      { id: 'd14', name: 'Green Chutney (100g)', price: 59 },
    ],
    beverages: [
      { id: 'bev11', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev12', name: 'Sprite 330ml', price: 67 },
      { id: 'bev13', name: 'Fanta 330ml', price: 67 },
    ],
    drinks: [
      { id: 'dr11', name: 'Lassi (250ml)', price: 79 },
      { id: 'dr12', name: 'Coconut Water (200ml)', price: 59 },
      { id: 'dr13', name: 'Pineapple Juice (250ml)', price: 59 },
    ],
    nutrition: { calories: 810, proteins: 27, fats: 40, carbs: 90, sugar: 9 },
  },
  {
    id: 'b5',
    name: 'Hyderabadi Dum Biryani',
    description:
      'Authentic Hyderabadi style biryani with sealed cooking method',
    price: 349,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9oQuHyw0Jkrgf7r39EEMQqHvJS6hI8TyZ-uhZsfmYmjWehLi7ePJ0uYQ_XECCbmPRSDc&usqp=CAU',
    dips: [
      { id: 'd15', name: 'Mint Chutney (100g)', price: 69 },
      { id: 'd16', name: 'Garlic Paste (100g)', price: 69 },
      { id: 'd17', name: 'Green Chutney (100g)', price: 59 },
    ],
    beverages: [
      { id: 'bev14', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev15', name: 'Thums Up 330ml', price: 67 },
      { id: 'bev16', name: 'Sprite 330ml', price: 67 },
    ],
    drinks: [
      { id: 'dr14', name: 'Traditional Lassi (250ml)', price: 79 },
      { id: 'dr15', name: 'Masala Chai (200ml)', price: 49 },
      { id: 'dr16', name: 'Gulab Jamun Shake (250ml)', price: 99 },
    ],
    nutrition: { calories: 940, proteins: 30, fats: 50, carbs: 96, sugar: 11 },
  },
  {
    id: 'b6',
    name: 'Paneer Biryani',
    description:
      'Cottage cheese cubes in aromatic basmati rice with fresh herbs',
    price: 249,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSo6hClAF__o7wsIt8cV371NjVHdddU2_kW9YGZLbI0yAzbOBezJ36vW6zUIKOo40kteI&usqp=CAU',
    dips: [
      { id: 'd18', name: 'Mint Yogurt Dip (100g)', price: 69 },
      { id: 'd19', name: 'Green Chutney (100g)', price: 59 },
      { id: 'd20', name: 'Red Chilli Dip (100g)', price: 59 },
    ],
    beverages: [
      { id: 'bev17', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev18', name: 'Sprite 330ml', price: 67 },
      { id: 'bev19', name: 'Lemon Soda 250ml', price: 59 },
    ],
    drinks: [
      { id: 'dr17', name: 'Lassi (250ml)', price: 79 },
      { id: 'dr18', name: 'Mango Lassi (250ml)', price: 89 },
      { id: 'dr19', name: 'Rose Sherbet (250ml)', price: 49 },
    ],
    nutrition: { calories: 780, proteins: 22, fats: 35, carbs: 100, sugar: 13 },
  },
  {
    id: 'b7',
    name: 'Lamb Biryani',
    description:
      'Premium lamb pieces slow-cooked with premium spices and basmati',
    price: 449,
    image:
    'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_960,w_960//InstamartAssets/hyderabadi_biryani%20(2).webp',
    dips: [
      { id: 'd21', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd22', name: 'Mint Chutney (100g)', price: 69 },
      { id: 'd23', name: 'Red Chilli Dip (100g)', price: 59 },
      { id: 'd24', name: 'Lemon Garlic Dip (100g)', price: 69 },
    ],
    beverages: [
      { id: 'bev20', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev21', name: 'Thums Up 330ml', price: 67 },
      { id: 'bev22', name: 'Sprite 330ml', price: 67 },
      { id: 'bev23', name: 'Fanta 330ml', price: 67 },
    ],
    drinks: [
      { id: 'dr20', name: 'Premium Lassi (250ml)', price: 89 },
      { id: 'dr21', name: 'Masala Chai (200ml)', price: 49 },
      { id: 'dr22', name: 'Mango Shake (250ml)', price: 89 },
    ],
    nutrition: { calories: 1020, proteins: 34, fats: 58, carbs: 85, sugar: 7 },
  },
  {
    id: 'b8',
    name: 'Shrimp Biryani',
    description:
      'Succulent shrimp cooked with aromatic rice and traditional spices',
    price: 379,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5dQbI73IqUrxG_C4i2IVhUugkUVllOT4gbKo15jPmtVgVO5dL-kr4K4rkL0pB__CwiP4&usqp=CAU',
    dips: [
      { id: 'd25', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd26', name: 'Lemon Coriander Dip (100g)', price: 69 },
      { id: 'd27', name: 'Green Chutney (100g)', price: 59 },
    ],
    beverages: [
      { id: 'bev24', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev25', name: 'Sprite 330ml', price: 67 },
      { id: 'bev26', name: 'Lemon Soda 250ml', price: 59 },
    ],
    drinks: [
      { id: 'dr23', name: 'Lassi (250ml)', price: 79 },
      { id: 'dr24', name: 'Coconut Water (200ml)', price: 59 },
      { id: 'dr25', name: 'Pineapple Juice (250ml)', price: 59 },
    ],
    nutrition: { calories: 840, proteins: 26, fats: 42, carbs: 92, sugar: 10 },
  },
  {
    id: 'b9',
    name: 'Mixed Veg Biryani',
    description:
      'Assorted vegetables with aromatic rice and garden-fresh herbs',
    price: 219,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWW4sNZaBj3iZxSdU35PRwJBCax-OIvhjcHfPoHw4nB8y9-E21QImAu050ADzcl0l41oY&usqp=CAU',
    dips: [
      { id: 'd28', name: 'Green Chutney (100g)', price: 59 },
      { id: 'd29', name: 'Mint Yogurt Dip (100g)', price: 69 },
      { id: 'd30', name: 'Tamarind Dip (100g)', price: 59 },
    ],
    beverages: [
      { id: 'bev27', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev28', name: 'Sprite 330ml', price: 67 },
      { id: 'bev29', name: 'Fanta 330ml', price: 67 },
    ],
    drinks: [
      { id: 'dr26', name: 'Lassi (250ml)', price: 79 },
      { id: 'dr27', name: 'Jaljeera (250ml)', price: 49 },
      { id: 'dr28', name: 'Lemon Mint Water (300ml)', price: 39 },
    ],
    nutrition: { calories: 760, proteins: 20, fats: 30, carbs: 98, sugar: 9 },
  },
  {
    id: 'b10',
    name: 'Chicken Tikka Biryani',
    description: 'Marinated chicken tikka pieces with fragrant biryani rice',
    price: 289,
    image:
      'https://images.unsplash.com/photo-1603894542802-f6741f60a616?auto=format&fit=crop&w=500&q=60',
    dips: [
      { id: 'd31', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd32', name: 'Green Chutney (100g)', price: 59 },
      { id: 'd33', name: 'Red Chilli Dip (100g)', price: 59 },
    ],
    beverages: [
      { id: 'bev30', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev31', name: 'Sprite 330ml', price: 67 },
      { id: 'bev32', name: 'Thums Up 330ml', price: 67 },
    ],
    drinks: [
      { id: 'dr29', name: 'Lassi (250ml)', price: 79 },
      { id: 'dr30', name: 'Masala Chai (200ml)', price: 49 },
      { id: 'dr31', name: 'Mango Shake (250ml)', price: 89 },
    ],
    nutrition: { calories: 900, proteins: 28, fats: 46, carbs: 95, sugar: 12 },
  },
  {
    id: 'b11',
    name: 'Mushroom Biryani',
    description: 'Fresh button mushrooms in aromatic rice with garden spices',
    price: 229,
    image:
      'https://images.unsplash.com/photo-1606787620384-46ce2226d53d?auto=format&fit=crop&w=500&q=60',
    dips: [
      { id: 'd34', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd35', name: 'Green Chutney (100g)', price: 59 },
      { id: 'd36', name: 'Mint Dip (100g)', price: 69 },
    ],
    beverages: [
      { id: 'bev33', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev34', name: 'Sprite 330ml', price: 67 },
      { id: 'bev35', name: 'Lemon Soda 250ml', price: 59 },
    ],
    drinks: [
      { id: 'dr32', name: 'Lassi (250ml)', price: 79 },
      { id: 'dr33', name: 'Mango Lassi (250ml)', price: 89 },
      { id: 'dr34', name: 'Rose Sherbet (250ml)', price: 49 },
    ],
    nutrition: { calories: 790, proteins: 21, fats: 34, carbs: 101, sugar: 14 },
  },
  {
    id: 'b12',
    name: 'Egg Biryani',
    description: 'Boiled eggs with aromatic biryani rice and spiced sauce',
    price: 239,
    image:
      'https://images.unsplash.com/photo-1631048260806-a2e9c7ee3d84?auto=format&fit=crop&w=500&q=60',
    dips: [
      { id: 'd37', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd38', name: 'Green Chutney (100g)', price: 59 },
      { id: 'd39', name: 'Tamarind Dip (100g)', price: 59 },
    ],
    beverages: [
      { id: 'bev36', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev37', name: 'Sprite 330ml', price: 67 },
      { id: 'bev38', name: 'Fanta 330ml', price: 67 },
    ],
    drinks: [
      { id: 'dr35', name: 'Lassi (250ml)', price: 79 },
      { id: 'dr36', name: 'Jaljeera (250ml)', price: 49 },
      { id: 'dr37', name: 'Lemon Mint Water (300ml)', price: 39 },
    ],
    nutrition: { calories: 740, proteins: 19, fats: 28, carbs: 99, sugar: 11 },
  },
  {
    id: 'b13',
    name: 'Keema Biryani',
    description: 'Ground meat cooked with rice in traditional biryani style',
    price: 279,
    image:
      'https://images.unsplash.com/photo-1603894542802-f6741f60a616?auto=format&fit=crop&w=500&q=60',
    dips: [
      { id: 'd40', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd41', name: 'Mint Chutney (100g)', price: 69 },
      { id: 'd42', name: 'Red Chilli Dip (100g)', price: 59 },
    ],
    beverages: [
      { id: 'bev39', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev40', name: 'Thums Up 330ml', price: 67 },
      { id: 'bev41', name: 'Sprite 330ml', price: 67 },
    ],
    drinks: [
      { id: 'dr38', name: 'Lassi (250ml)', price: 79 },
      { id: 'dr39', name: 'Masala Chai (200ml)', price: 49 },
      { id: 'dr40', name: 'Mango Shake (250ml)', price: 89 },
    ],
    nutrition: { calories: 880, proteins: 27, fats: 43, carbs: 93, sugar: 10 },
  },
  {
    id: 'b14',
    name: 'Duck Biryani',
    description: 'Premium duck meat with fragrant rice and aromatic spices',
    price: 429,
    image:
      'https://images.unsplash.com/photo-1612874742237-415221591bfe?auto=format&fit=crop&w=500&q=60',
    dips: [
      { id: 'd43', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd44', name: 'Mint Chutney (100g)', price: 69 },
      { id: 'd45', name: 'Red Chilli Dip (100g)', price: 59 },
      { id: 'd46', name: 'Lemon Garlic Dip (100g)', price: 69 },
    ],
    beverages: [
      { id: 'bev42', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev43', name: 'Thums Up 330ml', price: 67 },
      { id: 'bev44', name: 'Sprite 330ml', price: 67 },
      { id: 'bev45', name: 'Fanta 330ml', price: 67 },
    ],
    drinks: [
      { id: 'dr41', name: 'Premium Lassi (250ml)', price: 89 },
      { id: 'dr42', name: 'Masala Chai (200ml)', price: 49 },
      { id: 'dr43', name: 'Mango Shake (250ml)', price: 89 },
    ],
    nutrition: { calories: 920, proteins: 29, fats: 49, carbs: 90, sugar: 9 },
  },
  {
    id: 'b15',
    name: 'Prawn Biryani',
    description:
      'Large prawns cooked with rice and traditional Hyderabadi spices',
    price: 389,
    image:
      'https://images.unsplash.com/photo-1596040588535-59ffdd41c9f1?auto=format&fit=crop&w=500&q=60',
    dips: [
      { id: 'd47', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd48', name: 'Lemon Coriander Dip (100g)', price: 69 },
      { id: 'd49', name: 'Green Chutney (100g)', price: 59 },
    ],
    beverages: [
      { id: 'bev46', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev47', name: 'Sprite 330ml', price: 67 },
      { id: 'bev48', name: 'Lemon Soda 250ml', price: 59 },
    ],
    drinks: [
      { id: 'dr44', name: 'Lassi (250ml)', price: 79 },
      { id: 'dr45', name: 'Coconut Water (200ml)', price: 59 },
      { id: 'dr46', name: 'Pineapple Juice (250ml)', price: 59 },
    ],
    nutrition: { calories: 830, proteins: 25, fats: 39, carbs: 97, sugar: 13 },
  },
  {
    id: 'b16',
    name: 'Tandoori Chicken Biryani',
    description: 'Tandoori marinated chicken with fragrant biryani rice',
    price: 299,
    image:
      'https://images.unsplash.com/photo-1603894542802-f6741f60a616?auto=format&fit=crop&w=500&q=60',
    dips: [
      { id: 'd50', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd51', name: 'Green Chutney (100g)', price: 59 },
      { id: 'd52', name: 'Red Chilli Dip (100g)', price: 59 },
    ],
    beverages: [
      { id: 'bev49', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev50', name: 'Sprite 330ml', price: 67 },
      { id: 'bev51', name: 'Thums Up 330ml', price: 67 },
    ],
    drinks: [
      { id: 'dr47', name: 'Lassi (250ml)', price: 79 },
      { id: 'dr48', name: 'Masala Chai (200ml)', price: 49 },
      { id: 'dr49', name: 'Mango Shake (250ml)', price: 89 },
    ],
    nutrition: { calories: 970, proteins: 31, fats: 53, carbs: 89, sugar: 8 },
  },
  {
    id: 'b17',
    name: 'Crab Biryani',
    description: 'Fresh crab meat with aromatic rice and coastal spices',
    price: 449,
    image:
      'https://images.unsplash.com/photo-1596040588535-59ffdd41c9f1?auto=format&fit=crop&w=500&q=60',
    dips: [
      { id: 'd53', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd54', name: 'Lemon Coriander Dip (100g)', price: 69 },
      { id: 'd55', name: 'Green Chutney (100g)', price: 59 },
      { id: 'd56', name: 'Red Chilli Dip (100g)', price: 59 },
    ],
    beverages: [
      { id: 'bev52', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev53', name: 'Sprite 330ml', price: 67 },
      { id: 'bev54', name: 'Lemon Soda 250ml', price: 59 },
      { id: 'bev55', name: 'Fanta 330ml', price: 67 },
    ],
    drinks: [
      { id: 'dr50', name: 'Lassi (250ml)', price: 79 },
      { id: 'dr51', name: 'Coconut Water (200ml)', price: 59 },
      { id: 'dr52', name: 'Pineapple Juice (250ml)', price: 59 },
    ],
    nutrition: { calories: 860, proteins: 24, fats: 37, carbs: 102, sugar: 12 },
  },
  {
    id: 'b18',
    name: 'Biryani Combo Pack',
    description: 'Mix of chicken and mutton biryani for two',
    price: 549,
    image:
      'https://images.unsplash.com/photo-1603894542802-f6741f60a616?auto=format&fit=crop&w=500&q=60',
    dips: [
      { id: 'd57', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd58', name: 'Mint Chutney (100g)', price: 69 },
      { id: 'd59', name: 'Red Chilli Dip (100g)', price: 59 },
      { id: 'd60', name: 'Green Chutney (100g)', price: 59 },
    ],
    beverages: [
      { id: 'bev56', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev57', name: 'Thums Up 330ml', price: 67 },
      { id: 'bev58', name: 'Sprite 330ml', price: 67 },
      { id: 'bev59', name: 'Fanta 330ml', price: 67 },
    ],
    drinks: [
      { id: 'dr53', name: 'Lassi (250ml)', price: 79 },
      { id: 'dr54', name: 'Mango Lassi (250ml)', price: 89 },
      { id: 'dr55', name: 'Masala Chai (200ml)', price: 49 },
    ],
    nutrition: { calories: 930, proteins: 30, fats: 48, carbs: 91, sugar: 11 },
  },
  {
    id: 'b19',
    name: 'Dum Pukht Biryani',
    description: 'Traditional sealed-pot biryani with layers of meat and rice',
    price: 319,
    image:
      'https://images.unsplash.com/photo-1604908177522-9d6a1b9b5f4a?auto=format&fit=crop&w=500&q=60',
    dips: [
      { id: 'd61', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd62', name: 'Mint Chutney (100g)', price: 69 },
      { id: 'd63', name: 'Red Chilli Dip (100g)', price: 59 },
    ],
    beverages: [
      { id: 'bev60', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev61', name: 'Thums Up 330ml', price: 67 },
      { id: 'bev62', name: 'Sprite 330ml', price: 67 },
    ],
    drinks: [
      { id: 'dr56', name: 'Lassi (250ml)', price: 79 },
      { id: 'dr57', name: 'Masala Chai (200ml)', price: 49 },
      { id: 'dr58', name: 'Mango Shake (250ml)', price: 89 },
    ],
    nutrition: { calories: 995, proteins: 33, fats: 56, carbs: 87, sugar: 7 },
  },
  {
    id: 'b20',
    name: 'Peri Peri Chicken Biryani',
    description: 'Spicy peri peri marinated chicken with biryani rice',
    price: 309,
    image:
      'https://images.unsplash.com/photo-1599695860021-d576dc27db7c?auto=format&fit=crop&w=500&q=60',
    dips: [
      { id: 'd64', name: 'Peri Peri Mayo (100g)', price: 79 },
      { id: 'd65', name: 'Garlic Mayonnaise (100g)', price: 69 },
      { id: 'd66', name: 'Green Chutney (100g)', price: 59 },
      { id: 'd67', name: 'Red Chilli Dip (100g)', price: 59 },
    ],
    beverages: [
      { id: 'bev63', name: 'Coke Zero 330ml', price: 70 },
      { id: 'bev64', name: 'Sprite 330ml', price: 67 },
      { id: 'bev65', name: 'Thums Up 330ml', price: 67 },
      { id: 'bev66', name: 'Fanta 330ml', price: 67 },
    ],
    drinks: [
      { id: 'dr59', name: 'Lassi (250ml)', price: 79 },
      { id: 'dr60', name: 'Mango Lassi (250ml)', price: 89 },
      { id: 'dr61', name: 'Masala Chai (200ml)', price: 49 },
    ],
    nutrition: { calories: 890, proteins: 26, fats: 41, carbs: 96, sugar: 10 },
  },
];

export const biryaniItems = baseBiryaniItems;
