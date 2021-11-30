import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import withAsyncStorage from './withAsyncStorage';

export type AppProps = {
  onPressSave: (carId: string, year: string, make: string, model: string) => void;
  onPressGet: (carGetDeleteId: string) => void;
  onPressDelete: (carGetDeleteId: string) => void;
};

const App: React.FC<AppProps> = ({ onPressSave, onPressGet, onPressDelete }) => {
  const [carId, setCarId] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [carGetDeleteId, setCarGetDeleteId] = useState('');

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
        <Button
          onPress={() => {
            onPressSave(carId, year, make, model);
            setCarId('');
            setYear('');
            setMake('');
            setModel('');
          }}
          title="Save Car"
          color="white"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Get Car Area</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCarGetDeleteId}
          value={carGetDeleteId}
          placeholder={'Car Id'}
        />
        <Button
          onPress={() => {
            onPressGet(carGetDeleteId);
            setCarGetDeleteId('');
          }}
          title="Get Car"
          color="white"
        />
        <Button
          onPress={() => {
            onPressDelete(carGetDeleteId);
            setCarGetDeleteId('');
          }}
          title="Delete Car"
          color="red"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default withAsyncStorage(App);
