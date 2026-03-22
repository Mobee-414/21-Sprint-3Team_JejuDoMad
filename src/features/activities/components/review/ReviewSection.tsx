import ReviewHeader from "./ReviewHeader";
import ReviewList from "./ReviewList";
import ReviewPagination from "./ReviewPagination";

export default function ReviewSection() {
  return (
    <div className="mb-40">
      <section className="mt-10">
        <ReviewHeader />

        <div className="mt-6">
          <ReviewList />
        </div>

        <div className="mt-6">
          <ReviewPagination />
        </div>
      </section>
    </div>
  );
}
