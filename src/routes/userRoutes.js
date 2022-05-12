import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import userIsBanned from '../middlewares/userIsBanned';
import userController from '../controllers/userController';

const router = new Router();

// TODO MIDDLEWARE isBanned nas rotas get e put e no resto da aplicação toda, inclusive nas rotas estáticas
router.get('/', loginRequired, userIsBanned, userController.show);
router.post('/', userController.store);
router.put('/', loginRequired, userIsBanned, userController.update);

export default router;
