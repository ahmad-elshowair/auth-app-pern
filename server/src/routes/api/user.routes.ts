import { Router } from "express";
import controller from '../../controller/user';
import {authenticate} from "../../middleware/auth";
import { validationMiddleware } from "../../middleware/validation";
import userValidation from "../../middleware/validations/userValidation";

const route: Router = Router();

route.get('/', controller.get_all_users);
route.get('/user/:id', controller.get_user);
route.put('/update-user/:id', controller.update_user);
route.delete('/delete-user/:id', authenticate, controller.delete_user);
route.post('/create-user', userValidation.resisterValidation, validationMiddleware, controller.create_user);
route.post('/login', userValidation.loginValidation, validationMiddleware, controller.login_user);
route.post('/refresh', controller.refresh_token);
route.post('/logout', authenticate, controller.logout_user)

export default route;