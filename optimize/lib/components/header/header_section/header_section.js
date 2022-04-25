"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiHeaderSection = void 0;

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
var sideToClassNameMap = {
  left: 'euiHeaderSection--left',
  right: 'euiHeaderSection--right'
};

var EuiHeaderSection = function EuiHeaderSection(_ref) {
  var _ref$side = _ref.side,
      side = _ref$side === void 0 ? 'left' : _ref$side,
      children = _ref.children,
      className = _ref.className,
      _ref$grow = _ref.grow,
      grow = _ref$grow === void 0 ? false : _ref$grow,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["side", "children", "className", "grow"]);
  var classes = (0, _classnames.default)('euiHeaderSection', {
    'euiHeaderSection--grow': grow,
    'euiHeaderSection--dontGrow': !grow
  }, sideToClassNameMap[side], className);
  return (0, _react2.jsx)("div", (0, _extends2.default)({
    className: classes
  }, rest), children);
};

exports.EuiHeaderSection = EuiHeaderSection;