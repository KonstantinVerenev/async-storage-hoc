import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, SafeAreaView } from 'react-native';

import { CarData } from './types/CarData';

type MainScreenProps = {
  onPressSave?: (carData: CarData) => void;
  onPressGet?: (carGetDeleteId: string) => void;
  onPressDelete?: (carGetDeleteId: string) => void;
};

const storageErrorFunc = () => {
  Alert.alert('Storage access error');
};

const MainScreen: React.FC<MainScreenProps> = ({
  onPressSave = storageErrorFunc,
  onPressGet = storageErrorFunc,
  onPressDelete = storageErrorFunc,
}) => {
  const [carData, setCarData] = useState({ carId: '', year: '', make: '', model: '' });
  const [carGetId, setCarGetId] = useState('');

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
        <Button
          onPress={() => {
            onPressSave(carData);
            setCarData({ carId: '', year: '', make: '', model: '' });
          }}
          title="Save Car"
          color="white"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Get Car Area</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCarGetId}
          value={carGetId}
          placeholder={'Car Id'}
        />
        <Button
          onPress={() => {
            onPressGet(carGetId);
            setCarGetId('');
          }}
          title="Get Car"
          color="white"
        />
        <Button
          onPress={() => {
            onPressDelete(carGetId);
            setCarGetId('');
          }}
          title="Delete Car"
          color="red"
        />
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
