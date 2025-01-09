import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const categories = [
    {
        id: 1,
        name: 'Beef',
        image: require('../../assets/images/beef.png'),
        description: 'Premium quality beef cuts',
        items: '15 Items',
        color: ['#FFD3A5', '#FD6585'],
    },
    {
        id: 2,
        name: 'Chicken',
        image: require('../../assets/images/chicken.png'),
        description: 'Fresh chicken selections',
        items: '12 Items',
        color: ['#A8EDEA', '#FED6E3'],
    },
    {
        id: 3,
        name: 'Lamb',
        image: require('../../assets/images/lamb.png'),
        description: 'Tender lamb cuts',
        items: '8 Items',
        color: ['#D4FC79', '#96E6A1'],
    },
    {
        id: 4,
        name: 'Mutton',
        image: require('../../assets/images/goat.png'),
        description: 'Quality mutton varieties',
        items: '10 Items',
        color: ['#FFE3E5', '#E31244'],
    },
    {
        id: 5,
        name: 'Sea Food',
        image: require('../../assets/images/fishes.png'),
        description: 'Fresh seafood selection',
        items: '6 Items',
        color: ['#84FAB0', '#8FD3F4'],
    },
];

const Categories = ({ navigation }) => {
    const renderCategoryItem = ({ item }) => {
        const navigateToScreen = () => {
            switch (item.name) {
                case 'Beef':
                    navigation.navigate('Beef');
                    break;
                case 'Chicken':
                    navigation.navigate('Chicken');
                    break;
                case 'Lamb':
                    navigation.navigate('Lamb');
                    break;
                case 'Mutton':
                    navigation.navigate('Mutton');
                    break;
                case 'Sea Food':
                    navigation.navigate('SeaFood');
                    break;
                default:
                    navigation.navigate('CategoryProducts', { category: item });
            }
        };

        return (
            <TouchableOpacity
                style={styles.categoryCard}
                onPress={navigateToScreen}
            >
                <LinearGradient
                    colors={item.color}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Image source={item.image} style={styles.categoryImage} resizeMode="contain" />
                    <View style={styles.categoryInfo}>
                        <Text style={styles.categoryName}>{item.name}</Text>
                        <Text style={styles.itemCount}>{item.items}</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Explore Our Categories</Text>
            </View>
            <Text style={styles.headerSubtitle}>
                Discover the finest cuts and freshest selections from our premium meat categories, tailored to satisfy every taste.
            </Text>

            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                numColumns={2}
            />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    listContainer: {
        padding: 8,
    },
    categoryCard: {
        width: (width - 48) / 2,
        aspectRatio: 0.8,
        margin: 8,
        borderRadius: 16,
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 16,
    },
    categoryImage: {
        width: '80%',
        height: '60%',
        alignSelf: 'center',
    },
    categoryInfo: {
        marginTop: 8,
    },
    categoryName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    itemCount: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '500',
        marginTop: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});

export default Categories;