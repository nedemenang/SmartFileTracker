"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var paginate = function paginate(count, limit, offset) {
  var page = Math.floor(offset / limit) + 1;
  var pageCount = Math.ceil(count / limit);
  var pageSize = count - offset > limit ? limit : count - offset;
  return {
    page: page,
    pageCount: pageCount,
    pageSize: pageSize,
    count: count
  };
};
exports.default = paginate;