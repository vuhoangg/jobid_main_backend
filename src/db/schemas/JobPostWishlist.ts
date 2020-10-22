const mongoose = require("mongoose");

const jobPostWishlistSchema = new mongoose.Schema({
    job_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPost',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const JobPostWishlist = mongoose.model('JobPostWishlist', jobPostWishlistSchema);
export default JobPostWishlist;
