"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiQuickSelect = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _services = require("../../../../services");

var _button = require("../../../button");

var _flex = require("../../../flex");

var _spacer = require("../../../spacer");

var _form = require("../../../form");

var _tool_tip = require("../../../tool_tip");

var _i18n = require("../../../i18n");

var _time_units = require("../time_units");

var _accessibility = require("../../../accessibility");

var _common = require("../../../common");

var _quick_select_utils = require("./quick_select_utils");

var _react2 = require("@emotion/react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var LAST = 'last';
var NEXT = 'next';
var timeTenseOptions = [{
  value: LAST,
  text: 'Last'
}, {
  value: NEXT,
  text: 'Next'
}];
var timeUnitsOptions = (0, _common.keysOf)(_time_units.timeUnits).map(function (key) {
  return {
    value: key,
    text: "".concat(_time_units.timeUnits[key], "s")
  };
});

var EuiQuickSelect = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EuiQuickSelect, _Component);

  var _super = _createSuper(EuiQuickSelect);

  function EuiQuickSelect(props) {
    var _this;

    (0, _classCallCheck2.default)(this, EuiQuickSelect);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "generateId", (0, _services.htmlIdGenerator)());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "timeSelectionId", _this.generateId());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "legendId", _this.generateId());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onTimeTenseChange", function (event) {
      _this.setState({
        timeTense: event.target.value
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onTimeValueChange", function (event) {
      var sanitizedValue = parseInt(event.target.value, 10);

      _this.setState({
        timeValue: isNaN(sanitizedValue) ? 0 : sanitizedValue
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onTimeUnitsChange", function (event) {
      _this.setState({
        timeUnits: event.target.value
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleKeyDown", function (_ref) {
      var key = _ref.key;

      if (key === 'Enter') {
        _this.applyQuickSelect();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "applyQuickSelect", function () {
      var _this$state = _this.state,
          timeTense = _this$state.timeTense,
          timeValue = _this$state.timeValue,
          timeUnits = _this$state.timeUnits;

      if (timeTense === NEXT) {
        _this.props.applyTime({
          start: 'now',
          end: "now+".concat(timeValue).concat(timeUnits),
          quickSelect: _objectSpread({}, _this.state)
        });

        return;
      }

      _this.props.applyTime({
        start: "now-".concat(timeValue).concat(timeUnits),
        end: 'now',
        quickSelect: _objectSpread({}, _this.state)
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getBounds", function () {
      var startMoment = _datemath.default.parse(_this.props.start);

      var endMoment = _datemath.default.parse(_this.props.end, {
        roundUp: true
      });

      return {
        min: startMoment && startMoment.isValid() ? startMoment : (0, _moment.default)().subtract(15, 'minute'),
        max: endMoment && endMoment.isValid() ? endMoment : (0, _moment.default)()
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "stepForward", function () {
      var _this$getBounds = _this.getBounds(),
          min = _this$getBounds.min,
          max = _this$getBounds.max;

      var diff = max.diff(min);

      _this.props.applyTime({
        start: (0, _moment.default)(max).add(1, 'ms').toISOString(),
        end: (0, _moment.default)(max).add(diff + 1, 'ms').toISOString(),
        keepPopoverOpen: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "stepBackward", function () {
      var _this$getBounds2 = _this.getBounds(),
          min = _this$getBounds2.min,
          max = _this$getBounds2.max;

      var diff = max.diff(min);

      _this.props.applyTime({
        start: (0, _moment.default)(min).subtract(diff + 1, 'ms').toISOString(),
        end: (0, _moment.default)(min).subtract(1, 'ms').toISOString(),
        keepPopoverOpen: true
      });
    });

    var _parseTimeParts = (0, _quick_select_utils.parseTimeParts)(props.start, props.end),
        timeTenseDefault = _parseTimeParts.timeTense,
        timeUnitsDefault = _parseTimeParts.timeUnits,
        timeValueDefault = _parseTimeParts.timeValue;

    _this.state = {
      timeTense: props.prevQuickSelect && props.prevQuickSelect.timeTense ? props.prevQuickSelect.timeTense : timeTenseDefault,
      timeValue: props.prevQuickSelect && props.prevQuickSelect.timeValue ? props.prevQuickSelect.timeValue : timeValueDefault,
      timeUnits: props.prevQuickSelect && props.prevQuickSelect.timeUnits ? props.prevQuickSelect.timeUnits : timeUnitsDefault
    };
    return _this;
  }

  (0, _createClass2.default)(EuiQuickSelect, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          timeTense = _this$state2.timeTense,
          timeValue = _this$state2.timeValue,
          timeUnits = _this$state2.timeUnits;
      var matchedTimeUnit = timeUnitsOptions.find(function (_ref2) {
        var value = _ref2.value;
        return value === timeUnits;
      });
      var timeUnit = matchedTimeUnit ? matchedTimeUnit.text : '';
      return (0, _react2.jsx)("fieldset", null, (0, _react2.jsx)(_i18n.EuiI18n, {
        token: "euiQuickSelect.legendText",
        default: "Quick select a time range"
      }, function (legendText) {
        return (// Legend needs to be the first thing in a fieldset, but we want the visible title within the flex.
          // So we hide it, but allow screen readers to see it
          (0, _react2.jsx)(_accessibility.EuiScreenReaderOnly, null, (0, _react2.jsx)("legend", {
            id: _this2.legendId,
            className: "euiFormLabel"
          }, legendText))
        );
      }), (0, _react2.jsx)(_flex.EuiFlexGroup, {
        responsive: false,
        alignItems: "center",
        justifyContent: "spaceBetween",
        gutterSize: "s"
      }, (0, _react2.jsx)(_flex.EuiFlexItem, {
        grow: false
      }, (0, _react2.jsx)(_i18n.EuiI18n, {
        token: "euiQuickSelect.quickSelectTitle",
        default: "Quick select"
      }, function (quickSelectTitle) {
        return (0, _react2.jsx)("div", {
          "aria-hidden": true,
          className: "euiFormLabel"
        }, quickSelectTitle);
      })), (0, _react2.jsx)(_flex.EuiFlexItem, {
        grow: false
      }, (0, _react2.jsx)(_flex.EuiFlexGroup, {
        alignItems: "center",
        gutterSize: "s",
        responsive: false
      }, (0, _react2.jsx)(_flex.EuiFlexItem, {
        grow: false
      }, (0, _react2.jsx)(_i18n.EuiI18n, {
        token: "euiQuickSelect.previousLabel",
        default: "Previous time window"
      }, function (previousLabel) {
        return (0, _react2.jsx)(_tool_tip.EuiToolTip, {
          content: previousLabel
        }, (0, _react2.jsx)(_button.EuiButtonIcon, {
          "aria-label": previousLabel,
          iconType: "arrowLeft",
          onClick: _this2.stepBackward
        }));
      })), (0, _react2.jsx)(_flex.EuiFlexItem, {
        grow: false
      }, (0, _react2.jsx)(_i18n.EuiI18n, {
        token: "euiQuickSelect.nextLabel",
        default: "Next time window"
      }, function (nextLabel) {
        return (0, _react2.jsx)(_tool_tip.EuiToolTip, {
          content: nextLabel
        }, (0, _react2.jsx)(_button.EuiButtonIcon, {
          "aria-label": nextLabel,
          iconType: "arrowRight",
          onClick: _this2.stepForward
        }));
      }))))), (0, _react2.jsx)(_spacer.EuiSpacer, {
        size: "s"
      }), (0, _react2.jsx)(_flex.EuiFlexGroup, {
        gutterSize: "s",
        responsive: false
      }, (0, _react2.jsx)(_flex.EuiFlexItem, null, (0, _react2.jsx)(_i18n.EuiI18n, {
        token: "euiQuickSelect.tenseLabel",
        default: "Time tense"
      }, function (tenseLabel) {
        return (0, _react2.jsx)(_form.EuiSelect, {
          compressed: true,
          onKeyDown: _this2.handleKeyDown,
          "aria-label": tenseLabel,
          "aria-describedby": "".concat(_this2.timeSelectionId, " ").concat(_this2.legendId),
          value: timeTense,
          options: timeTenseOptions,
          onChange: _this2.onTimeTenseChange
        });
      })), (0, _react2.jsx)(_flex.EuiFlexItem, null, (0, _react2.jsx)(_i18n.EuiI18n, {
        token: "euiQuickSelect.valueLabel",
        default: "Time value"
      }, function (valueLabel) {
        return (0, _react2.jsx)(_form.EuiFieldNumber, {
          compressed: true,
          onKeyDown: _this2.handleKeyDown,
          "aria-describedby": "".concat(_this2.timeSelectionId, " ").concat(_this2.legendId),
          "aria-label": valueLabel,
          value: timeValue,
          onChange: _this2.onTimeValueChange
        });
      })), (0, _react2.jsx)(_flex.EuiFlexItem, null, (0, _react2.jsx)(_i18n.EuiI18n, {
        token: "euiQuickSelect.unitLabel",
        default: "Time unit"
      }, function (unitLabel) {
        return (0, _react2.jsx)(_form.EuiSelect, {
          compressed: true,
          onKeyDown: _this2.handleKeyDown,
          "aria-label": unitLabel,
          "aria-describedby": "".concat(_this2.timeSelectionId, " ").concat(_this2.legendId),
          value: timeUnits,
          options: timeUnitsOptions,
          onChange: _this2.onTimeUnitsChange
        });
      })), (0, _react2.jsx)(_flex.EuiFlexItem, {
        grow: false
      }, (0, _react2.jsx)(_button.EuiButton, {
        "aria-describedby": "".concat(this.timeSelectionId, " ").concat(this.legendId),
        className: "euiQuickSelect__applyButton",
        size: "s",
        onClick: this.applyQuickSelect,
        disabled: timeValue <= 0
      }, (0, _react2.jsx)(_i18n.EuiI18n, {
        token: "euiQuickSelect.applyButton",
        default: "Apply"
      })))), (0, _react2.jsx)(_accessibility.EuiScreenReaderOnly, null, (0, _react2.jsx)("p", {
        id: this.timeSelectionId
      }, (0, _react2.jsx)(_i18n.EuiI18n, {
        token: "euiQuickSelect.fullDescription",
        default: "Currently set to {timeTense} {timeValue} {timeUnit}.",
        values: {
          timeTense: timeTense,
          timeValue: timeValue,
          timeUnit: timeUnit
        }
      }))));
    }
  }]);
  return EuiQuickSelect;
}(_react.Component);

exports.EuiQuickSelect = EuiQuickSelect;