"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheManager = void 0;
const Cache = require("cache");
exports.CacheManager = {
    '1HourCache': new Cache(1000 * 60 * 60),
};
//# sourceMappingURL=cache-manager.utils.js.map