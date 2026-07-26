import type { ComponentType } from "react";

export type OnboardingStep = number;

export interface OnboardingStepConfig {
  step: OnboardingStep;

  name: string;

  screen?: ComponentType<unknown>;

  resume?: () => void | Promise<void>;

  /**
   * Optional identifier for steps handled by the host app.
   * The onboarding package doesn't know what this means.
   *
   * Examples:
   *  - quiz
   *  - results
   *  - review
   *  - paywall
   */
  id?: string;
}

export interface OnboardingConfig {
  version: number;
  steps: OnboardingStepConfig[];
  storageKey?: string;
  enabled?: boolean;
  onFinish?: () => void | Promise<void>;
}
