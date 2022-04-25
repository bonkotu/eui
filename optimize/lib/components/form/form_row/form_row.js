"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFormRow = exports.DISPLAYS = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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

var _common = require("../../common");

var _objects = require("../../../services/objects");

var _form_help_text = require("../form_help_text");

var _form_error_text = require("../form_error_text");

var _form_label = require("../form_label");

var _accessibility = require("../../../services/accessibility");

var _react2 = require("@emotion/react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var displayToClassNameMap = {
  row: null,
  rowCompressed: 'euiFormRow--compressed',
  columnCompressed: 'euiFormRow--compressed euiFormRow--horizontal',
  center: null,
  centerCompressed: 'euiFormRow--compressed',
  columnCompressedSwitch: 'euiFormRow--compressed euiFormRow--horizontal euiFormRow--hasSwitch'
};
var DISPLAYS = (0, _common.keysOf)(displayToClassNameMap);
exports.DISPLAYS = DISPLAYS;

var EuiFormRow = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EuiFormRow, _Component);

  var _super = _createSuper(EuiFormRow);

  function EuiFormRow() {
    var _this;

    (0, _classCallCheck2.default)(this, EuiFormRow);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(_args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      isFocused: false,
      id: _this.props.id || (0, _accessibility.htmlIdGenerator)()()
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onFocus", function () {
      // Doing this to allow onFocus to be called correctly from the child input element as this component overrides it
      var onChildFocus = (0, _objects.get)(_this.props, 'children.props.onFocus');

      if (onChildFocus) {
        onChildFocus.apply(void 0, arguments);
      }

      _this.setState(function (_ref) {
        var isFocused = _ref.isFocused;

        if (!isFocused) {
          return {
            isFocused: true
          };
        } else {
          return null;
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onBlur", function () {
      // Doing this to allow onBlur to be called correctly from the child input element as this component overrides it
      var onChildBlur = (0, _objects.get)(_this.props, 'children.props.onBlur');

      if (onChildBlur) {
        onChildBlur.apply(void 0, arguments);
      }

      _this.setState({
        isFocused: false
      });
    });
    return _this;
  }

  (0, _createClass2.default)(EuiFormRow, [{
    key: "render",
    value: function render() {
      var _ref2, _child$props$disabled;

      var _this$props = this.props,
          children = _this$props.children,
          helpText = _this$props.helpText,
          isInvalid = _this$props.isInvalid,
          error = _this$props.error,
          label = _this$props.label,
          labelType = _this$props.labelType,
          labelAppend = _this$props.labelAppend,
          hasEmptyLabelSpace = _this$props.hasEmptyLabelSpace,
          fullWidth = _this$props.fullWidth,
          className = _this$props.className,
          describedByIds = _this$props.describedByIds,
          display = _this$props.display,
          hasChildLabel = _this$props.hasChildLabel,
          propsId = _this$props.id,
          isDisabled = _this$props.isDisabled,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["children", "helpText", "isInvalid", "error", "label", "labelType", "labelAppend", "hasEmptyLabelSpace", "fullWidth", "className", "describedByIds", "display", "hasChildLabel", "id", "isDisabled"]);
      var id = this.state.id;
      var classes = (0, _classnames.default)('euiFormRow', {
        'euiFormRow--hasEmptyLabelSpace': hasEmptyLabelSpace,
        'euiFormRow--fullWidth': fullWidth
      }, displayToClassNameMap[display], // Safe use of ! as default prop is 'row'
      className);
      var optionalHelpTexts;

      if (helpText) {
        var helpTexts = Array.isArray(helpText) ? helpText : [helpText];
        optionalHelpTexts = helpTexts.map(function (helpText, i) {
          var key = typeof helpText === 'string' ? helpText : i;
          return (0, _react2.jsx)(_form_help_text.EuiFormHelpText, {
            key: key,
            id: "".concat(id, "-help-").concat(i),
            className: "euiFormRow__text"
          }, helpText);
        });
      }

      var optionalErrors;

      if (error && isInvalid) {
        var errorTexts = Array.isArray(error) ? error : [error];
        optionalErrors = errorTexts.map(function (error, i) {
          var key = typeof error === 'string' ? error : i;
          return (0, _react2.jsx)(_form_error_text.EuiFormErrorText, {
            key: key,
            id: "".concat(id, "-error-").concat(i),
            className: "euiFormRow__text"
          }, error);
        });
      }

      var optionalLabel;
      var isLegend = label && labelType === 'legend' ? true : false;

      if (label || labelAppend) {
        var labelProps = {};

        if (isLegend) {
          labelProps = {
            type: labelType
          };
        } else {
          labelProps = _objectSpread(_objectSpread({
            htmlFor: hasChildLabel ? id : undefined
          }, !isDisabled && {
            isFocused: this.state.isFocused
          }), {}, {
            // If the row is disabled, don't pass the isFocused state.
            type: labelType
          });
        }

        optionalLabel = (0, _react2.jsx)("div", {
          className: "euiFormRow__labelWrapper"
        }, (0, _react2.jsx)(_form_label.EuiFormLabel, (0, _extends2.default)({
          className: "euiFormRow__label",
          isInvalid: isInvalid,
          isDisabled: isDisabled,
          "aria-invalid": isInvalid
        }, labelProps), label), labelAppend && ' ', labelAppend);
      }

      var optionalProps = {};
      /**
       * Safe use of ! as default prop is []
       */

      var describingIds = (0, _toConsumableArray2.default)(describedByIds);

      if (optionalHelpTexts) {
        optionalHelpTexts.forEach(function (optionalHelpText) {
          return describingIds.push(optionalHelpText.props.id);
        });
      }

      if (optionalErrors) {
        optionalErrors.forEach(function (error) {
          return describingIds.push(error.props.id);
        });
      }

      if (describingIds.length > 0) {
        optionalProps['aria-describedby'] = describingIds.join(' ');
      }

      var child = _react.Children.only(children);

      var field = /*#__PURE__*/(0, _react.cloneElement)(child, _objectSpread({
        id: id,
        // Allow the child's disabled or isDisabled prop to supercede the `isDisabled`
        disabled: (_ref2 = (_child$props$disabled = child.props.disabled) !== null && _child$props$disabled !== void 0 ? _child$props$disabled : child.props.isDisabled) !== null && _ref2 !== void 0 ? _ref2 : isDisabled,
        onFocus: this.onFocus,
        onBlur: this.onBlur
      }, optionalProps));
      var fieldWrapperClasses = (0, _classnames.default)('euiFormRow__fieldWrapper', {
        euiFormRow__fieldWrapperDisplayOnly:
        /**
         * Safe use of ! as default prop is 'row'
         */
        display.startsWith('center')
      });
      var sharedProps = {
        className: classes,
        id: "".concat(id, "-row")
      };
      var contents = (0, _react2.jsx)(_react.default.Fragment, null, optionalLabel, (0, _react2.jsx)("div", {
        className: fieldWrapperClasses
      }, field, optionalErrors, optionalHelpTexts));
      return labelType === 'legend' ? (0, _react2.jsx)("fieldset", (0, _extends2.default)({}, sharedProps, rest), contents) : (0, _react2.jsx)("div", (0, _extends2.default)({}, sharedProps, rest), contents);
    }
  }]);
  return EuiFormRow;
}(_react.Component);

exports.EuiFormRow = EuiFormRow;
(0, _defineProperty2.default)(EuiFormRow, "defaultProps", {
  display: 'row',
  hasEmptyLabelSpace: false,
  fullWidth: false,
  describedByIds: [],
  labelType: 'label',
  hasChildLabel: true
});