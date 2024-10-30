import { Client, Databases, ID, Query ,Storage} from "appwrite";
import env from "../envExporter";
import Store from "../Pages/Store";


class Seller{
    client;
    databases;
    storage;


    constructor(){
        this.client=new Client()
        .setEndpoint(env.APPWRITE_ENDPOINT)
        .setProject(env.APPWRITE_PROJECTID)
        this.databases=new Databases(this.client)
        this.storage=new Storage(this.client)
    }


    async createSellerAccount({sellerName,sellerPhoneNo,address,cnic,userID}){
        try {
        const sellerID=ID.unique();
        console.log(sellerID);
           const data=await  this.databases.createDocument(
            env.APPWRITE_DB,
            env.APPWRITE_SELLER_TABLE,
            sellerID,
            {
              sellerID,
              sellerName,
              sellerPhoneNo,
              address,
              cnic,
              userID
            }
        )
        console.log(sellerID);
        } 

            catch (error) {
                throw("SELLER ACCOUNT CREATION :: APPWRITE ::ERROR ",error.message)
            
            }
            



    }

    async getSellerData(userID){

        console.log(`User Id is: ${userID} `)

        try {
            const sellerData=await this.databases.listDocuments(
                env.APPWRITE_DB,
                env.APPWRITE_SELLER_TABLE,
                [
                    Query.equal('userID',userID)
                ]
            )
           return sellerData;
            
        } catch (error) {
            throw("GET SELLER DATA :: APPWRITE ::ERROR ",error.message)
        }

    }
    
    async addImage(file){
        try {
            const response=await this.storage.createFile(
                env.APPWRITE_STORAGEID,
                ID.unique(),
                file
            )

            return response.$id;
            
        } catch (error) {
            throw("Uploading Image :: APPWRITE ::ERROR ",error.message)
            
        }

    }

    async createStore(storeName,storeImg,sellerID){
        const storeID=ID.unique();
        try {
            const res=await this.databases.createDocument(
                env.APPWRITE_DB,
                env.APPWRITE_STORE_TABLE,
                storeID,
                {
                    storeName,
                    storeImg,
                    sellerID
                }

            )
            console.log(res);
            
        } catch (error) {
            throw("CREATING STORE :: APPWRITE ::ERROR ",error.message)

            
        }

    }






}


export default new Seller();