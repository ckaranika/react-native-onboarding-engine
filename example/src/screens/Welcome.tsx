import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { OnboardingLayout, useOnboarding } from 'react-native-onboarding-engine';
import type { RootStackParamList } from '../navigation/types';
import { Step, TOTAL_STEPS } from '../config';
import { useEffect } from 'react';

const WelcomeScreen = () => {
  const { goTo } = useOnboarding();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onContinue = async () => {
    navigation.navigate('Features');
  };

  useEffect(() => {
    goTo(Step.Welcome);
  }, []);

  return (
    <OnboardingLayout
      currentStep={Step.Welcome}
      totalSteps={TOTAL_STEPS}
      title="Welcome"
      description="A lightweight, configurable onboarding engine for React Native."
      headerStyle={{ flex: 1 }}
      titleStyle={{ marginTop: 32 }}
      descriptionStyle={{ marginTop: 'auto' }}
      footer={
        <Button
          title="Get Started"
          onPress={onContinue}
        />
      }
    />
  );
};

export default WelcomeScreen;