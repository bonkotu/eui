"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiTableSortMobileItem = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _context_menu = require("../../context_menu");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var EuiTableSortMobileItem = function EuiTableSortMobileItem(_ref) {
  var children = _ref.children,
      onSort = _ref.onSort,
      isSorted = _ref.isSorted,
      isSortAscending = _ref.isSortAscending,
      className = _ref.className,
      ariaLabel = _ref.ariaLabel,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["children", "onSort", "isSorted", "isSortAscending", "className", "ariaLabel"]);
  var sortIcon = 'empty';

  if (isSorted) {
    sortIcon = isSortAscending ? 'sortUp' : 'sortDown';
  }

  var buttonClasses = (0, _classnames.default)('euiTableSortMobileItem', className, {
    'euiTableSortMobileItem-isSorted': isSorted
  });
  var columnTitle = ariaLabel ? ariaLabel : children;
  var statefulAriaLabel = "Sort ".concat(columnTitle, " ").concat(isSortAscending ? 'descending' : 'ascending');
  return (0, _react2.jsx)(_context_menu.EuiContextMenuItem, (0, _extends2.default)({
    className: buttonClasses,
    icon: sortIcon,
    onClick: onSort,
    "aria-label": statefulAriaLabel
  }, rest), children);
};

exports.EuiTableSortMobileItem = EuiTableSortMobileItem;