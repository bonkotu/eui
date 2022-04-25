"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiPaginationButtonArrow = exports.TYPES = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _button_icon = require("../button/button_icon");

var _common = require("../common");

var _i18n = require("../i18n");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var typeToIconTypeMap = {
  first: 'arrowStart',
  previous: 'arrowLeft',
  next: 'arrowRight',
  last: 'arrowEnd'
};
var TYPES = (0, _common.keysOf)(typeToIconTypeMap);
exports.TYPES = TYPES;

var EuiPaginationButtonArrow = function EuiPaginationButtonArrow(_ref) {
  var className = _ref.className,
      type = _ref.type,
      disabled = _ref.disabled,
      ariaControls = _ref.ariaControls,
      onClick = _ref.onClick;
  var labels = {
    first: (0, _i18n.useEuiI18n)('euiPaginationButtonArrow.firstPage', 'First page'),
    previous: (0, _i18n.useEuiI18n)('euiPaginationButtonArrow.previousPage', 'Previous page'),
    next: (0, _i18n.useEuiI18n)('euiPaginationButtonArrow.nextPage', 'Next page'),
    last: (0, _i18n.useEuiI18n)('euiPaginationButtonArrow.lastPage', 'Last page')
  };
  var buttonProps = {};

  if (ariaControls && !disabled) {
    buttonProps.href = "#".concat(ariaControls);
    buttonProps['aria-controls'] = ariaControls;
  }

  return (0, _react2.jsx)(_button_icon.EuiButtonIcon, (0, _extends2.default)({
    className: (0, _classnames.default)('euiPaginationArrowButton', className),
    color: "text",
    "aria-label": labels[type],
    title: disabled ? undefined : labels[type],
    isDisabled: disabled,
    onClick: onClick,
    "data-test-subj": "pagination-button-".concat(type),
    iconType: typeToIconTypeMap[type]
  }, buttonProps));
};

exports.EuiPaginationButtonArrow = EuiPaginationButtonArrow;