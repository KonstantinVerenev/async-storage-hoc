import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Button, SafeAreaView, Alert } from 'react-native';

import { CarData } from './types/CarData';

type MainScreenProps = {
  saveInStorage: (carId: string, carData: CarData) => void;
  getFromStorage: (carId: string) => void;
  deleteFromStorage: (carId: string) => void;
};

const MainScreen: React.FC<MainScreenProps> = ({
  saveInStorage,
  getFromStorage,
  deleteFromStorage,
}) => {
  const [carSaveData, setCarSaveData] = useState({
    carId: '',
    year: '',
    make: '',
    model: '',
  });
  const [carId, setCarId] = useState('');

  const onPressSave = useCallback(() => {
    if (!carSaveData.carId || !carSaveData.year || !carSaveData.make || !carSaveData.model) {
      Alert.alert('Some field is empty', 'Please write data to all fileds');
      return;
    }

    saveInStorage(carSaveData.carId, carSaveData);
    Alert.alert('Added Car:', JSON.stringify(carSaveData));
    setCarSaveData({ carId: '', year: '', make: '', model: '' });
  }, [carSaveData, saveInStorage]);

  const onPressGet = useCallback(() => {
    if (!carId) {
      Alert.alert('Car Id field is empty', 'Please write data to field');
      return;
    }

    getFromStorage(carId);
    setCarId('');
  }, [carId, getFromStorage]);

  const onPressDelete = useCallback(() => {
    if (!carId) {
      Alert.alert('Car Id field is empty', 'Please write data to field');
      return;
    }

    deleteFromStorage(carId);
    setCarId('');
  }, [carId, deleteFromStorage]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Save Car Area</Text>
        <TextInput
          style={styles.input}
          onChangeText={(carId) => setCarSaveData({ ...carSaveData, carId: carId })}
          value={carSaveData.carId}
          placeholder={'Car Id'}
        />
        <TextInput
          style={styles.input}
          onChangeText={(year) => setCarSaveData({ ...carSaveData, year: year })}
          value={carSaveData.year}
          keyboardType="numeric"
          placeholder={'Year'}
        />
        <TextInput
          style={styles.input}
          onChangeText={(make) => setCarSaveData({ ...carSaveData, make: make })}
          value={carSaveData.make}
          placeholder={'Make'}
        />
        <TextInput
          style={styles.input}
          onChangeText={(model) => setCarSaveData({ ...carSaveData, model: model })}
          value={carSaveData.model}
          placeholder={'Model'}
        />
        <Button onPress={onPressSave} title="Save Car" color="white" />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Get and Delete Car Area</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCarId}
          value={carId}
          placeholder={'Car Id'}
        />
        <Button onPress={onPressGet} title="Get Car" color="white" />
        <Button onPress={onPressDelete} title="Delete Car" color="red" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
  },
  section: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#0010ff',
    marginTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    width: '100%',
    height: 40,
    marginTop: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
  },
});

export default MainScreen;
