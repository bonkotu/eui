"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiComboBoxOption = void 0;

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

var _classnames = _interopRequireDefault(require("classnames"));

var _services = require("../../../services");

var _react2 = require("@emotion/react");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EuiComboBoxOption = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EuiComboBoxOption, _Component);

  var _super = _createSuper(EuiComboBoxOption);

  function EuiComboBoxOption() {
    var _this;

    (0, _classCallCheck2.default)(this, EuiComboBoxOption);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClick", function () {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          option = _this$props.option,
          disabled = _this$props.disabled;

      if (disabled) {
        return;
      }

      onClick(option);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onKeyDown", function (event) {
      if (event.key === _services.keys.ENTER || event.key === _services.keys.SPACE) {
        event.preventDefault();
        event.stopPropagation();
        var _this$props2 = _this.props,
            onEnterKey = _this$props2.onEnterKey,
            option = _this$props2.option,
            disabled = _this$props2.disabled;

        if (disabled) {
          return;
        }

        onEnterKey(option);
      }
    });
    return _this;
  }

  (0, _createClass2.default)(EuiComboBoxOption, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          className = _this$props3.className,
          disabled = _this$props3.disabled,
          isFocused = _this$props3.isFocused,
          onClick = _this$props3.onClick,
          onEnterKey = _this$props3.onEnterKey,
          option = _this$props3.option,
          optionRef = _this$props3.optionRef,
          rest = (0, _objectWithoutProperties2.default)(_this$props3, ["children", "className", "disabled", "isFocused", "onClick", "onEnterKey", "option", "optionRef"]);
      var classes = (0, _classnames.default)('euiComboBoxOption', className, {
        'euiComboBoxOption-isDisabled': disabled,
        'euiComboBoxOption-isFocused': isFocused
      });
      var label = option.label;
      return (0, _react2.jsx)("button", (0, _extends2.default)({
        "aria-disabled": disabled,
        "aria-selected": isFocused,
        className: classes,
        onClick: this.onClick,
        onKeyDown: this.onKeyDown,
        ref: optionRef,
        role: "option",
        title: label,
        type: "button"
      }, rest), children);
    }
  }]);
  return EuiComboBoxOption;
}(_react.Component);

exports.EuiComboBoxOption = EuiComboBoxOption;