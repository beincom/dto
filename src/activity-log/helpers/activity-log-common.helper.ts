import { keys, union } from 'lodash';

import { ActivityPropChangedDTO } from '../dtos';

export function GetPropsChanged(old: any = {}, current: any = {}): ActivityPropChangedDTO {
  const changes: ActivityPropChangedDTO = {};
  const allKeys = union(keys(old), keys(current));

  allKeys.forEach((key) => {
    const isOldUndefined = !old || old[key] === undefined;
    const isCurrentUndefined = !current || current[key] === undefined;

    if (isOldUndefined && !isCurrentUndefined) {
      changes[key] = { old: null, new: current[key] };
    } else if (!isOldUndefined && isCurrentUndefined) {
      changes[key] = { old: old[key], new: null };
    } else if (JSON.stringify(old[key]) !== JSON.stringify(current[key])) {
      changes[key] = { old: old[key], new: current[key] };
    }
  });

  return changes;
}
