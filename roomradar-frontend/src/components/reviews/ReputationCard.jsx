const ReputationCard = ({
  reputation,
}) => {

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">

        Reputation

      </h2>

      <div className="mb-6">

        <div className="text-4xl font-bold text-blue-600">

          {reputation.trustScore}

        </div>

        <div className="text-gray-500">

          Trust Score

        </div>

      </div>

      <div className="space-y-4">

        <div>

          <div className="font-medium">
            Total Reviews
          </div>

          <div>
            {reputation.totalReviews}
          </div>

        </div>

        <div>

          <div className="font-medium">
            Cleanliness
          </div>

          <div>
            {
              reputation
                .averageRatings
                .cleanliness
            }
            /5
          </div>

        </div>

        <div>

          <div className="font-medium">
            Financial Reliability
          </div>

          <div>
            {
              reputation
                .averageRatings
                .financialReliability
            }
            /5
          </div>

        </div>

        <div>

          <div className="font-medium">
            Respects Boundaries
          </div>

          <div>
            {
              reputation
                .averageRatings
                .respectsBoundaries
            }
            /5
          </div>

        </div>

      </div>

    </div>
  );
};

export default ReputationCard;