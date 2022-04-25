"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiComboBoxTitle = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var EuiComboBoxTitle = function EuiComboBoxTitle(_ref) {
  var children = _ref.children;
  return (0, _react2.jsx)("div", {
    className: "euiComboBoxTitle"
  }, children);
};

exports.EuiComboBoxTitle = EuiComboBoxTitle;