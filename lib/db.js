import {MongoClient} from 'mongodb'

export const connectToDataBase = async () => {
    const client = await MongoClient.connect('mongodb+srv://<your_username>:<yourpassword>@cluster0.cvorukl.mongodb.net/userdb?retryWrites=true&w=majority')
    return client   
}



