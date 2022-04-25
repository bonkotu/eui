"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiRangeLevels = exports.LEVEL_COLORS = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var calculateOffset = function calculateOffset(position, value, bound) {
  var threshold = 30;
  var offset = value === bound ? 0 : _utils.EUI_THUMB_SIZE / 2;

  if (offset !== 0) {
    // Estimating offset by eye. Trying to account for range scaling at both ends.
    offset = position <= threshold ? offset + 1 / position * threshold : offset;
    offset = position >= 100 - threshold ? offset - 1 / (100 - position) * threshold : offset;
  }

  return offset;
};

var LEVEL_COLORS = ['primary', 'success', 'warning', 'danger'];
exports.LEVEL_COLORS = LEVEL_COLORS;

var EuiRangeLevels = function EuiRangeLevels(_ref) {
  var _ref$levels = _ref.levels,
      levels = _ref$levels === void 0 ? [] : _ref$levels,
      max = _ref.max,
      min = _ref.min,
      showTicks = _ref.showTicks,
      compressed = _ref.compressed;

  var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      trackWidth = _useState2[0],
      setTrackWidth = _useState2[1];

  var handleRef = function handleRef(node) {
    var _node$clientWidth;

    setTrackWidth((_node$clientWidth = node === null || node === void 0 ? void 0 : node.clientWidth) !== null && _node$clientWidth !== void 0 ? _node$clientWidth : 0);
  };

  var validateLevelIsInRange = function validateLevelIsInRange(level) {
    if (level.min < min) {
      throw new Error("The level min of ".concat(level.min, " is lower than the min value of ").concat(min, "."));
    }

    if (level.max > max) {
      throw new Error("The level max of ".concat(level.max, " is higher than the max value of ").concat(max, "."));
    }
  };

  var classes = (0, _classnames.default)('euiRangeLevels', {
    'euiRangeLevels--hasTicks': showTicks,
    'euiRangeLevels--compressed': compressed
  });
  return (0, _react2.jsx)("div", {
    className: classes,
    ref: handleRef
  }, levels.map(function (level, index) {
    validateLevelIsInRange(level);
    var color = level.color,
        className = level.className,
        levelMin = level.min,
        levelMax = level.max,
        rest = (0, _objectWithoutProperties2.default)(level, ["color", "className", "min", "max"]);
    var left = 0;
    var right = 0;
    var leftOffset = 0;
    var rightOffset = 0;

    if (trackWidth > 0) {
      left = levelMin === min ? 0 : (0, _utils.calculateThumbPosition)(levelMin, min, max, trackWidth);
      leftOffset = calculateOffset(left, levelMin, min);
      right = levelMax === max ? 100 : (0, _utils.calculateThumbPosition)(levelMax, min, max, trackWidth);
      rightOffset = calculateOffset(right, levelMax, max);
    }

    var isNamedColor = LEVEL_COLORS.includes(color);
    var styles = {
      left: "calc(".concat(left, "% + ").concat(leftOffset, "px)"),
      right: "calc(".concat(100 - right, "% - ").concat(rightOffset, "px)"),
      backgroundColor: !isNamedColor ? color : undefined
    };
    var levelClasses = (0, _classnames.default)('euiRangeLevel', (0, _defineProperty2.default)({
      'euiRangeLevel--customColor': !isNamedColor
    }, "euiRangeLevel--".concat(color), isNamedColor), className);
    return (0, _react2.jsx)("span", (0, _extends2.default)({
      key: index,
      style: styles,
      className: levelClasses
    }, rest));
  }));
};

exports.EuiRangeLevels = EuiRangeLevels;