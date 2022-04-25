"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiStat = exports.ALIGNMENTS = exports.isColorClass = exports.COLORS = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _common = require("../common");

var _classnames = _interopRequireDefault(require("classnames"));

var _text = require("../text");

var _title = require("../title/title");

var _accessibility = require("../accessibility");

var _i18n = require("../i18n");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var colorToClassNameMap = {
  default: null,
  subdued: 'euiStat__title--subdued',
  primary: 'euiStat__title--primary',
  success: 'euiStat__title--success',
  danger: 'euiStat__title--danger',
  accent: 'euiStat__title--accent'
};
var COLORS = (0, _common.keysOf)(colorToClassNameMap);
exports.COLORS = COLORS;
var textAlignToClassNameMap = {
  left: 'euiStat--leftAligned',
  center: 'euiStat--centerAligned',
  right: 'euiStat--rightAligned'
};

var isColorClass = function isColorClass(input) {
  return colorToClassNameMap.hasOwnProperty(input);
};

exports.isColorClass = isColorClass;
var ALIGNMENTS = (0, _common.keysOf)(textAlignToClassNameMap);
exports.ALIGNMENTS = ALIGNMENTS;

var EuiStat = function EuiStat(_ref) {
  var children = _ref.children,
      className = _ref.className,
      description = _ref.description,
      _ref$isLoading = _ref.isLoading,
      isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === void 0 ? false : _ref$reverse,
      _ref$textAlign = _ref.textAlign,
      textAlign = _ref$textAlign === void 0 ? 'left' : _ref$textAlign,
      title = _ref.title,
      _ref$titleColor = _ref.titleColor,
      titleColor = _ref$titleColor === void 0 ? 'default' : _ref$titleColor,
      _ref$titleSize = _ref.titleSize,
      titleSize = _ref$titleSize === void 0 ? 'l' : _ref$titleSize,
      _ref$titleElement = _ref.titleElement,
      titleElement = _ref$titleElement === void 0 ? 'p' : _ref$titleElement,
      _ref$descriptionEleme = _ref.descriptionElement,
      descriptionElement = _ref$descriptionEleme === void 0 ? 'p' : _ref$descriptionEleme,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["children", "className", "description", "isLoading", "reverse", "textAlign", "title", "titleColor", "titleSize", "titleElement", "descriptionElement"]);
  var classes = (0, _classnames.default)('euiStat', textAlignToClassNameMap[textAlign], className);
  var titleClasses = (0, _classnames.default)('euiStat__title', isColorClass(titleColor) ? colorToClassNameMap[titleColor] : null, {
    'euiStat__title-isLoading': isLoading
  });
  var commonProps = {
    'aria-hidden': true
  };
  var descriptionDisplay = (0, _react2.jsx)(_text.EuiText, {
    size: "s",
    className: "euiStat__description"
  }, /*#__PURE__*/(0, _react.createElement)(descriptionElement, commonProps, description));
  var titlePropsWithColor = {
    'aria-hidden': true,
    style: {
      color: "".concat(titleColor)
    }
  };
  var titleChildren = isLoading ? '--' : title;
  var titleDisplay = isColorClass(titleColor) ? (0, _react2.jsx)(_title.EuiTitle, {
    size: titleSize,
    className: titleClasses
  }, /*#__PURE__*/(0, _react.createElement)(titleElement, commonProps, titleChildren)) : (0, _react2.jsx)(_title.EuiTitle, {
    size: titleSize,
    className: titleClasses
  }, /*#__PURE__*/(0, _react.createElement)(titleElement, titlePropsWithColor, titleChildren));
  var screenReader = (0, _react2.jsx)(_accessibility.EuiScreenReaderOnly, null, (0, _react2.jsx)("p", null, isLoading ? (0, _react2.jsx)(_i18n.EuiI18n, {
    token: "euiStat.loadingText",
    default: "Statistic is loading"
  }) : (0, _react2.jsx)(_react.Fragment, null, reverse ? "".concat(title, " ").concat(description) : "".concat(description, " ").concat(title))));
  var statDisplay = (0, _react2.jsx)(_react.Fragment, null, !reverse && descriptionDisplay, titleDisplay, reverse && descriptionDisplay, typeof title === 'string' && typeof description === 'string' && screenReader);
  return (0, _react2.jsx)("div", (0, _extends2.default)({
    className: classes
  }, rest), statDisplay, children);
};

exports.EuiStat = EuiStat;