"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.euiResizablePanelWithControls = euiResizablePanelWithControls;
exports.EuiResizablePanel = exports.getToggleOptions = exports.getModeType = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _context = require("./context");

var _services = require("../../services");

var _panel = require("../panel");

var _panel2 = require("../panel/panel");

var _i18n = require("../i18n");

var _resizable_collapse_button = require("./resizable_collapse_button");

var _react2 = require("@emotion/react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultToggleOptions = {
  className: null,
  'data-test-subj': undefined,
  position: 'middle'
};

var getModeType = function getModeType(mode) {
  return (0, _typeof2.default)(mode) === 'object' ? mode[0] : mode;
};

exports.getModeType = getModeType;

var getToggleOptions = function getToggleOptions(mode) {
  return (0, _typeof2.default)(mode) === 'object' ? _objectSpread(_objectSpread({}, defaultToggleOptions), mode[1]) : defaultToggleOptions;
};

exports.getToggleOptions = getToggleOptions;
var paddingSizeToClassNameMap = {
  none: null,
  s: 'euiResizablePanel--paddingSmall',
  m: 'euiResizablePanel--paddingMedium',
  l: 'euiResizablePanel--paddingLarge'
};

var getPosition = function getPosition(ref) {
  var position = 'middle';

  if (ref.matches(':first-of-type')) {
    position = 'first';
  } else if (ref.matches(':last-of-type')) {
    position = 'last';
  }

  return position;
};

