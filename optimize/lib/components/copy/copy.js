"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiCopy = void 0;

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

var _services = require("../../services");

var _tool_tip = require("../tool_tip");

var _react2 = require("@emotion/react");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EuiCopy = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EuiCopy, _Component);

  var _super = _createSuper(EuiCopy);

  function EuiCopy(props) {
    var _this;

    (0, _classCallCheck2.default)(this, EuiCopy);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "copy", function () {
      var isCopied = (0, _services.copyToClipboard)(_this.props.textToCopy);

      if (isCopied) {
        _this.setState({
          tooltipText: _this.props.afterMessage
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resetTooltipText", function () {
      _this.setState({
        tooltipText: _this.props.beforeMessage
      });
    });
    _this.state = {
      tooltipText: _this.props.beforeMessage
    };
    return _this;
  }

  (0, _createClass2.default)(EuiCopy, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          textToCopy = _this$props.textToCopy,
          beforeMessage = _this$props.beforeMessage,
          afterMessage = _this$props.afterMessage,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["children", "textToCopy", "beforeMessage", "afterMessage"]);
      return (// See `src/components/tool_tip/tool_tip.js` for explanation of below eslint-disable
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        (0, _react2.jsx)(_tool_tip.EuiToolTip, (0, _extends2.default)({
          content: this.state.tooltipText,
          onMouseOut: this.resetTooltipText
        }, rest), children(this.copy))
      );
    }
  }]);
  return EuiCopy;
}(_react.Component);

exports.EuiCopy = EuiCopy;
(0, _defineProperty2.default)(EuiCopy, "defaultProps", {
  afterMessage: 'Copied'
});