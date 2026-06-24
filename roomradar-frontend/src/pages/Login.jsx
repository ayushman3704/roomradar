import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import api from "../api/axios";

import { useAuth } from "../context/AuthContext";

/*
|--------------------------------------------------------------------------
| Validation Schema
|--------------------------------------------------------------------------
*/

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

const Login = () => {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [serverError,
    setServerError] =
    useState("");

  const {
    register,

    handleSubmit,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver:
      zodResolver(
        loginSchema
      ),
  });

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const onSubmit =
    async (data) => {

      try {

        setServerError("");

        await api.post(
          "/auth/login",
          {
            email:
              data.email,

            password:
              data.password,
          }
        );

        await login();

        navigate(
          "/matches"
        );

      } catch (error) {

        setServerError(
          error.response?.data
            ?.message ||
            "Login failed"
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-center mb-6">

          Login

        </h1>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >

          {/* Email */}

          <div>
            <input
              type="email"

              placeholder="Email"

              className="w-full border rounded-lg p-3"

              {...register(
                "email"
              )}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {
                  errors.email
                    .message
                }
              </p>
            )}
          </div>

          {/* Password */}

          <div>
            <input
              type="password"

              placeholder="Password"

              className="w-full border rounded-lg p-3"

              {...register(
                "password"
              )}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {
                  errors.password
                    .message
                }
              </p>
            )}
          </div>

          {/* Server Error */}

          {serverError && (
            <p className="text-red-500 text-sm">
              {serverError}
            </p>
          )}

          {/* Submit */}

          <button
            type="submit"

            disabled={
              isSubmitting
            }

            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isSubmitting
              ? "Logging In..."
              : "Login"}
          </button>

          <p className="text-center text-sm">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-blue-600"
            >
              Register
            </Link>

          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;