var EuiResizablePanel = function EuiResizablePanel(_ref) {
  var children = _ref.children,
      className = _ref.className,
      id = _ref.id,
      isHorizontal = _ref.isHorizontal,
      size = _ref.size,
      initialSize = _ref.initialSize,
      _ref$minSize = _ref.minSize,
      minSize = _ref$minSize === void 0 ? '0px' : _ref$minSize,
      _ref$scrollable = _ref.scrollable,
      scrollable = _ref$scrollable === void 0 ? true : _ref$scrollable,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      mode = _ref.mode,
      registration = _ref.registration,
      onToggleCollapsed = _ref.onToggleCollapsed,
      onToggleCollapsedInternal = _ref.onToggleCollapsedInternal,
      wrapperProps = _ref.wrapperProps,
      _ref$hasShadow = _ref.hasShadow,
      hasShadow = _ref$hasShadow === void 0 ? false : _ref$hasShadow,
      _ref$borderRadius = _ref.borderRadius,
      borderRadius = _ref$borderRadius === void 0 ? 'none' : _ref$borderRadius,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'transparent' : _ref$color,
      _ref$paddingSize = _ref.paddingSize,
      paddingSize = _ref$paddingSize === void 0 ? 'm' : _ref$paddingSize,
      _ref$wrapperPadding = _ref.wrapperPadding,
      wrapperPadding = _ref$wrapperPadding === void 0 ? 'none' : _ref$wrapperPadding,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["children", "className", "id", "isHorizontal", "size", "initialSize", "minSize", "scrollable", "style", "mode", "registration", "onToggleCollapsed", "onToggleCollapsedInternal", "wrapperProps", "hasShadow", "borderRadius", "color", "paddingSize", "wrapperPadding"]);

  var _useEuiResizableConta = (0, _context.useEuiResizableContainerContext)(),
      _useEuiResizableConta2 = _useEuiResizableConta.registry;

  _useEuiResizableConta2 = _useEuiResizableConta2 === void 0 ? {
    panels: {},
    resizers: {}
  } : _useEuiResizableConta2;
  var panels = _useEuiResizableConta2.panels,
      resizers = _useEuiResizableConta2.resizers;
  var divRef = (0, _react.useRef)(null);
  var panelId = (0, _services.useGeneratedHtmlId)({
    prefix: 'resizable-panel',
    conditionalId: id
  });
  var resizerIds = (0, _react.useRef)([]);
  var modeType = (0, _react.useMemo)(function () {
    return getModeType(mode);
  }, [mode]);
  var toggleOpts = (0, _react.useMemo)(function () {
    return getToggleOptions(mode);
  }, [mode]);
  var innerSize = (0, _react.useMemo)(function () {
    var _ref2;

    return (_ref2 = panels[panelId] && panels[panelId].size) !== null && _ref2 !== void 0 ? _ref2 : initialSize || 0;
  }, [panels, panelId, initialSize]);
  var isCollapsed = (0, _react.useMemo)(function () {
    return panels[panelId] && panels[panelId].isCollapsed || false;
  }, [panels, panelId]);
  var position = (0, _react.useMemo)(function () {
    return panels[panelId] && panels[panelId].position || 'middle';
  }, [panels, panelId]);
  var isCollapsible = (0, _react.useMemo)(function () {
    return modeType === 'collapsible';
  }, [modeType]);
  var direction = (0, _react.useMemo)(function () {
    var direction = null;

    if (position === 'middle' && (isCollapsible || isCollapsed)) {
      var ids = Object.keys(panels);
      var index = ids.indexOf(panelId);
      var prevPanel = panels[ids[index - 1]];
      var nextPanel = panels[ids[index + 1]];
      var prevPanelMode = prevPanel ? getModeType(prevPanel.mode) : null;
      var nextPanelMode = nextPanel ? getModeType(nextPanel.mode) : null; // Intentional, preferential order

      if (prevPanelMode === 'main') {
        direction = 'right';
      } else if (nextPanelMode === 'main') {
        direction = 'left';
      } else if (prevPanelMode && prevPanelMode !== 'collapsible') {
        direction = 'right';
      } else if (nextPanelMode && nextPanelMode !== 'collapsible') {
        direction = 'left';
      } else if (prevPanel && nextPanel) {
        direction = prevPanel.size > nextPanel.size ? 'right' : 'left';
      } else if (prevPanel) {
        direction = 'right';
      } else if (nextPanel) {
        direction = 'left';
      }
    }

    return direction;
  }, [isCollapsed, isCollapsible, position, panels, panelId]);
  var padding = (0, _react.useMemo)(function () {
    return "".concat(_panel2.panelPaddingValues[paddingSize] * 2, "px");
  }, [paddingSize]);
  var classes = (0, _classnames.default)('euiResizablePanel', paddingSizeToClassNameMap[wrapperPadding], {
    'euiResizablePanel--collapsible': isCollapsible,
    'euiResizablePanel-isCollapsed': isCollapsed
  }, "euiResizablePanel--".concat(position), wrapperProps && wrapperProps.className);
  var panelClasses = (0, _classnames.default)('euiResizablePanel__content', {
    'euiResizablePanel__content--scrollable': scrollable
  }, className);
  var dimensions;

  if (size) {
    dimensions = {
      width: isHorizontal ? "".concat(size, "%") : '100%',
      height: isHorizontal ? 'auto' : "".concat(size, "%")
    };
  } else {
    dimensions = {
      width: isHorizontal ? "".concat(innerSize, "%") : '100%',
      height: isHorizontal ? 'auto' : "".concat(innerSize, "%")
    };
  }

  var styles = _objectSpread(_objectSpread({}, style), dimensions);

  (0, _react.useEffect)(function () {
    if (!registration) return;
    var initSize = size !== null && size !== void 0 ? size : initialSize || 0;
    resizerIds.current = [divRef.current.previousElementSibling ? divRef.current.previousElementSibling.id : '', divRef.current.nextElementSibling ? divRef.current.nextElementSibling.id : ''];
    registration.register({
      id: panelId,
      size: initSize,
      prevSize: initSize,
      getSizePx: function getSizePx() {
        return isHorizontal ? divRef.current.getBoundingClientRect().width : divRef.current.getBoundingClientRect().height;
      },
      minSize: [minSize, padding],
      mode: modeType,
      isCollapsed: false,
      position: getPosition(divRef.current)
    });
    return function () {
      registration.deregister(panelId);
    };
  }, [initialSize, isHorizontal, minSize, size, registration, modeType, padding, panelId]);

  var onClickCollapse = function onClickCollapse(options) {
    onToggleCollapsedInternal && onToggleCollapsedInternal(panelId, options);
    onToggleCollapsed && onToggleCollapsed(panelId, options);
  };

  var collapseRight = function collapseRight(e) {
    onClickCollapse({
      direction: 'right'
    });
    if (e.detail) e.currentTarget.blur();
  };

  var collapseLeft = function collapseLeft(e) {
    onClickCollapse({
      direction: 'left'
    });
    if (e.detail) e.currentTarget.blur();
  };

  var toggleButtonAriaLabel = (0, _i18n.useEuiI18n)('euiResizablePanel.toggleButtonAriaLabel', 'Press to toggle this panel');
  var hasLeftToggle = (isCollapsible || isCollapsed) && (position === 'last' || position === 'middle' && direction === 'right');
  var hasRightToggle = (isCollapsible || isCollapsed) && (position === 'first' || position === 'middle' && direction === 'left');
  var hasVisibleToggle = modeType === 'custom' && isCollapsed || isCollapsible;
  var theToggle;
  var theResizer;

  if ((isCollapsible || modeType === 'custom') && hasLeftToggle) {
    theResizer = resizers[resizerIds.current[0]];
    theToggle = (0, _react2.jsx)(_resizable_collapse_button.EuiResizableCollapseButton, {
      externalPosition: "before",
      direction: isHorizontal ? 'horizontal' : 'vertical',
      isVisible: theResizer && (theResizer.isFocused || theResizer.isDisabled),
      isCollapsed: theResizer && theResizer.isDisabled,
      internalPosition: toggleOpts.position,
      "data-test-subj": toggleOpts['data-test-subj'],
      "aria-label": toggleButtonAriaLabel,
      onClick: collapseRight
    });
  } else if ((isCollapsible || modeType === 'custom') && hasRightToggle) {
    theResizer = resizers[resizerIds.current[1]];
    theToggle = (0, _react2.jsx)(_resizable_collapse_button.EuiResizableCollapseButton, {
      externalPosition: "after",
      direction: isHorizontal ? 'horizontal' : 'vertical',
      isVisible: theResizer && (theResizer.isFocused || theResizer.isDisabled),
      isCollapsed: theResizer && theResizer.isDisabled,
      internalPosition: toggleOpts.position,
      "data-test-subj": toggleOpts['data-test-subj'],
      "aria-label": toggleButtonAriaLabel,
      onClick: collapseLeft
    });
  }

  return (0, _react2.jsx)("div", (0, _extends2.default)({}, wrapperProps, {
    id: panelId,
    ref: divRef,
    style: styles,
    className: classes
  }), hasVisibleToggle && hasLeftToggle && theToggle, (0, _react2.jsx)(_panel.EuiPanel, (0, _extends2.default)({
    className: panelClasses,
    hasShadow: hasShadow,
    borderRadius: borderRadius,
    color: color,
    paddingSize: isCollapsed ? 'none' : paddingSize
  }, rest), children), hasVisibleToggle && hasRightToggle && theToggle);
};

exports.EuiResizablePanel = EuiResizablePanel;

function euiResizablePanelWithControls(controls) {
  return function (props) {
    return (0, _react2.jsx)(EuiResizablePanel, (0, _extends2.default)({}, controls, props));
  };
}