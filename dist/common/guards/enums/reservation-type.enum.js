"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantsType = exports.ReservationStatus = void 0;
var ReservationStatus;
(function (ReservationStatus) {
    ReservationStatus["PENDING"] = "PENDING";
    ReservationStatus["CONFIRMED"] = "CONFIRMED";
    ReservationStatus["CANCELLED"] = "CANCELLED";
    ReservationStatus["REJECTED"] = "REJECTED";
    ReservationStatus["CLOSED"] = "CLOSED";
})(ReservationStatus || (exports.ReservationStatus = ReservationStatus = {}));
var ParticipantsType;
(function (ParticipantsType) {
    ParticipantsType["RESERVER"] = "RESERVER";
    ParticipantsType["PARTICIPANT"] = "PARTICIPANT";
    ParticipantsType["CC_RECEIPIENT"] = "CC_RECEIPIENT";
})(ParticipantsType || (exports.ParticipantsType = ParticipantsType = {}));
//# sourceMappingURL=reservation-type.enum.js.map