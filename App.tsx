import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from '@navigation';
import { queryClient } from '@services/api';
import { QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from 'react-native-error-boundary';
import { CustomFallback } from '@components';

function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={CustomFallback}>
          <Navigation />
        </ErrorBoundary>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
