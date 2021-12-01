import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Button, SafeAreaView, Alert } from 'react-native';

import { CarData } from './types/CarData';

type MainScreenProps = {
  storageSave: (carId: string, carData: CarData) => void;
  storageGet: (carGetDeleteId: string) => void;
  storageDelete: (carGetDeleteId: string) => void;
};

const MainScreen: React.FC<MainScreenProps> = ({ storageSave, storageGet, storageDelete }) => {
  const [carData, setCarData] = useState({
    carId: '',
    year: '',
    make: '',
    model: '',
  });
  const [carGetId, setCarGetId] = useState('');

  const onPressSave = useCallback(() => {
    if (!carData.carId || !carData.year || !carData.make || !carData.model) {
      Alert.alert('Some field is empty', 'Please write data to all fileds');
      return;
    }

    storageSave(carData.carId, carData);
    setCarData({ carId: '', year: '', make: '', model: '' });
  }, [carData, storageSave]);

  const onPressGet = useCallback(() => {
    if (!carGetId) {
      Alert.alert('Car Id field is empty', 'Please write data to field');
      return;
    }

    storageGet(carGetId);
    setCarGetId('');
  }, [carGetId, storageGet]);

  const onPressDelete = useCallback(() => {
    if (!carGetId) {
      Alert.alert('Car Id field is empty', 'Please write data to field');
      return;
    }

    storageDelete(carGetId);
    setCarGetId('');
  }, [carGetId, storageDelete]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Save Car Area</Text>
        <TextInput
          style={styles.input}
          onChangeText={(carId) => setCarData({ ...carData, carId: carId })}
          value={carData.carId}
          placeholder={'Car Id'}
        />
        <TextInput
          style={styles.input}
          onChangeText={(year) => setCarData({ ...carData, year: year })}
          value={carData.year}
          keyboardType="numeric"
          placeholder={'Year'}
        />
        <TextInput
          style={styles.input}
          onChangeText={(make) => setCarData({ ...carData, make: make })}
          value={carData.make}
          placeholder={'Make'}
        />
        <TextInput
          style={styles.input}
          onChangeText={(model) => setCarData({ ...carData, model: model })}
          value={carData.model}
          placeholder={'Model'}
        />
        <Button onPress={onPressSave} title="Save Car" color="white" />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Get Car Area</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCarGetId}
          value={carGetId}
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
