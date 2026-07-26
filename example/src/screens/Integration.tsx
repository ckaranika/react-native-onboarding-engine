import { Button, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { OnboardingLayout, useOnboarding } from 'react-native-onboarding-engine';
import type { RootStackParamList } from '../navigation/types';
import { Step, TOTAL_STEPS } from '../config';
import { useEffect } from 'react';

const IntegrationScreen = () => {
  const { goTo } = useOnboarding();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onContinue = async () => {
    navigation.navigate('Completed');
  };

  useEffect(() => {
    goTo(Step.Integration);
  }, [goTo]);

  return (
    <OnboardingLayout
      currentStep={Step.Integration}
      totalSteps={TOTAL_STEPS}
      title="Integration"
      description="Onboarding integrates with your app's own workflows. Build your onboarding around them, not the other way around."
      headerStyle={{ flex: 1 }}
      titleStyle={{ marginTop: 32 }}
      descriptionStyle={{ marginTop: 'auto', marginBottom: 32 }}
      bodyStyle={{flex: 1}}
      footer={
        <Button
          title="Continue"
          onPress={onContinue}
        />
      }
    >
      <View style={styles.list}>
        <Text style={styles.listItem}>✓ Email verification</Text>
        <Text style={styles.listItem}>✓ Notifications</Text>
        <Text style={styles.listItem}>✓ Location</Text>
      </View>
    </OnboardingLayout>
  );
};


const styles = StyleSheet.create({
  list: {
    gap: 20,
  },

  listItem: {
    fontSize: 16,
  },
});

export default IntegrationScreen;