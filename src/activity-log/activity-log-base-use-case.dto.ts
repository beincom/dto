import { ActivityLogDocumentDTO, ActivityLogObjectDataDTO, ActivityLogObjectIdDTO } from './dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from './enums';

export abstract class ActivityLogBaseUseCase<T> {
  static readonly useCase: ACTIVITY_LOG_USE_CASES;
  static readonly eventType: ACTIVITY_EVENT_TYPES;
  static readonly objectType: ACTIVITY_OBJECT_TYPES;

  constructor(private readonly _document: ActivityLogDocumentDTO<T>) {}

  public get document() {
    return this._document;
  }

  public abstract toObjectIds(): ActivityLogObjectIdDTO;

  public abstract toData(objectData: ActivityLogObjectDataDTO): T;
}
