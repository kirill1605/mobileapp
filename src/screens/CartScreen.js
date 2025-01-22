import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CartContext } from '../../context/CartContext';

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

const CartScreen = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);

    return (
        <View style={styles.container}>
            {cartItems.length === 0 ? (
                <Text style={styles.emptyText}>Корзина пуста</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <Image
                                source={imageMapping[item.id]}
                                style={styles.image}
                            />
                            <View style={styles.infoContainer}>
                                <Text style={styles.productName}>{item.productName}</Text>
                                <Text style={styles.productPrice}>Цена: {item.price}₽</Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => removeFromCart(item.id)}
                                >
                                    <Text style={styles.buttonText}>Удалить</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303030',
        padding: 20,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#FFFFFF',
    },
    cartItem: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#555555',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center', 
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 15, 
    },
    infoContainer: {
        flex: 1, 
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF', 
    },
    productPrice: {
        fontSize: 16,
        color: '#FFFFFF', 
        marginBottom: 10,
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

export default CartScreen;