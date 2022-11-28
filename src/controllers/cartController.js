import { cartColl } from "../../index.js";

export async function postCart(req, res) {
  const sendCart = req.body;
  try {
    await cartColl.insertOne(sendCart);
    res.sendStatus(201);
  } catch (err) {
    res.send(err.data);
  }
}
