import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './StackNavigation';

const Navigator = () => {
  return <NavigationContainer>{AppStack()}</NavigationContainer>;
};

export default Navigator;
