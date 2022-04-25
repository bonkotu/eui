"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiDroppable = exports.EuiDroppableContext = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _classnames = _interopRequireDefault(require("classnames"));

var _drag_drop_context = require("./drag_drop_context");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var spacingToClassNameMap = {
  none: null,
  s: 'euiDroppable--s',
  m: 'euiDroppable--m',
  l: 'euiDroppable--l'
};

var EuiDroppableContext = /*#__PURE__*/_react.default.createContext({
  cloneItems: false
});

exports.EuiDroppableContext = EuiDroppableContext;

var EuiDroppable = function EuiDroppable(_ref) {
  var droppableId = _ref.droppableId,
      direction = _ref.direction,
      _ref$isDropDisabled = _ref.isDropDisabled,
      isDropDisabled = _ref$isDropDisabled === void 0 ? false : _ref$isDropDisabled,
      children = _ref.children,
      className = _ref.className,
      _ref$cloneDraggables = _ref.cloneDraggables,
      cloneDraggables = _ref$cloneDraggables === void 0 ? false : _ref$cloneDraggables,
      _ref$spacing = _ref.spacing,
      spacing = _ref$spacing === void 0 ? 'none' : _ref$spacing,
      style = _ref.style,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'EUI_DEFAULT' : _ref$type,
      _ref$withPanel = _ref.withPanel,
      withPanel = _ref$withPanel === void 0 ? false : _ref$withPanel,
      _ref$grow = _ref.grow,
      grow = _ref$grow === void 0 ? false : _ref$grow,
      _ref$dataTestSubj = _ref['data-test-subj'],
      dataTestSubj = _ref$dataTestSubj === void 0 ? 'droppable' : _ref$dataTestSubj,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["droppableId", "direction", "isDropDisabled", "children", "className", "cloneDraggables", "spacing", "style", "type", "withPanel", "grow", "data-test-subj"]);

  var _useContext = (0, _react.useContext)(_drag_drop_context.EuiDragDropContextContext),
      isDraggingType = _useContext.isDraggingType;

  var dropIsDisabled = cloneDraggables ? true : isDropDisabled;
  return (0, _react2.jsx)(_reactBeautifulDnd.Droppable, (0, _extends2.default)({
    isDropDisabled: dropIsDisabled,
    droppableId: droppableId,
    direction: direction,
    type: type
  }, rest), function (provided, snapshot) {
    var classes = (0, _classnames.default)('euiDroppable', {
      'euiDroppable--isDisabled': dropIsDisabled,
      'euiDroppable--isDraggingOver': snapshot.isDraggingOver,
      'euiDroppable--isDraggingType': isDraggingType === type,
      'euiDroppable--withPanel': withPanel,
      'euiDroppable--grow': grow,
      'euiDroppable--noGrow': !grow
    }, spacingToClassNameMap[spacing], className);
    var placeholderClasses = (0, _classnames.default)('euiDroppable__placeholder', {
      'euiDroppable__placeholder--isHidden': cloneDraggables
    });
    var DroppableElement = typeof children === 'function' ? children(provided, snapshot) : children;
    return (0, _react2.jsx)("div", (0, _extends2.default)({}, provided.droppableProps, {
      ref: provided.innerRef,
      style: style,
      "data-test-subj": dataTestSubj,
      className: classes
    }), (0, _react2.jsx)(EuiDroppableContext.Provider, {
      value: {
        cloneItems: cloneDraggables
      }
    }, DroppableElement), (0, _react2.jsx)("div", {
      className: placeholderClasses
    }, provided.placeholder));
  });
};

exports.EuiDroppable = EuiDroppable;