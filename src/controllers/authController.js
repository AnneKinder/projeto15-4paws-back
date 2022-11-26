import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from "uuid";
import { usersColl } from '../../index.js';

export async function signUp (req, res) {
    const { name, email, password, confirmp } = req.body;

    const alreadyExists = await usersColl.findOne({ email: email });
  
    if (alreadyExists) {
      res.status(400).send("Email já cadastrado.");
      return;
    }
  
    if (password != confirmp) {
      res.status(400).send("As senhas não conferem!");
      return;
    }
  
    const passwordHash = bcrypt.hashSync(password, 10);
  
    const user = {
      name: name,
      email: email,
      password: passwordHash,
      confirmp: passwordHash,
    };
  
    try {
      await usersColl.insertOne({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      res.status(201).send("Created");
    } catch (err) {
      console.log(err);
    }
}