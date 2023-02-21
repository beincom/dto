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
  avatarUrl: string;
  fullname: string;
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
  originalState: Object;
  
  /** The newest states of the object AFTER making changes
   * 
   *  Use for detect change logs when comparing to `{originalState}`
   * 
   *  Can be `null` in cases of `DELETE`
   */
  currentState: Object;

}

export const KAFKA_TOPIC_NAME = 'activity_log_created';
