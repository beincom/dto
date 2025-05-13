export enum FEATURE_PROPERTIES {
  IS_COMING = 'isComing',
  MIN = 'min',
  MAX = 'max',
  LEVEL = 'level',
}

export interface IFeatureAttributes {
  name: string;
  [FEATURE_PROPERTIES.IS_COMING]?: boolean;
  [FEATURE_PROPERTIES.MIN]?: number;
  [FEATURE_PROPERTIES.MAX]?: number;
  [FEATURE_PROPERTIES.LEVEL]?: number;
}

export enum PREMIUM_PACKAGE_TYPE {
  BASIC = 'basic',
  PREMIUM = 'premium',
}

export enum PREMIUM_PACKAGE_TERM {
  ANNUAL = 'annual',
  LIFETIME = 'lifetime',
}

export class BindedUserSubscriptionDto {
  id: string;
  packageId: string;
  packageKey: string;
  type: PREMIUM_PACKAGE_TYPE;
  term: PREMIUM_PACKAGE_TERM;
  effectiveStart: Date;
  effectiveEnd?: Date;
}
