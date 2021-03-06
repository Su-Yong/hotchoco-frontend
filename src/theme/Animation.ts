export type Duration = string | number;
export interface AnimationDuration {
  shortest: Duration;
  shorter: Duration;
  short: Duration;
  medium: Duration;
  long: Duration;
  longer: Duration;
  longest: Duration;
}

export type EasingFunction = string;
export interface EasingAnimation {
  linear: EasingFunction;
  in: EasingFunction;
  out: EasingFunction;
  inOut: EasingFunction;
  acceleration: EasingFunction;
  deceleration: EasingFunction;
  inBack: EasingFunction;
  outBack: EasingFunction;
}

export interface Animation {
  duration: AnimationDuration;
  easing: EasingAnimation;
};
