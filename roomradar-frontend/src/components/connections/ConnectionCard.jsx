import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  usePresence,
} from "../../context/PresenceContext";

const ConnectionCard = ({
  connection,
}) => {

  const navigate =
    useNavigate();

  const {
    isOnline,
  } = usePresence();

  const online =
    isOnline(
      connection.user.id
    );

  const openChat =
    () => {

      navigate(
        `/chat?connection=${connection.connectionId}`
      );
    };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-start">

        {/* Left Side */}

        <div>

          <h2 className="text-xl font-bold">

            {connection.user.name}

          </h2>

          {/* Online Status */}

          <div className="flex items-center gap-2 mt-2">

            <span
              className={`w-2.5 h-2.5 rounded-full ${
                online
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            />

            <span
              className={`text-sm font-medium ${
                online
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >

              {online
                ? "Online"
                : "Offline"}

            </span>

          </div>

          <p className="text-gray-500 mt-2">

            {connection.user.city}

          </p>

        </div>

        {/* Right Side */}

        <div className="text-right">

          <div className="text-blue-600 text-xl font-bold">

            {connection.compatibilityScore}%

          </div>

          <div className="text-sm text-gray-500">

            Trust{" "}
            <span className="font-medium">

              {connection.user.trustScore}

            </span>

          </div>

        </div>

      </div>

      {/* Connected Date */}

      <div className="mt-4 text-sm text-gray-500">

        Connected{" "}

        {new Date(
          connection.connectedAt
        ).toLocaleDateString()}

      </div>

      {/* Actions */}

      <div className="mt-6 space-y-3">

        <button
          onClick={openChat}
          className="
            w-full
            bg-blue-600
            text-white
            py-3
            rounded-lg
            hover:bg-blue-700
            transition-colors
          "
        >

          Open Chat

        </button>

        <Link
          to={`/reputation/${connection.user.id}`}
          className="
            block
            w-full
            text-center
            border
            border-gray-300
            py-3
            rounded-lg
            hover:bg-gray-50
            transition-colors
          "
        >

          View Reputation

        </Link>

        <Link
          to={`/reviews/${connection.user.id}/${connection.connectionId}`}
          className="
            block
            w-full
            text-center
            border
            border-gray-300
            py-3
            rounded-lg
            hover:bg-gray-50
            transition-colors
          "
        >

          Leave Review

        </Link>

      </div>

    </div>
  );
};

export default ConnectionCard;