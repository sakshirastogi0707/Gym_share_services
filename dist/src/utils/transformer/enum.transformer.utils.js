"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumTransformer = void 0;
class EnumTransformer {
    constructor(genericEnum) {
        this.genEnum = genericEnum;
    }
    to(value) {
        return this.genEnum[value];
    }
    from(value) {
        return this.genEnum[value];
    }
}
exports.EnumTransformer = EnumTransformer;
//# sourceMappingURL=enum.transformer.utils.js.map