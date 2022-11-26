import { sessionsColl, prodsColl } from "../index.js";

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


  const prodsArray = await prodsColl.find().toArray();

  //separar array de gatos e dogs
  //enviar duas arrays

  if (prodsArray) {
    res.send(prodsArray);
  } else {
    res.sendStatus(401);
  }
}
