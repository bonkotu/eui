"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tooltipMarkdownRenderer = void 0;

var _react = _interopRequireDefault(require("react"));

var _tool_tip = require("../../../tool_tip");

var _icon = require("../../../icon");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var tooltipMarkdownRenderer = function tooltipMarkdownRenderer(_ref) {
  var content = _ref.content,
      children = _ref.children;
  return (0, _react2.jsx)("span", null, (0, _react2.jsx)(_tool_tip.EuiToolTip, {
    content: content
  }, (0, _react2.jsx)("span", null, (0, _react2.jsx)("strong", null, children), (0, _react2.jsx)(_icon.EuiIcon, {
    type: "questionInCircle",
    className: "euiMarkdownTooltip__icon"
  }))));
};

exports.tooltipMarkdownRenderer = tooltipMarkdownRenderer;