"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiRangeWrapper = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var EuiRangeWrapper = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
      className = _ref.className,
      fullWidth = _ref.fullWidth,
      compressed = _ref.compressed,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["children", "className", "fullWidth", "compressed"]);
  var classes = (0, _classnames.default)('euiRangeWrapper', {
    'euiRangeWrapper--fullWidth': fullWidth,
    'euiRangeWrapper--compressed': compressed
  }, className);
  return (0, _react2.jsx)("div", (0, _extends2.default)({
    className: classes,
    ref: ref
  }, rest), children);
});
exports.EuiRangeWrapper = EuiRangeWrapper;
EuiRangeWrapper.displayName = 'EuiRangeWrapper';