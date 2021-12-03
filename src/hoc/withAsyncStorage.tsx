import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function withAsyncStorage<Props>(Component: React.ComponentType<Props>) {
  return (props: Props) => {
    const saveInStorage = useCallback(async (key: string, data: unknown): Promise<void> => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.log(e);
      }
    }, []);

    const getFromStorage = useCallback(async (key: string) => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue !== null) {
          Alert.alert('Data with selected key:', jsonValue);
        } else {
          Alert.alert('No data with selected key');
        }
      } catch (e) {
        console.log(e);
      }
    }, []);

    const deleteFromStorage = useCallback(async (key: string) => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue !== null) {
          Alert.alert('Data deleted:', jsonValue);
          await AsyncStorage.removeItem(key);
        } else {
          Alert.alert('No data with such key');
        }
      } catch (e) {
        console.log(e);
      }
    }, []);

    return (
      <Component
        {...props}
        saveInStorage={saveInStorage}
        getFromStorage={getFromStorage}
        deleteFromStorage={deleteFromStorage}
      />
    );
  };
}
