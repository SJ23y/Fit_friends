import { Gender, RequestStatus, Role, User } from "@backend/shared-core";

export const createNotificationData = (user: User, recieverId: string, senderId: string, status: RequestStatus): [string, string] => {
  let result;
  switch (status) {
    case RequestStatus.PENDING:
      result = [
        `${user.name} пригласил${user.gender === Gender.FEMALE ? 'a': ''} вас на совместную тренировку`,
        recieverId
      ]
      break;
    case RequestStatus.APPROVED:
      result = [
        `${user.name} принял${user.gender === Gender.FEMALE ? 'a': ''} ваш запрос на ${(user.role === Role.COACH) ? 'персональную' : 'совместную'} тренировку`,
        senderId
      ]
      break;
    case RequestStatus.REJECTED:
        result = [
          `${user.name} отклонил${user.gender === Gender.FEMALE ? 'a': ''} ваш запрос на ${(user.role === Role.COACH) ? 'персональную' : 'совместную'} тренировку`,
          senderId
        ]
        break;
  }
  return result
}
