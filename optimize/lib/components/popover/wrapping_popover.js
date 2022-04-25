"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiWrappingPopover = void 0;

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

var _popover = require("./popover");

var _portal = require("../portal");

var _react2 = require("@emotion/react");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Injects the EuiPopover next to the button via EuiPortal
 * then the button element is moved into the popover dom.
 * On unmount, the button is moved back to its original location.
 */
var EuiWrappingPopover = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EuiWrappingPopover, _Component);

  var _super = _createSuper(EuiWrappingPopover);

  function EuiWrappingPopover() {
    var _this;

    (0, _classCallCheck2.default)(this, EuiWrappingPopover);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "portal", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "anchor", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setPortalRef", function (node) {
      _this.portal = node;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setAnchorRef", function (node) {
      _this.anchor = node;
    });
    return _this;
  }

  (0, _createClass2.default)(EuiWrappingPopover, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.anchor) {
        this.anchor.insertAdjacentElement('beforebegin', this.props.button);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.button.parentNode) {
        if (this.portal) {
          this.portal.insertAdjacentElement('beforebegin', this.props.button);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          button = _this$props.button,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["button"]);
      return (0, _react2.jsx)(_portal.EuiPortal, {
        portalRef: this.setPortalRef,
        insert: {
          sibling: this.props.button,
          position: 'after'
        }
      }, (0, _react2.jsx)(_popover.EuiPopover, (0, _extends2.default)({}, rest, {
        button: (0, _react2.jsx)("div", {
          ref: this.setAnchorRef,
          className: "euiWrappingPopover__anchor"
        })
      })));
    }
  }]);
  return EuiWrappingPopover;
}(_react.Component);

exports.EuiWrappingPopover = EuiWrappingPopover;