
import {getSession} from 'next-auth/react'
import { connectToDataBase } from '../../../lib/db'
import {validatePassword, hashPassword} from '../../../lib/auth'
const handler = async (req,res) => {
    if(req.method != "PATCH"){
        return;
    }   

    const session = await getSession({req:req});
    if(!session){
        res.status(401).json({message:'Not  Authenticated'});
        return;
    }

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword;


    // now connect to db

    const client =await connectToDataBase()

    const userDb = client.db()
    const usersCollection =   userDb.collection('users')
    const users = await usersCollection.findOne({email:userEmail})
    if(!users){
        res.status(404).json({message:'User Doesnt Exists'});
        return;
    }
    const hashedPass = users.password;
    

    const isValid = await validatePassword(oldPassword,hashedPass  )
    if(!isValid){
        res.status(403).json({message:'Password Doesnt match '})
        client.close();
        return;
    }

    const newHash = await hashPassword(newPassword);

    await usersCollection.updateOne({email:userEmail}, {$set:{password:newHash}})
    client.close()
    res.status(200).json({message:'Password Updated'});


    


}

export default handler