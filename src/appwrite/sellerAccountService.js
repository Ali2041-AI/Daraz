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
        return data;
        } 

            catch (error) {
                throw("SELLER ACCOUNT CREATION :: APPWRITE ::ERROR ",error.message)
            
            }
            



    }

    async getSellerData(userID){
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
    async getStoreData(sellerData){

        const sellerID=sellerData.$id;
        console.log(sellerID)
        try {
            const storeData=await this.databases.listDocuments(
                env.APPWRITE_DB,
                env.APPWRITE_STORE_TABLE,
                [
                        Query.equal('sellerID',sellerID)
                ]
            )
           return storeData;
            
        } catch (error) {
            throw("GET STORE DATA :: APPWRITE ::ERROR ",error.message)
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
            return res;
            
        } catch (error) {
            throw("CREATING STORE :: APPWRITE ::ERROR ",error.message)

            
        }

    }

    getImagePreview(featuredImageID){
        try {
            const Image=this.storage.getFilePreview(
                env.APPWRITE_STORAGEID,
                featuredImageID
            )
            return Image;

            
        } catch (error) {
            throw error;
        }

    }

    async createNewProduct({productTitle,discountedPrice,sold,stock,colors,
        sizes,category,storeID,price,description,
        productImages
    }){


       discountedPrice=parseInt(discountedPrice);
       sold=parseInt(sold)
       price=parseInt(price);
       stock=parseInt(stock);

        try {
        const productID=ID.unique();
           const data=await  this.databases.createDocument(
            env.APPWRITE_DB,
            env.APPWRITE_PRODUCT_TABLE,
            productID,
            {
              productID,
              productTitle,
              discountedPrice,
              sold,
              stock,
              colors,
              sizes,
              category,
              storeID,
              description,
              price,
              productImages
            }
        )
        return data;
        } 

            catch (error) {
                throw("SELLER ACCOUNT CREATION :: APPWRITE ::ERROR ",error.message)
            
            }
            



    }







}


export default new Seller();