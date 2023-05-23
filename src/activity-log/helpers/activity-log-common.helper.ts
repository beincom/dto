import { keys, union } from 'lodash';

import { ActivityPropChangedDTO } from '../dtos';

export function GetPropsChanged(old: any = {}, current: any = {}): ActivityPropChangedDTO {
  const changes: ActivityPropChangedDTO = {};
  const allKeys = union(keys(old), keys(current));

  allKeys.forEach((key) => {
    if (JSON.stringify(old[key]) !== JSON.stringify(current[key])) {
      changes[key] = {
        old: old[key],
        new: current[key],
      };
    }
  });

  return changes;
}
