import { GROUP_PRIVACY } from '@beincom/constants';

export type InnerGroupIdsByPrivacy = {
  open: string[];
  closed: string[];
  private: string[];
  secret: string[];
};

export interface SharedGroupDto {
  id: string;
  communityId?: string;
  name: string;
  icon: string;
  privacy: GROUP_PRIVACY;
  parentIds: string[];
  child?: InnerGroupIdsByPrivacy;
  isCommunity?: boolean;
  rootGroupId: string;
  isLinkedNft: boolean;
  categories?: string[];
}
