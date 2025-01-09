import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import the eye icon images for password visibility toggle (You need to have these images in your assets)
import eyeIcon from "../../assets/images/view.png";
import eyeSlashIcon from "../../assets/images/hide.png"; // You need to provide these images in your assets folder
import LoginImg from "../../assets/images/nature.jpg"; // You need to provide these images in your assets folder

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://192.168.1.9:8000/auth/login", data);
            // console.log(response.data)
            if (response.data.success) {
                await AsyncStorage.setItem("token", response.data.jwtToken);
                await AsyncStorage.setItem("name", response.data.name);
                await AsyncStorage.setItem("email", response.data.email);
                navigation.navigate("MainApp");
            }
        } catch (error) {
            Alert.alert("Error", error.response.data.message);
        }
    };

    return (
        <View style={styles.container}>
            {/* Left Side: Sign-In Form */}
            <View style={styles.formContainer}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>TripMate</Text>
                </View>

                {/* Sign-in Form */}
                <Text style={styles.heading}>Welcome Back</Text>
                <Text style={styles.subheading}>Login into your account</Text>

                {/* Login Form */}
                <View style={styles.form}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={[styles.input, errors.email && styles.errorInput]}
                                placeholder="Email"
                                keyboardType="email-address"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="email"
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                            },
                        }}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                    <View style={styles.passwordContainer}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[styles.input, errors.password && styles.errorInput]}
                                    placeholder="Password"
                                    secureTextEntry={!showPassword}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="password"
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long",
                                },
                            }}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                            <Image
                                source={showPassword ? eyeSlashIcon : eyeIcon}
                                style={styles.eyeImage}
                            />
                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

                    <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => Alert.alert("Forgot Password", "Implement forgot password functionality")}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.submitButtonText}>Log In</Text>
                    </TouchableOpacity>

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                            <Text style={styles.signupLink}>Sign up!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    formContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 20,
    },
    logoContainer: {
        marginBottom: 40,
    },
    logo: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#6200EE",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    subheading: {
        fontSize: 16,
        color: "#777",
        marginBottom: 20,
    },
    form: {
        width: "100%",
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        fontSize: 16,
    },
    errorInput: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginBottom: 8,
    },
    passwordContainer: {
        position: "relative",
    },
    eyeIcon: {
        position: "absolute",
        right: 12,
        top: "50%",
        transform: [{ translateY: -10 }],
    },
    eyeImage: {
        width: 20,
        height: 20,
    },
    forgotPasswordButton: {
        alignSelf: "flex-end",
        marginBottom: 20,

    },
    forgotPasswordText: {
        fontSize: 14,
        color: "#6200EE",
    },
    submitButton: {
        backgroundColor: "#6200EE",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginBottom: 20,
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    signupContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    signupText: {
        fontSize: 14,
        color: "#777",
    },
    signupLink: {
        fontSize: 14,
        color: "#6200EE",
        fontWeight: "bold",
    },
    imageContainer: {
        width: "50%",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});

export default Login;
