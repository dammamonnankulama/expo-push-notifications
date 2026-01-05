import { useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { NotificationService } from '../services/notificationService';
import { AuthService } from '../services/authService';
import { Platform } from 'react-native';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true, 
    shouldShowList: true,   
  }),
});

export const useNotifications = (apiUrl: string) => {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const [registrationStatus, setRegistrationStatus] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const notificationListener = useRef<Notifications.EventSubscription | undefined>(undefined); 
  const responseListener = useRef<Notifications.EventSubscription | undefined>(undefined);
  const notificationService = useRef(new NotificationService(apiUrl));
  const authService = useRef(new AuthService(apiUrl));


  useEffect(() => {
    const initialize = async () => {
      const authenticated = await authService.current.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        await autoRegisterDevice();
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log('Notification received:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification tapped:', response);
    });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  const autoRegisterDevice = async () => {
    try {
      setRegistrationStatus('Getting push token...');

      const token = await notificationService.current.registerForPushNotifications();

      if (!token) {
        setRegistrationStatus('❌ Failed to get push token');
        return;
      }

      setExpoPushToken(token);
      setRegistrationStatus('Registering device...');

      const success = await notificationService.current.registerDevice({
        expoPushToken: token,
        deviceType: Platform.OS.toUpperCase() as 'IOS' | 'ANDROID',
        deviceName: Device.modelName || 'Unknown Device',
      });

      if (success) {
        setRegistrationStatus('✅ Device registered!');
        console.log('Device auto-registered successfully');
      } else {
        setRegistrationStatus('❌ Registration failed');
      }
    } catch (error: any) {
      setRegistrationStatus('❌ Error: ' + error.message);
      console.error('Auto-registration error:', error);
    }
  };

  const handleLogin = async (phoneNumber: string, password: string) => {
  try {
    await authService.current.login({ phoneNumber, password }); // Changed
    setIsAuthenticated(true);

    await autoRegisterDevice();

    return true;
  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message);
    return false;
  }
};

  const handleLogout = async () => {
    try {
      if (expoPushToken) {
        await notificationService.current.unregisterDevice(expoPushToken);
      }
      await authService.current.logout();
      setIsAuthenticated(false);
      setRegistrationStatus('');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    expoPushToken,
    notification,
    registrationStatus,
    isAuthenticated,
    handleLogin,
    handleLogout,
    autoRegisterDevice,
  };
};