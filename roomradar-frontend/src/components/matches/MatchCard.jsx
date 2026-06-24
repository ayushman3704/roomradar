import { useState } from "react";

import {
  sendConnectionRequest,
} from "../../services/connection.service";

const MatchCard = ({
  match,
}) => {

  const [sending,
    setSending] =
    useState(false);

  const [sent,
    setSent] =
    useState(false);

  const handleConnect =
    async () => {

      try {

        setSending(true);

        await sendConnectionRequest(
          match.userId
        );

        setSent(true);

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data
            ?.message ||
          "Failed to send connection request"
        );

      } finally {

        setSending(false);
      }
    };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-bold">
            {match.name}
          </h2>

          <p className="text-gray-500">
            {match.city}
          </p>

        </div>

        <div className="text-right">

          <div className="text-3xl font-bold text-blue-600">

            {match.compatibilityScore}%

          </div>

          <div className="text-sm text-gray-500">

            Trust Score:
            {" "}
            {match.trustScore}

          </div>

        </div>

      </div>

      {/* Strengths */}

      <div className="mt-4">

        <h3 className="font-semibold mb-2">
          Strengths
        </h3>

        <div className="flex flex-wrap gap-2">

          {match.strengths.map(
            (strength) => (
              <span
                key={strength}
                className="
                  bg-green-100
                  text-green-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                "
              >
                {strength}
              </span>
            )
          )}

        </div>

      </div>

      {/* Conflicts */}

      <div className="mt-4">

        <h3 className="font-semibold mb-2">
          Conflicts
        </h3>

        <div className="flex flex-wrap gap-2">

          {match.conflicts.length >
          0 ? (
            match.conflicts.map(
              (
                conflict
              ) => (
                <span
                  key={conflict}
                  className="
                    bg-red-100
                    text-red-700
                    px-3
                    py-1
                    rounded-full
                    text-sm
                  "
                >
                  {conflict}
                </span>
              )
            )
          ) : (
            <span className="text-gray-500 text-sm">
              No major conflicts
            </span>
          )}

        </div>

      </div>

      {/* Connect Button */}

      <button
        onClick={
          handleConnect
        }
        disabled={
          sending || sent
        }
        className="
          mt-6
          w-full
          py-3
          rounded-lg
          text-white
          bg-blue-600
          hover:bg-blue-700
          disabled:bg-gray-400
          disabled:cursor-not-allowed
        "
      >

        {sending
          ? "Sending..."
          : sent
          ? "Request Sent"
          : "Connect"}

      </button>

    </div>
  );
};

export default MatchCard;