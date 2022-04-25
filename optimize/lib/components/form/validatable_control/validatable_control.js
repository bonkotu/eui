"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiValidatableControl = void 0;

var _react = require("react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
function isMutableRef(ref) {
  return ref != null && ref.hasOwnProperty('current');
}

var EuiValidatableControl = function EuiValidatableControl(_ref) {
  var isInvalid = _ref.isInvalid,
      children = _ref.children;
  var control = (0, _react.useRef)(null);

  var child = _react.Children.only(children);

  var childRef = child.ref;
  var replacedRef = (0, _react.useCallback)(function (element) {
    control.current = element; // Call the original ref, if any

    if (typeof childRef === 'function') {
      childRef(element);
    } else if (isMutableRef(childRef)) {
      childRef.current = element;
    }
  }, [childRef]);
  (0, _react.useEffect)(function () {
    if (control.current === null || typeof control.current.setCustomValidity !== 'function') {
      return; // jsdom doesn't polyfill this for the server-side
    }

    if (isInvalid) {
      control.current.setCustomValidity('Invalid');
    } else {
      control.current.setCustomValidity('');
    }
  });
  return /*#__PURE__*/(0, _react.cloneElement)(child, {
    ref: replacedRef
  });
};

exports.EuiValidatableControl = EuiValidatableControl;