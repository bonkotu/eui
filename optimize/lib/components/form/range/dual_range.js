"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiDualRange = void 0;

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

var _number = require("../../../services/number");

var _popover = require("../../popover");

var _form_control_layout = require("../form_control_layout");

var _accessibility = require("../../../services/accessibility");

var _range_draggable = require("./range_draggable");

var _range_highlight = require("./range_highlight");

var _range_input = require("./range_input");

var _range_label = require("./range_label");

var _range_slider = require("./range_slider");

var _range_thumb = require("./range_thumb");

var _range_track = require("./range_track");

var _range_wrapper = require("./range_wrapper");

var _utils = require("./utils");

var _react2 = require("@emotion/react");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EuiDualRange = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EuiDualRange, _Component);

  var _super = _createSuper(EuiDualRange);

  function EuiDualRange() {
    var _this;

    (0, _classCallCheck2.default)(this, EuiDualRange);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      id: _this.props.id || (0, _accessibility.htmlIdGenerator)()(),
      hasFocus: false,
      rangeSliderRefAvailable: false,
      isPopoverOpen: false,
      rangeWidth: undefined,
      isVisible: true // used to trigger a rerender if initial element width is 0

    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "preventPopoverClose", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "rangeSliderRef", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleRangeSliderRefUpdate", function (ref) {
      _this.rangeSliderRef = ref;

      _this.setState({
        rangeSliderRefAvailable: !!ref,
        rangeWidth: !!ref ? ref.clientWidth : null
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "leftPosition", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "dragAcc", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_determineInvalidThumbMovement", function (newVal, lower, upper, e) {
      // If the values are invalid, find whether the new value is in the upper
      // or lower half and move the appropriate handle to the new value,
      // while the other handle gets moved to the opposite bound (if invalid)
      var lowerHalf = Math.abs(_this.props.max - _this.props.min) / 2 + _this.props.min;

      var newValIsLow = (0, _number.isWithinRange)(_this.props.min, lowerHalf, newVal);

      if (newValIsLow) {
        lower = newVal;
        upper = !_this.upperValueIsValid ? _this.props.max : upper;
      } else {
        lower = !_this.lowerValueIsValid ? _this.props.min : lower;
        upper = newVal;
      }

      _this._handleOnChange(lower, upper, e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_determineValidThumbMovement", function (newVal, lower, upper, e) {
      // Lower thumb targeted or right-moving swap has occurred
      if (Math.abs(lower - newVal) < Math.abs(upper - newVal)) {
        lower = newVal;
      } // Upper thumb targeted or left-moving swap has occurred
      else {
          upper = newVal;
        }

      _this._handleOnChange(lower, upper, e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_determineThumbMovement", function (newVal, e) {
      // Determine thumb movement based on slider interaction
      if (!_this.isValid) {
        // Non-standard positioning follows
        _this._determineInvalidThumbMovement(newVal, _this.lowerValue, _this.upperValue, e);
      } else {
        // Standard positioning based on click event proximity to thumb locations
        _this._determineValidThumbMovement(newVal, _this.lowerValue, _this.upperValue, e);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_handleOnChange", function (lower, upper, e) {
      var isValid = (0, _number.isWithinRange)(_this.props.min, upper, lower) && (0, _number.isWithinRange)(lower, _this.props.max, upper);

      _this.props.onChange([lower, upper], isValid, e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleSliderChange", function (e) {
      _this._determineThumbMovement(Number(e.currentTarget.value), e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_resetToRangeEnds", function (e) {
      // Arbitrary decision to pass `min` instead of `max`. Result is the same.
      _this._determineInvalidThumbMovement(_this.props.min, _this.lowerValue, _this.upperValue, e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_isDirectionalKeyPress", function (event) {
      return [_services.keys.ARROW_UP, _services.keys.ARROW_RIGHT, _services.keys.ARROW_DOWN, _services.keys.ARROW_LEFT].indexOf(event.key) > -1;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleInputKeyDown", function (e) {
      // Relevant only when initial values are both `''` and `showInput` is set
      if (_this._isDirectionalKeyPress(e) && !_this.isValid) {
        e.preventDefault();

        _this._resetToRangeEnds(e);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleLowerInputChange", function (e) {
      _this._handleOnChange(e.target.value, _this.upperValue, e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleUpperInputChange", function (e) {
      _this._handleOnChange(_this.lowerValue, e.target.value, e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_handleKeyDown", function (value, event) {
      var newVal = Number(value);
      var stepRemainder = 0;
      var step = _this.props.step || 1;

      switch (event.key) {
        case _services.keys.ARROW_UP:
        case _services.keys.ARROW_RIGHT:
          event.preventDefault();
          newVal += step;
          stepRemainder = (newVal - _this.props.min) % step;

          if (step !== 1 && stepRemainder > 0) {
            newVal = newVal - stepRemainder;
          }

          break;

        case _services.keys.ARROW_DOWN:
        case _services.keys.ARROW_LEFT:
          event.preventDefault();
          newVal -= step;
          stepRemainder = (newVal - _this.props.min) % step;

          if (step !== 1 && stepRemainder > 0) {
            newVal = newVal + (step - stepRemainder);
          }

          break;
      }

      return newVal;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleLowerKeyDown", function (event) {
      var lower = _this.lowerValue;

      switch (event.key) {
        case _services.keys.TAB:
          return;

        default:
          if (!_this.lowerValueIsValid) {
            // Relevant only when initial value is `''` and `showInput` is not set
            event.preventDefault();

            _this._resetToRangeEnds(event);

            return;
          }

          lower = _this._handleKeyDown(lower, event);
      }

      if (lower >= _this.upperValue || lower < _this.props.min) return;

      _this._handleOnChange(lower, _this.upperValue, event);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleUpperKeyDown", function (event) {
      var upper = _this.upperValue;

      switch (event.key) {
        case _services.keys.TAB:
          return;

        default:
          if (!_this.upperValueIsValid) {
            // Relevant only when initial value is `''` and `showInput` is not set
            event.preventDefault();

            _this._resetToRangeEnds(event);

            return;
          }

          upper = _this._handleKeyDown(upper, event);
      }

      if (upper <= _this.lowerValue || upper > _this.props.max) return;

      _this._handleOnChange(_this.lowerValue, upper, event);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleDraggableKeyDown", function (event) {
      var lower = _this.lowerValue;
      var upper = _this.upperValue;

      switch (event.key) {
        case _services.keys.TAB:
          return;

        default:
          lower = _this._handleKeyDown(lower, event);
          upper = _this._handleKeyDown(upper, event);
      }

      if (lower >= _this.upperValue || lower < _this.props.min) return;
      if (upper <= _this.lowerValue || upper > _this.props.max) return;

      _this._handleOnChange(lower, upper, event);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "calculateThumbPositionStyle", function (value, width) {
      var trackWidth = _this.props.showInput === 'inputWithPopover' && !!width ? width : _this.rangeSliderRef.clientWidth;
      var position = (0, _utils.calculateThumbPosition)(value, _this.props.min, _this.props.max, trackWidth);
      return {
        left: "".concat(position, "%")
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "toggleHasFocus", function () {
      var shouldFocused = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !_this.state.hasFocus;

      _this.setState({
        hasFocus: shouldFocused
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onThumbFocus", function (e) {
      if (_this.props.onFocus) {
        _this.props.onFocus(e);
      }

      _this.toggleHasFocus(true);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onThumbBlur", function (e) {
      if (_this.props.onBlur) {
        _this.props.onBlur(e);
      }

      _this.toggleHasFocus(false);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onInputFocus", function (e) {
      if (_this.props.onFocus) {
        _this.props.onFocus(e);
      }

      _this.preventPopoverClose = true;

      _this.setState({
        isPopoverOpen: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onInputBlur", function (e) {
      return setTimeout(function () {
        // Safari does not recognize any focus-related eventing for input[type=range]
        // making it impossible to capture its state using active/focus/relatedTarget
        // Instead, a prevention flag is set on mousedown, with a waiting period here.
        // Mousedown is viable because in the popover case, it is inaccessible via keyboard (intentionally)
        if (_this.preventPopoverClose) {
          _this.preventPopoverClose = false;
          return;
        }

        if (_this.props.onBlur) {
          _this.props.onBlur(e);
        }

        _this.closePopover();
      }, 200);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "closePopover", function () {
      _this.preventPopoverClose = false;

      _this.setState({
        isPopoverOpen: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onResize", function (width) {
      _this.setState({
        rangeWidth: width
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getNearestStep", function (value) {
      var steps = (_this.props.max - _this.props.min) / _this.props.step;
      var approx = Math.round((value - _this.props.min) * steps / (_this.props.max - _this.props.min)) / steps;
      var bound = Math.min(Math.max(approx, 0), 1);
      var nearest = bound * (_this.props.max - _this.props.min) + _this.props.min;
      return Number(nearest.toPrecision(10)) * 100 / 100;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleDrag", function (x, isFirstInteraction) {
      if (isFirstInteraction) {
        _this.leftPosition = x;
        _this.dragAcc = 0;
      }

      var _this$props = _this.props,
          min = _this$props.min,
          max = _this$props.max;
      var lowerValue = Number(_this.lowerValue);
      var upperValue = Number(_this.upperValue);
      var delta = _this.leftPosition - x;
      _this.leftPosition = x;
      _this.dragAcc = _this.dragAcc + delta;
      var percentageOfArea = _this.dragAcc / _this.rangeSliderRef.clientWidth;
      var percentageOfRange = percentageOfArea * (max - min);

      var newLower = _this.getNearestStep(lowerValue - percentageOfRange);

      var newUpper = _this.getNearestStep(upperValue - percentageOfRange);

      var noMovement = newLower === lowerValue;
      var isMin = min === lowerValue && min === newLower;
      var isMax = max === upperValue && max === newUpper;
      var isOutOfRange = newLower < min || newUpper > max;
      if (noMovement || isMin || isMax || isOutOfRange) return;

      _this._handleOnChange(newLower, newUpper);

      _this.dragAcc = 0;
    });
    return _this;
  }

  (0, _createClass2.default)(EuiDualRange, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.rangeSliderRef && this.rangeSliderRef.clientWidth === 0) {
        // Safe to call `setState` inside conditional
        // https://reactjs.org/docs/react-component.html#componentdidmount
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
          isVisible: false
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$rangeSliderRef;

      if (((_this$rangeSliderRef = this.rangeSliderRef) === null || _this$rangeSliderRef === void 0 ? void 0 : _this$rangeSliderRef.clientWidth) && !this.state.isVisible) {
        // Safe to call `setState` inside conditional
        // https://reactjs.org/docs/react-component.html#componentdidupdate
        // eslint-disable-next-line  react/no-did-update-set-state
        this.setState({
          isVisible: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          compressed = _this$props2.compressed,
          disabled = _this$props2.disabled,
          fullWidth = _this$props2.fullWidth,
          readOnly = _this$props2.readOnly,
          propsId = _this$props2.id,
          max = _this$props2.max,
          min = _this$props2.min,
          name = _this$props2.name,
          step = _this$props2.step,
          showLabels = _this$props2.showLabels,
          showInput = _this$props2.showInput,
          showTicks = _this$props2.showTicks,
          tickInterval = _this$props2.tickInterval,
          ticks = _this$props2.ticks,
          levels = _this$props2.levels,
          onBlur = _this$props2.onBlur,
          onChange = _this$props2.onChange,
          onFocus = _this$props2.onFocus,
          showRange = _this$props2.showRange,
          value = _this$props2.value,
          style = _this$props2.style,
          isInvalid = _this$props2.isInvalid,
          append = _this$props2.append,
          prepend = _this$props2.prepend,
          minInputProps = _this$props2.minInputProps,
          maxInputProps = _this$props2.maxInputProps,
          isDraggable = _this$props2.isDraggable,
          rest = (0, _objectWithoutProperties2.default)(_this$props2, ["className", "compressed", "disabled", "fullWidth", "readOnly", "id", "max", "min", "name", "step", "showLabels", "showInput", "showTicks", "tickInterval", "ticks", "levels", "onBlur", "onChange", "onFocus", "showRange", "value", "style", "isInvalid", "append", "prepend", "minInputProps", "maxInputProps", "isDraggable"]);
      var id = this.state.id;
      var digitTolerance = Math.max(String(min).length, String(max).length);
      var showInputOnly = showInput === 'inputWithPopover';
      var canShowDropdown = showInputOnly && !readOnly && !disabled;
      var minInput = !!showInput ? (0, _react2.jsx)(_range_input.EuiRangeInput // Overridable props
      , (0, _extends2.default)({
        "aria-describedby": this.props['aria-describedby'],
        "aria-label": this.props['aria-label']
      }, minInputProps, {
        // Non-overridable props
        digitTolerance: digitTolerance,
        side: "min",
        min: min,
        max: Number(this.upperValue),
        step: step,
        value: this.lowerValue,
        disabled: disabled,
        compressed: compressed,
        onChange: this.handleLowerInputChange,
        onKeyDown: this.handleInputKeyDown,
        name: "".concat(name, "-minValue"),
        onFocus: canShowDropdown ? this.onInputFocus : onFocus,
        onBlur: canShowDropdown ? this.onInputBlur : onBlur,
        readOnly: readOnly,
        autoSize: !showInputOnly,
        fullWidth: !!showInputOnly && fullWidth,
        isInvalid: isInvalid,
        controlOnly: showInputOnly,
        onMouseDown: showInputOnly ? function () {
          return _this2.preventPopoverClose = true;
        } : undefined
      })) : undefined;
      var maxInput = !!showInput ? (0, _react2.jsx)(_range_input.EuiRangeInput // Overridable props
      , (0, _extends2.default)({
        "aria-describedby": this.props['aria-describedby'],
        "aria-label": this.props['aria-label']
      }, maxInputProps, {
        // Non-overridable props
        digitTolerance: digitTolerance,
        side: "max",
        min: Number(this.lowerValue),
        max: max,
        step: step,
        value: this.upperValue,
        disabled: disabled,
        compressed: compressed,
        onChange: this.handleUpperInputChange,
        onKeyDown: this.handleInputKeyDown,
        name: "".concat(name, "-maxValue"),
        onFocus: canShowDropdown ? this.onInputFocus : onFocus,
        onBlur: canShowDropdown ? this.onInputBlur : onBlur,
        readOnly: readOnly,
        autoSize: !showInputOnly,
        fullWidth: !!showInputOnly && fullWidth,
        controlOnly: showInputOnly,
        isInvalid: isInvalid,
        onMouseDown: showInputOnly ? function () {
          return _this2.preventPopoverClose = true;
        } : undefined
      })) : undefined;
      var classes = (0, _classnames.default)('euiDualRange', className);
      var leftThumbPosition = this.state.rangeSliderRefAvailable ? this.calculateThumbPositionStyle(Number(this.lowerValue) || min, this.state.rangeWidth) : {
        left: '0'
      };
      var rightThumbPosition = this.state.rangeSliderRefAvailable ? this.calculateThumbPositionStyle(Number(this.upperValue) || max, this.state.rangeWidth) : {
        left: '0'
      };
      var theRange = (0, _react2.jsx)(_range_wrapper.EuiRangeWrapper, {
        className: classes,
        fullWidth: fullWidth,
        compressed: compressed
      }, showInput && !showInputOnly && (0, _react2.jsx)(_react.default.Fragment, null, minInput, (0, _react2.jsx)("div", {
        className: showTicks || ticks ? 'euiRange__slimHorizontalSpacer' : 'euiRange__horizontalSpacer'
      })), showLabels && (0, _react2.jsx)(_range_label.EuiRangeLabel, {
        side: "min",
        disabled: disabled
      }, min), (0, _react2.jsx)(_range_track.EuiRangeTrack, {
        compressed: compressed,
        disabled: disabled,
        max: max,
        min: min,
        step: step,
        showTicks: showTicks,
        tickInterval: tickInterval,
        ticks: ticks,
        levels: levels,
        onChange: this.handleSliderChange,
        value: value,
        "aria-hidden": showInput === true
      }, (0, _react2.jsx)(_range_slider.EuiRangeSlider, (0, _extends2.default)({
        className: "euiDualRange__slider",
        ref: this.handleRangeSliderRefUpdate,
        id: id,
        name: name,
        min: min,
        max: max,
        step: step,
        disabled: disabled,
        compressed: compressed,
        onChange: this.handleSliderChange,
        style: style,
        showTicks: showTicks,
        hasFocus: this.state.hasFocus,
        "aria-hidden": true,
        tabIndex: -1,
        showRange: showRange,
        onFocus: onFocus,
        onBlur: onBlur
      }, rest)), showRange && this.isValid && (0, _react2.jsx)(_range_highlight.EuiRangeHighlight, {
        compressed: compressed,
        hasFocus: this.state.hasFocus,
        showTicks: showTicks,
        min: Number(min),
        max: Number(max),
        lowerValue: Number(this.lowerValue),
        upperValue: Number(this.upperValue)
      }), this.state.rangeSliderRefAvailable && (0, _react2.jsx)(_react.default.Fragment, null, isDraggable && this.isValid && (0, _react2.jsx)(_range_draggable.EuiRangeDraggable, {
        min: min,
        max: max,
        value: [Number(this.lowerValue), Number(this.upperValue)],
        disabled: disabled,
        lowerPosition: leftThumbPosition.left,
        upperPosition: rightThumbPosition.left,
        showTicks: showTicks,
        compressed: compressed,
        onChange: this.handleDrag,
        onFocus: this.onThumbFocus,
        onBlur: this.onThumbBlur,
        onKeyDown: this.handleDraggableKeyDown,
        "aria-describedby": this.props['aria-describedby'],
        "aria-label": this.props['aria-label']
      }), (0, _react2.jsx)(_range_thumb.EuiRangeThumb, {
        min: min,
        max: Number(this.upperValue),
        value: this.lowerValue,
        disabled: disabled,
        showTicks: showTicks,
        showInput: !!showInput,
        onKeyDown: this.handleLowerKeyDown,
        onFocus: this.onThumbFocus,
        onBlur: this.onThumbBlur,
        style: leftThumbPosition,
        "aria-describedby": this.props['aria-describedby'],
        "aria-label": this.props['aria-label']
      }), (0, _react2.jsx)(_range_thumb.EuiRangeThumb, {
        min: Number(this.lowerValue),
        max: max,
        value: this.upperValue,
        disabled: disabled,
        showTicks: showTicks,
        showInput: !!showInput,
        onKeyDown: this.handleUpperKeyDown,
        onFocus: this.onThumbFocus,
        onBlur: this.onThumbBlur,
        style: rightThumbPosition,
        "aria-describedby": this.props['aria-describedby'],
        "aria-label": this.props['aria-label']
      }))), showLabels && (0, _react2.jsx)(_range_label.EuiRangeLabel, {
        disabled: disabled
      }, max), showInput && !showInputOnly && (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("div", {
        className: showTicks || ticks ? 'euiRange__slimHorizontalSpacer' : 'euiRange__horizontalSpacer'
      }), maxInput));
      var thePopover = showInputOnly ? (0, _react2.jsx)(_popover.EuiInputPopover, {
        className: "euiRange__popover",
        input: (0, _react2.jsx)(_form_control_layout.EuiFormControlLayoutDelimited, {
          startControl: minInput,
          endControl: maxInput,
          isDisabled: disabled,
          fullWidth: fullWidth,
          compressed: compressed,
          readOnly: readOnly,
          append: append,
          prepend: prepend
        }),
        fullWidth: fullWidth,
        isOpen: this.state.isPopoverOpen,
        closePopover: this.closePopover,
        disableFocusTrap: true,
        onPanelResize: this.onResize
      }, theRange) : undefined;
      return thePopover || theRange;
    }
  }, {
    key: "lowerValue",
    get: function get() {
      return this.props.value ? this.props.value[0] : this.props.min;
    }
  }, {
    key: "upperValue",
    get: function get() {
      return this.props.value ? this.props.value[1] : this.props.max;
    }
  }, {
    key: "lowerValueIsValid",
    get: function get() {
      return (0, _number.isWithinRange)(this.props.min, this.upperValue, this.lowerValue);
    }
  }, {
    key: "upperValueIsValid",
    get: function get() {
      return (0, _number.isWithinRange)(this.lowerValue, this.props.max, this.upperValue);
    }
  }, {
    key: "isValid",
    get: function get() {
      return this.lowerValueIsValid && this.upperValueIsValid;
    }
  }]);
  return EuiDualRange;
}(_react.Component);

exports.EuiDualRange = EuiDualRange;
(0, _defineProperty2.default)(EuiDualRange, "defaultProps", {
  min: 0,
  max: 100,
  step: 1,
  fullWidth: false,
  compressed: false,
  showLabels: false,
  showInput: false,
  showRange: true,
  showTicks: false,
  levels: []
});