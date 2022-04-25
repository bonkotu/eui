"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiPaginationButton = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _button = require("../button");

var _i18n = require("../i18n");

var _react2 = require("@emotion/react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var EuiPaginationButton = function EuiPaginationButton(_ref) {
  var className = _ref.className,
      isActive = _ref.isActive,
      isPlaceholder = _ref.isPlaceholder,
      pageIndex = _ref.pageIndex,
      totalPages = _ref.totalPages,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["className", "isActive", "isPlaceholder", "pageIndex", "totalPages"]);
  var classes = (0, _classnames.default)('euiPaginationButton', className, {
    'euiPaginationButton-isActive': isActive,
    'euiPaginationButton-isPlaceholder': isPlaceholder
  });

  var props = _objectSpread(_objectSpread(_objectSpread({
    className: classes,
    size: 's',
    color: 'text',
    'data-test-subj': "pagination-button-".concat(pageIndex),
    isDisabled: isPlaceholder || isActive
  }, isActive && {
    'aria-current': true
  }), rest['aria-controls'] && {
    href: "#".concat(rest['aria-controls'])
  }), rest);

  var pageNumber = pageIndex + 1;
  return (0, _react2.jsx)(_i18n.EuiI18n, {
    token: "euiPaginationButton.longPageString",
    default: "Page {page} of {totalPages}",
    values: {
      page: pageNumber,
      totalPages: totalPages
    }
  }, function (longPageString) {
    return (0, _react2.jsx)(_i18n.EuiI18n, {
      token: "euiPaginationButton.shortPageString",
      default: "Page {page}",
      values: {
        page: pageNumber
      }
    }, function (shortPageString) {
      return (0, _react2.jsx)(_button.EuiButtonEmpty, (0, _extends2.default)({
        "aria-label": totalPages ? longPageString : shortPageString
      }, props), pageNumber);
    });
  });
};

exports.EuiPaginationButton = EuiPaginationButton;