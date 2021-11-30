import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [carId, setCarId] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [carIdGet, setCarIdGet] = useState('');

  const onPressSave = async () => {
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
      setCarId('');
      setYear('');
      setMake('');
      setModel('');
    } catch (e) {
      console.log(e);
    }
  };

  const onPressGet = async () => {
    if (carIdGet.length === 0) {
      Alert.alert('Car Id is empty', 'Please write data to field');
      return;
    }
    try {
      const jsonValue = await AsyncStorage.getItem(carIdGet);
      // JSON.parse(jsonValue);
      if (jsonValue !== null) {
        Alert.alert('Selected Car:', jsonValue);
      } else {
        Alert.alert('Get error', 'No car with such id');
      }
      setCarIdGet('');
    } catch (e) {
      console.log(e);
    }
  };

  const onPressDelete = async () => {
    if (carIdGet.length === 0) {
      Alert.alert('Car Id is empty', 'Please write data to field');
      return;
    }
    try {
      const jsonValue = await AsyncStorage.getItem(carIdGet);
      // JSON.parse(jsonValue);
      if (jsonValue !== null) {
        Alert.alert('Car deleted:', jsonValue);
        await AsyncStorage.removeItem(carIdGet);
      } else {
        Alert.alert('Delete error', 'No car with such id');
      }
      setCarIdGet('');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Save Car Area</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCarId}
          value={carId}
          placeholder={'Car Id'}
        />
        <TextInput
          style={styles.input}
          onChangeText={setYear}
          value={year}
          keyboardType="numeric"
          placeholder={'Year'}
        />
        <TextInput style={styles.input} onChangeText={setMake} value={make} placeholder={'Make'} />
        <TextInput
          style={styles.input}
          onChangeText={setModel}
          value={model}
          placeholder={'Model'}
        />
        <Button onPress={onPressSave} title="Save Car" color="white" />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Get Car Area</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCarIdGet}
          value={carIdGet}
          placeholder={'Car Id'}
        />
        <Button onPress={onPressGet} title="Get Car" color="white" />
        <Button onPress={onPressDelete} title="Delete Car" color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0080ff',
    padding: 20,
  },
  section: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
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
