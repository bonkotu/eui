"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFormLegend = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _accessibility = require("../../accessibility");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var EuiFormLegend = function EuiFormLegend(_ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$display = _ref.display,
      display = _ref$display === void 0 ? 'visible' : _ref$display,
      compressed = _ref.compressed,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["children", "className", "display", "compressed"]);
  var isLegendHidden = display === 'hidden';
  var classes = (0, _classnames.default)('euiFormLegend', {
    'euiFormLegend-isHidden': isLegendHidden,
    'euiFormLegend--compressed': compressed
  }, className);
  return (0, _react2.jsx)("legend", (0, _extends2.default)({
    className: classes
  }, rest), isLegendHidden ? (0, _react2.jsx)(_accessibility.EuiScreenReaderOnly, null, (0, _react2.jsx)("span", null, children)) : children);
};

exports.EuiFormLegend = EuiFormLegend;