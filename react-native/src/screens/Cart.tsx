import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from "../context/CartContext";
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Cart = () => {
    const { cart, dispatch } = useCart();
    const navigation = useNavigation();

    const updateQuantity = (id, quantity) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { _id: id, quantity } });
    };

    const removeFromCart = (id) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: id });
    };

    const calculateTotal = () => {
        const totalProduct = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shippingCost = totalProduct < 20 && cart.length !== 0 ? 2.99 : 0;
        const totalCost = totalProduct + shippingCost;

        return {
            totalProduct: totalProduct.toFixed(2),
            shippingCost: shippingCost.toFixed(2),
            totalCost: totalCost.toFixed(2)
        };
    };

    const { totalProduct, shippingCost, totalCost } = calculateTotal();

    const handleCheckout = () => {
        navigation.navigate('Checkout');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Your Basket</Text>
            </View>

            <ScrollView style={styles.cartItems}>
                {cart.map((item, index) => (
                    <View key={index} style={styles.cartItem}>
                        <Image
                            source={{ uri: `https://way2save.onrender.com/uploads/${item.image_url}.jpg` }}
                            style={styles.itemImage}
                        />
                        <View style={styles.itemDetails}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                                <TouchableOpacity onPress={() => removeFromCart(item._id)}>
                                    <Feather name="trash-2" size={24} color="#E31244" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.itemPrice}>£{(item.price * item.quantity).toFixed(2)}</Text>
                            <View style={styles.quantityControl}>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                >
                                    <Feather name="minus" size={18} color="#000" />
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{item.quantity} Kg</Text>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => updateQuantity(item._id, item.quantity + 1)}
                                >
                                    <Feather name="plus" size={18} color="#000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.orderSummary}>
                <Text style={styles.summaryTitle}>Order Summary</Text>
                <View style={styles.summaryRow}>
                    <Text>Total Product ({cart.length})</Text>
                    <Text>£{totalProduct}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text>Delivery Charges</Text>
                    <Text>£{shippingCost}</Text>
                </View>
                {parseFloat(totalProduct) < 20 && (
                    <Text style={styles.deliveryNote}>
                        * Delivery fees of £2.99 apply for orders under £20. Orders £20 and above enjoy free delivery.
                    </Text>
                )}
                <View style={[styles.summaryRow, styles.totalRow]}>
                    <Text style={styles.totalText}>Total Cost</Text>
                    <Text style={styles.totalText}>£{totalCost}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout} disabled={cart.length === 0}>
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
                <Text style={styles.securePaymentText}>Payment Processed Securely</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cartItems: {
        flex: 1,
    },
    cartItem: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemTitle: {
        textTransform: 'capitalize',
        fontSize: 16,
        fontWeight: '500',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
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
        marginHorizontal: 16,
        fontSize: 16,
    },
    orderSummary: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    totalRow: {
        marginTop: 8,
        marginBottom: 16,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    deliveryNote: {
        fontSize: 12,
        color: '#E31244',
        marginBottom: 8,
    },
    checkoutButton: {
        backgroundColor: '#E31244',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    securePaymentText: {
        textAlign: 'center',
        marginTop: 8,
        color: '#666',
    },
});

export default Cart;

