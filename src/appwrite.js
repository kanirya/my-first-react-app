import {Client, Databases, ID, Query} from "appwrite";
import axios from 'axios';

const DATABASE_ID=import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID=import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID=import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client=new Client().setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(PROJECT_ID)
const dataBase= new Databases(client)



export  const updateSearchCount= async(searchTerm,movie)=>{
    //1. Use appwrite SDK to check if the search term exists in the database

    try{
        const result=await dataBase.
        listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.equal('searchTerm', searchTerm),
        ])
        if(result.documents.length>0){
            const doc=result.documents[0];
            await dataBase.updateDocument(DATABASE_ID,COLLECTION_ID,doc.$id,{
                count:doc.count+1,
            })
        }else{
            await dataBase.createDocument(DATABASE_ID,COLLECTION_ID,ID.unique(),{
                searchTerm,
                    count:1,
                    movie_id:movie.id,
                    poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
        }
    }catch(err){
        console.error(err);
    }
    //2. If it does, update the count
    //3. if no doc found, create a new doc with search term and count as 1
}

export const getTrendingMovie =async ()=>{
    try{
        const result= await dataBase.listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.limit(10),
            Query.orderDesc("count"),

        ])
        return result.documents;
    }catch (e) {
        console.error(e);

    }
}