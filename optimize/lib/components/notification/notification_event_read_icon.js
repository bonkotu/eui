"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiNotificationEventReadIcon = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _i18n = require("../i18n");

var _classnames = _interopRequireDefault(require("classnames"));

var _icon = require("../icon");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var EuiNotificationEventReadIcon = function EuiNotificationEventReadIcon(_ref) {
  var id = _ref.id,
      isRead = _ref.isRead,
      eventName = _ref.eventName,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["id", "isRead", "eventName"]);
  var classesReadState = (0, _classnames.default)('euiNotificationEventReadIcon', {
    'euiNotificationEventReadIcon--isRead': isRead
  });
  var readAria = (0, _i18n.useEuiI18n)('euiNotificationEventReadIcon.readAria', '{eventName} is read', {
    eventName: eventName
  });
  var unreadAria = (0, _i18n.useEuiI18n)('euiNotificationEventReadIcon.unreadAria', '{eventName} is unread', {
    eventName: eventName
  });
  var readTitle = (0, _i18n.useEuiI18n)('euiNotificationEventReadIcon.read', 'Read');
  var unreadTitle = (0, _i18n.useEuiI18n)('euiNotificationEventReadIcon.unread', 'Unread');
  var iconAriaLabel = isRead ? readAria : unreadAria;
  var iconTitle = isRead ? readTitle : unreadTitle;
  return (0, _react2.jsx)("div", {
    className: classesReadState
  }, (0, _react2.jsx)(_icon.EuiIcon, (0, _extends2.default)({
    type: "dot",
    "aria-label": iconAriaLabel,
    title: iconTitle,
    color: "primary",
    "data-test-subj": "".concat(id, "-notificationEventReadIcon")
  }, rest)));
};

exports.EuiNotificationEventReadIcon = EuiNotificationEventReadIcon;