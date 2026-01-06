import axios from 'axios';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

export interface DeviceRegistrationRequest {
  expoPushToken: string;
  deviceType: 'IOS' | 'ANDROID';
  deviceName: string;
}

export class NotificationService {
  private baseUrl: string;
  private timeout: number = 30000;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  private async getAuthHeaders() {
    const token = await SecureStore.getItemAsync('accessToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  async registerForPushNotifications(): Promise<string | null> {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (!Device.isDevice) {
      console.log('Must use physical device for Push Notifications');
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return null;
    }

    try {
      const projectId = Constants.expoConfig?.extra?.eas?.projectId;

      if (!projectId) {
        console.error('No project ID found. Run: npx eas init');
        return null;
      }

      const token = (await Notifications.getExpoPushTokenAsync({
        projectId,
      })).data;

      console.log('Expo Push Token:', token);
      return token;
    } catch (error) {
      console.error('Error getting push token:', error);
      return null;
    }
  }

  async registerDevice(data: DeviceRegistrationRequest): Promise<boolean> {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (!accessToken) {
        console.warn('No access token - skipping device registration');
        return false;
      }

      const headers = await this.getAuthHeaders();

      const response = await axios.post(
        `${this.baseUrl}/api/devices/register`,
        {
          expoPushToken: data.expoPushToken,
          deviceType: data.deviceType,
          deviceName: data.deviceName,
        },
        { 
          headers,
          timeout: this.timeout,
        }
      );

      console.log('Device registered successfully:', response.data);
      return response.status === 200 || response.status === 201;
    } catch (error: any) {
      console.error('Device registration error:', error.response?.data || error.message);
      return false;
    }
  }

  async unregisterDevice(expoPushToken: string): Promise<boolean> {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (!accessToken) {
        console.warn('No access token - skipping device unregistration');
        return false;
      }

      const headers = await this.getAuthHeaders();

      const response = await axios.post(
        `${this.baseUrl}/api/devices/unregister`,
        { expoPushToken },
        { 
          headers,
          timeout: this.timeout,
        }
      );

      console.log('Device unregistered successfully');
      return response.status === 200;
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.warn('Token expired during unregister - continuing with logout');
        return false;
      }
      console.error('Device unregister error:', error.response?.data || error.message);
      return false;
    }
  }

  async getMyDevices() {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (!accessToken) {
        console.warn('No access token - cannot get devices');
        return [];
      }

      const headers = await this.getAuthHeaders();

      const response = await axios.get(
        `${this.baseUrl}/api/devices/my-devices`,
        { 
          headers,
          timeout: this.timeout,
        }
      );

      return response.data.devices || [];
    } catch (error: any) {
      console.error('Get devices error:', error.response?.data || error.message);
      return [];
    }
  }
}