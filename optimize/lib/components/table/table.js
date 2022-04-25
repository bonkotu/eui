"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiTable = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var tableLayoutToClassMap = {
  fixed: null,
  auto: 'euiTable--auto'
};

var EuiTable = function EuiTable(_ref) {
  var children = _ref.children,
      className = _ref.className,
      compressed = _ref.compressed,
      _ref$tableLayout = _ref.tableLayout,
      tableLayout = _ref$tableLayout === void 0 ? 'fixed' : _ref$tableLayout,
      _ref$responsive = _ref.responsive,
      responsive = _ref$responsive === void 0 ? true : _ref$responsive,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["children", "className", "compressed", "tableLayout", "responsive"]);
  var classes = (0, _classnames.default)('euiTable', className, {
    'euiTable--compressed': compressed,
    'euiTable--responsive': responsive
  }, tableLayoutToClassMap[tableLayout]);
  return (0, _react2.jsx)("table", (0, _extends2.default)({
    tabIndex: -1,
    className: classes
  }, rest), children);
};

exports.EuiTable = EuiTable;