import {
  useEffect,
  useState,
} from "react";

import {
  getSentRequests,
} from "../services/connection.service";

import SentRequestCard
  from "../components/connections/SentRequestCard";

const SentRequests = () => {

  const [requests,
    setRequests] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState("");

  useEffect(() => {

    const loadRequests =
      async () => {

        try {

          const response =
            await getSentRequests();

          setRequests(
            response.requests
          );

        } catch (error) {

          setError(
            error.response?.data
              ?.message ||
            "Failed to load requests"
          );

        } finally {

          setLoading(false);
        }
      };

    loadRequests();

  }, []);

  if (loading) {
    return (
      <div>
        Loading...
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

          Sent Requests

        </h1>

      </div>

      {requests.length ===
      0 ? (

        <div className="bg-white rounded-xl p-8 text-center">

          No sent requests

        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {requests.map(
            (
              request
            ) => (
              <SentRequestCard
                key={
                  request.connectionId
                }
                request={
                  request
                }
              />
            )
          )}

        </div>

      )}

    </div>
  );
};

export default SentRequests;