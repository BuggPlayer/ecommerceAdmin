import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductList from '../screens/Admin/ProductList';
import EnterDetails from '../screens/Admin/EnterDetails';
import Orders from '../screens/Admin/Orders';
import ProductDetails from '../screens/Admin/ProductDetails';
import Category from '../screens/Admin/Category';

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    // <TabNavigation/>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProdutsList" component={ProductList} />
      <Stack.Screen name="enterDetails" component={EnterDetails} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Order" component={Orders} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};
