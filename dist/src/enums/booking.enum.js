"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validMonths = exports.BookingFor = exports.BookingStatus = void 0;
var BookingStatus;
(function (BookingStatus) {
    BookingStatus[BookingStatus["Request"] = 100] = "Request";
    BookingStatus[BookingStatus["Paid"] = 200] = "Paid";
    BookingStatus[BookingStatus["Confirmed"] = 300] = "Confirmed";
})(BookingStatus = exports.BookingStatus || (exports.BookingStatus = {}));
var BookingFor;
(function (BookingFor) {
    BookingFor[BookingFor["SingleSession"] = 100] = "SingleSession";
    BookingFor[BookingFor["Monthly"] = 200] = "Monthly";
    BookingFor[BookingFor["FullPackage"] = 300] = "FullPackage";
})(BookingFor = exports.BookingFor || (exports.BookingFor = {}));
exports.validMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
//# sourceMappingURL=booking.enum.js.map