import StarRating from "./StarRating";

// Sub-component: circular avatar with initials fallback
function Avatar({ name, imageUrl }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={`${name} avatar`}
        className="w-11 h-11 rounded-full object-cover shrink-0 border border-gray-200"
      />
    );
  }

  return (
    <div
      className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center
                 bg-violet-100 text-violet-700 text-sm font-semibold border border-violet-200"
      aria-label={`${name} avatar`}
    >
      {initials}
    </div>
  );
}

// Sub-component: reviewer name + timestamp
function ReviewerMeta({ name, date }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-900">{name}</p>
      <p className="text-xs text-gray-400 mt-0.5">{date}</p>
    </div>
  );
}

// Sub-component: the review text body
function ReviewBody({ text }) {
  return (
    <p className="text-sm text-gray-500 leading-relaxed mt-3">{text}</p>
  );
}

// Main sub-component: one full review card
export function ReviewCard({ review }) {
  console.log("review",review);
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={review.name} imageUrl={review.imageUrl} />
          <ReviewerMeta name={review.name} date={review.createdAt?.split("T")[0]} />
        </div>
        <StarRating averageRating={review.rating} size="sm" />
      </div>
      <ReviewBody text={review.body} />
    </div>
  );
}

// Sub-component: the full reviews list with a result count header
export function ReviewList({ reviews }) {
  return (
    <div>
      <div className="h-px bg-gray-100 mb-4" />
      <p className="text-xs text-gray-400 mb-3">Result Found: {reviews.length}</p>
      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}
