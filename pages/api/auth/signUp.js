import { hashPassword } from "../../../lib/auth";
import { connectToDataBase } from "../../../lib/db";


const handler =  async (req, res) => {
  const data = req.body;
  const {email,password} = data;
  if(req.method == "POST"){


    const client = await connectToDataBase();
    const db = client.db();

    const existingUser = await db.collection('users').findOne({email:email});
    if(existingUser){
      res.status(422).json({message:'User Already Exists'});
      client.close();
      return;
    }
    const hash = await hashPassword(password);
    const result  = await db.collection('users').insertOne({email:email, password:hash})
    res.status(201).json({message:'Created User Sucessfully'})
    client.close();
  }
}

export default handler;