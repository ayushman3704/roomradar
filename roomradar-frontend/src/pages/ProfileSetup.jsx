import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { profileSchema }
  from "../validators/profile.schema";

import { PREFERENCES }
  from "../constants/preferences";

import { updateProfile }
  from "../services/user.service";

const createDefaultPreferences =
  () => {

    const preferences = {};

    PREFERENCES.forEach(
      (preference) => {

        preferences[
          preference.key
        ] = {
          value: 5,
          weight: 3,
        };
      }
    );

    return preferences;
  };

const ProfileSetup = () => {

  const navigate =
    useNavigate();

  const [serverError,
    setServerError] =
    useState("");

  const {
    register,

    handleSubmit,

    watch,

    setValue,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver:
      zodResolver(
        profileSchema
      ),

    defaultValues: {
      city: "",

      state: "",

      gender: "male",

      budgetMin: 5000,

      budgetMax: 10000,

      lifestylePreferences:
        createDefaultPreferences(),
    },
  });

  const preferences =
    watch(
      "lifestylePreferences"
    );

  const onSubmit =
    async (data) => {

      try {

        setServerError("");

        await updateProfile(
          data
        );

        navigate(
          "/matches"
        );

      } catch (error) {

        setServerError(
          error.response?.data
            ?.message ||
            "Profile update failed"
        );
      }
    };

  return (
    <div className="max-w-5xl mx-auto">

      <div className="bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold mb-8">

          Complete Your Profile

        </h1>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-8"
        >

          {/* Basic Info */}

          <div className="grid md:grid-cols-2 gap-4">

            <input
              placeholder="City"
              className="border p-3 rounded-lg"
              {...register(
                "city"
              )}
            />

            <input
              placeholder="State"
              className="border p-3 rounded-lg"
              {...register(
                "state"
              )}
            />

            <select
              className="border p-3 rounded-lg"
              {...register(
                "gender"
              )}
            >
              <option value="male">
                Male
              </option>

              <option value="female">
                Female
              </option>

              <option value="other">
                Other
              </option>
            </select>

          </div>

          {/* Budget */}

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="number"
              placeholder="Budget Min"
              className="border p-3 rounded-lg"

              {...register(
                "budgetMin",
                {
                  valueAsNumber: true,
                }
              )}
            />

            <input
              type="number"
              placeholder="Budget Max"
              className="border p-3 rounded-lg"

              {...register(
                "budgetMax",
                {
                  valueAsNumber: true,
                }
              )}
            />

          </div>

          {/* Preferences */}

          <div>

            <h2 className="text-xl font-semibold mb-6">

              Lifestyle Preferences

            </h2>

            <div className="space-y-6">

              {PREFERENCES.map(
                (
                  preference
                ) => {

                  const current =
                    preferences?.[
                      preference.key
                    ];

                  return (
                    <div
                      key={
                        preference.key
                      }
                      className="border rounded-lg p-4"
                    >

                      <div className="flex justify-between mb-3">

                        <span className="font-medium">

                          {
                            preference.label
                          }

                        </span>

                        <span>

                          Value:
                          {" "}
                          {
                            current?.value
                          }

                          {" | "}

                          Weight:
                          {" "}
                          {
                            current?.weight
                          }

                        </span>

                      </div>

                      {/* Value */}

                      <input
                        type="range"

                        min="1"

                        max="10"

                        className="w-full"

                        value={
                          current?.value
                        }

                        onChange={(
                          e
                        ) =>
                          setValue(
                            `lifestylePreferences.${preference.key}.value`,
                            Number(
                              e.target
                                .value
                            )
                          )
                        }
                      />

                      {/* Weight */}

                      <select
                        className="mt-3 border p-2 rounded"

                        value={
                          current?.weight
                        }

                        onChange={(
                          e
                        ) =>
                          setValue(
                            `lifestylePreferences.${preference.key}.weight`,
                            Number(
                              e.target
                                .value
                            )
                          )
                        }
                      >

                        <option value={1}>
                          1 -
                          Low
                        </option>

                        <option value={2}>
                          2
                        </option>

                        <option value={3}>
                          3
                        </option>

                        <option value={4}>
                          4
                        </option>

                        <option value={5}>
                          5 -
                          Very Important
                        </option>

                      </select>

                    </div>
                  );
                }
              )}

            </div>

          </div>

          {serverError && (
            <p className="text-red-500">
              {serverError}
            </p>
          )}

          <button
            type="submit"

            disabled={
              isSubmitting
            }

            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {isSubmitting
              ? "Saving..."
              : "Save Profile"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default ProfileSetup;