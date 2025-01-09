import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import HeroSection from '../../assets/images/mutton_1.jpg';
// import HeroSection from '../../assets/images/mutton_2.jpg';


const { width } = Dimensions.get('window');

const Mutton = () => {
  const [products, setProducts] = useState([]);
  const { cart, dispatch } = useCart();
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://way2save.onrender.com/auth/products/mutton');
      // console.log(response)
      const productsWithQuantity = response.data.map(product => ({
        ...product,
        quantity: 1
      }));

      const updatedProducts = productsWithQuantity.map(product => {
        const cartItem = cart.find(item => item._id === product._id);
        return cartItem ? { ...product, quantity: cartItem.quantity } : product;
      });

      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const toggleSelection = (product) => {
    if (cart.some(item => item._id === product._id)) {
      dispatch({ type: "REMOVE_FROM_CART", payload: product._id });
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...product, quantity: product.quantity, image_url: product.image_url },
      });
    }
  };

  const incrementQuantity = (id) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product._id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );

    if (cart.some(item => item._id === id)) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { _id: id, quantity: products.find(product => product._id === id).quantity + 1 }
      });
    }
  };

  const decrementQuantity = (id) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product._id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );

    if (cart.some(item => item._id === id)) {
      const updatedProduct = products.find(product => product._id === id);
      if (updatedProduct.quantity > 1) {
        dispatch({
          type: "UPDATE_QUANTITY",
          payload: { _id: id, quantity: updatedProduct.quantity - 1 }
        });
      }
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image
        source={{ uri: `https://way2save.onrender.com/uploads/${item.image_url}.jpg` }}
        style={styles.productImage}
      />
      <View style={styles.productContent}>
        <View style={styles.productHeader}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>
            £{item.price * (cart.find(cartItem => cartItem._id === item._id)?.quantity || item.quantity)}
          </Text>
        </View>
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={() => decrementQuantity(item._id)} style={styles.quantityButton}>
            <Feather name="minus" size={18} color="#000" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>
            {cart.find(cartItem => cartItem._id === item._id)?.quantity || item.quantity} Kg
          </Text>
          <TouchableOpacity onPress={() => incrementQuantity(item._id)} style={styles.quantityButton}>
            <Feather name="plus" size={18} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            cart.some(cartItem => cartItem._id === item._id) ? styles.removeFromCartButton : {}
          ]}
          onPress={() => toggleSelection(item)}
        >
          <Text style={styles.addToCartButtonText}>
            {cart.some(cartItem => cartItem._id === item._id) ? "Remove from Cart" : "Add to Cart"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        ListHeaderComponent={
          <View style={styles.heroSection}>
            <Image source={HeroSection} style={styles.heroImage} />
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Succulent Halal Mutton Cuts</Text>
              <Text style={styles.heroDescription}>
                Our mutton is sourced from halal-certified farms, ensuring it meets the highest quality and ethical standards. With cuts that range from rich, tender chops to flavorful stews, each piece is carefully selected to deliver exceptional taste and texture. Enjoy the authenticity and premium quality of halal mutton in every meal.
              </Text>
            </View>
          </View>
        }
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  heroSection: {
    backgroundColor: '#FFE3E5',
    padding: 16,
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  productList: {
    // padding: 8,
  },
  productCard: {
    width: (width - 48) / 2,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  productContent: {
    padding: 12,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productTitle: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 'bold',
    height:'40',
    flex: 1,
    marginRight: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'medium',
  },
  addToCartButton: {
    backgroundColor: '#E31244',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  removeFromCartButton: {
    backgroundColor: '#000',
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Mutton;