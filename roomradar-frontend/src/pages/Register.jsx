import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import api from "../api/axios";

/*
|--------------------------------------------------------------------------
| Validation Schema
|--------------------------------------------------------------------------
*/

const registerSchema = z
  .object({
    name: z
      .string()
      .min(
        2,
        "Name must be at least 2 characters"
      ),

    email: z
      .string()
      .email(
        "Invalid email address"
      ),

    password: z
      .string()
      .min(
        6,
        "Password must be at least 6 characters"
      ),

    confirmPassword:
      z.string(),
  })

  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      path: [
        "confirmPassword",
      ],

      message:
        "Passwords do not match",
    }
  );

const Register = () => {

  const navigate =
    useNavigate();

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
        registerSchema
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
          "/auth/register",
          {
            name:
              data.name,

            email:
              data.email,

            password:
              data.password,
          }
        );

        navigate(
          "/login"
        );

      } catch (error) {

        setServerError(
          error.response?.data
            ?.message ||
            "Registration failed"
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-center mb-6">

          Create Account

        </h1>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >

          {/* Name */}

          <div>
            <input
              type="text"

              placeholder="Full Name"

              className="w-full border rounded-lg p-3"

              {...register(
                "name"
              )}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {
                  errors.name
                    .message
                }
              </p>
            )}
          </div>

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

          {/* Confirm Password */}

          <div>
            <input
              type="password"

              placeholder="Confirm Password"

              className="w-full border rounded-lg p-3"

              {...register(
                "confirmPassword"
              )}
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {
                  errors
                    .confirmPassword
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
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;