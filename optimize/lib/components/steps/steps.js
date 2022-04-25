"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiSteps = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _step = require("./step");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
function renderSteps(steps, firstStepNumber, headingElement, titleSize) {
  return steps.map(function (step, index) {
    var className = step.className,
        children = step.children,
        title = step.title,
        status = step.status,
        rest = (0, _objectWithoutProperties2.default)(step, ["className", "children", "title", "status"]);
    return (0, _react2.jsx)(_step.EuiStep, (0, _extends2.default)({
      className: className,
      key: index,
      headingElement: headingElement,
      step: firstStepNumber + index,
      title: title,
      titleSize: titleSize,
      status: status
    }, rest), children);
  });
}

var EuiSteps = function EuiSteps(_ref) {
  var className = _ref.className,
      _ref$firstStepNumber = _ref.firstStepNumber,
      firstStepNumber = _ref$firstStepNumber === void 0 ? 1 : _ref$firstStepNumber,
      _ref$headingElement = _ref.headingElement,
      headingElement = _ref$headingElement === void 0 ? 'p' : _ref$headingElement,
      titleSize = _ref.titleSize,
      steps = _ref.steps,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["className", "firstStepNumber", "headingElement", "titleSize", "steps"]);
  var classes = (0, _classnames.default)('euiSteps', className);
  return (0, _react2.jsx)("div", (0, _extends2.default)({
    className: classes
  }, rest), renderSteps(steps, firstStepNumber, headingElement, titleSize));
};

exports.EuiSteps = EuiSteps;