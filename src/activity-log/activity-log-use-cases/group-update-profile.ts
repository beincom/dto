import { EVENT_TYPES, OBJECT_TYPES } from '../../activity-log.dto';
import {
  ActivityLogGroupDto,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogBaseUseCase,
  ActivityLogDocumentDTO,
  ActivityLogPayloadDTO,
  ActivityLogUserDto,
  ActivityLogCommunityDto,
} from '../activity-log.dto';

class PayloadDto {
  admin: ActivityLogUserDto;
  group: ActivityLogGroupDto;
  community: ActivityLogCommunityDto;
}
class DataDto {
  actor: Partial<ActivityLogUserDto>;
}

export class GroupUpdateProfileLog extends ActivityLogBaseUseCase<DataDto> {
  static readonly useCase = 'update.group.profile';

  public static toPayload(data: PayloadDto): ActivityLogPayloadDTO<PayloadDto> {
    return {
      useCase: this.useCase,
      eventTime: Date.now(),
      data,
    };
  }

  public static toDocument({
    useCase,
    eventTime,
    data,
  }: ActivityLogPayloadDTO<PayloadDto>): ActivityLogDocumentDTO<DataDto> {
    return {
      useCase,
      eventTime,
      eventType: EVENT_TYPES.CREATE,
      objectType: OBJECT_TYPES.GROUP,
      actorId: data.admin.id,
      communityId: data.group.id,
      objectId: data.group.id,
      data: {
        actor: {
          id: '12121',
          isDeactivated: false,
          avatar: '212121',
          username: '31313',
          fullname: '323232',
        },
      },
    };
  }

  public toObjectIds(): ActivityLogObjectIdDTO {
    return {
      userIds: [this.document.actorId],
    };
  }

  public toData(objectData: ActivityLogObjectDataDTO): DataDto {
    return {
      actor: objectData.users[this.document.actorId],
    };
  }
}
