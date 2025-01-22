import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Image,
    SafeAreaView,
    TouchableOpacity, 
} from 'react-native';
import data from '../../api/data.json';
import { CartContext } from '../../context/CartContext';

const CatalogScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useContext(CartContext);

    const imageMapping = {
        1: require('../../assets/images/product-image1.webp'),
        2: require('../../assets/images/product-image2.webp'),
        3: require('../../assets/images/product-image3.webp'),
        4: require('../../assets/images/product-image4.webp'),
        5: require('../../assets/images/product-image5.webp'),
        6: require('../../assets/images/product-image6.webp'),
        7: require('../../assets/images/product-image7.webp'),
        8: require('../../assets/images/product-image8.webp'),
        9: require('../../assets/images/product-image9.webp'),
        10: require('../../assets/images/product-image10.webp'),
    };

    useEffect(() => {
        const fetchData = () => {
            setProducts(data);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={imageMapping[item.id]} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{item.productName}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.price}>Цена: {item.price}₽</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => addToCart(item)}
                            >
                                <Text style={styles.buttonText}>Добавить в корзину</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.list}
                ListEmptyComponent={<Text style={styles.noResults}>Ничего не найдено</Text>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303030',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 20,
    },
    item: {
        marginTop: 20,
        flexDirection: 'row',
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#555555',
        borderRadius: 5,
        elevation: 2,
        alignItems: 'center', 
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 15, 
    },
    textContainer: {
        flex: 1, 
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    description: {
        fontSize: 14,
        color: '#FFFFFF',
        marginVertical: 5,
    },
    price: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 10,
    },
    noResults: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#FFFFFF',
    },
    button: {
        backgroundColor: '#0B9C62',
        padding: 8, 
        borderRadius: 5,
        alignItems: 'center',
        height: 40, 
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16, 
        fontWeight: 'bold',
    },
});

export default CatalogScreen;