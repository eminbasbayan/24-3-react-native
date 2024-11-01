// app/product/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id.toString(),
        name: product.title,
        price: `${product.price} $`,
        image: product.image,
        quantity: 1
      }));
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.category}>Kategori: {product.category}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Button 
            title="Sepete Ekle" 
            onPress={handleAddToCart}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#2ecc71',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  }
});