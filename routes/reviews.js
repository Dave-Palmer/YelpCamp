const express = require("express");
const router = express.Router({ mergeParams: true }); //needed if params of seperate from router
const { validateReview } = require("../middleware/validation");
const isLoggedIn = require("../middleware/isLoggedIn");
const isReviewAuthor = require("../middleware/isReviewAuthor");
const catchAsync = require("../utils/catchAsync");
const reviews = require("../controllers/reviews");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

//this is the better way
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;

//One way to delete review from the campground reviews array and from the reviews collection
// router.delete(
//   "/campgrounds/:id/reviews/:reviewId",
//   catchAsync(async (req, res) => {
//     const campground = await Campground.findById(req.params.id).populate(
//       "reviews"
//     );
//     await Review.findByIdAndDelete(req.params.reviewId);
//     let reviewIndex = campground.reviews.findIndex(
//       (review) => review._id == req.params.reviewId
//     );
//     campground.reviews.splice(reviewIndex, 1);
//     await campground.save();
//     res.redirect(`/campgrounds/${campground._id}`);
//   })
// );
