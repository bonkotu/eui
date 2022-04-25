"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiStepsHorizontal = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _step_horizontal = require("./step_horizontal");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var EuiStepsHorizontal = function EuiStepsHorizontal(_ref) {
  var className = _ref.className,
      steps = _ref.steps,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["className", "steps"]);
  var classes = (0, _classnames.default)('euiStepsHorizontal', className);
  return (0, _react2.jsx)("ol", (0, _extends2.default)({
    className: classes
  }, rest), steps.map(function (stepProps, index) {
    var isCurrent = stepProps.isSelected || stepProps.status === 'current' ? {
      'aria-current': 'step'
    } : {};
    return (0, _react2.jsx)("li", (0, _extends2.default)({
      key: index,
      className: "euiStepHorizontal__item"
    }, isCurrent), (0, _react2.jsx)(_step_horizontal.EuiStepHorizontal, (0, _extends2.default)({
      step: index + 1
    }, stepProps)));
  }));
};

exports.EuiStepsHorizontal = EuiStepsHorizontal;