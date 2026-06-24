import {
  useParams,
} from "react-router-dom";

import ReviewForm
  from "../components/reviews/ReviewForm";

const LeaveReview = () => {

  const {
    revieweeId,
    connectionId,
  } = useParams();

  return (
    <ReviewForm
      revieweeId={
        revieweeId
      }
      connectionId={
        connectionId
      }
    />
  );
};

export default LeaveReview;