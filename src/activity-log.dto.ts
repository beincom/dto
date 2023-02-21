export enum EVENT_TYPES {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

/**
 * Entity types
 */
export enum OBJECT_TYPES {
  COMMUNITY = 'COMMUNITY',
  GROUP = 'GROUP',
  MEMBER = 'MEMBER',
  ARTICLE = 'ARTICLE',
  POST = 'POST',
  SERIES = 'SERIES',
}

export class Actor {
  id: string;
  username: string;
  fullname: string;
  avatarUrl: string;
}

export class ChangeSummary {
  [propName: string]: { old: string | object; new: string | object };
}

/**
 * The DTO contract for activity log item.
 *
 * This object will be used by BIC-services to write activity log info to the log queue (KAFKA),
 * which will be consumed by activity-log-service afterwards
 */
export class ActivityLogItem {
  actor: Actor;
  eventTime: Date;
  eventType: EVENT_TYPES;
  objectType: OBJECT_TYPES;
  objectId: string;

  /** The original states of the object BEFORE making changes
   *
   *  Use for detect change logs when comparing to `{currentState}`
   *
   *  Can be `null` in cases of `CREATE`
   */
  originalState: object;

  /** The newest states of the object AFTER making changes
   *
   *  Use for detect change logs when comparing to `{originalState}`
   *
   *  Can be `null` in cases of `DELETE`
   */
  currentState: object;

  /**
   * OPTIONAL: The detail changes of the activity log event
   *
   * Only use this when producer-service cannot share the full states of the changed entity (`originalState`/`currentState`)
   */
  changeSummary?: ChangeSummary;
}

/** Use for the kafka topic name */
export const ACTIVITY_LOG_EVENT = 'activity_log_created';
