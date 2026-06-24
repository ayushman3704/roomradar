import {
  useEffect,
  useState,
} from "react";

import {
  getMatches,
} from "../services/match.service";

import MatchCard
  from "../components/matches/MatchCard";

const Matches = () => {

  const [matches,
    setMatches] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState("");

  useEffect(() => {

    const loadMatches =
      async () => {

        try {

          const response =
            await getMatches();

          setMatches(
            response.matches
          );

        } catch (error) {

          setError(
            error.response?.data
              ?.message ||
              "Failed to load matches"
          );

        } finally {

          setLoading(
            false
          );
        }
      };

    loadMatches();

  }, []);

  if (loading) {
    return (
      <div>
        Loading matches...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">

          Your Matches

        </h1>

        <p className="text-gray-500 mt-2">

          Discover compatible roommates

        </p>

      </div>

      {matches.length ===
      0 ? (
        <div className="bg-white rounded-xl p-8 text-center">

          No matches found.

        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {matches.map(
            (match) => (
              <MatchCard
                key={
                  match.userId
                }
                match={match}
              />
            )
          )}

        </div>
      )}

    </div>
  );
};

export default Matches;