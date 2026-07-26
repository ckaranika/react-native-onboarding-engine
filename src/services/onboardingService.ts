import AsyncStorage from '@react-native-async-storage/async-storage';
import { exportAdapters, importAdapters } from './stateAdapters';
import type { OnboardingConfig, OnboardingStep } from '../types';

export interface OnboardingProgress {
  version: number;

  step: OnboardingStep;

  startedAt: string;
  completedAt?: string;

  state?: Record<string, unknown>;
}

const DEFAULT_STORAGE_KEY = 'onboarding';

class OnboardingService {
  private config!: OnboardingConfig;

  initialize(config: OnboardingConfig) {
    this.config = config;
  }

  private get storageKey() {
    return this.config.storageKey ?? DEFAULT_STORAGE_KEY;
  }

  private get firstStep() {
    const firstStep = this.config.steps[0];

    if (!firstStep) {
      throw new Error('OnboardingConfig must contain at least one step.');
    }

    return firstStep.step;
  }

  async getProgress(): Promise<OnboardingProgress | null> {
    const value = await AsyncStorage.getItem(this.storageKey);
    if (!value) return null;

    return JSON.parse(value);
  }

  async start(): Promise<OnboardingProgress> {
    const progress: OnboardingProgress = {
      version: this.config.version,
      step: this.firstStep,
      startedAt: new Date().toISOString(),
    };

    await this.save(progress);

    return progress;
  }

  async setStep(step: OnboardingStep): Promise<void> {
    const progress = (await this.getProgress()) ?? await this.start();

    if (progress.completedAt) return;

    progress.step = step;

    await this.save(progress);
  }

  async complete(): Promise<void> {
    const progress = (await this.getProgress()) ?? await this.start();

    progress.completedAt = new Date().toISOString();

    await this.save(progress);
  }

  async reset(): Promise<void> {
    await AsyncStorage.removeItem(this.storageKey);
  }

  async resume(): Promise<OnboardingProgress> {
    const progress = await this.getProgress();

    if (!progress || progress.version !== this.config.version) {
      return this.start();
    }

    importAdapters(progress.state ?? {});

    return progress;
  }

  private async save(progress: OnboardingProgress) {
    progress.state = exportAdapters();

    await AsyncStorage.setItem(
      this.storageKey,
      JSON.stringify(progress),
    );
  }
}

export const onboardingService = new OnboardingService();