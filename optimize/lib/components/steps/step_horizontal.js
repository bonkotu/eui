"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiStepHorizontal = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _step_number = require("./step_number");

var _step_strings = require("./step_strings");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var EuiStepHorizontal = function EuiStepHorizontal(_ref) {
  var className = _ref.className,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 1 : _ref$step,
      title = _ref.title,
      isSelected = _ref.isSelected,
      isComplete = _ref.isComplete,
      onClick = _ref.onClick,
      disabled = _ref.disabled,
      _ref$status = _ref.status,
      status = _ref$status === void 0 ? 'incomplete' : _ref$status,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["className", "step", "title", "isSelected", "isComplete", "onClick", "disabled", "status"]);
  var buttonTitle = (0, _step_strings.useI18nStep)({
    number: step,
    title: title
  });
  var completeTitle = (0, _step_strings.useI18nCompleteStep)({
    number: step,
    title: title
  });
  var disabledTitle = (0, _step_strings.useI18nDisabledStep)({
    number: step,
    title: title
  });
  var incompleteTitle = (0, _step_strings.useI18nIncompleteStep)({
    number: step,
    title: title
  });
  var warningTitle = (0, _step_strings.useI18nWarningStep)({
    number: step,
    title: title
  });
  var currentTitle = (0, _step_strings.useI18nCurrentStep)({
    number: step,
    title: title
  });
  if (disabled) status = 'disabled';else if (isComplete) status = 'complete';else if (isSelected) status = 'current';
  var classes = (0, _classnames.default)('euiStepHorizontal', className, {
    'euiStepHorizontal-isSelected': status === 'current',
    'euiStepHorizontal-isComplete': status === 'complete',
    'euiStepHorizontal-isIncomplete': status === 'incomplete',
    'euiStepHorizontal-isDisabled': status === 'disabled'
  });
  var stepTitle = buttonTitle;
  if (status === 'disabled') stepTitle = disabledTitle;
  if (status === 'complete') stepTitle = completeTitle;
  if (status === 'incomplete') stepTitle = incompleteTitle;
  if (status === 'warning') stepTitle = warningTitle;
  if (status === 'current') stepTitle = currentTitle;

  var onStepClick = function onStepClick(event) {
    if (!disabled) onClick(event);
  };

  return (0, _react2.jsx)("button", (0, _extends2.default)({
    className: classes,
    title: stepTitle,
    onClick: onStepClick,
    disabled: disabled
  }, rest), (0, _react2.jsx)(_step_number.EuiStepNumber, {
    className: "euiStepHorizontal__number",
    status: status,
    number: step
  }), (0, _react2.jsx)("span", {
    className: "euiStepHorizontal__title"
  }, title));
};

exports.EuiStepHorizontal = EuiStepHorizontal;