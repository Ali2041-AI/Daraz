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

    async createReview({name,productID,userID,reviewText,reviewImages,reviewStars}){

        try {
            const reviewID=ID.unique();
            const data=await this.databases.createDocument(
                env.APPWRITE_DB,
                env.APPWRITE_REVIEWID,
                reviewID,
                {
                    name,
                    productID,
                    userID,
                    reviewText,
                    reviewImages,
                    reviewStars,
                }

                
            )
            return data;
            
        } catch (error) {
            throw("REVIEW CREATION ERROR: APPWRITE ::ERROR ",error.message);
            
        }
    }
    

    async addAddress({userID,address}){

        console.log(userID);
        console.log(address);


        try {
            const addressID=ID.unique();
            const data=await this.databases.createDocument(
                env.APPWRITE_DB,
                env.APPWRITE_ADDRESSID,
                addressID,
                {
                    userID,
                    address
                }

                
            )
            return data;
            
        } catch (error) {
            throw("ADDRESS ADDITION ERROR: APPWRITE ::ERROR ",error.message);
            
        }
    }

    async getAddressData(userID){
        console.log(userID)
        try {
            const addressData=await this.databases.listDocuments(
                env.APPWRITE_DB,
                env.APPWRITE_ADDRESSID,
                [
                    Query.equal('userID',userID)
                ]
            )
           return addressData;
            
        } catch (error) {
            throw("GET ADDRESS DATA :: APPWRITE ::ERROR ",error.message)
        }

    }

    async updateAddressData(addressID,address){
        try {
            const response=await this.databases.updateDocument(
                env.APPWRITE_DB,
                env.APPWRITE_ADDRESSID,
                addressID,
                {
                    address
                }
            )
           return response;
            
        } catch (error) {
            throw("UPDATE ADDRESS DATA :: APPWRITE ::ERROR ",error.message)
        }

    }


    async addProductToCart({userID,products}){
        try {
            const cartID=ID.unique();
            const data=await this.databases.createDocument(
                env.APPWRITE_DB,
                env.APPWRITE_CARTID,
                cartID,
                {
                    userID,
                    products
                }
            )
            return data;
            
        } catch (error) {
            throw("CART ADDITION ERROR: APPWRITE ::ERROR ",error.message);
        }
    }

    async getCartProductData(userID){
        console.log(userID)
        try {
            const cartProductData=await this.databases.listDocuments(
                env.APPWRITE_DB,
                env.APPWRITE_CARTID,
                [
                    Query.equal('userID',userID)
                ]
            )
           return cartProductData;
            
        } catch (error) {
            throw("GET CART PRODUCTS DATA :: APPWRITE ::ERROR ",error.message)
        }

    }


    async updateCartProductData({cartID,products}){
        try {
            const response=await this.databases.updateDocument(
                env.APPWRITE_DB,
                env.APPWRITE_CARTID,
                cartID,
                {
                    products
                }
            )
           return response;
            
        } catch (error) {
            throw("UPDATE CART DATA :: APPWRITE ::ERROR ",error.message)
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


    async getReviewData(productID){
        try {
            const productData=await this.databases.listDocuments(
                env.APPWRITE_DB,
                env.APPWRITE_REVIEWID,
                [
                    Query.equal('productID',productID)
                ]
            )
           console.log(productData);
           return productData;
            
        } catch (error) {
            throw("GET REVIEW DATA :: APPWRITE ::ERROR ",error.message)
        }

    }


    async getSellerProductData(storeID){
        try {
            const productData=await this.databases.listDocuments(
                env.APPWRITE_DB,
                env.APPWRITE_PRODUCT_TABLE,
                [
                    Query.equal('storeID',storeID)
                ]
            )
           return productData;
            
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


    async sendProductQuerie({productID,storeID,userID,querie,customerName,messageSeenStatus,replySeenStatus}){
        const querieID=ID.unique();
        try {
            const res=await this.databases.createDocument(
                env.APPWRITE_DB,
                env.APPWRITE_PRODUCTQUERIEID,
                querieID,
                {
                    productID,
                    storeID,
                    userID,
                    customerName,
                    querie,
                    messageSeenStatus,
                    replySeenStatus
                }

            )
            return res;
            
        } catch (error) {
            throw("SENDING PRODUCT QUERIE :: APPWRITE ::ERROR ",error.message)

            
        }

    }


    async getProductQueries(attribute,ID){
        try {
            const productData=await this.databases.listDocuments(
                env.APPWRITE_DB,
                env.APPWRITE_PRODUCTQUERIEID,
                [
                    Query.equal(attribute,ID)
                ]
            )
           return productData;
            
        } catch (error) {
            throw("GET PRODUCT QUERIES  :: APPWRITE ::ERROR ",error.message)
        }

    }


    async sendCustomerQuerieReply(querieID,reply){
        try {
            const response=await this.databases.updateDocument(
                env.APPWRITE_DB,
                env.APPWRITE_PRODUCTQUERIEID,
                querieID,
                {
                    reply
                }
            )
           return response;
            
        } catch (error) {
            throw("UPDATE QUERIE REPLY DATA :: APPWRITE ::ERROR ",error.message)
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


    async getProductData(productID=null){

        try {
            const productData=await this.databases.listDocuments(
                env.APPWRITE_DB,
                env.APPWRITE_PRODUCT_TABLE,
               productID?[
                Query.equal('$id',productID)
               ]:[
                
               ]
            )
           return productData;
            
        } catch (error) {
            throw("GET ALL PRODUCT  DATA :: APPWRITE ::ERROR ",error.message)
        }

    }
    async getProductDataByID(productID){

        try {
            const productData=await this.databases.listDocuments(
                env.APPWRITE_DB,
                env.APPWRITE_PRODUCT_TABLE,
                [
                        
                ]
            )
           return productData;
            
        } catch (error) {
            throw("GET ALL PRODUCT  DATA :: APPWRITE ::ERROR ",error.message)
        }

    }







}


export default new Seller();