"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFormControlLayoutClearButton = exports.SIZES = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _common = require("../../common");

var _icon = require("../../icon");

var _i18n = require("../../i18n");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var sizeToClassNameMap = {
  s: 'euiFormControlLayoutClearButton--small',
  m: null
};
var SIZES = (0, _common.keysOf)(sizeToClassNameMap);
exports.SIZES = SIZES;

var EuiFormControlLayoutClearButton = function EuiFormControlLayoutClearButton(_ref) {
  var className = _ref.className,
      onClick = _ref.onClick,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'm' : _ref$size,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["className", "onClick", "size"]);
  var classes = (0, _classnames.default)('euiFormControlLayoutClearButton', sizeToClassNameMap[size], className);
  return (0, _react2.jsx)(_i18n.EuiI18n, {
    token: "euiFormControlLayoutClearButton.label",
    default: "Clear input"
  }, function (label) {
    return (0, _react2.jsx)("button", (0, _extends2.default)({
      type: "button",
      className: classes,
      onClick: onClick,
      "aria-label": label
    }, rest), (0, _react2.jsx)(_icon.EuiIcon, {
      className: "euiFormControlLayoutClearButton__icon",
      type: "cross"
    }));
  });
};

exports.EuiFormControlLayoutClearButton = EuiFormControlLayoutClearButton;