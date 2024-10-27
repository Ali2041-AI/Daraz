import { Client,Account,ID } from "appwrite";
import env from "../envExporter";


class Auth{
 client;
 account;


   constructor(){
    this.client=new Client();
    this.client.setProject(env.APPWRITE_PROJECTID)
    this.account=new Account(this.client)
   }


   async SignUp({name,email,pass}){

    try {
        const user=await this.account.create(ID.unique(),email,pass,name);
        
    } catch (error) {
        throw(error.message);
    }

   }


   async loginUser({email,pass}){
      const user= await this.account.createEmailPasswordSession(email,pass);
      return user;

    try {
        
    } catch (error) {
        throw("LoginUser::APPWRITE:ERROR "+error.message);
    }
   }

   async getLogInUser(){

    try {
        const user=await this.account.get();
        return user;
        
    } catch (error) {
        throw("GetLogInUser :: APPWRITE :: ERROR "+ error.message)
        
    }

   }

   async logOutUser(){
    try {
     const res=await this.account.deleteSession('current');
     return res
    } catch (error) {
        throw("logOutUser :: APPWRITE :: ERROR "+ error.message)
        
    }
   }

}


export default new Auth();