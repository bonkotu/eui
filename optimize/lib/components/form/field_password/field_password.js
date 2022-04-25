"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFieldPassword = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _form_control_layout = require("../form_control_layout");

var _validatable_control = require("../validatable_control");

var _button = require("../../button");

var _i18n = require("../../i18n");

var _services = require("../../../services");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var EuiFieldPassword = function EuiFieldPassword(_ref) {
  var className = _ref.className,
      id = _ref.id,
      name = _ref.name,
      placeholder = _ref.placeholder,
      value = _ref.value,
      isInvalid = _ref.isInvalid,
      fullWidth = _ref.fullWidth,
      isLoading = _ref.isLoading,
      compressed = _ref.compressed,
      _inputRef = _ref.inputRef,
      prepend = _ref.prepend,
      append = _ref.append,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'password' : _ref$type,
      dualToggleProps = _ref.dualToggleProps,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["className", "id", "name", "placeholder", "value", "isInvalid", "fullWidth", "isLoading", "compressed", "inputRef", "prepend", "append", "type", "dualToggleProps"]);

  // Set the initial input type to `password` if they want dual
  var _useState = (0, _react.useState)(type === 'dual' ? 'password' : type),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      inputType = _useState2[0],
      setInputType = _useState2[1]; // Setup toggle aria-label


  var _useEuiI18n = (0, _i18n.useEuiI18n)(['euiFieldPassword.showPassword', 'euiFieldPassword.maskPassword'], ['Show password as plain text. Note: this will visually expose your password on the screen.', 'Mask password']),
      _useEuiI18n2 = (0, _slicedToArray2.default)(_useEuiI18n, 2),
      showPasswordLabel = _useEuiI18n2[0],
      maskPasswordLabel = _useEuiI18n2[1]; // Setup the inputRef to auto-focus when toggling visibility


  var _useState3 = (0, _react.useState)(null),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      inputRef = _useState4[0],
      _setInputRef = _useState4[1];

  var setInputRef = (0, _services.useCombinedRefs)([_setInputRef, _inputRef]);

  var handleToggle = function handleToggle(event, isVisible) {
    setInputType(isVisible ? 'password' : 'text');

    if (inputRef) {
      inputRef.focus();
    }

    if (dualToggleProps && dualToggleProps.onClick) {
      dualToggleProps.onClick(event);
    }
  }; // Convert any `append` elements to an array so the visibility
  // toggle can be added to it


  var appends = Array.isArray(append) ? append : [];
  if (append && !Array.isArray(append)) appends.push(append); // Add a toggling button to switch between `password` and `input` if consumer wants `dual`
  // https://www.w3schools.com/howto/howto_js_toggle_password.asp

  if (type === 'dual') {
    var isVisible = inputType === 'text';
    var visibilityToggle = (0, _react2.jsx)(_button.EuiButtonIcon, (0, _extends2.default)({
      iconType: isVisible ? 'eyeClosed' : 'eye',
      "aria-label": isVisible ? maskPasswordLabel : showPasswordLabel,
      title: isVisible ? maskPasswordLabel : showPasswordLabel,
      disabled: rest.disabled
    }, dualToggleProps, {
      onClick: function onClick(e) {
        return handleToggle(e, isVisible);
      }
    }));
    appends = [].concat((0, _toConsumableArray2.default)(appends), [visibilityToggle]);
  }

  var finalAppend = appends.length ? appends : undefined;
  var classes = (0, _classnames.default)('euiFieldPassword', {
    'euiFieldPassword--fullWidth': fullWidth,
    'euiFieldPassword--compressed': compressed,
    'euiFieldPassword-isLoading': isLoading,
    'euiFieldPassword--inGroup': prepend || finalAppend,
    'euiFieldPassword--withToggle': type === 'dual'
  }, className);
  return (0, _react2.jsx)(_form_control_layout.EuiFormControlLayout, {
    icon: "lock",
    fullWidth: fullWidth,
    isLoading: isLoading,
    compressed: compressed,
    prepend: prepend,
    append: finalAppend
  }, (0, _react2.jsx)(_validatable_control.EuiValidatableControl, {
    isInvalid: isInvalid
  }, (0, _react2.jsx)("input", (0, _extends2.default)({
    type: inputType,
    id: id,
    name: name,
    placeholder: placeholder,
    className: classes,
    value: value,
    ref: setInputRef
  }, rest))));
};

exports.EuiFieldPassword = EuiFieldPassword;
EuiFieldPassword.defaultProps = {
  value: undefined,
  fullWidth: false,
  isLoading: false,
  compressed: false
};