import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/profile",
  });
  return null;
};

export default function LoginRoute() {
  return (
    <Form method="post" className="p-10 text-center">
      <h1 className="font-bold text-xl">Log In</h1>

      <p className="mb-6">
        Need to create an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Sign Up
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
        Log In
      </button>
    </Form>
  );
}

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const user = await authenticator.authenticate("form", request, {
    successRedirect: "/profile",
    failureRedirect: "/login",
  });
  return user;
};
