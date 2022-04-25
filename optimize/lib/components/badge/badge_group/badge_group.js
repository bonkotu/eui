"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiBadgeGroup = exports.GUTTER_SIZES = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _common = require("../../common");

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
  xs: 'euiBadgeGroup--gutterExtraSmall',
  s: 'euiBadgeGroup--gutterSmall'
};
var GUTTER_SIZES = (0, _common.keysOf)(gutterSizeToClassNameMap);
exports.GUTTER_SIZES = GUTTER_SIZES;
var EuiBadgeGroup = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$gutterSize = _ref.gutterSize,
      gutterSize = _ref$gutterSize === void 0 ? 'xs' : _ref$gutterSize,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["children", "className", "gutterSize"]);
  var classes = (0, _classnames.default)('euiBadgeGroup', gutterSizeToClassNameMap[gutterSize], className);
  return (0, _react2.jsx)("div", (0, _extends2.default)({
    className: classes,
    ref: ref
  }, rest), _react.default.Children.map(children, function (child) {
    return (0, _react2.jsx)("span", {
      className: "euiBadgeGroup__item"
    }, child);
  }));
});
exports.EuiBadgeGroup = EuiBadgeGroup;
EuiBadgeGroup.displayName = 'EuiBadgeGroup';