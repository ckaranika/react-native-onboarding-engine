import { useEffect, useRef } from 'react';
import { useOnboarding } from './OnboardingContext';

export default function OnboardingResume() {
  const { currentFlowStep } = useOnboarding();
  const resumed = useRef(false);

  useEffect(() => {
    if (resumed.current) return;

    const resume = currentFlowStep?.resume;
    if (!resume) return;

    resumed.current = true;
    resume();
  }, [currentFlowStep]);

  return null;
}