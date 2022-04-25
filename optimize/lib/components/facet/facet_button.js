"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFacetButton = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _badge = require("../badge");

var _loading = require("../loading");

var _inner_text = require("../inner_text");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var EuiFacetButton = function EuiFacetButton(_ref) {
  var children = _ref.children,
      className = _ref.className,
      icon = _ref.icon,
      _ref$isDisabled = _ref.isDisabled,
      isDisabled = _ref$isDisabled === void 0 ? false : _ref$isDisabled,
      _ref$isLoading = _ref.isLoading,
      isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
      _ref$isSelected = _ref.isSelected,
      isSelected = _ref$isSelected === void 0 ? false : _ref$isSelected,
      quantity = _ref.quantity,
      buttonRef = _ref.buttonRef,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["children", "className", "icon", "isDisabled", "isLoading", "isSelected", "quantity", "buttonRef"]);
  // If in the loading state, force disabled to true
  isDisabled = isLoading ? true : isDisabled;
  var classes = (0, _classnames.default)('euiFacetButton', {
    'euiFacetButton--isSelected': isSelected,
    'euiFacetButton--unSelected': !isSelected
  }, className); // Add quantity number if provided or loading indicator

  var buttonQuantity;

  if (isLoading) {
    buttonQuantity = (0, _react2.jsx)(_loading.EuiLoadingSpinner, {
      className: "euiFacetButton__spinner",
      size: "m"
    });
  } else if (typeof quantity === 'number') {
    buttonQuantity = (0, _react2.jsx)(_badge.EuiNotificationBadge, {
      className: "euiFacetButton__quantity",
      size: "m",
      color: !isSelected || isDisabled ? 'subdued' : 'accent'
    }, quantity);
  } // Add an icon to the button if one exists.


  var buttonIcon;

  if ( /*#__PURE__*/_react.default.isValidElement(icon)) {
    buttonIcon = /*#__PURE__*/_react.default.cloneElement(icon, {
      className: (0, _classnames.default)(icon.props.className, 'euiFacetButton__icon')
    });
  }

  return (0, _react2.jsx)(_inner_text.EuiInnerText, null, function (ref, innerText) {
    return (0, _react2.jsx)("button", (0, _extends2.default)({
      className: classes,
      disabled: isDisabled,
      type: "button",
      ref: buttonRef,
      title: rest['aria-label'] || innerText
    }, rest), (0, _react2.jsx)("span", {
      className: "euiFacetButton__content"
    }, buttonIcon, (0, _react2.jsx)("span", {
      className: "euiFacetButton__text",
      "data-text": innerText,
      ref: ref
    }, children), buttonQuantity));
  });
};

exports.EuiFacetButton = EuiFacetButton;