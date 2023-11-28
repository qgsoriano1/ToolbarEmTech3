import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text>Status</Text>
      </View>

      <View style={styles.section}>
        <Text>MessageList</Text>
      </View>

      <View style={styles.section}>
        <Text>Toolbar</Text>
      </View>

      <View style={styles.section}>
        <Text>IME</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 20,
  },
});
