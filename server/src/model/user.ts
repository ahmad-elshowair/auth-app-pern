import db from '../database/index';
import User from "../types/user";
import bcrypt from 'bcrypt';
import { config } from '../config/config';

// a function for hashing the password
const hashing = (password: string): string => {
  return bcrypt.hashSync(password + config.pepper, config.salt_round);
};

class UserModel {
  
  // method to create a user
  async create (user: User): Promise<User> {
  try {
      // connect to the database
      const connection = await db.connect();
      
      // check if the user already exist
      const isExist = await connection.query('SELECT * FROM users WHERE user_email = $1', [user.user_email]);
      if (isExist.rows.length > 0) {
        throw new Error(`hey dud ${user.user_email} already exist`);
      }

      // a query of add a new user
      const query = 'INSERT INTO users (user_email, user_name, user_password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *';

      // execute the query
      const result = await connection.query(query, [
        user.user_email,
        user.user_name,
        hashing(user.user_password),
        user.is_admin
      ]);

      // release the database connection 
      connection.release();

      // return the created user
      return result.rows[0];
    } catch (error) {
      throw new Error(`hey dud cannot create ${user.user_name} due to that error: ${(error as Error).message}`);
    }
  }

  // method to all users
  async all (): Promise<User[]> {
    
    // connect to the database
    const connection = await db.connect();
    try {
      
      // a query of get all users
      const query = 'SELECT * FROM users';
      
      // execute the query
      const result = await connection.query(query);
      
      // return the users
      return result.rows;

    } catch (error) {
      throw new Error(`hey dud cannot get all users due to that error: ${(error as Error).message}`);
    } finally{
      // release the database connection
      connection.release();
    }
  }

  // method to get a user by id
  async get (id: string): Promise<User> {

    // connect to the database
    const connection = await db.connect();
    try {

      // a query of get a user by id
      const query = 'SELECT * FROM users WHERE user_id = $1';

      // execute the query
      const result = await connection.query(query, [id]);

      // check if the user exist
      if (result.rows.length === 0) {
        throw new Error('the user is not exist !');
      }
      
      // return the user
      return result.rows[0];
    } catch (error) {
      throw new Error(`error get user with id: ${id} due to that error: ${(error as Error).message}`);
    }finally{

      connection.release();
    }
  }

  // method to update a user
  async update (id: string, user: User): Promise<User> {

    // connect to the database
    const connection = await db.connect();

    try {

      // a query of update a user
      const query = 'UPDATE users SET user_email = $1, user_name = $2, user_password = $3, is_admin = $4 WHERE user_id = $5 RETURNING *';

      // execute the query
      const result = await connection.query(query, [
        user.user_email,
        user.user_name,
        hashing(user.user_password),
        user.is_admin,
        id
      ]);

      // check if the user exist
      if (result.rows.length === 0) {
        throw new Error(`hey dud cannot find user with id: ${id}`);
      }
      
      // return the user
      return result.rows[0];
    } catch (error) {
      throw new Error(`hey dud cannot update user with id: ${id} due to that error: ${(error as Error).message}`);
    }finally{
      connection.release();
    }
  }

  // method to delete a user
  async delete (id: string): Promise<User> {

    const connection = await db.connect();
    try {
      const query = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
      const result = await connection.query(query, [id]);
      if (result.rows.length === 0) {
        throw new Error(`the user is not exist !`);
      }
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }finally{
      connection.release();
    }
  }

  // method to login
  async login (user_email: string, user_password: string): Promise<User> {
    const connection = await db.connect();
    try {
      const query = 'SELECT * FROM users WHERE user_email = $1';
      const result = await connection.query(query, [user_email]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`login error:  ${(error as Error).message}`);
    }finally{
      connection.release();
    }
  }
}

export default UserModel;