import type { OnboardingConfig } from 'react-native-onboarding-engine';

import WelcomeScreen from './screens/Welcome';
import FeaturesScreen from './screens/Features';
import IntegrationScreen from './screens/Integration';
import CompletedScreen from './screens/Completed';

export enum Step {
  Welcome = 1,
  Features,
  Integration,
  Completed,
}

export const onboardingConfig: OnboardingConfig = {
  version: 1,

  steps: [
    {
      step: Step.Welcome,
      name: 'Welcome',
      screen: WelcomeScreen,
    },
    {
      step: Step.Features,
      name: 'Features',
      screen: FeaturesScreen,
    },
    {
      step: Step.Integration,
      name: 'Integration',
      screen: IntegrationScreen,
    },
    {
      step: Step.Completed,
      name: 'Completed',
      screen: CompletedScreen,
    },
  ],

  // onFinish: () => { ... },
};

export const TOTAL_STEPS = onboardingConfig.steps.length;