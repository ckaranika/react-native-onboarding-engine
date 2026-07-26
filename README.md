# react-native-onboarding-engine

A lightweight, configurable onboarding engine for React Native applications.


Unlike traditional onboarding libraries that focus on UI, animations, or introductory slides, React Native Onboarding Engine focuses on the workflow itself. It manages onboarding state, persistence, progression, and resumability while allowing the host application to own its business logic and navigation.

---

# Features

* Config-driven onboarding flows
* Resume users where they left off
* Generic and reusable architecture
* Host-managed custom steps
* TypeScript support
* React Navigation integration
* Separation between onboarding flow and application logic

---

# Why?

Most onboarding solutions are tightly coupled to a specific application or provide only UI components.

Onboarding Engine separates **flow orchestration** from **business logic**.

The engine knows:

* which step the user is on
* how to save progress
* how to resume progress
* when onboarding is completed

Your application decides:

* which screens exist
* how to navigate
* how to resume external features
* what happens when onboarding finishes

---

# Installation

Using npm:

```bash
npm install react-native-onboarding-engine
```

Using Yarn:

```bash
yarn add react-native-onboarding-engine
```

Install the required peer dependencies:

```bash
npm install \
  @react-navigation/native \
  @react-navigation/native-stack \
  @react-native-async-storage/async-storage \
  react-native-safe-area-context \
  react-native-screens
```

or

```bash
yarn add \
  @react-navigation/native \
  @react-navigation/native-stack \
  @react-native-async-storage/async-storage \
  react-native-safe-area-context \
  react-native-screens
```

---

# Quick Start

## 1. Create a configuration

```tsx
const onboardingConfig: OnboardingConfig = {
    version: 1,

    steps: [
        {
            step: 1,
            name: 'Welcome',
            screen: WelcomeScreen,
        },

        {
            step: 2,
            name: 'Features',
            screen: FeaturesScreen,
        },

        {
            step: 3,
            name: 'FreeSample',
            id: 'free-sample',
            resume: () => {
                navigation.navigate('HostScreenToSample');
            },
        },
    ],

    onFinish: () => {
        navigation.resetRoot(...);
    },
};
```

---

## 2. Wrap your application

```tsx
import { OnboardingProvider } from 'react-native-onboarding-engine';

<OnboardingProvider config={onboardingConfig}>
    <App />
</OnboardingProvider>
```

---

## 3. Configure generic screens

Generic onboarding screens can be registered directly with the engine.

```tsx
{
    step: 1,
    name: 'Welcome',
    screen: WelcomeScreen,
}
```

For example:

* welcome
* features
* permissions explanation
* introduction
* tips

---

## 4. Enable onboarding resume

For most applications, mount `OnboardingResume` once near the root of your application and use `OnboardingNavigator` to render your generic onboarding screens.

```tsx
import {
  OnboardingProvider,
  OnboardingResume,
  OnboardingNavigator,
} from 'react-native-onboarding-engine';

<OnboardingProvider config={onboardingConfig}>
    <OnboardingResume />
    <OnboardingNavigator />
</OnboardingProvider>
```

- Generic onboarding screens are restored automatically by `OnboardingNavigator`.

- Host-managed onboarding steps remain outside the onboarding engine and can provide a `resume` callback.

  If the current step provides one, `OnboardingResume` invokes it automatically, allowing the host application to restore its own navigation and state. The host application is responsible for implementing the corresponding navigation logic for these steps.

---

## 5. Configure host-managed steps

Some screens belong to the host application.

Examples include:

* profile setup
* trial content
* purchases
* subscriptions
* permissions

Instead of providing a screen, provide an identifier and an optional resume callback.

```tsx
{
    step: 3,
    name: 'FreeSample',
    id: 'free-sample',
    resume: () => {
        navigation.navigate('HostScreenToSample');
    },
}
```

Host-managed steps are not rendered by the onboarding engine. The host application is responsible for displaying the appropriate screen. The onboarding engine remains completely unaware of how these screens are implemented.

---

## 6. Use the onboarding context

```tsx
const {
    showOnboarding,
    currentFlowStep,
    goTo,
    finishOnboarding,
} = useOnboarding();
```

- `showOnboarding` — Whether onboarding should currently be displayed.
- `currentFlowStep` — The current onboarding step configuration.
- `goTo(step)` — Move to another onboarding step.
- `finishOnboarding()` — Mark onboarding as completed.

### Move to another step

```tsx
await goTo(2);
```

`goTo()` updates the current onboarding step. The onboarding engine does not enforce progression or validation rules. The host application decides when users can move between steps.

### Finish onboarding

```tsx
await finishOnboarding();
```

---

# Design Principles

* Configuration over hardcoded flows.
* Flow orchestration separated from business logic.
* Generic screens are optional.
* Host applications own application-specific screens.
* Navigation remains outside the engine.
* Resumability is built into the workflow.

---

# Example Flow

```
Welcome
    ↓
Features
    ↓
Free Sample (host)
    ↓
Paywall (host)
    ↓
Completed
```

---

# Public API

## OnboardingProvider

```tsx
<OnboardingProvider config={config}>
    ...
</OnboardingProvider>
```

---

## OnboardingNavigator

```tsx
<OnboardingNavigator />
```

Automatically renders all configured generic onboarding screens, starting from the current onboarding step.

---

## OnboardingResume

```tsx
<OnboardingResume />
```

Resumes host-managed onboarding steps by invoking their configured `resume` callback. Generic onboarding screens are restored automatically by `OnboardingNavigator`.

---

## useOnboarding()

```tsx
const {
    showOnboarding,
    currentFlowStep,
    goTo,
    finishOnboarding,
} = useOnboarding();
```

- `showOnboarding` — Whether onboarding should currently be displayed.
- `currentFlowStep` — The current onboarding step configuration, or `null`.
- `goTo(step)` — Move to another onboarding step.
- `finishOnboarding()` — Mark onboarding as completed.

---

## OnboardingConfig

```tsx
{
    version,
    enabled?,
    storageKey?,
    steps,
    onFinish?,
}
```
- `version` — Version of the onboarding flow. Increment this when changing the onboarding structure to restart onboarding for existing users.
- `enabled` — Enable or disable onboarding without changing your configuration.
- `storageKey` — Override the default persistence key when using multiple onboarding flows.

---

## OnboardingStepConfig

```tsx
{
    step,
    name,
    screen?,
    id?,
    resume?,
}
```

- `step` — Numeric identifier used to track onboarding progress.
- `name` — Navigation route name for generic onboarding screens.
- `screen` — React component for a generic onboarding screen managed by the engine.
- `id` — Identifier for a host-managed onboarding step.
- `resume` — Optional callback invoked by `OnboardingResume` when resuming this host-managed step.

A step should define either screen (engine-managed) or id (host-managed), but not both.

---

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
