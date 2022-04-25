"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiHeaderAlert = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _flex = require("../../flex");

var _services = require("../../../services");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var EuiHeaderAlert = function EuiHeaderAlert(_ref) {
  var action = _ref.action,
      className = _ref.className,
      date = _ref.date,
      text = _ref.text,
      title = _ref.title,
      badge = _ref.badge,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["action", "className", "date", "text", "title", "badge"]);
  var classes = (0, _classnames.default)('euiHeaderAlert', className);
  var ariaId = (0, _services.useGeneratedHtmlId)();
  return (0, _react2.jsx)("article", (0, _extends2.default)({
    "aria-labelledby": "".concat(ariaId, "-title"),
    className: classes
  }, rest), (0, _react2.jsx)(_flex.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, (0, _react2.jsx)(_flex.EuiFlexItem, null, (0, _react2.jsx)("div", {
    className: "euiHeaderAlert__date"
  }, date)), badge && (0, _react2.jsx)(_flex.EuiFlexItem, {
    grow: false
  }, badge)), (0, _react2.jsx)("h3", {
    id: "".concat(ariaId, "-title"),
    className: "euiHeaderAlert__title"
  }, title), (0, _react2.jsx)("div", {
    className: "euiHeaderAlert__text"
  }, text), action && (0, _react2.jsx)("div", {
    className: "euiHeaderAlert__action euiLink"
  }, action));
};

exports.EuiHeaderAlert = EuiHeaderAlert;