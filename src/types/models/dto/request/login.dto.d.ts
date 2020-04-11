import {User} from '../../do';

export type RequestLoginDto = Pick<User, 'email'> & {password: string};
