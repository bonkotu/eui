"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiAspectRatio = void 0;

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
var EuiAspectRatio = function EuiAspectRatio(_ref) {
  var children = _ref.children,
      className = _ref.className,
      height = _ref.height,
      width = _ref.width,
      maxWidth = _ref.maxWidth,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["children", "className", "height", "width", "maxWidth"]);
  var classes = (0, _classnames.default)('euiAspectRatio', className);
  var paddingBottom = "".concat(height / width * 100, "%");
  var content = (0, _react2.jsx)("div", (0, _extends2.default)({
    className: classes
  }, rest, {
    style: {
      paddingBottom: paddingBottom,
      maxWidth: maxWidth ? maxWidth : 'auto'
    }
  }), children);
  var contentwithoptionalwrap = content;

  if (maxWidth) {
    contentwithoptionalwrap = (0, _react2.jsx)("div", {
      style: {
        maxWidth: maxWidth
      }
    }, content);
  }

  return contentwithoptionalwrap;
};

exports.EuiAspectRatio = EuiAspectRatio;