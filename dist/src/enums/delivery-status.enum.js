"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeliveryStatusByValue = exports.DeliveryStatus = void 0;
var DeliveryStatus;
(function (DeliveryStatus) {
    DeliveryStatus[DeliveryStatus["Delivered"] = 100] = "Delivered";
    DeliveryStatus[DeliveryStatus["Pending"] = 200] = "Pending";
})(DeliveryStatus = exports.DeliveryStatus || (exports.DeliveryStatus = {}));
const getDeliveryStatusByValue = (value) => {
    return Object.keys(DeliveryStatus)[Object.values(DeliveryStatus).indexOf(value)];
};
exports.getDeliveryStatusByValue = getDeliveryStatusByValue;
//# sourceMappingURL=delivery-status.enum.js.map