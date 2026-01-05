import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNotifications } from '@/hooks/useNotifications';
import { colors, spacing, typography, globalStyles } from '@/styles/theme';
import { NotificationDisplay } from '@/components/NotificationDisplay';
import { DeviceInfo } from '@/components/DeviceInfo';

const DEFAULT_API_URL = 'http://192.168.8.101:8080';

export default function HomeScreen() {
  const {
    expoPushToken,
    notification,
    registrationStatus,
    isAuthenticated,
    handleLogin,
    handleLogout,
  } = useNotifications(DEFAULT_API_URL);

  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    if (!phoneNumber || !password) {
      alert('Please enter phone number and password');
      return;
    }

    setIsLoading(true);
    const success = await handleLogin(phoneNumber, password);
    setIsLoading(false);

    if (success) {
      alert('Login successful! Device registered automatically.');
      setPhoneNumber(''); 
      setPassword('');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.content}>
        <Text style={styles.title}>Play Zone Notifications</Text>

        {!isAuthenticated ? (
          <View style={styles.loginContainer}>
            <Text style={styles.label}>Login to Enable Notifications</Text>

            <TextInput
              style={styles.input}
              placeholder="Phone Number (e.g., +1234567890)"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={onLogin}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>✅ Logged In</Text>
            <Text style={styles.statusSubtext}>{registrationStatus}</Text>

            {expoPushToken && (
              <View style={styles.tokenContainer}>
                <Text style={styles.tokenLabel}>Push Token:</Text>
                <Text style={styles.tokenText} numberOfLines={1}>
                  {expoPushToken.substring(0, 30)}...
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}

        <NotificationDisplay notification={notification} />
        <DeviceInfo />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
    marginBottom: spacing.lg,
    textAlign: 'center',
    color: colors.text,
  },
  loginContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.md,
    color: colors.text,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: colors.error,
    marginTop: spacing.md,
  },
  statusContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.success,
    marginBottom: spacing.sm,
  },
  statusSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  tokenContainer: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  tokenLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  tokenText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: colors.text,
  },
});