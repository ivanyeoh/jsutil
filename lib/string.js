"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slugify = void 0;

var _slugify = _interopRequireDefault(require("@sindresorhus/slugify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const slugify = string => (0, _slugify.default)(string);

exports.slugify = slugify;