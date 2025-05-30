import React from 'react';
import {View, ActivityIndicator, StyleSheet, Modal, Text} from 'react-native';
import { useCustomTheme } from '../../theme/ThemeContext';

interface CustomLoaderProps {
  visible: boolean;
  message?: string;
}

const CustomLoader = ({visible, message}: CustomLoaderProps) => {
    const {theme} = useCustomTheme()
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      </View>
    </Modal>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  message: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
});
