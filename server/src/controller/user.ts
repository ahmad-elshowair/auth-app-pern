import { Request, Response, NextFunction} from 'express';
import { config } from '../config/config';
import UserModel from '../model/user';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserPayload } from '../interfaces/user';
import { generateAccessToken, generateRefreshToken } from '../utilities/generateToken';

const user_model = new UserModel();


// create an interface that extends Request
interface AuthorizedRequest extends Request {
  user?: any;
}



// create a user in the controller
const create_user = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await user_model.create(req.body);
    res.status(201).json({
      message: "a user has been created !",
      data: { ...user }
    });
  } catch (error) {
    next(error);
  }
};

// get all users in the controller
const get_all_users = async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
  try {
    const users = await user_model.all();
    res.status(200).json(
      [...users]
    );
  } catch (error) {
    next(error);
  }
};

// get a user in the controller
const get_user = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await user_model.get(req.params.id);
    res.status(200).json({
      data:{...user }
    });
  } catch (error) {
    next(error);
  }
};


// update a user in the controller
const update_user = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await user_model.update(req.params.id, req.body);
    res.status(200).json({
      message: "a user has been updated !",
      data: { ...user }
    });
  } catch (error) {
    next(error);
  }
};

// delete a user in the controller
const delete_user = async (req: AuthorizedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // check if the user is an admin or has the same id
    if (req.user.user_id === req.params.id || req.user.is_admin) {
      const user = await user_model.delete(req.params.id);
      res.status(200).json({
        message: "a user has been deleted !",
        data: { ...user }
      });
    }else{
      res.status(401).json({
        message: "you are not authorized to delete this user !"
      });
    }

  } catch (error) {
    next(error);
  }
};

// an array of refresh tokes
let refreshTokens: string[] = [];

// a refresh request that creates both access token and refresh token
const refresh_token = (req: Request, res: Response, next: NextFunction) => {
  try {
    
    // take the refresh token from the user
    const refreshToken = req.body.token;
  
    // send and error if there is no token or it invalid
    if (!refreshToken) return res.status(401).json({ message: "no token provided" });
    
    if(!refreshTokens.includes(refreshToken)) return res.status(403).json("refresh token is not valid");
  
    // verify the refresh token
    const decoded: string | JwtPayload = jwt.verify(refreshToken, config.jwt_secret_refresh) as UserPayload;
    if(!decoded) return res.status(403).json({ message: "token is not valid" });
    // remove the refresh token from the array
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);

    // create a new payload
    const payload: UserPayload = {
      user_id: decoded.user_id,
      is_admin: decoded.is_admin
    };
    // create a new access token and refresh token
    const newAccessToken = generateAccessToken(payload, config.jwt_secret_access);
    const newRefreshToken = generateRefreshToken(payload, config.jwt_secret_refresh);
    
    // push the new refresh token to the array
    refreshTokens.push(newRefreshToken);
  
    // send the new tokens to the user
    res.status(200).json({
      newAccessToken,
      newRefreshToken
    });
  } catch (error) {
    next((error as Error).message);
  }
};

// login a user in the controller
const login_user = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {user_email, user_password} = req.body
  try {
    const user = await user_model.login(user_email, user_password);
    
    // check the user
    if (!user) res.status(401).json({ message: "invalid credentials !"});

    const payload: UserPayload = {
        user_id: user.user_id,
        is_admin: user.is_admin
    };

    
    // generate access and refresh token
    const accessToken: string = generateAccessToken(payload, config.jwt_secret_access);
    const refreshToken: string = generateRefreshToken(payload, config.jwt_secret_refresh);

    // push the refresh token to the array
    refreshTokens.push(refreshToken);
    
    // send the tokens to the user
    res.status(200).json({
      id: user.user_id,
      admin: user.is_admin,
      accessToken,
      refreshToken
    });
  } catch (error) {
    next(error);
  }
};

// logout a user in the controller
const logout_user = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const refreshToken = req.body.token;
    // remove the refresh token from the array
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);

    res.status(200).json({
      message: "a user has been logged out !",
    });
  } catch (error) {
    next(error);
  }
};





export default {
  create_user,
  get_all_users,
  get_user,
  update_user,
  delete_user,
  login_user,
  refresh_token,
  logout_user
};