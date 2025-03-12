import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const Create = async (data) => {
    console.log(data);
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userdata = await authService.getCurrentUser();
        if (userData) dispatch(login(userdata));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold">
          Sign up to create Account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have account?&nbsp;{" "}
          <Link
            to="/signup"
            className="font-medium text-primary transition duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(Create)}>
          <div className="space-y-5">
            <input
              type="text"
              label="Full Name"
              placeholder="Enter your name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "Email Address must a valid one",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter your Password"
              type="password"
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(
                      value
                    ) || "Enter a valid password",
                },
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default signup;
