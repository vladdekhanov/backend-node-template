import {User} from '../../do/user';

export type ResponseRegisterUser = Omit<User, 'passwordHash'>;
