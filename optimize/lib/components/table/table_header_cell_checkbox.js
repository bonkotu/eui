"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiTableHeaderCellCheckbox = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var EuiTableHeaderCellCheckbox = function EuiTableHeaderCellCheckbox(_ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$scope = _ref.scope,
      scope = _ref$scope === void 0 ? 'col' : _ref$scope,
      style = _ref.style,
      width = _ref.width,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["children", "className", "scope", "style", "width"]);
  var classes = (0, _classnames.default)('euiTableHeaderCellCheckbox', className);
  var styleObj = (0, _utils.resolveWidthAsStyle)(style, width);
  return (0, _react2.jsx)("th", (0, _extends2.default)({
    className: classes,
    scope: scope,
    style: styleObj
  }, rest), (0, _react2.jsx)("div", {
    className: "euiTableCellContent"
  }, children));
};

exports.EuiTableHeaderCellCheckbox = EuiTableHeaderCellCheckbox;