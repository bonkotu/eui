"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiDraggable = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _classnames = _interopRequireDefault(require("classnames"));

var _droppable = require("./droppable");

var _react2 = require("@emotion/react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var spacingToClassNameMap = {
  none: null,
  s: 'euiDraggable--s',
  m: 'euiDraggable--m',
  l: 'euiDraggable--l'
};

var EuiDraggable = function EuiDraggable(_ref) {
  var _ref$customDragHandle = _ref.customDragHandle,
      customDragHandle = _ref$customDragHandle === void 0 ? false : _ref$customDragHandle,
      draggableId = _ref.draggableId,
      _ref$isDragDisabled = _ref.isDragDisabled,
      isDragDisabled = _ref$isDragDisabled === void 0 ? false : _ref$isDragDisabled,
      _ref$isRemovable = _ref.isRemovable,
      isRemovable = _ref$isRemovable === void 0 ? false : _ref$isRemovable,
      index = _ref.index,
      children = _ref.children,
      className = _ref.className,
      _ref$spacing = _ref.spacing,
      spacing = _ref$spacing === void 0 ? 'none' : _ref$spacing,
      style = _ref.style,
      _ref$dataTestSubj = _ref['data-test-subj'],
      dataTestSubj = _ref$dataTestSubj === void 0 ? 'draggable' : _ref$dataTestSubj,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["customDragHandle", "draggableId", "isDragDisabled", "isRemovable", "index", "children", "className", "spacing", "style", "data-test-subj"]);

  var _useContext = (0, _react.useContext)(_droppable.EuiDroppableContext),
      cloneItems = _useContext.cloneItems;

  return (0, _react2.jsx)(_reactBeautifulDnd.Draggable, (0, _extends2.default)({
    draggableId: draggableId,
    index: index,
    isDragDisabled: isDragDisabled
  }, rest), function (provided, snapshot, rubric) {
    var classes = (0, _classnames.default)('euiDraggable', {
      'euiDraggable--hasClone': cloneItems,
      'euiDraggable--hasCustomDragHandle': customDragHandle,
      'euiDraggable--isDragging': snapshot.isDragging,
      'euiDraggable--withoutDropAnimation': isRemovable
    }, spacingToClassNameMap[spacing], className);
    var childClasses = (0, _classnames.default)('euiDraggable__item', {
      'euiDraggable__item--hasCustomDragHandle': customDragHandle,
      'euiDraggable__item--isDisabled': isDragDisabled,
      'euiDraggable__item--isDragging': snapshot.isDragging,
      'euiDraggable__item--isDropAnimating': snapshot.isDropAnimating
    });
    var DraggableElement = typeof children === 'function' ? children(provided, snapshot, rubric) : children; // as specified by `DraggableProps`

    return (0, _react2.jsx)(_react.Fragment, null, (0, _react2.jsx)("div", (0, _extends2.default)({}, provided.draggableProps, !customDragHandle ? provided.dragHandleProps : {}, {
      ref: provided.innerRef,
      "data-test-subj": dataTestSubj,
      className: classes,
      style: _objectSpread(_objectSpread({}, style), provided.draggableProps.style)
    }), /*#__PURE__*/(0, _react.cloneElement)(DraggableElement, {
      className: (0, _classnames.default)(DraggableElement.props.className, childClasses)
    })), cloneItems && snapshot.isDragging && (0, _react2.jsx)("div", {
      className: (0, _classnames.default)(classes, 'euiDraggable--clone')
    }, DraggableElement));
  });
};

exports.EuiDraggable = EuiDraggable;