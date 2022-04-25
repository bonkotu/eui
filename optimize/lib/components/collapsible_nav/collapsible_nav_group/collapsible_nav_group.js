"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiCollapsibleNavGroup = exports.BACKGROUNDS = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _services = require("../../../services");

var _accordion = require("../../accordion");

var _icon = require("../../icon");

var _flex = require("../../flex");

var _title = require("../../title");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var backgroundToClassNameMap = {
  none: '',
  light: 'euiCollapsibleNavGroup--light',
  dark: 'euiCollapsibleNavGroup--dark'
};
var BACKGROUNDS = Object.keys(backgroundToClassNameMap);
exports.BACKGROUNDS = BACKGROUNDS;

var EuiCollapsibleNavGroup = function EuiCollapsibleNavGroup(_ref) {
  var className = _ref.className,
      children = _ref.children,
      id = _ref.id,
      title = _ref.title,
      iconType = _ref.iconType,
      _ref$iconSize = _ref.iconSize,
      iconSize = _ref$iconSize === void 0 ? 'l' : _ref$iconSize,
      _ref$background = _ref.background,
      background = _ref$background === void 0 ? 'none' : _ref$background,
      _ref$isCollapsible = _ref.isCollapsible,
      isCollapsible = _ref$isCollapsible === void 0 ? false : _ref$isCollapsible,
      _ref$titleElement = _ref.titleElement,
      titleElement = _ref$titleElement === void 0 ? 'h3' : _ref$titleElement,
      _ref$titleSize = _ref.titleSize,
      titleSize = _ref$titleSize === void 0 ? 'xxs' : _ref$titleSize,
      iconProps = _ref.iconProps,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["className", "children", "id", "title", "iconType", "iconSize", "background", "isCollapsible", "titleElement", "titleSize", "iconProps"]);
  var groupID = (0, _services.useGeneratedHtmlId)({
    conditionalId: id
  });
  var titleID = "".concat(groupID, "__title");
  var classes = (0, _classnames.default)('euiCollapsibleNavGroup', backgroundToClassNameMap[background], {
    'euiCollapsibleNavGroup--withHeading': title
  }, className); // Warn if consumer passes an iconType without a title

  if (iconType && !title) {
    console.warn('EuiCollapsibleNavGroup will not render an icon without `title`.');
  }

  var content = children && (0, _react2.jsx)("div", {
    className: "euiCollapsibleNavGroup__children"
  }, children);
  var headingClasses = 'euiCollapsibleNavGroup__heading';
  var TitleElement = titleElement;
  var titleContent = title ? (0, _react2.jsx)(_flex.EuiFlexGroup, {
    gutterSize: "m",
    alignItems: "center",
    responsive: false
  }, iconType && (0, _react2.jsx)(_flex.EuiFlexItem, {
    grow: false
  }, (0, _react2.jsx)(_icon.EuiIcon, (0, _extends2.default)({}, iconProps, {
    type: iconType,
    size: iconSize
  }))), (0, _react2.jsx)(_flex.EuiFlexItem, null, (0, _react2.jsx)(_title.EuiTitle, {
    size: titleSize
  }, (0, _react2.jsx)(TitleElement, {
    id: titleID,
    className: "euiCollapsibleNavGroup__title"
  }, title)))) : undefined;

  if (isCollapsible && title) {
    return (0, _react2.jsx)(_accordion.EuiAccordion, (0, _extends2.default)({
      id: groupID,
      className: classes,
      buttonClassName: headingClasses,
      buttonContent: titleContent,
      initialIsOpen: true,
      arrowDisplay: "right",
      arrowProps: {
        color: background === 'dark' ? 'ghost' : 'text'
      }
    }, rest), content);
  } else {
    return (0, _react2.jsx)("div", (0, _extends2.default)({
      id: groupID,
      className: classes
    }, rest), titleContent && (0, _react2.jsx)("div", {
      className: headingClasses
    }, titleContent), content);
  }
};

exports.EuiCollapsibleNavGroup = EuiCollapsibleNavGroup;