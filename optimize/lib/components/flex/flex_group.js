"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFlexGroup = exports.DIRECTIONS = exports.JUSTIFY_CONTENTS = exports.ALIGN_ITEMS = exports.GUTTER_SIZES = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _common = require("../common");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var gutterSizeToClassNameMap = {
  none: null,
  xs: 'euiFlexGroup--gutterExtraSmall',
  s: 'euiFlexGroup--gutterSmall',
  m: 'euiFlexGroup--gutterMedium',
  l: 'euiFlexGroup--gutterLarge',
  xl: 'euiFlexGroup--gutterExtraLarge'
};
var GUTTER_SIZES = (0, _common.keysOf)(gutterSizeToClassNameMap);
exports.GUTTER_SIZES = GUTTER_SIZES;
var alignItemsToClassNameMap = {
  stretch: null,
  flexStart: 'euiFlexGroup--alignItemsFlexStart',
  flexEnd: 'euiFlexGroup--alignItemsFlexEnd',
  center: 'euiFlexGroup--alignItemsCenter',
  baseline: 'euiFlexGroup--alignItemsBaseline'
};
var ALIGN_ITEMS = (0, _common.keysOf)(alignItemsToClassNameMap);
exports.ALIGN_ITEMS = ALIGN_ITEMS;
var justifyContentToClassNameMap = {
  flexStart: null,
  flexEnd: 'euiFlexGroup--justifyContentFlexEnd',
  center: 'euiFlexGroup--justifyContentCenter',
  spaceBetween: 'euiFlexGroup--justifyContentSpaceBetween',
  spaceAround: 'euiFlexGroup--justifyContentSpaceAround',
  spaceEvenly: 'euiFlexGroup--justifyContentSpaceEvenly'
};
var JUSTIFY_CONTENTS = (0, _common.keysOf)(justifyContentToClassNameMap);
exports.JUSTIFY_CONTENTS = JUSTIFY_CONTENTS;
var directionToClassNameMap = {
  row: 'euiFlexGroup--directionRow',
  rowReverse: 'euiFlexGroup--directionRowReverse',
  column: 'euiFlexGroup--directionColumn',
  columnReverse: 'euiFlexGroup--directionColumnReverse'
};
var DIRECTIONS = (0, _common.keysOf)(directionToClassNameMap);
exports.DIRECTIONS = DIRECTIONS;

var isValidElement = function isValidElement(component) {
  return ['div', 'span'].includes(component);
};

var EuiFlexGroup = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$gutterSize = _ref.gutterSize,
      gutterSize = _ref$gutterSize === void 0 ? 'l' : _ref$gutterSize,
      _ref$alignItems = _ref.alignItems,
      alignItems = _ref$alignItems === void 0 ? 'stretch' : _ref$alignItems,
      _ref$responsive = _ref.responsive,
      responsive = _ref$responsive === void 0 ? true : _ref$responsive,
      _ref$justifyContent = _ref.justifyContent,
      justifyContent = _ref$justifyContent === void 0 ? 'flexStart' : _ref$justifyContent,
      _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? 'row' : _ref$direction,
      _ref$wrap = _ref.wrap,
      wrap = _ref$wrap === void 0 ? false : _ref$wrap,
      _ref$component = _ref.component,
      component = _ref$component === void 0 ? 'div' : _ref$component,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["children", "className", "gutterSize", "alignItems", "responsive", "justifyContent", "direction", "wrap", "component"]);
  var classes = (0, _classnames.default)('euiFlexGroup', gutterSizeToClassNameMap[gutterSize], alignItemsToClassNameMap[alignItems], justifyContentToClassNameMap[justifyContent], directionToClassNameMap[direction], {
    'euiFlexGroup--responsive': responsive,
    'euiFlexGroup--wrap': wrap
  }, className);

  if (!isValidElement(component)) {
    throw new Error("".concat(component, " is not a valid element type. Use `div` or `span`."));
  }

  return component === 'span' ? (0, _react2.jsx)("span", (0, _extends2.default)({
    className: classes,
    ref: ref
  }, rest), children) : (0, _react2.jsx)("div", (0, _extends2.default)({
    className: classes,
    ref: ref
  }, rest), children);
});
exports.EuiFlexGroup = EuiFlexGroup;
EuiFlexGroup.displayName = 'EuiFlexGroup';