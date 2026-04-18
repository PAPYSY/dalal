import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dallaal.app',
  appName: 'Dallaal',
  webDir: 'dist/public',
  server: {
    // En production native, pointe vers l'API Vercel
    url: undefined,
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
    backgroundColor: '#F5F0E8',
  },
  ios: {
    backgroundColor: '#F5F0E8',
    contentInset: 'automatic',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#F5F0E8',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
    StatusBar: {
      style: 'Dark',
      backgroundColor: '#F5F0E8',
    },
  },
};

export default config;
