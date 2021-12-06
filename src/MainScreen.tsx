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
  const [carDetails, setCarDetails] = useState({
    carId: '',
    year: '',
    make: '',
    model: '',
  });
  const [carId, setCarId] = useState('');

  const onPressSave = useCallback(() => {
    if (!carDetails.carId || !carDetails.year || !carDetails.make || !carDetails.model) {
      Alert.alert('Unable to save car details', 'Please, fill all required fields');
      return;
    }

    saveInStorage(carDetails.carId, carDetails);
    Alert.alert('Added Car:', JSON.stringify(carDetails));
    setCarDetails({ carId: '', year: '', make: '', model: '' });
  }, [carDetails, saveInStorage]);

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
          onChangeText={(carId) => setCarDetails({ ...carDetails, carId: carId })}
          value={carDetails.carId}
          placeholder={'Car Id'}
        />
        <TextInput
          style={styles.input}
          onChangeText={(year) => setCarDetails({ ...carDetails, year: year })}
          value={carDetails.year}
          keyboardType="numeric"
          placeholder={'Year'}
        />
        <TextInput
          style={styles.input}
          onChangeText={(make) => setCarDetails({ ...carDetails, make: make })}
          value={carDetails.make}
          placeholder={'Make'}
        />
        <TextInput
          style={styles.input}
          onChangeText={(model) => setCarDetails({ ...carDetails, model: model })}
          value={carDetails.model}
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
