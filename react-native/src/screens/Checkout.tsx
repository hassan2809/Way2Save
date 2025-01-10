import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from "../context/CartContext";
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const Checkout = () => {
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
            totalCost: parseFloat(totalCost.toFixed(2))
        };
    };

    const { totalProduct, shippingCost, totalCost } = calculateTotal();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            number: '',
            address: '',
            paymentMethod: 'cash',
        },
    });

    const FormInput = ({ label, name, rules, error }) => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={[styles.input, error && styles.inputError]}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
    );

    const onSubmit = async (data) => {
        try {
            const orderData = {
                ...data,
                cart,
                totalCost,
            };

            const response = await axios.post("https://way2save.onrender.com/auth/order", orderData);

            if (response.data.success) {
                Alert.alert(
                    "Order Placed",
                    "Your order has been successfully placed!",
                    [{ text: "OK" }]
                );

                reset();
                dispatch({ type: "CLEAR_CART" });
            }
        } catch (error) {
            Alert.alert(
                "Order Failed",
                "There was an error placing your order. Please try again.",
                [{ text: "OK" }]
            );
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.cartItems}>
                    <Text style={styles.headerTitle}>Your Basket</Text>
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
                </View>

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
                    {/* <Text style={styles.securePaymentText}>Payment Processed Securely</Text> */}
                </View>

                <View style={styles.form}>
                    <Text style={styles.title}>Checkout</Text>
                    <FormInput
                        label="Full Name"
                        name="name"
                        rules={{ required: "Name is required" }}
                        error={errors.name}
                    />
                    <FormInput
                        label="Email"
                        name="email"
                        rules={{
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                            },
                        }}
                        keyboardType="email-address"
                        error={errors.email}
                    />
                    <FormInput
                        label="Contact Number"
                        name="number"
                        rules={{ required: "Contact Number is required" }}
                        keyboardType="phone-pad"
                        error={errors.number}
                    />
                    <FormInput
                        label="Delivery Address"
                        name="address"
                        rules={{ required: "Address is required" }}
                        error={errors.address}
                    />
                    <View style={styles.radioContainer}>
                        <Text style={styles.label}>Payment Method</Text>
                        <View style={styles.radioOption}>
                            <Controller
                                control={control}
                                name="paymentMethod"
                                rules={{ required: "Please select a payment method" }}
                                render={({ field: { onChange, value } }) => (
                                    <TouchableOpacity onPress={() => onChange('cash')}>
                                        <Text style={styles.radioText}>
                                            {value === 'cash' ? '✔ Cash on Delivery' : 'Cash on Delivery'}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        <View style={styles.radioOption}>
                            <Controller
                                control={control}
                                name="paymentMethod"
                                rules={{ required: "Please select a payment method" }}
                                render={({ field: { onChange, value } }) => (
                                    <TouchableOpacity onPress={() => onChange('card')}>
                                        <Text style={styles.radioText}>
                                            {value === 'card' ? '✔ Payment By Card' : 'Payment By Card'}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        <View style={styles.radioOption}>
                            <Controller
                                control={control}
                                name="paymentMethod"
                                rules={{ required: "Please select a payment method" }}
                                render={({ field: { onChange, value } }) => (
                                    <TouchableOpacity onPress={() => onChange('bank_transfer')}>
                                        <Text style={styles.radioText}>
                                            {value === 'bank_transfer'
                                                ? '✔ Payment Through Bank Transfer'
                                                : 'Payment Through Bank Transfer'}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        {errors.paymentMethod && (
                            <Text style={styles.errorText}>{errors.paymentMethod.message}</Text>
                        )}
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            (cart.length === 0 || isSubmitting) && styles.buttonDisabled,
                        ]}
                        onPress={handleSubmit(onSubmit)}
                        disabled={cart.length === 0 || isSubmitting}
                    >
                        <Text style={styles.buttonText}>
                            {isSubmitting ? "Placing Order..." : "Place Order"}
                        </Text>
                    </TouchableOpacity>
                    {cart.length === 0 && (
                        <Text style={styles.tooltip}>Please select products first</Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 12,
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: '12',
        marginBottom: '12'
    },
    cartItems: {
        flex: 1,
        paddingHorizontal: 16,
    },
    cartItem: {
        flexDirection: 'row',
        paddingVertical: 16,
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
        flex: 1,
        marginRight: 10,
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
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 2,
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
        // marginBottom: 16,
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
    securePaymentText: {
        textAlign: 'center',
        marginTop: 8,
        color: '#666',
    },
    form: {
        width: '100%',
        paddingHorizontal: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    inputError: {
        borderColor: '#e31244',
    },
    errorText: {
        color: '#e31244',
        fontSize: 12,
        marginTop: 4,
    },
    radioContainer: {
        marginBottom: 16,
    },
    radioOption: {
        marginBottom: 8,
    },
    radioText: {
        fontSize: 16,
        color: '#000',
    },
    button: {
        backgroundColor: '#e31244',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    tooltip: {
        textAlign: 'center',
        color: '#888',
        fontSize: 14,
    },
});


export default Checkout;
