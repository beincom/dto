import {
  ActivityLogCommunityDTO,
  ActivityLogDocumentDTO,
  ActivityLogGroupDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
  ActivityLogUserDTO,
  ActivityPropChangedDTO,
} from './dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from './enums';

export class BasePayloadPropsDTO {
  id: string;
  mainId: string;
  actor: ActivityLogUserDTO;
}

export class BasePayloadDTO<T = object> extends BasePayloadPropsDTO {
  community: ActivityLogCommunityDTO;
  group: ActivityLogGroupDTO;
  originalState: T;
  currentState: T;
}

export class BaseDataDTO<T = object> {
  actor: Partial<ActivityLogUserDTO>;
  community: Partial<ActivityLogCommunityDTO>;
  group: Partial<ActivityLogGroupDTO>;
  changes: ActivityPropChangedDTO;
  object: T;
}

export interface IActivityLogBaseUseCase {
  toPayload(data: any): ActivityLogPayloadDTO<any>;
  toDocument(payload: ActivityLogPayloadDTO<any>): ActivityLogDocumentDTO<any>;
  toObjectIds(): ActivityLogObjectIdDTO;
  toData(objectData: ActivityLogObjectDataDTO): any;
}

export abstract class ActivityLogBaseUseCase<T> {
  static readonly useCase: ACTIVITY_LOG_USE_CASES;
  static readonly eventType: ACTIVITY_EVENT_TYPES;
  static readonly objectType: ACTIVITY_OBJECT_TYPES;

  constructor(private readonly _document: ActivityLogDocumentDTO<T>) {}

  /**
   * @method
   * public static toPayload(data: PayloadDTO): ActivityLogPayloadDTO<PayloadDTO>
   *
   * Used for the producer, to create a payload for an activity log.
   * DO NOT NEED TO EDIT THIS METHOD
   */

  /**
   * @method
   * public static toDocument(payload: ActivityLogPayloadDTO<PayloadDTO>)
   *
   * Used for the consumer, to create a document for an activity log.
   */

  /**
   * Get the document data with the type of T
   */
  public get document() {
    return this._document;
  }

  /**
   * Get all object ids from the activity log document
   * Used for data fetching
   */
  public abstract toObjectIds(): ActivityLogObjectIdDTO;

  /**
   * Get the binding data from the object ids
   * Used for data fetching
   */
  public abstract toData(objectData: ActivityLogObjectDataDTO): T;
}
