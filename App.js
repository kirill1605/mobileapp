import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {CartProvider} from "./context/CartContext";

export default function App() {
  return (
      <CartProvider>
        <AppNavigator />
      </CartProvider>
  );
}
