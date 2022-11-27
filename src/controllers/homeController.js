import { sessionsColl, prodsColl, tempCartColl } from "../../index.js";

export async function home(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    res.sendStatus(500);
    return;
  }

  const session = await sessionsColl.findOne({ token });
  console.log(session);
  if (!session) {
    res.sendStatus(401);
    return;
  }

  try {
    const dogProds = await prodsColl.find({ type: "dog" }).toArray();
    const catProds = await prodsColl.find({ type: "cat" }).toArray();

    res.status(201).send({ dogProds, catProds });
  } catch (err) {
    res.sendStatus(401);
  }
}

export async function postTempCart(req, res) {
  const tempCart = req.body;

  try {
    await tempCartColl.insertMany(tempCart);
    res.sendStatus(201);
  } catch (err) {
    res.send(err);
  }
}
