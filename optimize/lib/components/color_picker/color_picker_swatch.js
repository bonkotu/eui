"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiColorPickerSwatch = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

var _i18n = require("../i18n");

var _react2 = require("@emotion/react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var EuiColorPickerSwatch = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var className = _ref.className,
      color = _ref.color,
      style = _ref.style,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["className", "color", "style"]);
  var classes = (0, _classnames.default)('euiColorPickerSwatch', className);
  var chromaColor = (0, _react.useMemo)(function () {
    return (0, _utils.getChromaColor)(color, true);
  }, [color]);
  var background = (0, _react.useMemo)(function () {
    return chromaColor ? chromaColor.css() : 'transparent';
  }, [chromaColor]);
  var ariaLabel = (0, _i18n.useEuiI18n)('euiColorPickerSwatch.ariaLabel', 'Select {color} as the color', {
    color: color
  });
  return (0, _react2.jsx)("button", (0, _extends2.default)({
    type: "button",
    className: classes,
    "aria-label": ariaLabel,
    ref: ref,
    style: _objectSpread({
      background: background
    }, style)
  }, rest));
});
exports.EuiColorPickerSwatch = EuiColorPickerSwatch;
EuiColorPickerSwatch.displayName = 'EuiColorPickerSwatch';