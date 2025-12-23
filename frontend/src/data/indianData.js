// Realistic Indian Restaurant & Menu Data
// Structured for easy database population

export const indianRestaurants = [
  // Chennai Restaurants
  {
    id: 1,
    name: 'A2B (Adyar Ananda Bhavan)',
    description: 'Authentic South Indian cuisine since 1946',
    cuisine: ['South Indian', 'Vegetarian'],
    city: 'Chennai',
    area: 'T Nagar',
    address: '123 Ranganathan Street, T Nagar, Chennai',
    phone: '044-1234-5001',
    rating: 4.7,
    deliveryTime: '30-40 mins',
    image: 'https://images.unsplash.com/photo-1585521537190-6ba90e5df63a?w=600&h=400&fit=crop',
    isVeg: true,
    tags: ['Vegetarian', 'South Indian', 'Budget Friendly'],
    offers: ['40% off on orders above ₹500', 'Free Dessert on ₹1000+']
  },
  {
    id: 2,
    name: 'Saravana Bhavan',
    description: 'Premium South Indian restaurant with global presence',
    cuisine: ['South Indian', 'North Indian', 'Vegetarian'],
    city: 'Chennai',
    area: 'Velachery',
    address: '456 Old Mahabalipuram Road, Velachery, Chennai',
    phone: '044-1234-5002',
    rating: 4.6,
    deliveryTime: '25-35 mins',
    image: 'https://images.unsplash.com/photo-1585707572336-073151af975a?w=600&h=400&fit=crop',
    isVeg: true,
    tags: ['Vegetarian', 'South Indian', 'Premium'],
    offers: ['₹100 off on first 3 orders']
  },
  {
    id: 3,
    name: 'Sangeetha Restaurants',
    description: 'Family-style South Indian dining',
    cuisine: ['South Indian', 'Chettinad'],
    city: 'Chennai',
    area: 'Anna Nagar',
    address: '789 TTK Road, Anna Nagar, Chennai',
    phone: '044-1234-5003',
    rating: 4.5,
    deliveryTime: '35-45 mins',
    image: 'https://images.unsplash.com/photo-1618517214697-cfb184e36e60?w=600&h=400&fit=crop',
    isVeg: false,
    tags: ['South Indian', 'Chettinad', 'Non-Veg'],
    offers: ['Weekend combo deals']
  },
  {
    id: 4,
    name: 'Anjappar',
    description: 'Authentic Chettinad cuisine specialist',
    cuisine: ['Chettinad', 'South Indian'],
    city: 'Chennai',
    area: 'OMR',
    address: '321 OMR Road, Chennai',
    phone: '044-1234-5004',
    rating: 4.8,
    deliveryTime: '40-50 mins',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop',
    isVeg: false,
    tags: ['Chettinad', 'Spicy', 'Non-Veg'],
    offers: ['₹150 off on lunch specials']
  },
  {
    id: 5,
    name: 'Buhari',
    description: 'Legendary biryani and seafood specialists',
    cuisine: ['Biryani', 'Seafood', 'Mughlai'],
    city: 'Chennai',
    area: 'T Nagar',
    address: '555 Maharaja Street, T Nagar, Chennai',
    phone: '044-1234-5005',
    rating: 4.9,
    deliveryTime: '35-45 mins',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a104?w=600&h=400&fit=crop',
    isVeg: false,
    tags: ['Biryani', 'Seafood', 'Premium'],
    offers: ['Free Biryani on ₹2000+ orders']
  },
  
  // Bangalore Restaurants
  {
    id: 6,
    name: 'BBQ Nation',
    description: 'Premium multi-cuisine restaurant',
    cuisine: ['BBQ', 'North Indian', 'Chinese'],
    city: 'Bangalore',
    area: 'Indiranagar',
    address: '789 100 Feet Road, Indiranagar, Bangalore',
    phone: '080-1234-5006',
    rating: 4.6,
    deliveryTime: '40-50 mins',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
    isVeg: false,
    tags: ['BBQ', 'Premium', 'Multi-Cuisine'],
    offers: ['Happy Hour: 20% off 5-7 PM']
  },
  {
    id: 7,
    name: 'Vidyarthi Bhavan',
    description: 'Classic South Indian breakfast specialist',
    cuisine: ['South Indian', 'Vegetarian'],
    city: 'Bangalore',
    area: 'Basavanagudi',
    address: '123 Chickpet Road, Basavanagudi, Bangalore',
    phone: '080-1234-5007',
    rating: 4.7,
    deliveryTime: '25-35 mins',
    image: 'https://images.unsplash.com/photo-1655635643916-89d9a78d7e3b?w=600&h=400&fit=crop',
    isVeg: true,
    tags: ['South Indian', 'Breakfast', 'Vegetarian'],
    offers: ['Early bird: 30% off 7-9 AM']
  },

  // Hyderabad Restaurants
  {
    id: 8,
    name: 'Paradise Biryani',
    description: 'Home of Hyderabadi dum biryani',
    cuisine: ['Biryani', 'Hyderabadi', 'Mughlai'],
    city: 'Hyderabad',
    area: 'Gachibowli',
    address: '456 HITEC City Road, Gachibowli, Hyderabad',
    phone: '040-1234-5008',
    rating: 4.8,
    deliveryTime: '35-45 mins',
    image: 'https://images.unsplash.com/photo-1585518419759-3db3416ba369?w=600&h=400&fit=crop',
    isVeg: false,
    tags: ['Biryani', 'Hyderabadi', 'Famous'],
    offers: ['Buy 1 Get 1 on selected items']
  },

  // Mumbai Restaurants
  {
    id: 9,
    name: 'Mahesh Lunch Home',
    description: 'Premium seafood and Tandoori specialist',
    cuisine: ['Seafood', 'North Indian', 'Tandoori'],
    city: 'Mumbai',
    area: 'Powai',
    address: '789 Link Road, Powai, Mumbai',
    phone: '022-1234-5009',
    rating: 4.7,
    deliveryTime: '40-50 mins',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
    isVeg: false,
    tags: ['Seafood', 'Premium', 'Tandoori'],
    offers: ['₹200 off on first order']
  },

  // Fast Food Chains
  {
    id: 10,
    name: 'Domino\'s Pizza',
    description: 'Quick, delicious pizzas and sides',
    cuisine: ['Pizza', 'Fast Food'],
    city: 'Chennai',
    area: 'T Nagar',
    address: '100 Ranganathan Street, T Nagar, Chennai',
    phone: '044-1234-5010',
    rating: 4.3,
    deliveryTime: '20-30 mins',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=600&h=400&fit=crop',
    isVeg: false,
    tags: ['Pizza', 'Fast Food', 'Budget'],
    offers: ['₹99 special pizza', '30% off on app']
  },
  {
    id: 11,
    name: 'KFC India',
    description: 'Finger-licking good fried chicken',
    cuisine: ['Fried Chicken', 'Fast Food'],
    city: 'Bangalore',
    area: 'Whitefield',
    address: '321 Whitefield Road, Bangalore',
    phone: '080-1234-5011',
    rating: 4.4,
    deliveryTime: '25-35 mins',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cda1ec?w=600&h=400&fit=crop',
    isVeg: false,
    tags: ['Fried Chicken', 'Fast Food'],
    offers: ['Combo meals at ₹199', 'Free fries with combo']
  }
];

