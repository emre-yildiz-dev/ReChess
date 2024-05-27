import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import * as bcrypt from "bcryptjs";
import { db } from "~/db.server";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/profile",
  });
  return user;
};

export default function SignupRoute() {
  return (
    <Form method="post" className="p-10 text-center">
      <h1 className="font-bold text-xl">Sign Up</h1>

      <p className="mb-6">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </p>

      <label className="font-semibold mr-2" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className="border-2 rounded-md mr-8 border-gray-600 px-3 py-1"
        required
      />

      <label className="font-semibold mr-2" htmlFor="password">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className="border-2 rounded-md mr-8 border-gray-600 px-3 py-1"
        required
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded-md font-semibold"
      >
        Sign Up
      </button>
    </Form>
  );
}

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await db.user.create({
    data: { email, hashedPassword },
  });

  return await authenticator.authenticate("form", request, {
    successRedirect: "/profile",
    failureRedirect: "/signup",
  });
};
