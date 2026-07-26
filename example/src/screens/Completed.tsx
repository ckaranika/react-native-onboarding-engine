import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { OnboardingLayout, useOnboarding } from 'react-native-onboarding-engine';
import type { RootStackParamList } from '../navigation/types';
import { Step, TOTAL_STEPS } from '../config';
import { useEffect } from 'react';

const CompletedScreen = () => {
  const { 
    goTo, 
    // finishOnboarding 
  } = useOnboarding();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onFinish = async () => {
    // Uncomment to persist onboarding completion.
    // await finishOnboarding();

    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  useEffect(() => {
    goTo(Step.Completed);
  }, [goTo]);

  return (
    <OnboardingLayout
      currentStep={Step.Completed}
      totalSteps={TOTAL_STEPS}
      title="You're all set!"
      description="The onboarding flow is complete. The app decides what happens next."
      headerStyle={{ flex: 1 }}
      titleStyle={{ marginTop: 32 }}
      descriptionStyle={{ marginTop: 'auto' }}
      footer={
        <Button
          title="Finish"
          onPress={onFinish}
        />
      }
    />
  );
};

export default CompletedScreen;