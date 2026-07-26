import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OnboardingNavigator, OnboardingProvider } from 'react-native-onboarding-engine';
import { onboardingConfig } from './config';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />

      <OnboardingProvider config={onboardingConfig}>
        <NavigationContainer>
          <OnboardingNavigator />
        </NavigationContainer>
      </OnboardingProvider>
    </SafeAreaProvider>
  );
}