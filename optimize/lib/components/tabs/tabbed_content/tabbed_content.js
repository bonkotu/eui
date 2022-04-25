"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiTabbedContent = exports.AUTOFOCUS = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _services = require("../../../services");

var _tabs = require("../tabs");

var _tab = require("../tab");

var _react2 = require("@emotion/react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Marked as const so type is `['initial', 'selected']` instead of `string[]`
 */
var AUTOFOCUS = ['initial', 'selected'];
exports.AUTOFOCUS = AUTOFOCUS;

var EuiTabbedContent = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EuiTabbedContent, _Component);

  var _super = _createSuper(EuiTabbedContent);

  function EuiTabbedContent(props) {
    var _this;

    (0, _classCallCheck2.default)(this, EuiTabbedContent);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "rootId", (0, _services.htmlIdGenerator)()());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "tabsRef", /*#__PURE__*/(0, _react.createRef)());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "focusTab", function () {
      var targetTab = _this.tabsRef.current.querySelector("#".concat(_this.state.selectedTabId));

      targetTab.focus();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "initializeFocus", function () {
      if (!_this.state.inFocus && _this.props.autoFocus === 'selected') {
        // Must wait for setState to finish before calling `.focus()`
        // as the focus call triggers a blur on the first tab
        _this.setState({
          inFocus: true
        }, function () {
          _this.focusTab();
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "removeFocus", function (blurEvent) {
      // only set inFocus to false if the wrapping div doesn't contain the now-focusing element
      var currentTarget = blurEvent.currentTarget;
      var relatedTarget = blurEvent.relatedTarget;

      if (currentTarget.contains(relatedTarget) === false) {
        _this.setState({
          inFocus: false
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onTabClick", function (selectedTab) {
      var _this$props = _this.props,
          onTabClick = _this$props.onTabClick,
          externalSelectedTab = _this$props.selectedTab;

      if (onTabClick) {
        onTabClick(selectedTab);
      } // Only track selection state if it's not controlled externally.


      if (!externalSelectedTab) {
        _this.setState({
          selectedTabId: selectedTab.id
        }, function () {
          _this.focusTab();
        });
      }
    });
    var initialSelectedTab = props.initialSelectedTab,
        _selectedTab = props.selectedTab,
        tabs = props.tabs; // Only track selection state if it's not controlled externally.

    var selectedTabId;

    if (!_selectedTab) {
      selectedTabId = initialSelectedTab && initialSelectedTab.id || tabs[0].id;
    }

    _this.state = {
      selectedTabId: selectedTabId,
      inFocus: false
    };
    return _this;
  }

  (0, _createClass2.default)(EuiTabbedContent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // IE11 doesn't support the `relatedTarget` event property for blur events
      // but does add it for focusout. React doesn't support `onFocusOut` so here we are.
      if (this.tabsRef.current) {
        // Current short-term solution for event listener (see https://github.com/elastic/eui/pull/2717)
        this.tabsRef.current.addEventListener('focusout', this.removeFocus);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.tabsRef.current) {
        // Current short-term solution for event listener (see https://github.com/elastic/eui/pull/2717)
        this.tabsRef.current.removeEventListener('focusout', this.removeFocus);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          display = _this$props2.display,
          expand = _this$props2.expand,
          initialSelectedTab = _this$props2.initialSelectedTab,
          onTabClick = _this$props2.onTabClick,
          externalSelectedTab = _this$props2.selectedTab,
          size = _this$props2.size,
          tabs = _this$props2.tabs,
          autoFocus = _this$props2.autoFocus,
          rest = (0, _objectWithoutProperties2.default)(_this$props2, ["className", "display", "expand", "initialSelectedTab", "onTabClick", "selectedTab", "size", "tabs", "autoFocus"]); // Allow the consumer to control tab selection.

      var selectedTab = externalSelectedTab || tabs.find(function (tab) {
        return tab.id === _this2.state.selectedTabId;
      });
      var _ref = selectedTab,
          selectedTabContent = _ref.content,
          selectedTabId = _ref.id;
      return (0, _react2.jsx)("div", (0, _extends2.default)({
        className: className
      }, rest), (0, _react2.jsx)(_tabs.EuiTabs, {
        ref: this.tabsRef,
        expand: expand,
        display: display,
        size: size,
        onFocus: this.initializeFocus
      }, tabs.map(function (tab) {
        var id = tab.id,
            name = tab.name,
            content = tab.content,
            tabProps = (0, _objectWithoutProperties2.default)(tab, ["id", "name", "content"]);

        var props = _objectSpread(_objectSpread({
          key: id,
          id: id
        }, tabProps), {}, {
          onClick: function onClick() {
            return _this2.onTabClick(tab);
          },
          isSelected: tab === selectedTab,
          'aria-controls': "".concat(_this2.rootId)
        });

        return (0, _react2.jsx)(_tab.EuiTab, props, name);
      })), (0, _react2.jsx)("div", {
        role: "tabpanel",
        id: "".concat(this.rootId),
        "aria-labelledby": selectedTabId
      }, selectedTabContent));
    }
  }]);
  return EuiTabbedContent;
}(_react.Component);

exports.EuiTabbedContent = EuiTabbedContent;
(0, _defineProperty2.default)(EuiTabbedContent, "defaultProps", {
  autoFocus: 'initial'
});