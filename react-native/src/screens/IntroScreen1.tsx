import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Intro2Image from '../../assets/images/accommodation.jpg';

const { width, height } = Dimensions.get('window');

const IntroScreen1 = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#FFE3E5', '#FFFFFF']}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <Image
                        source={Intro2Image}
                        style={styles.logo}
                        resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Welcome to</Text>
                        <Text style={styles.subtitle}>Way2Save Halal Butchers</Text>
                        <Text style={styles.description}>
                            Your trusted source for premium-quality, HMC-certified halal meats. Fresh, ethical, and flavorful.
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('IntroScreen2')}
                    >
                        <LinearGradient
                            colors={['#E31244', '#FF4D6D']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.buttonGradient}
                        >
                            <Text style={styles.buttonText}>Explore Now</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE3E5',
    },
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    logo: {
        width: width * 0.6,
        height: width * 0.6, // Ensuring the height equals width for a circular shape
        borderRadius: width * 0.3, // Half of the width to make it circular
        marginTop: 40,
        maxWidth: width * 0.9,
    },
    textContainer: {
        alignItems: 'center',
        marginVertical: 20,
        paddingHorizontal: 16, // Added padding to prevent text overflow
    },
    title: {
        fontSize: 24,
        fontWeight: '300',
        color: '#E31244',
        textAlign: 'center',
        marginBottom: 8,
        fontFamily: 'Roboto',
    },
    subtitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#E31244',
        textAlign: 'center',
        marginBottom: 16,
        fontFamily: 'Roboto',
    },
    description: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    button: {
        width: '100%',
        marginBottom: 40,
        borderRadius: 30,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        fontFamily: 'Roboto',
    },
    buttonGradient: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Roboto',
    },
});

export default IntroScreen1;
