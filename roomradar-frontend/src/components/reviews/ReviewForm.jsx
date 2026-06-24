import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  createReview,
} from "../../services/review.service";

const ReviewForm = ({
  revieweeId,
  connectionId,
}) => {

  const navigate =
    useNavigate();

  const [form,
    setForm] =
    useState({
      cleanliness: 5,
      financialReliability: 5,
      respectsBoundaries: 5,
      comment: "",
    });

  const [submitting,
    setSubmitting] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | Submit Review
  |--------------------------------------------------------------------------
  */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setSubmitting(true);

        await createReview({
          revieweeId,
          connectionId,

          ratings: {
            cleanliness:
              form.cleanliness,

            financialReliability:
              form.financialReliability,

            respectsBoundaries:
              form.respectsBoundaries,
          },

          comment:
            form.comment,
        });

        navigate(
          `/reputation/${revieweeId}`
        );

      } catch (error) {

        console.error(
          error
        );

        alert(
          error.response?.data
            ?.message ||
          "Failed to submit review"
        );

      } finally {

        setSubmitting(false);
      }
    };

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="
        bg-white
        rounded-xl
        shadow
        p-6
        space-y-4
      "
    >

      <h2 className="text-2xl font-bold">

        Leave Review

      </h2>

      {/* Cleanliness */}

      <div>

        <label className="block mb-2 font-medium">

          Cleanliness

        </label>

        <select
          value={
            form.cleanliness
          }
          onChange={(e) =>
            setForm({
              ...form,
              cleanliness:
                Number(
                  e.target.value
                ),
            })
          }
          className="
            w-full
            border
            p-2
            rounded
          "
        >

          {[1, 2, 3, 4, 5].map(
            (rating) => (
              <option
                key={rating}
                value={rating}
              >
                {rating}
              </option>
            )
          )}

        </select>

      </div>

      {/* Financial Reliability */}

      <div>

        <label className="block mb-2 font-medium">

          Financial Reliability

        </label>

        <select
          value={
            form.financialReliability
          }
          onChange={(e) =>
            setForm({
              ...form,
              financialReliability:
                Number(
                  e.target.value
                ),
            })
          }
          className="
            w-full
            border
            p-2
            rounded
          "
        >

          {[1, 2, 3, 4, 5].map(
            (rating) => (
              <option
                key={rating}
                value={rating}
              >
                {rating}
              </option>
            )
          )}

        </select>

      </div>

      {/* Respects Boundaries */}

      <div>

        <label className="block mb-2 font-medium">

          Respects Boundaries

        </label>

        <select
          value={
            form.respectsBoundaries
          }
          onChange={(e) =>
            setForm({
              ...form,
              respectsBoundaries:
                Number(
                  e.target.value
                ),
            })
          }
          className="
            w-full
            border
            p-2
            rounded
          "
        >

          {[1, 2, 3, 4, 5].map(
            (rating) => (
              <option
                key={rating}
                value={rating}
              >
                {rating}
              </option>
            )
          )}

        </select>

      </div>

      {/* Comment */}

      <div>

        <label className="block mb-2 font-medium">

          Comment

        </label>

        <textarea
          rows="4"
          value={
            form.comment
          }
          onChange={(e) =>
            setForm({
              ...form,
              comment:
                e.target.value,
            })
          }
          placeholder="Share your experience..."
          className="
            w-full
            border
            p-3
            rounded
          "
        />

      </div>

      {/* Submit */}

      <button
        type="submit"
        disabled={
          submitting
        }
        className="
          w-full
          bg-blue-600
          text-white
          py-3
          rounded-lg
          hover:bg-blue-700
          disabled:opacity-50
        "
      >

        {submitting
          ? "Submitting..."
          : "Submit Review"}

      </button>

    </form>
  );
};

export default ReviewForm;