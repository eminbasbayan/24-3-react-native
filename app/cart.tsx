import React from 'react';
import { Text, View, StyleSheet, FlatList, Button, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../store/slices/cartSlice';
import { RootState } from '../store';

export default function CartScreen() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const renderQuantityControls = (item: Product) => (
    <View style={styles.quantityContainer}>
      <TouchableOpacity
        style={styles.quantityButton}
        onPress={() => dispatch(decrementQuantity(item.id))}
      >
        <Text style={styles.quantityButtonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{item.quantity}</Text>
      <TouchableOpacity
        style={styles.quantityButton}
        onPress={() => dispatch(incrementQuantity(item.id))}
      >
        <Text style={styles.quantityButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
        <Text style={styles.title}>Sepet</Text>
        <Text style={styles.emptyCart}>Sepetiniz boş.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <FlatList
        ListHeaderComponent={<Text style={styles.title}>Sepet</Text>}
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            {renderQuantityControls(item)}
            <Button
              title="Kaldır"
              onPress={() => dispatch(removeFromCart(item.id))}
              color="red"
            />
          </View>
        )}
        ListFooterComponent={
          cartItems.length > 0 && (
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>
                Toplam: ${calculateTotal()}
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  emptyCart: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  productContainer: {
    flexDirection: 'column',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    backgroundColor: '#42A5F5',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 15,
  },
  totalContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginTop: 16,
    borderRadius: 8,
    elevation: 5,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
