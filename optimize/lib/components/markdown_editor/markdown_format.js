"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiMarkdownFormat = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _unified = _interopRequireDefault(require("unified"));

var _classnames = _interopRequireDefault(require("classnames"));

var _text = require("../text/text");

var _markdown_default_plugins = require("./plugins/markdown_default_plugins");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var EuiMarkdownFormat = function EuiMarkdownFormat(_ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$parsingPluginLis = _ref.parsingPluginList,
      parsingPluginList = _ref$parsingPluginLis === void 0 ? _markdown_default_plugins.defaultParsingPlugins : _ref$parsingPluginLis,
      _ref$processingPlugin = _ref.processingPluginList,
      processingPluginList = _ref$processingPlugin === void 0 ? _markdown_default_plugins.defaultProcessingPlugins : _ref$processingPlugin,
      _ref$textSize = _ref.textSize,
      textSize = _ref$textSize === void 0 ? 'm' : _ref$textSize,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["children", "className", "parsingPluginList", "processingPluginList", "textSize"]);
  var processor = (0, _react.useMemo)(function () {
    return (0, _unified.default)().use(parsingPluginList).use(processingPluginList);
  }, [parsingPluginList, processingPluginList]);
  var result = (0, _react.useMemo)(function () {
    try {
      var _ref2;

      var processed = processor.processSync(children); // `.result` is intentionally `unknown` (https://github.com/vfile/vfile/pull/53)
      // cast to something expected.

      return (_ref2 = processed.result) !== null && _ref2 !== void 0 ? _ref2 : processed.contents;
    } catch (e) {
      return children;
    }
  }, [children, processor]);
  var classes = (0, _classnames.default)('euiMarkdownFormat', className);
  return (0, _react2.jsx)(_text.EuiText, (0, _extends2.default)({
    size: textSize,
    className: classes
  }, rest), result);
};

exports.EuiMarkdownFormat = EuiMarkdownFormat;