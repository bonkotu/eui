"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiRadio = void 0;

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
var EuiRadio = function EuiRadio(_ref) {
  var className = _ref.className,
      id = _ref.id,
      name = _ref.name,
      checked = _ref.checked,
      label = _ref.label,
      value = _ref.value,
      onChange = _ref.onChange,
      disabled = _ref.disabled,
      compressed = _ref.compressed,
      autoFocus = _ref.autoFocus,
      labelProps = _ref.labelProps,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["className", "id", "name", "checked", "label", "value", "onChange", "disabled", "compressed", "autoFocus", "labelProps"]);
  var classes = (0, _classnames.default)('euiRadio', {
    'euiRadio--noLabel': !label,
    'euiRadio--compressed': compressed
  }, className);
  var labelClasses = (0, _classnames.default)('euiRadio__label', labelProps === null || labelProps === void 0 ? void 0 : labelProps.className);
  var optionalLabel;

  if (label) {
    optionalLabel = (0, _react2.jsx)("label", (0, _extends2.default)({}, labelProps, {
      className: labelClasses,
      htmlFor: id
    }), label);
  }

  return (0, _react2.jsx)("div", (0, _extends2.default)({
    className: classes
  }, rest), (0, _react2.jsx)("input", {
    className: "euiRadio__input",
    type: "radio",
    id: id,
    name: name,
    value: value,
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    autoFocus: autoFocus
  }), (0, _react2.jsx)("div", {
    className: "euiRadio__circle"
  }), optionalLabel);
};

exports.EuiRadio = EuiRadio;