export const restaurantMenus = {
  1: [ // A2B
    { id: 1, name: 'Masala Dosa', description: 'Crispy rice crepe with spiced potato filling', price: 120, veg: true, category: 'Breakfast' },
    { id: 2, name: 'Idli Sambar', description: 'Steamed rice cakes with sambar', price: 80, veg: true, category: 'Breakfast' },
    { id: 3, name: 'Vada', description: 'Crispy lentil donuts, 3 pieces', price: 60, veg: true, category: 'Breakfast' },
    { id: 4, name: 'Uttapam', description: 'Thick pancake with vegetables', price: 100, veg: true, category: 'Breakfast' },
    { id: 5, name: 'Appam', description: 'Feathery rice pancake with stew', price: 120, veg: true, category: 'Mains' },
    { id: 6, name: 'Chana Masala', description: 'Chickpeas in spiced tomato gravy', price: 150, veg: true, category: 'Mains' },
    { id: 7, name: 'Dal Makhani', description: 'Creamy lentil curry', price: 180, veg: true, category: 'Mains' },
    { id: 8, name: 'Gulab Jamun', description: 'Sweet milk solids in syrup, 4 pieces', price: 90, veg: true, category: 'Dessert' }
  ],
  2: [ // Saravana Bhavan
    { id: 9, name: 'Paneer Butter Masala', description: 'Cottage cheese in creamy tomato sauce', price: 250, veg: true, category: 'Mains' },
    { id: 10, name: 'Dosa Special', description: 'Crispy dosa with sambar & chutney', price: 140, veg: true, category: 'Breakfast' },
    { id: 11, name: 'Pongal', description: 'Rice and lentil dish with ghee', price: 110, veg: true, category: 'Breakfast' },
    { id: 12, name: 'Kheer', description: 'Rice pudding with condensed milk', price: 100, veg: true, category: 'Dessert' }
  ],
  3: [ // Sangeetha
    { id: 13, name: 'Chettinad Chicken', description: 'Spicy chicken cooked Chettinad style', price: 320, veg: false, category: 'Non-Veg' },
    { id: 14, name: 'Pepper Chicken', description: 'Chicken with crushed black pepper', price: 300, veg: false, category: 'Non-Veg' },
    { id: 15, name: 'Fish Curry', description: 'Fresh catch in coconut gravy', price: 350, veg: false, category: 'Non-Veg' },
    { id: 16, name: 'Masala Dosa', description: 'Crispy dosa with spiced potatoes', price: 130, veg: true, category: 'Breakfast' }
  ],
  4: [ // Anjappar
    { id: 17, name: 'Chicken Biryani', description: 'Fragrant basmati rice with tender chicken', price: 380, veg: false, category: 'Biryani' },
    { id: 18, name: 'Mutton Biryani', description: 'Premium dum biryani with mutton', price: 450, veg: false, category: 'Biryani' },
    { id: 19, name: 'Pepper Chicken', description: 'Fiery chicken with cracked peppercorns', price: 320, veg: false, category: 'Non-Veg' },
    { id: 20, name: 'Chana Masala', description: 'Chickpeas in aromatic spices', price: 160, veg: true, category: 'Mains' }
  ],
  5: [ // Buhari
    { id: 21, name: 'Chicken Biryani', description: 'Legendary Buhari chicken biryani', price: 400, veg: false, category: 'Biryani' },
    { id: 22, name: 'Fish Biryani', description: 'Fresh fish in aromatic basmati', price: 420, veg: false, category: 'Biryani' },
    { id: 23, name: 'Prawn Biryani', description: 'Premium prawns with saffron rice', price: 480, veg: false, category: 'Biryani' },
    { id: 24, name: 'Fish Curry', description: 'Spiced fish in coconut gravy', price: 360, veg: false, category: 'Non-Veg' }
  ],
  6: [ // BBQ Nation
    { id: 25, name: 'Tandoori Chicken', description: 'Marinated chicken grilled in tandoor', price: 380, veg: false, category: 'Non-Veg' },
    { id: 26, name: 'Butter Chicken', description: 'Tender chicken in creamy tomato sauce', price: 350, veg: false, category: 'Non-Veg' },
    { id: 27, name: 'Paneer Tikka', description: 'Cottage cheese chunks grilled perfectly', price: 280, veg: true, category: 'Starters' },
    { id: 28, name: 'Rogan Josh', description: 'Aromatic mutton curry', price: 420, veg: false, category: 'Non-Veg' }
  ],
  7: [ // Vidyarthi Bhavan
    { id: 29, name: 'Masala Dosa', description: 'Crispy rice crepe with potato', price: 110, veg: true, category: 'Breakfast' },
    { id: 30, name: 'Idli Sambar', description: 'Fluffy idlis with sambar', price: 70, veg: true, category: 'Breakfast' },
    { id: 31, name: 'Vada Pav', description: 'Lentil fritter in bread', price: 50, veg: true, category: 'Snacks' },
    { id: 32, name: 'Filter Coffee', description: 'Authentic South Indian filter coffee', price: 40, veg: true, category: 'Beverages' }
  ],
  8: [ // Paradise Biryani
    { id: 33, name: 'Chicken Biryani', description: 'Hyderabadi dum biryani', price: 350, veg: false, category: 'Biryani' },
    { id: 34, name: 'Veg Biryani', description: 'Mixed vegetables with aromatic rice', price: 280, veg: true, category: 'Biryani' },
    { id: 35, name: 'Haleem', description: 'Slow-cooked meat and lentils', price: 300, veg: false, category: 'Mains' }
  ],
  9: [ // Mahesh
    { id: 36, name: 'Tandoori Prawns', description: 'Juicy prawns marinated in yogurt', price: 520, veg: false, category: 'Starters' },
    { id: 37, name: 'Fish Tikka', description: 'Fresh fish in tandoor', price: 480, veg: false, category: 'Starters' },
    { id: 38, name: 'Butter Garlic Crab', description: 'Fresh crab in butter garlic sauce', price: 650, veg: false, category: 'Non-Veg' }
  ],
  10: [ // Domino's
    { id: 39, name: 'Margherita Pizza', description: 'Classic tomato & mozzarella', price: 250, veg: true, category: 'Pizza' },
    { id: 40, name: 'Pepperoni Pizza', description: 'Spicy pepperoni with cheese', price: 320, veg: false, category: 'Pizza' },
    { id: 41, name: 'Chicken Burger', description: 'Grilled chicken patty with toppings', price: 280, veg: false, category: 'Burgers' },
    { id: 42, name: 'French Fries', description: 'Crispy golden fries', price: 120, veg: true, category: 'Sides' }
  ],
  11: [ // KFC
    { id: 43, name: 'Fried Chicken', description: '1 piece crispy fried chicken', price: 150, veg: false, category: 'Chicken' },
    { id: 44, name: 'Chicken Bucket', description: '8 pieces crispy fried chicken', price: 799, veg: false, category: 'Chicken' },
    { id: 45, name: 'Chicken Burger', description: 'Crispy chicken burger', price: 200, veg: false, category: 'Burgers' },
    { id: 46, name: 'French Fries', description: 'Classic golden fries', price: 100, veg: true, category: 'Sides' }
  ]
};

export default { indianRestaurants, restaurantMenus };
