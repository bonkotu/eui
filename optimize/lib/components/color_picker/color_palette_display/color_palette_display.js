"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiColorPaletteDisplay = exports.SIZES = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _common = require("../../common");

var _color_palette_display_fixed = require("./color_palette_display_fixed");

var _color_palette_display_gradient = require("./color_palette_display_gradient");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var sizeToClassNameMap = {
  xs: 'euiColorPaletteDisplay--sizeExtraSmall',
  s: 'euiColorPaletteDisplay--sizeSmall',
  m: 'euiColorPaletteDisplay--sizeMedium'
};
var SIZES = (0, _common.keysOf)(sizeToClassNameMap);
exports.SIZES = SIZES;

var EuiColorPaletteDisplay = function EuiColorPaletteDisplay(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'fixed' : _ref$type,
      palette = _ref.palette,
      className = _ref.className,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 's' : _ref$size,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["type", "palette", "className", "size"]);
  var classes = (0, _classnames.default)('euiColorPaletteDisplay', className, sizeToClassNameMap[size]);
  return (0, _react2.jsx)(_react.default.Fragment, null, type === 'fixed' ? (0, _react2.jsx)(_color_palette_display_fixed.EuiColorPaletteDisplayFixed, (0, _extends2.default)({
    className: classes,
    palette: palette
  }, rest)) : (0, _react2.jsx)(_color_palette_display_gradient.EuiColorPaletteDisplayGradient, (0, _extends2.default)({
    className: classes,
    palette: palette
  }, rest)));
};

exports.EuiColorPaletteDisplay = EuiColorPaletteDisplay;