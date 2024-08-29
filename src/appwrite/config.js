import conf from "../conf/conf";
import { Databases , Storage ,Query, Client , ID} from "appwrite";

export class Service{

client = new Client();
databases;
bucket;

constructor(){

    this.client
        .setEndpoint(conf.appWriteURL)
        .setProject(conf.appWriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    }   

    async createPost({title , slug , content , featuredImage , sttaus}){
        try{
            return await this.databases.createDocument(
                conf.appWriteDatabaseID , 
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    sttaus
                }
            )
        }catch(error){
            console.log(error);
            
        }
    }

    async updatePost(slug , {title , content , featuredImage , sttaus}){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    sttaus
                }
                
            )
        } catch (error) {
            console.log(error);
            
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appWriteDatabaseID, conf.appWriteCollectionId, slug )
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(conf.appWriteDatabaseID, conf.appWriteCollectionId, slug )
        }catch(error){
            console.log("error in getting the document the docuemnt , " , error);
            
        }
    }

    async getAllPosts(query = [Query.equal("status" , "active")]){
        try{
            return await this.databases.listDocuments(conf.appWriteDatabaseID, conf.appWriteCollectionId, query)
        }catch(error){
            console.log(error); 
            return false;
        }
    }

    // file upload-delete service 

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketID ,
                ID.unique() ,
                file 
                )
        } catch (error) {
            console.log(error);
            return false
            
        }
    }
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appWriteBucketID,
                fileId
            )
        } catch (error) {
            console.log(error);
            return false           
            
        }
    }

    getFilePreview(fileID){
        return this.bucket.getFilePreview(conf.appWriteBucketID , fileID)
    }

}

const service  = new Service();

export default service