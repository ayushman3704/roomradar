import { z } from "zod";

const preferenceSchema =
  z.object({
    value: z.number().min(1).max(10),

    weight: z.number().min(1).max(5),
  });

export const profileSchema =
  z.object({
    city: z.string().min(2),

    state: z.string().min(2),

    gender: z.enum([
      "male",
      "female",
      "other",
    ]),

    budgetMin:
      z.number().min(1000),

    budgetMax:
      z.number().min(1000),

    lifestylePreferences:
      z.object({
        sleepSchedule:
          preferenceSchema,

        cleanliness:
          preferenceSchema,

        studyStyle:
          preferenceSchema,

        noiseTolerance:
          preferenceSchema,

        guestFrequency:
          preferenceSchema,

        foodPreference:
          preferenceSchema,

        gamingFrequency:
          preferenceSchema,

        smokingPreference:
          preferenceSchema,

        drinkingPreference:
          preferenceSchema,

        acPreference:
          preferenceSchema,
      }),
  })
  .refine(
    (data) =>
      data.budgetMax >=
      data.budgetMin,
    {
      path: ["budgetMax"],
      message:
        "Budget max must be greater than budget min",
    }
  );