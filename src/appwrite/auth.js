import conf from "../conf/conf.js"

import { Client , Account, ID } from "appwrite"

class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteURL)
        .setProject(conf.appWriteProjectID);
        this.account = new Account(this.client);
    }

    async createUser({email , name , password}){
        try {
            const registeredUser = await this.account.create(ID.unique() , email , password , name);
            if(registeredUser){
                // return a new function becuase we have to handle it int he frontEnd
                return this.loginUser({email , password})
            }else{
                return null
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async loginUser({email , password}){
        try {
            return await this.account.createEmailSession(email , password);
            
        } catch (error) {
            throw new Error(error)
        }
    }

    async getCurrentUser(){
        try{
          return await this.account.get()

        }catch(error){
            console.log('error for the service/auth/getUserError : ' , error);
            
            // throw new Error(error)
        }
        return null;
    }

    async logout(){
        try{
            // deleteSeesions
            await this.account.deleteSession("current")
        }catch(error){console.log(error);
        }
    }
}

const authservice = new AuthService();

export default authservice;