import React from 'react';

import MainScreen from './src/MainScreen';
import withAsyncStorage from './src/hoc/withAsyncStorage';

const MainScreenWithAcync = withAsyncStorage(MainScreen);

export default function App() {
  return <MainScreenWithAcync />;
}
