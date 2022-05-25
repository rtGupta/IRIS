import callerRouter from './caller-router.js';
import erRouter from './er-router.js';
import userRouter from './user-router.js';
import loginRouter from './login-router.js'
import updatePasswordRouter from './updatePassword-router.js';

export default (app) => {
    app.use('/', erRouter);
    app.use('/', userRouter);
    app.use('/', callerRouter);
    app.use('/', loginRouter);
    app.use('/', updatePasswordRouter);
}