import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import React from 'react';
import classNames from 'classnames';
import { jsx as ___EmotionJSX } from "@emotion/react";
export var EuiFlyoutBody = function EuiFlyoutBody(_ref) {
  var children = _ref.children,
      className = _ref.className,
      banner = _ref.banner,
      rest = _objectWithoutProperties(_ref, ["children", "className", "banner"]);

  var classes = classNames('euiFlyoutBody', className);
  var overflowClasses = classNames('euiFlyoutBody__overflow', {
    'euiFlyoutBody__overflow--hasBanner': banner
  });
  return ___EmotionJSX("div", _extends({
    className: classes
  }, rest), ___EmotionJSX("div", {
    tabIndex: 0,
    className: overflowClasses
  }, banner && ___EmotionJSX("div", {
    className: "euiFlyoutBody__banner"
  }, banner), ___EmotionJSX("div", {
    className: "euiFlyoutBody__overflowContent"
  }, children)));
};