import express from "express";
import UserDocument from "./user/User.model";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const CLIENT_ID =
    "550890630184-gbs9q4c0viqr2nmt2n04c08momogpht2.apps.googleusercontent.com";

  const client = new OAuth2Client(CLIENT_ID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: req.body.token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (payload) {
      const googlePayload = payload;
      const user = await UserDocument.findOne({
        googleId: payload.sub,
      }).exec();
      if (user) {
        const token = jwt.sign({ id: user.id }, "privatekey");
        res.json({ email: user.email, token });
      } else {
        const newUser = await UserDocument.create({
          email: googlePayload.email!,
          googleId: googlePayload.sub,
          firstName: googlePayload.given_name,
          familyName: googlePayload.family_name,
          picture: googlePayload.picture,
        });
        newUser.save();
        const token = jwt.sign({ id: newUser.id }, "privatekey");
        res.json({ email: newUser.email, token });
      }
    }
  }
  await verify().catch(console.error);
});

export default router;
