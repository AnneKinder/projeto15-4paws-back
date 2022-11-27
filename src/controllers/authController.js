import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { sessionsColl, usersColl } from "../../index.js";

export async function signUp(req, res) {
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

export async function signIn(req, res) {
  const { email, password } = req.body;
  const token = uuidV4();

  const userData = await usersColl.findOne({ email });
  const passwordCompare = bcrypt.compareSync(password, userData.password);

  if (userData && passwordCompare) {
    await sessionsColl.insertOne({
      token,
      userId: userData._id,
    });

    res.send({ userData, token });
  } else {
    res.status(401).send("Usuário e/ou senha estão incorretos.");
  }
}

export async function signOut(req, res) {
  const { token } = req.headers;
  try {
    const session = await sessionsColl.findOne({ token });
    if (!session) {
      return res.send("Não foi possível localizar a sessão!");
    }
    await sessionsColl.deleteOne({ token });
    res.send("Sessão encerrada!");
  } catch (err) {
    res.send(err);
  }
}
