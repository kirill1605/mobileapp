import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, Text, StyleSheet } from 'react-native'; 
import LoginScreen from '../screens/LoginScreen';
import CatalogScreen from '../screens/CatalogScreen';
import CartScreen from '../screens/CartScreen';
import { CartContext } from '../../context/CartContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = ({ navigation }) => { 
    const { cartItems } = useContext(CartContext);

    const handleLogout = () => {
        navigation.navigate('Login'); 
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Catalog') {
                        iconName = 'shopping';
                    } else if (route.name === 'Cart') {
                        iconName = 'cart';
                    } else if (route.name === 'Logout') {
                        iconName = 'logout'; 
                    }

                    return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
                },
                tabBarBadge: route.name === 'Cart' && cartItems.length > 0 ? cartItems.length : undefined,
                tabBarActiveTintColor: '#0B9C62', 
                tabBarInactiveTintColor: '#FFFFFF', 
                tabBarStyle: {
                    backgroundColor: '#555555', 
                },
                tabBarLabelStyle: {
                    color: '#FFFFFF', 
                },
                headerStyle: {
                    backgroundColor: '#555555', 
                },
                headerTintColor: '#FFFFFF', 
                headerTitleStyle: {
                    fontWeight: 'bold', 
                },
                headerTitleAlign: 'center', 
            })}
        >
            <Tab.Screen
                name="Catalog"
                component={CatalogScreen}
                options={{ title: 'Каталог' }} 
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{ title: 'Корзина' }} 
            />
            <Tab.Screen
                name="Logout" 
                component={EmptyScreen}
                options={{
                    title: 'Выход', 
                    tabBarButton: (props) => ( 
                        <TouchableOpacity
                            {...props}
                            style={styles.tabButton}
                            onPress={handleLogout}
                        >
                            <MaterialCommunityIcons name="logout" size={24} color="#FFFFFF" />
                            <Text style={styles.tabButtonText}>Выход</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const EmptyScreen = () => {
    return null;
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#555555',
                    },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                }}
            >
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MainTabs"
                    component={MainTabs}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabButtonText: {
        color: '#FFFFFF',
        fontSize: 12, 
        marginTop: 4, 
    },
});

export default AppNavigator;
