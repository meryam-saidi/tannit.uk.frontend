import { UserManager } from 'oidc-client-ts';
import authConfig from './authConfig';

const userManager = new UserManager(authConfig);

export default userManager;