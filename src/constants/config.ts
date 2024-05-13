export type ConfigTypes = {
    ENV: string;
    API_URL: string;
    APP_STORE_URL: string;
    PLAY_STORE_URL: string;
  };
  
  export const Config: ConfigTypes = {
    ENV: 'development',
    API_URL: 'https://jsonplaceholder.typicode.com',
    APP_STORE_URL: '',
    PLAY_STORE_URL: '',
  };
  