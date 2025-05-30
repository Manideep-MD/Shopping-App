import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';
import {ThemeProvider} from './src/theme/ThemeContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <ThemeProvider>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <SafeAreaView style={{flex: 1}}>
            <AppNavigation />
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export default App;
