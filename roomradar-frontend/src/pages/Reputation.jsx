import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getUserReputation,
} from "../services/review.service";

import ReputationCard
  from "../components/reviews/ReputationCard";

const Reputation = () => {

  const { userId } =
    useParams();

  const [reputation,
    setReputation] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    const loadData =
      async () => {

        try {

          const response =
            await getUserReputation(
              userId
            );

          setReputation(
            response.reputation
          );

        } catch (error) {

          console.error(
            error
          );

        } finally {

          setLoading(false);
        }
      };

    loadData();

  }, [userId]);

  if (loading) {

    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <ReputationCard
      reputation={
        reputation
      }
    />
  );
};

export default Reputation;