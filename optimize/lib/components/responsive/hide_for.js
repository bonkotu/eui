"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiHideFor = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _services = require("../../services");

var _breakpoint = require("../../services/breakpoint");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var EuiHideFor = function EuiHideFor(_ref) {
  var children = _ref.children,
      sizes = _ref.sizes;

  var _useState = (0, _react.useState)((0, _breakpoint.getBreakpoint)(typeof window === 'undefined' ? -Infinity : window.innerWidth)),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      currentBreakpoint = _useState2[0],
      setCurrentBreakpoint = _useState2[1];

  var functionToCallOnWindowResize = (0, _services.throttle)(function () {
    var newBreakpoint = (0, _breakpoint.getBreakpoint)(window.innerWidth);

    if (newBreakpoint !== currentBreakpoint) {
      setCurrentBreakpoint(newBreakpoint);
    } // reacts every 50ms to resize changes and always gets the final update

  }, 50); // Add window resize handlers

  (0, _react.useEffect)(function () {
    window.addEventListener('resize', functionToCallOnWindowResize);
    return function () {
      window.removeEventListener('resize', functionToCallOnWindowResize);
    };
  }, [functionToCallOnWindowResize]);

  if (sizes === 'all' || sizes.includes(currentBreakpoint)) {
    return null;
  }

  return (0, _react2.jsx)(_react.default.Fragment, null, children);
};

exports.EuiHideFor = EuiHideFor;