"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiExpression = exports.COLORS = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _common = require("../common");

var _icon = require("../icon");

var _react2 = require("@emotion/react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var colorToClassNameMap = {
  subdued: 'euiExpression--subdued',
  primary: 'euiExpression--primary',
  success: 'euiExpression--success',
  accent: 'euiExpression--accent',
  warning: 'euiExpression--warning',
  danger: 'euiExpression--danger'
};
var textWrapToClassNameMap = {
  'break-word': null,
  truncate: 'euiExpression--truncate'
};
var COLORS = (0, _common.keysOf)(colorToClassNameMap);
exports.COLORS = COLORS;
var displayToClassNameMap = {
  inline: null,
  columns: 'euiExpression--columns'
};

var EuiExpression = function EuiExpression(_ref) {
  var className = _ref.className,
      description = _ref.description,
      descriptionProps = _ref.descriptionProps,
      value = _ref.value,
      valueProps = _ref.valueProps,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'success' : _ref$color,
      _ref$uppercase = _ref.uppercase,
      uppercase = _ref$uppercase === void 0 ? true : _ref$uppercase,
      _ref$isActive = _ref.isActive,
      isActive = _ref$isActive === void 0 ? false : _ref$isActive,
      _ref$display = _ref.display,
      display = _ref$display === void 0 ? 'inline' : _ref$display,
      _ref$descriptionWidth = _ref.descriptionWidth,
      descriptionWidth = _ref$descriptionWidth === void 0 ? '20%' : _ref$descriptionWidth,
      onClick = _ref.onClick,
      _ref$isInvalid = _ref.isInvalid,
      isInvalid = _ref$isInvalid === void 0 ? false : _ref$isInvalid,
      _ref$textWrap = _ref.textWrap,
      textWrap = _ref$textWrap === void 0 ? 'break-word' : _ref$textWrap,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["className", "description", "descriptionProps", "value", "valueProps", "color", "uppercase", "isActive", "display", "descriptionWidth", "onClick", "isInvalid", "textWrap"]);
  var calculatedColor = isInvalid ? 'danger' : color;
  var classes = (0, _classnames.default)('euiExpression', className, {
    'euiExpression-isActive': isActive,
    'euiExpression-isClickable': onClick,
    'euiExpression-isUppercase': uppercase
  }, displayToClassNameMap[display], colorToClassNameMap[calculatedColor], textWrapToClassNameMap[textWrap]);
  var Component = onClick ? 'button' : 'span';
  var descriptionStyle = descriptionProps && descriptionProps.style;
  var customWidth = display === 'columns' && descriptionWidth ? _objectSpread({
    flexBasis: descriptionWidth
  }, descriptionStyle) : undefined;
  var invalidIcon = isInvalid ? (0, _react2.jsx)(_icon.EuiIcon, {
    className: "euiExpression__icon",
    type: "alert",
    color: calculatedColor
  }) : undefined;
  return (0, _react2.jsx)(Component, (0, _extends2.default)({
    className: classes,
    onClick: onClick
  }, rest), (0, _react2.jsx)("span", (0, _extends2.default)({
    className: "euiExpression__description",
    style: customWidth
  }, descriptionProps), description), ' ', value && (0, _react2.jsx)("span", (0, _extends2.default)({
    className: "euiExpression__value"
  }, valueProps), value), invalidIcon);
};

exports.EuiExpression = EuiExpression;