import {
  acceptRequest,
  rejectRequest,
} from "../../services/connection.service";

const RequestCard = ({
  request,
  onAction,
}) => {

  const handleAccept =
    async () => {

      try {

        await acceptRequest(
          request.connectionId
        );

        onAction();

      } catch (error) {

        console.error(error);
      }
    };

  const handleReject =
    async () => {

      try {

        await rejectRequest(
          request.connectionId
        );

        onAction();

      } catch (error) {

        console.error(error);
      }
    };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between">

        <div>

          <h2 className="text-xl font-bold">

            {request.requester.name}

          </h2>

          <p className="text-gray-500">

            {request.requester.city}

          </p>

        </div>

        <div className="text-right">

          <div className="text-blue-600 font-bold text-xl">

            {request.compatibilityScore}%

          </div>

          <div className="text-sm text-gray-500">

            Trust:
            {" "}
            {request.requester.trustScore}

          </div>

        </div>

      </div>

      <div className="flex gap-3 mt-6">

        <button
          onClick={
            handleAccept
          }
          className="
            flex-1
            bg-green-600
            text-white
            py-2
            rounded-lg
            hover:bg-green-700
          "
        >
          Accept
        </button>

        <button
          onClick={
            handleReject
          }
          className="
            flex-1
            bg-red-600
            text-white
            py-2
            rounded-lg
            hover:bg-red-700
          "
        >
          Reject
        </button>

      </div>

    </div>
  );
};

export default RequestCard;