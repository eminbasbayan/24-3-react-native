import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Button, StyleSheet, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({
      id: product.id.toString(),
      name: product.title,
      price: `${product.price} $`,
      image: product.image,
      quantity: 1 // Yeni eklenen
    }));
    console.log(product.title + ' sepete eklendi');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <Text style={styles.title}>Ürünler</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.productContainer}
            onPress={() => router.push(`/product/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.title}</Text>
            <Text style={styles.productDescription}>
              {item.description.slice(0, 100)}...
            </Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <Button 
              title="Sepete Ekle" 
              onPress={(e) => {
                e.stopPropagation(); // Tıklama eventi parent'a yayılmasın
                handleAddToCart(item);
              }} 
            />
          </TouchableOpacity>
        )}
      />
      <Button title="Sepete Git" onPress={() => router.push('/cart')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productContainer: {
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
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
