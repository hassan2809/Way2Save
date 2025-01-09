import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons';
import HeroSection from '../../assets/images/2.jpg';
import ChickenImage from '../../assets/images/chicken.png';
import BeefImage from '../../assets/images/beef.png';
import LambImage from '../../assets/images/lamb.png';
import MuttonImage from '../../assets/images/goat.png';
import SeaFoodImage from '../../assets/images/fishes.png';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Categories from './Categories';
import Cart from './Cart';
import { createStackNavigator } from '@react-navigation/stack';
import Beef from '@/src/screens/Beef';
import Chicken from '@/src/screens/Chicken';
import Mutton from '@/src/screens/Mutton';
import Lamb from '@/src/screens/Lamb';
import SeaFood from '@/src/screens/SeaFood';
import { useCart } from "../context/CartContext";
import axios from 'axios';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const { width } = Dimensions.get('window');

const CategoryStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }} />
            <Stack.Screen name="Beef" component={Beef} />
            <Stack.Screen name="Chicken" component={Chicken} />
            <Stack.Screen name="Lamb" component={Lamb} />
            <Stack.Screen name="Mutton" component={Mutton} />
            <Stack.Screen name="SeaFood" component={SeaFood} />
        </Stack.Navigator>
    );
};

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const { cart, dispatch } = useCart();

    const categories = [
        { id: 1, name: 'Beef', images: BeefImage },
        { id: 2, name: 'Chicken', images: ChickenImage },
        { id: 3, name: 'Lamb', images: LambImage },
        { id: 4, name: 'Mutton', images: MuttonImage },
        { id: 5, name: 'Sea Food', images: SeaFoodImage },
    ];

    const featuredProducts = [
        { id: 1, name: 'Premium Beef Steak', price: '24.99', weight: '500g' },
        { id: 2, name: 'Chicken Breast', price: '12.99', weight: '1kg' },
        { id: 3, name: 'Fresh Lamb Chops', price: '29.99', weight: '750g' },
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://way2save.onrender.com/auth/products/beef');
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
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Welcome to</Text>
                        <Text style={styles.shopName}>Way2Save Halal Butchers</Text>
                    </View>
                    {/* <TouchableOpacity style={styles.cartButton}>
                        <Icon name="shopping-cart" size={24} color="#E31244" />
                    </TouchableOpacity> */}
                </View>

                {/* Search Bar */}
                {/* <TouchableOpacity style={styles.searchBar}>
                    <Icon name="search" size={24} color="#666" />
                    <Text style={styles.searchText}>Search for meat products...</Text>
                </TouchableOpacity> */}

                {/* Hero Banner */}
                <View style={styles.heroBanner}>
                    <Image
                        source={HeroSection}
                        style={styles.bannerImage}
                        resizeMode="cover"
                    />
                    <View style={styles.bannerContent}>
                        <Text style={styles.bannerTitle}>Fresh Meat</Text>
                        <Text style={styles.bannerSubtitle}>Delivered to your doorstep</Text>
                        <TouchableOpacity style={styles.shopNowButton}>
                            <Text style={styles.shopNowText} onPress={() => navigation.navigate('Categories')}>Shop Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Process Section */}
                <View style={styles.processSection}>
                    <Text style={styles.sectionTitle}>How It Works</Text>
                    <View style={styles.processStep}>
                        <View style={styles.processIcon}>
                            <Feather name="shopping-bag" size={24} color="#E31244" />
                        </View>
                        <View style={styles.processContent}>
                            <Text style={styles.processTitle}>1. Select Your Meat</Text>
                            <Text style={styles.processDescription}>Browse our range of fresh, high-quality halal meats.</Text>
                        </View>
                    </View>
                    <View style={styles.processStep}>
                        <View style={styles.processIcon}>
                            <Feather name="check-circle" size={24} color="#E31244" />
                        </View>
                        <View style={styles.processContent}>
                            <Text style={styles.processTitle}>2. Place Your Order</Text>
                            <Text style={styles.processDescription}>Choose your preferred cuts and quantities easily.</Text>
                        </View>
                    </View>
                    <View style={styles.processStep}>
                        <View style={styles.processIcon}>
                            <Feather name="truck" size={24} color="#E31244" />
                        </View>
                        <View style={styles.processContent}>
                            <Text style={styles.processTitle}>3. Delivered to Your Door</Text>
                            <Text style={styles.processDescription}>Enjoy fresh, hygienically packed halal meat delivered.</Text>
                        </View>
                    </View>
                </View>

                {/* Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.categoriesContainer}>
                            {categories.map((category) => (
                                <TouchableOpacity
                                    key={category.id}
                                    style={styles.categoryCard}
                                    onPress={() => navigation.navigate('Categories')}
                                >
                                    <View style={styles.categoryIcon}>
                                        <Image
                                            source={category.images}
                                            style={styles.categoryImage}
                                        />
                                    </View>
                                    <Text style={styles.categoryName}>{category.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Featured Products */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Featured Products</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <FlatList
                            data={products}
                            renderItem={renderProduct}
                            keyExtractor={(item) => item._id}
                            numColumns={15}
                        />
                        {/* {products.map((item) => (
                            <View key={item._id} >
                                {renderProduct({ item })}
                            </View>
                        ))} */}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const MainApp = () => {
    const { cart, dispatch } = useCart();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let cartLength = route.name === 'Cart' ? cart.length : null;

                    switch (route.name) {
                        case 'Home':
                            iconName = 'home';
                            break;
                        case 'Categories':
                            iconName = 'category';
                            break;
                        case 'Cart':
                            iconName = 'shopping-cart';
                            break;
                        default:
                            iconName = 'home';
                    }

                    // return <Icon name={iconName} size={size} color={color} />;
                    return (
                        <View>
                            <Icon name={iconName} size={size} color={color} />
                            {cartLength > 0 && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: -5,
                                        right: -10,
                                        backgroundColor: '#E31244',
                                        borderRadius: 10,
                                        width: 20,
                                        height: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                                        {cartLength}
                                    </Text>
                                </View>
                            )}
                        </View>
                    );
                },
                tabBarActiveTintColor: '#E31244',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { height: 60, paddingBottom: 5 },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Categories" component={CategoryStack} />
            <Tab.Screen name="Cart" component={Cart} />
        </Tab.Navigator>
    );
};


