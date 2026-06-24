const SentRequestCard = ({
  request,
}) => {

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-bold">

            {
              request.recipient.name
            }

          </h2>

          <p className="text-gray-500">

            {
              request.recipient.city
            }

          </p>

        </div>

        <div className="text-right">

          <div className="text-blue-600 font-bold text-xl">

            {
              request.compatibilityScore
            }
            %

          </div>

          <div className="text-sm text-gray-500">

            Trust:
            {" "}
            {
              request.recipient
                .trustScore
            }

          </div>

        </div>

      </div>

      <div className="mt-4 text-sm text-gray-500">

        Sent:
        {" "}

        {new Date(
          request.createdAt
        ).toLocaleDateString()}

      </div>

      <div className="mt-4">

        <span
          className="
            px-3
            py-1
            rounded-full
            text-sm
            bg-yellow-100
            text-yellow-700
          "
        >

          {request.status}

        </span>

      </div>

    </div>
  );
};

export default SentRequestCard;