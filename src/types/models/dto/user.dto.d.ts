import {User} from '../do';

/**
 * User model without sensitive data
 */
export type UserDto = Pick<User, 'name' | 'email'> & {id?: string}
