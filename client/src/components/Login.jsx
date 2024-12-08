import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { logIn as loginUser } from "../api";
import Logo from "../assets/icon.png";
// import Cookies from "js-cookie"; // You can remove this if not needed

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  // Login function to call the backend API
  const login = async (data) => {
    setError(""); // Reset error before each login attempt
    try {
      const response = await loginUser(data);
      console.log(response);

      if (response.data.success) {
        const { user, token } = response.data;
        // Set token in localStorage and sessionStorage
        localStorage.setItem("token", token);
        sessionStorage.setItem("token", token);

        // Dispatch user data to Redux store
        dispatch(authLogin(user));

        // console.log("Successful login");

        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <img src={Logo} alt="V-mgt Logo" className="h-8 w-full" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be valid",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
