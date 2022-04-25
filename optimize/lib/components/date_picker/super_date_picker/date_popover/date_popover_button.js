"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiDatePopoverButton = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("../../../i18n");

var _popover = require("../../../popover");

var _pretty_duration = require("../pretty_duration");

var _date_popover_content = require("./date_popover_content");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
// eslint-disable-line import/named
var EuiDatePopoverButton = function EuiDatePopoverButton(props) {
  var position = props.position,
      isDisabled = props.isDisabled,
      isInvalid = props.isInvalid,
      needsUpdating = props.needsUpdating,
      value = props.value,
      buttonProps = props.buttonProps,
      roundUp = props.roundUp,
      onChange = props.onChange,
      locale = props.locale,
      dateFormat = props.dateFormat,
      utcOffset = props.utcOffset,
      timeFormat = props.timeFormat,
      isOpen = props.isOpen,
      onPopoverToggle = props.onPopoverToggle,
      onPopoverClose = props.onPopoverClose,
      compressed = props.compressed,
      rest = (0, _objectWithoutProperties2.default)(props, ["position", "isDisabled", "isInvalid", "needsUpdating", "value", "buttonProps", "roundUp", "onChange", "locale", "dateFormat", "utcOffset", "timeFormat", "isOpen", "onPopoverToggle", "onPopoverClose", "compressed"]);
  var classes = (0, _classnames.default)(['euiDatePopoverButton', "euiDatePopoverButton--".concat(position), {
    'euiDatePopoverButton--compressed': compressed,
    'euiDatePopoverButton-isSelected': isOpen,
    'euiDatePopoverButton-isInvalid': isInvalid,
    'euiDatePopoverButton-needsUpdating': needsUpdating,
    'euiDatePopoverButton-disabled': isDisabled
  }]);
  var formattedValue = (0, _pretty_duration.formatTimeString)(value, dateFormat, roundUp, locale);
  var title = formattedValue;
  var invalidTitle = (0, _i18n.useEuiI18n)('euiDatePopoverButton.invalidTitle', 'Invalid date: {title}', {
    title: title
  });
  var outdatedTitle = (0, _i18n.useEuiI18n)('euiDatePopoverButton.outdatedTitle', 'Update needed: {title}', {
    title: title
  });

  if (isInvalid) {
    title = invalidTitle;
  } else if (needsUpdating) {
    title = outdatedTitle;
  }

  var button = (0, _react2.jsx)("button", (0, _extends2.default)({
    onClick: onPopoverToggle,
    className: classes,
    title: title,
    disabled: isDisabled,
    "data-test-subj": "superDatePicker".concat(position, "DatePopoverButton")
  }, buttonProps), formattedValue);
  return (0, _react2.jsx)(_popover.EuiPopover, (0, _extends2.default)({
    button: button,
    isOpen: isOpen,
    closePopover: onPopoverClose,
    anchorPosition: position === 'start' ? 'downLeft' : 'downRight',
    display: "block",
    panelPaddingSize: "none"
  }, rest), (0, _react2.jsx)(_date_popover_content.EuiDatePopoverContent, {
    value: value,
    roundUp: roundUp,
    onChange: onChange,
    dateFormat: dateFormat,
    timeFormat: timeFormat,
    locale: locale,
    position: position,
    utcOffset: utcOffset
  }));
};

exports.EuiDatePopoverButton = EuiDatePopoverButton;
EuiDatePopoverButton.displayName = 'EuiDatePopoverButton';