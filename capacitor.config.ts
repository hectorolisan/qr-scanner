import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'QR Scanner',
  webDir: 'www',
  plugins: {
    Camera: {
      webUseInput: true,
    },
  },
};

export default config;
