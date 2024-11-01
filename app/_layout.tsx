import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Provider } from 'react-redux';
import { store } from '../store';

export default function TabLayout() {
  return (
    <Provider store={store}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#42A5F5", // Aktif tab rengi 
          headerShown: false, 
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Ürünler",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "list" : "list-outline"}
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Sepet",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "cart" : "cart-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </Provider>
  );
}

function TabBarIcon({ name, color = "red" }: { name: string; color: string }) {
  return <Ionicons name={name} size={24} color={color} />;
}
