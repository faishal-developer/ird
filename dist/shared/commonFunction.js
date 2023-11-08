"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcSkip = void 0;
const calcSkip = (page, limit) => {
    let newPage = Number(page || 1);
    let newLimit = Number(limit || 10);
    return {
        page: newPage,
        limit: newLimit,
        skip: (newPage - 1) * newLimit
    };
};
exports.calcSkip = calcSkip;
