import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import * as Device from 'expo-device';
import { colors, spacing, typography } from '../styles/theme';

export const DeviceInfo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Device: {Device.modelName || 'Unknown'}</Text>
      <Text style={styles.text}>Platform: {Platform.OS}</Text>
      <Text style={styles.text}>
        Is Device: {Device.isDevice ? 'Yes' : 'No (Emulator)'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xl,
    padding: spacing.md,
    backgroundColor: colors.deviceInfo,
    borderRadius: 10,
  },
  text: {
    fontSize: typography.small.fontSize,
    color: colors.deviceInfoText,
    marginBottom: spacing.xs,
  },
});
