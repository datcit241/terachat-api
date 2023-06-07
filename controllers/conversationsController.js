const {Router} = require("express");
const app = Router();
const services = require("../application");

app.get("/list", async (req, res) => {
  const {userId} = req.user;

  let conversations;
  try {
    conversations = await services.conversations.list(userId);
  } catch (err) {
    console.log(err)
    return res.status(err.status || 500).send({ error: err.message });
  }

  return res.status(200).send({conversations});
});

app.get("/list-all", async (req, res) => {
  const conversations = await services.conversations.listAll();
  return res.status(200).send({conversations})
});

app.post("/create", async (req, res) => {
  const {userId} = req.user;
  const {users, isPublic} = req.body;
  const conversation = await services.conversations.create({ userId, users, isPublic });
  res.send(conversation);
});

app.put("/join", async (req, res) => {
  const {userId} = req.user;
  const {conversationId, password} = req.body;

  try {
    await services.conversations.join({userId, conversationId, password});
  } catch (err) {
    return res.status(err.status || 500).send({ error: err.message });
  }
  return res.status(200).send();
});

app.delete("/leave",async (req, res) => {
  const {userId} = req.user;
  const {conversationId} = req.body;
  try {
    await services.conversations.leave({userId, conversationId});
  } catch (err) {
    return res.status(err.status || 500).send({ error: err.message });
  }
  return res.status(200).send();
});

app.post("/dispose", async (req, res) => {
  const {userId} = req.user;
  const conversationId = req.body.conversationId;
  try {
    await services.conversations.dispose({userId, conversationId});
  } catch (err) {
    return res.status(err.status || 500).send({ error: err.message });
  }
  return res.status(200).send();
});

app.post("/renew-password", async (req, res) => {
  const {userId} = req.user;
  const conversationId = req.body.conversationId;
  try {
    await services.conversations.renewPassword({userId, conversationId});
  } catch (err) {
    return res.status(err.status || 500).send({ error: err.message });
  }
  return res.status(200).send();
});

module.exports = app;