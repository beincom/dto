import { ACTIVITY_LOG_USE_CASES } from "../../enums";
import { BanCommunityMemberLog } from "./ban-community-member.use-case";

export class UnbanCommunityMemberLog extends BanCommunityMemberLog {
    static readonly useCase = ACTIVITY_LOG_USE_CASES.UNBAN_MEMBER;
}