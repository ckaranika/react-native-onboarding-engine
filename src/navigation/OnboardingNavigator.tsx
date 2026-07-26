import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useOnboarding } from '../navigation/OnboardingContext';
import type { OnboardingStackParamList } from './types';
import type { OnboardingStepConfig } from '../types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingNavigator() {
  const { progress, config } = useOnboarding();

  if (!progress) {
    return null;
  }

  const screenSteps = config.steps.filter(
    (step): step is OnboardingStepConfig & { screen: NonNullable<OnboardingStepConfig['screen']> } =>
      !!step.screen,
  );

  if (screenSteps.length === 0) {
    return null;
  }

  const initialRoute = (screenSteps.find(step => step.step === progress.step) ?? screenSteps[0]!).name;

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      {screenSteps.map(step => (
        <Stack.Screen
          key={step.step}
          name={step.name as keyof OnboardingStackParamList}
          component={step.screen}
        />
      ))}
    </Stack.Navigator>
  );
}