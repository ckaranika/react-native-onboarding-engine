import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { onboardingService, type OnboardingProgress } from '../services/onboardingService';
import type { OnboardingConfig, OnboardingStep, OnboardingStepConfig } from '../types';

type OnboardingContextType = {
    progress: OnboardingProgress | null;
    showOnboarding: boolean | null;

    config: OnboardingConfig;
    currentFlowStep: OnboardingStepConfig | null;

    goTo: (step: OnboardingStep) => Promise<void>;
    finishOnboarding: () => Promise<void>;
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

type Props = {
  children: React.ReactNode;
  config: OnboardingConfig;
};

export const OnboardingProvider = ({
  children,
  config,
}: Props) => {
    const [progress, setProgress] = useState<OnboardingProgress | null>(null);

    useEffect(() => {
        onboardingService.initialize(config);
    }, [config]);

    useEffect(() => {
        const enabled = config.enabled ?? true;
        if (!enabled || config.steps.length === 0) return;

        onboardingService.resume().then(progress => {
            setProgress(progress);
        });
    }, [config]);

    const showOnboarding =
        progress === null
            ? null
            : !progress.completedAt;

    const currentFlowStep =
        progress
            ? config.steps.find(flowStep => flowStep.step === progress.step) ?? null
            : null;

    const goTo = useCallback(async (step: OnboardingStep) => {
        await onboardingService.setStep(step);
        setProgress(await onboardingService.getProgress());
    }, []);

    const finishOnboarding = useCallback(async () => {
        try {
            await onboardingService.complete();
            setProgress(await onboardingService.getProgress());

            await config.onFinish?.();
        } catch (error) {
            console.error('Failed to complete onboarding', error);
        }
    }, []);

    return (
        <OnboardingContext.Provider
            value={{
                progress,
                showOnboarding,
                config,
                currentFlowStep,
                goTo,
                finishOnboarding,
            }}
        >
        {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }

  return context;
};