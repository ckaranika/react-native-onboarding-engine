import { Button, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { OnboardingLayout, useOnboarding } from 'react-native-onboarding-engine';
import type { RootStackParamList } from '../navigation/types';
import { Step, TOTAL_STEPS } from '../config';
import { useEffect } from 'react';

const FeaturesScreen = () => {
  const { goTo } = useOnboarding();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onContinue = async () => {
    navigation.navigate('Integration');
  };

  useEffect(() => {
    goTo(Step.Features);
  }, [goTo]);

  return (
    <OnboardingLayout
      currentStep={Step.Features}
      totalSteps={TOTAL_STEPS}
      title="Flexible & extensible"
      description="The engine handles the workflow while your app owns the experience."
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
        <Text style={styles.listItem}>✓ Config-driven flows</Text>
        <Text style={styles.listItem}>✓ Resume progress</Text>
        <Text style={styles.listItem}>✓ Versioned onboarding</Text>
        <Text style={styles.listItem}>✓ TypeScript support</Text>
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

export default FeaturesScreen;