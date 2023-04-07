import { GroupUpdateProfileLog } from './activity-log-use-cases/group-update-profile';

const payload = GroupUpdateProfileLog.toPayload({
  admin: {
    id: '11',
    username: 'username-11',
    fullname: 'FullName 11',
    avatar: 'avt-11',
    isDeactivated: false,
  },
  group: {
    id: '22',
    name: 'Group 22',
    level: 1,
    privacy: 'SECRET',
    chatId: 'chat-22',
  },
  community: {
    id: '33',
    name: 'Community 33',
    privacy: 'SECRET',
    teamId: 'team-33',
    groupId: 'group-22',
  },
});
console.log('payload', payload);

const document = GroupUpdateProfileLog.toDocument(payload);
console.log('document', document);

const uc = new GroupUpdateProfileLog(document);
const objectIds = uc.toObjectIds();
console.log('objectIds', objectIds);

const data = uc.toData({
  users: {
    '11': {
      id: '11',
      username: 'u-11',
      fullname: 'FN 11 --- changed',
      avatar: 'avt-11',
      isDeactivated: true,
    },
  },
  groups: {
    '22': {
      id: '22',
      name: 'Group 22 -- changed',
      level: 1,
      privacy: 'SECRET',
      chatId: 'chat-22',
    },
  },
  communities: {},
});
console.log('data', data);
