import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import { db } from "~/db.server";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

const authenticator = new Authenticator<User>(sessionStorage);

const formStrategy = new FormStrategy(async ({ form }) => {
  const emailInput = form.get("email");
  const passwordInput = form.get("password");
  if (!emailInput || !passwordInput) {
    throw new AuthorizationError("No email or password provided");
  }

  const email = emailInput as string;
  const password = passwordInput as string;

  const user = await db.user.findUnique({ where: { email } });
  if (!user) throw new AuthorizationError("No user found");

  const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
  if (!passwordMatch) throw new AuthorizationError("Password is incorrect");

  return user;
});

authenticator.use(formStrategy, "form");

export { authenticator };
