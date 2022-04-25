"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiMarkdownEditorTextArea = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var EuiMarkdownEditorTextArea = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
      compressed = _ref.compressed,
      id = _ref.id,
      isInvalid = _ref.isInvalid,
      name = _ref.name,
      placeholder = _ref.placeholder,
      rows = _ref.rows,
      height = _ref.height,
      maxHeight = _ref.maxHeight,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["children", "compressed", "id", "isInvalid", "name", "placeholder", "rows", "height", "maxHeight"]);
  return (0, _react2.jsx)("textarea", (0, _extends2.default)({
    ref: ref,
    style: {
      height: height,
      maxHeight: maxHeight
    },
    className: "euiMarkdownEditorTextArea"
  }, rest, {
    rows: 6,
    name: name,
    id: id,
    placeholder: placeholder
  }), children);
});
exports.EuiMarkdownEditorTextArea = EuiMarkdownEditorTextArea;
EuiMarkdownEditorTextArea.displayName = 'EuiMarkdownEditorTextArea';