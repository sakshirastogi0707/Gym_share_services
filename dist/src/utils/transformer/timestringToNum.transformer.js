"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeStringNumTransformer = void 0;
class TimeStringNumTransformer {
    to(value) {
        return parseInt(value.split(':').join(''));
    }
    from(value) {
        const time = value.toString().split('');
        time.splice(2, 0, ':').join('');
        return time.splice(2, 0, ':').join('');
    }
}
exports.TimeStringNumTransformer = TimeStringNumTransformer;
//# sourceMappingURL=timestringToNum.transformer.js.map