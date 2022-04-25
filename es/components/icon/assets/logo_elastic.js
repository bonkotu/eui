function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY. @see scripts/compile-icons.js
import * as React from 'react';
import { jsx as ___EmotionJSX } from "@emotion/react";

var EuiIconLogoElastic = function EuiIconLogoElastic(_ref) {
  var title = _ref.title,
      titleId = _ref.titleId,
      props = _objectWithoutProperties(_ref, ["title", "titleId"]);

  return ___EmotionJSX("svg", _extends({
    "data-type": "logoElastic",
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 32,
    fill: "none",
    viewBox: "0 0 32 32",
    "aria-labelledby": titleId
  }, props), title ? ___EmotionJSX("title", {
    id: titleId
  }, title) : null, ___EmotionJSX("image", {
    id: "image0",
    width: "32",
    height: "32",
    x: "0",
    y: "0",
    href: "data:image/png;base64,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\nFlDCeEstkmxYVy1HJRadE7B1iAnjspzeysxXE0HecTpat7ulB8t+8PbR+G2QE/VIO0AZSDadpOvM\nAhmEDLCIEsBfIjS/neJfq2iPVuPctb1WRzxGx0Zl6TEwR0G7BToUahJdBAJFYFDQAtjfdDD1r9QH\nEMk6g+wd+7vGG1Cv+pitIDdobQ1xmyyRD+7mAnZ6LzPzVe+YApjeNQ6k1fZ/5N8r50muP7QAAACW\nZVhJZk1NACoAAAAIAAUBEgADAAAAAQABAAABGgAFAAAAAQAAAEoBGwAFAAAAAQAAAFIBMQACAAAA\nEQAAAFqHaQAEAAAAAQAAAGwAAAAAAAAAMgAAAAEAAAAyAAAAAUFkb2JlIEltYWdlUmVhZHkAAAAD\noAEAAwAAAAEAAQAAoAIABAAAAAEAAAAgoAMABAAAAAEAAAAgAAAAAJa4qL0AAAAldEVYdGRhdGU6\nY3JlYXRlADIwMjItMDQtMjVUMTA6Mzg6NTQrMDA6MDDOVAK1AAAAJXRFWHRkYXRlOm1vZGlmeQAy\nMDIyLTA0LTI1VDEwOjM4OjU0KzAwOjAwvwm6CQAAABF0RVh0ZXhpZjpDb2xvclNwYWNlADEPmwJJ\nAAAAE3RFWHRleGlmOkV4aWZPZmZzZXQAMTA4k5fAuQAAABd0RVh0ZXhpZjpQaXhlbFhEaW1lbnNp\nb24AMzKIrGcXAAAAF3RFWHRleGlmOlBpeGVsWURpbWVuc2lvbgAzMlU6vpIAAAAedEVYdGV4aWY6\nU29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkefmo5qwAAAAASUVORK5CYII="
  }));
};

export var icon = EuiIconLogoElastic;