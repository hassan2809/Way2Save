import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Intro2Image from '../../assets/images/intro_2.jpg';

const { width, height } = Dimensions.get('window');

const IntroScreen2 = ({ navigation }) => {
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
                    <Text style={styles.header}>Why Choose Us?</Text>
                    <Text style={styles.description}>
                        We deliver fresh, top-notch halal meats directly to your table. 
                        Our HMC-certified products ensure every cut meets the highest ethical and quality standards.
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('MainApp')} // Adjust navigation as needed
                    >
                        <LinearGradient
                            colors={['#E31244', '#FF4D6D']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.buttonGradient}
                        >
                            <Text style={styles.buttonText}>Get Started</Text>
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
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#E31244',
        marginBottom: 16,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
    },
    logo: {
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: width * 0.3,
        marginVertical: 20,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
        marginHorizontal: 20,
        marginBottom: 40,
        fontFamily: 'Roboto-Regular',
    },
    button: {
        width: '100%',
        borderRadius: 30,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonGradient: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
    },
});

export default IntroScreen2;