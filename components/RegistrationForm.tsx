import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { colors, spacing, typography, globalStyles } from '../styles/theme';

interface RegistrationFormProps {
  expoPushToken: string;
  userId: string;
  setUserId: (value: string) => void;
  apiUrl: string;
  setApiUrl: (value: string) => void;
  registrationStatus: string;
  isLoading: boolean;
  onRegisterDevice: () => void;
  onSendTestNotification: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  expoPushToken,
  userId,
  setUserId,
  apiUrl,
  setApiUrl,
  registrationStatus,
  isLoading,
  onRegisterDevice,
  onSendTestNotification,
}) => {
  return (
    <>
      {/* Expo Push Token */}
      <View style={globalStyles.section}>
        <Text style={styles.label}>Expo Push Token:</Text>
        <Text style={styles.token} selectable>
          {expoPushToken || 'Generating...'}
        </Text>
      </View>

      {/* API URL */}
      <View style={globalStyles.section}>
        <Text style={styles.label}>Backend API URL:</Text>
        <TextInput
          style={globalStyles.input}
          value={apiUrl}
          onChangeText={setApiUrl}
          placeholder="http://YOUR_SERVER_IP:8080"
          autoCapitalize="none"
          editable={!isLoading}
        />
      </View>

      {/* User ID */}
      <View style={globalStyles.section}>
        <Text style={styles.label}>User ID:</Text>
        <TextInput
          style={globalStyles.input}
          value={userId}
          onChangeText={setUserId}
          placeholder="Enter your user ID"
          autoCapitalize="none"
          editable={!isLoading}
        />
      </View>

      {/* Status */}
      {registrationStatus ? (
        <Text style={styles.status}>{registrationStatus}</Text>
      ) : null}

      {/* Buttons */}
      <View style={globalStyles.buttonContainer}>
        <Button
          title={isLoading ? "Processing..." : "1️⃣ Register Device"}
          onPress={onRegisterDevice}
          disabled={!expoPushToken || !userId.trim() || isLoading}
        />
      </View>

      <View style={globalStyles.buttonContainer}>
        <Button
          title={isLoading ? "Sending..." : "2️⃣ Send Test Notification"}
          onPress={onSendTestNotification}
          disabled={!userId.trim() || isLoading}
          color={colors.success}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
    marginBottom: spacing.sm - 2,
    color: colors.textSecondary,
  },
  token: {
    fontSize: typography.small.fontSize,
    color: colors.primary,
    backgroundColor: colors.codeBackground,
    padding: spacing.sm,
    borderRadius: 5,
  },
  status: {
    fontSize: typography.body.fontSize,
    textAlign: 'center',
    marginBottom: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.codeBackground,
    borderRadius: 8,
  },
});
