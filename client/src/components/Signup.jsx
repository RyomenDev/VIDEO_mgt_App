import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Button, Input } from "./index.js";
import { useForm } from "react-hook-form";
import { signUp as createAccountAPI } from "../api";
import Logo from "../assets/icon.png";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const handleCreateAccount = async (data) => {
    // console.log("inside",data);

    setError("");
    try {
      const response = await createAccountAPI(data);
      if (response.data.success) {
        const userData = response.data.user;
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 shadow-lg">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <img src={Logo} alt="V-mgt Logo" className="h-8 w-full" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-600 transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(handleCreateAccount)} className="mt-8">
          <div className="space-y-5">
            {/* Full Name Field */}
            <div>
              <Input
                label="Full Name:"
                placeholder="Enter your full name"
                {...register("name", { required: "Full Name is required" })}
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <Input
                label="Email:"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be valid",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <Input
                label="Password:"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full ${
                !isValid ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
              disabled={!isValid}
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