const styles = StyleSheet.create({
    categoryImage: {
        width: 46,
        height: 46,
        borderRadius: 32,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    greeting: {
        fontSize: 16,
        color: '#666',
    },
    shopName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    cartButton: {
        padding: 8,
        backgroundColor: '#FFE3E5',
        borderRadius: 8,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    searchText: {
        marginLeft: 8,
        color: '#666',
    },
    heroBanner: {
        height: 200,
        margin: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    bannerContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    bannerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    bannerSubtitle: {
        fontSize: 16,
        color: '#fff',
        marginTop: 4,
    },
    shopNowButton: {
        backgroundColor: '#E31244',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    shopNowText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    categoriesContainer: {
        flexDirection: 'row',
        paddingRight: 16,
    },
    categoryCard: {
        alignItems: 'center',
        marginRight: 16,
        width: 80,
    },
    categoryIcon: {
        width: 64,
        height: 64,
        backgroundColor: '#FFE3E5',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryName: {
        fontSize: 14,
        textAlign: 'center',
    },
    productImage: {
        width: '100%',
        height: 120,
    },
    productInfo: {
        padding: 12,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productWeight: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    productPrice: {
        fontSize: 16,
        color: '#E31244',
        fontWeight: 'bold',
        marginTop: 4,
    },

    processSection: {
        padding: 16,
    },

    processStep: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    processIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFE3E5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    processContent: {
        flex: 1,
    },
    processTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 4,
    },
    processDescription: {
        fontSize: 14,
        color: '#666666',
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
        height: '40',
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

export default MainApp;