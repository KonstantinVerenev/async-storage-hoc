import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function withAsyncStorage<Props>(Component: React.ComponentType<Props>) {
  return (props: Props) => {
    const onPressSave = async (carId: string, year: string, make: string, model: string) => {
      if (carId.length === 0 || year.length === 0 || make.length === 0 || model.length === 0) {
        Alert.alert('Some field is empty', 'Please write data to all fileds');
        return;
      }
      try {
        const carData = {
          carId,
          year,
          make,
          model,
        };
        await AsyncStorage.setItem(carId, JSON.stringify(carData));
        Alert.alert('Added Car:', JSON.stringify(carData));
      } catch (e) {
        console.log(e);
      }
    };

    const onPressGet = async (carGetDeleteId: string) => {
      if (carGetDeleteId.length === 0) {
        Alert.alert('Car Id is empty', 'Please write data to field');
        return;
      }
      try {
        const jsonValue = await AsyncStorage.getItem(carGetDeleteId);
        if (jsonValue !== null) {
          Alert.alert('Selected Car:', jsonValue);
        } else {
          Alert.alert('Get error', 'No car with such id');
        }
      } catch (e) {
        console.log(e);
      }
    };

    const onPressDelete = async (carGetDeleteId: string) => {
      if (carGetDeleteId.length === 0) {
        Alert.alert('Car Id is empty', 'Please write data to field');
        return;
      }
      try {
        const jsonValue = await AsyncStorage.getItem(carGetDeleteId);
        if (jsonValue !== null) {
          Alert.alert('Car deleted:', jsonValue);
          await AsyncStorage.removeItem(carGetDeleteId);
        } else {
          Alert.alert('Delete error', 'No car with such id');
        }
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Component
        {...props}
        onPressSave={onPressSave}
        onPressGet={onPressGet}
        onPressDelete={onPressDelete}
      />
    );
  };
}
