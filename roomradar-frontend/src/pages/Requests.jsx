import {
  useEffect,
  useState,
} from "react";

import {
  getIncomingRequests,
} from "../services/connection.service";

import RequestCard
  from "../components/connections/RequestCard";

const Requests = () => {

  const [requests,
    setRequests] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState("");

  const loadRequests =
    async () => {

      try {

        const response =
          await getIncomingRequests();

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

  useEffect(() => {

    loadRequests();

  }, []);

  if (loading) {
    return (
      <div>
        Loading requests...
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

          Incoming Requests

        </h1>

      </div>

      {requests.length ===
      0 ? (

        <div className="bg-white rounded-xl p-8 text-center">

          No pending requests

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {requests.map(
            (
              request
            ) => (
              <RequestCard
                key={request.connectionId}
                request={
                  request
                }
                onAction={
                  loadRequests
                }
              />
            )
          )}

        </div>

      )}

    </div>
  );
};

export default Requests;