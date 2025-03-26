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
