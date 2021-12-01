import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CarData } from '../types/CarData';

export default function withAsyncStorage<Props>(Component: React.ComponentType<Props>) {
  return (props: Props) => {
    const storageSave = async (key: string, carData: CarData): Promise<void> => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(carData));
        Alert.alert('Added Car:', JSON.stringify(carData));
      } catch (e) {
        console.log(e);
      }
    };

    const storageGet = async (key: string) => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue !== null) {
          Alert.alert('Selected Car:', jsonValue);
        } else {
          Alert.alert('No car with such id');
        }
      } catch (e) {
        console.log(e);
      }
    };

    const storageDelete = async (key: string) => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue !== null) {
          Alert.alert('Car deleted:', jsonValue);
          await AsyncStorage.removeItem(key);
        } else {
          Alert.alert('No car with such id');
        }
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Component
        {...props}
        storageSave={storageSave}
        storageGet={storageGet}
        storageDelete={storageDelete}
      />
    );
  };
}
