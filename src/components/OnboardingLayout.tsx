import React from 'react';
import { View, Text, StyleSheet, type StyleProp, type ViewStyle, type TextStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  title: React.ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  
  description?: React.ReactNode;
  descriptionStyle?: StyleProp<TextStyle>;

  headerStyle?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;

  currentStep: number;
  totalSteps: number;

  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const OnboardingLayout = ({
  title,
  titleStyle,
  description,
  descriptionStyle,

  headerStyle,
  bodyStyle,
  contentStyle,

  currentStep,
  totalSteps,
  children,
  footer,
}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, contentStyle]}>
        <View style={[styles.header, headerStyle]}>
          {typeof title === 'string'
            ? <Text style={[styles.title, titleStyle]}>{title}</Text>
            : title}

          {!!description && (
            typeof description === 'string'
              ? <Text style={[styles.description, descriptionStyle]}>{description}</Text>
              : description
          )}
        </View>

        <View style={[styles.body, bodyStyle]}>
          {children}
        </View>
      </View>

      <View style={styles.bottom}>
        {footer}

        <View style={styles.pagination}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index + 1 === currentStep && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  header: {
    alignItems: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },

  description: {
    marginTop: 12,
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    color: '#6B7280',
  },

  body: {
    flex: 1,
    marginTop: 24,
  },

  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#D1D5DB',
  },

  activeDot: {
    width: 24,
    backgroundColor: '#22C55E',
  },
});