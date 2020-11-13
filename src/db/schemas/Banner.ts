const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Banner = mongoose.model('Banner', bannerSchema);
export default Banner;
