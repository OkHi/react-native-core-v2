import { OkHiCore } from '@okhi/react-native-core';

export default {
  phone: '+254700110590',
  userId: '5kCVI3G6AO',
};

export class Core extends OkHiCore {
  signInWithPhone(phone: string) {
    return this.anonymousSignInWithPhoneNumber(phone, ['address']);
  }

  signInWithUserId(userId: string) {
    return this.anonymousSignInWithUserId(userId, ['address']);
  }
}
