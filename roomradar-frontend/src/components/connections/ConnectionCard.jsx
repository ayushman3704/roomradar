import { useNavigate }
  from "react-router-dom";

import {
  Link,
} from "react-router-dom";

const ConnectionCard = ({
  connection,
}) => {

  const navigate =
    useNavigate();

  const openChat =
    () => {

      navigate(
        `/chat?connection=${connection.connectionId}`
      );
    };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-bold">

            {connection.user.name}

          </h2>

          <p className="text-gray-500">

            {connection.user.city}

          </p>

        </div>

        <div className="text-right">

          <div className="text-blue-600 text-xl font-bold">

            {
              connection.compatibilityScore
            }
            %

          </div>

          <div className="text-sm text-gray-500">

            Trust:
            {" "}
            {
              connection.user
                .trustScore
            }

          </div>

        </div>

      </div>

      <div className="mt-4 text-sm text-gray-500">

        Connected:
        {" "}

        {new Date(
          connection.connectedAt
        ).toLocaleDateString()}

      </div>

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
    "
  >
    View Reputation
  </Link>

  <Link
  to={`/reviews/${connection.user.id}/${connection.connectionId}`}
  className="
    block
    text-center
    border
    py-3
    rounded-lg
    hover:bg-gray-50
  "
>
  Leave Review
</Link>

</div>

    </div>
  );
};

export default ConnectionCard;