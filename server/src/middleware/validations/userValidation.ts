
import { check, ValidationChain } from "express-validator";
import db from "../../database/index";
import bcrypt from "bcrypt";
import { config } from "../../config/config";

const checkEmail: ValidationChain = check("user_email").isEmail().withMessage("the email is not valid !");
const checkPassword: ValidationChain =   check("user_password").isLength({ min: 6 }).withMessage("the password must be at least 6 characters !");
const checkName: ValidationChain = check("user_name").isLength({ min: 3 }).withMessage("the name must be at least 3 characters !");


const checkLogin: ValidationChain = check('user_email').custom(async(value: string, { req }) => {
    const connection = await db.connect();
    try {
        const user = await connection.query('SELECT * FROM users WHERE user_email = $1', [value]);
        if (user.rows.length === 0) {
            throw new Error(`incorrect email !`);
        }

        if(!bcrypt.compareSync(req.body.user_password + config.pepper, user.rows[0].user_password)){
            throw new Error(`incorrect password !`);
        }
        req.user = user.rows[0];
    }catch(error){
        throw new Error((error as Error).message);
    }finally{
        connection.release();
    }
});

export default{

    resisterValidation:[
        checkEmail,
        checkPassword,
        checkName
    ],

    loginValidation: [
        checkEmail,
        checkLogin
    ]
}
