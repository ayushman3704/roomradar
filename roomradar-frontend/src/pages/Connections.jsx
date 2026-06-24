import {
  useEffect,
  useState,
} from "react";

import {
  getConnections,
} from "../services/connection.service";

import ConnectionCard
  from "../components/connections/ConnectionCard";

const Connections = () => {

  const [connections,
    setConnections] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState("");

  useEffect(() => {

    const loadConnections =
      async () => {

        try {

          const response =
            await getConnections();

          setConnections(
            response.connections
          );

        } catch (error) {

          setError(
            error.response?.data
              ?.message ||
            "Failed to load connections"
          );

        } finally {

          setLoading(false);
        }
      };

    loadConnections();

  }, []);

  if (loading) {
    return (
      <div>
        Loading connections...
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

          Your Connections

        </h1>

        <p className="text-gray-500 mt-2">

          People you've matched with

        </p>

      </div>

      {connections.length ===
      0 ? (

        <div className="bg-white rounded-xl p-8 text-center">

          No connections yet

        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {connections.map(
            (
              connection
            ) => (
              <ConnectionCard
                key={
                  connection.connectionId
                }
                connection={
                  connection
                }
              />
            )
          )}

        </div>

      )}

    </div>
  );
};

export default Connections;