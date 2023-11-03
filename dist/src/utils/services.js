"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleReviews = void 0;
const axios_1 = require("axios");
const getGoogleReviews = async (placeId) => {
    const reviews = await axios_1.default.get(`${process.env.GOOGLE_PLACE_URL}?place_id=${placeId}&key=${process.env.GOOGLE_API_KEY}`);
    return {
        rating: reviews.data.result.rating,
        reviews: reviews.data.result.reviews,
    };
};
exports.getGoogleReviews = getGoogleReviews;
//# sourceMappingURL=services.js.map