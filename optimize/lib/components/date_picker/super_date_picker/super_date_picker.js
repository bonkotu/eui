"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "prettyDuration", {
  enumerable: true,
  get: function get() {
    return _pretty_duration.prettyDuration;
  }
});
Object.defineProperty(exports, "commonDurationRanges", {
  enumerable: true,
  get: function get() {
    return _pretty_duration.commonDurationRanges;
  }
});
exports.EuiSuperDatePicker = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _moment = _interopRequireDefault(require("moment"));

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _context = require("../../context");

var _date_picker_range = require("../date_picker_range");

var _form = require("../../form");

var _flex = require("../../flex");

var _pretty_duration = require("./pretty_duration");

var _async_interval = require("./async_interval");

var _super_update_button = require("./super_update_button");

var _quick_select_popover = require("./quick_select_popover/quick_select_popover");

var _date_popover_button = require("./date_popover/date_popover_button");

var _auto_refresh = require("../auto_refresh/auto_refresh");

var _react2 = require("@emotion/react");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function isRangeInvalid(start, end) {
  if (start === 'now' && end === 'now') {
    return true;
  }

  var startMoment = _datemath.default.parse(start);

  var endMoment = _datemath.default.parse(end, {
    roundUp: true
  });

  var isInvalid = !startMoment || !endMoment || !startMoment.isValid() || !endMoment.isValid() || !(0, _moment.default)(startMoment).isValid() || !(0, _moment.default)(endMoment).isValid() || startMoment.isAfter(endMoment);
  return isInvalid;
}

var EuiSuperDatePicker = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EuiSuperDatePicker, _Component);

  var _super = _createSuper(EuiSuperDatePicker);

  function EuiSuperDatePicker() {
    var _this;

    (0, _classCallCheck2.default)(this, EuiSuperDatePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "asyncInterval", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      prevProps: {
        start: _this.props.start,
        end: _this.props.end
      },
      start: _this.props.start,
      end: _this.props.end,
      isInvalid: isRangeInvalid(_this.props.start, _this.props.end),
      hasChanged: false,
      showPrettyDuration: (0, _pretty_duration.showPrettyDuration)(_this.props.start, _this.props.end, _this.props.commonlyUsedRanges),
      isStartDatePopoverOpen: false,
      isEndDatePopoverOpen: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setTime", function (_ref) {
      var end = _ref.end,
          start = _ref.start;
      var isInvalid = isRangeInvalid(start, end);

      _this.setState({
        start: start,
        end: end,
        isInvalid: isInvalid,
        hasChanged: !(_this.state.prevProps.start === start && _this.state.prevProps.end === end)
      });

      if (!_this.props.showUpdateButton) {
        _this.props.onTimeChange({
          start: start,
          end: end,
          isQuickSelection: false,
          isInvalid: isInvalid
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "componentDidMount", function () {
      if (!_this.props.isPaused) {
        _this.startInterval(_this.props.refreshInterval);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "componentDidUpdate", function () {
      _this.stopInterval();

      if (!_this.props.isPaused) {
        _this.startInterval(_this.props.refreshInterval);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "componentWillUnmount", function () {
      _this.stopInterval();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setStart", function (start) {
      _this.setTime({
        start: start,
        end: _this.state.end
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setEnd", function (end) {
      _this.setTime({
        start: _this.state.start,
        end: end
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "applyTime", function () {
      _this.props.onTimeChange({
        start: _this.state.start,
        end: _this.state.end,
        isQuickSelection: false,
        isInvalid: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "applyQuickTime", function (_ref2) {
      var start = _ref2.start,
          end = _ref2.end;

      _this.setState({
        showPrettyDuration: (0, _pretty_duration.showPrettyDuration)(start, end, _pretty_duration.commonDurationRanges)
      });

      _this.props.onTimeChange({
        start: start,
        end: end,
        isQuickSelection: true,
        isInvalid: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "hidePrettyDuration", function () {
      _this.setState({
        showPrettyDuration: false,
        isStartDatePopoverOpen: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onStartDatePopoverToggle", function () {
      _this.setState(function (prevState) {
        return {
          isStartDatePopoverOpen: !prevState.isStartDatePopoverOpen
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onStartDatePopoverClose", function () {
      _this.setState({
        isStartDatePopoverOpen: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onEndDatePopoverToggle", function () {
      _this.setState(function (prevState) {
        return {
          isEndDatePopoverOpen: !prevState.isEndDatePopoverOpen
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onEndDatePopoverClose", function () {
      _this.setState({
        isEndDatePopoverOpen: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onRefreshChange", function (_ref3) {
      var refreshInterval = _ref3.refreshInterval,
          isPaused = _ref3.isPaused;

      _this.stopInterval();

      if (!isPaused) {
        _this.startInterval(refreshInterval);
      }

      if (_this.props.onRefreshChange) {
        _this.props.onRefreshChange({
          refreshInterval: refreshInterval,
          isPaused: isPaused
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "stopInterval", function () {
      if (_this.asyncInterval) {
        _this.asyncInterval.stop();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "startInterval", function (refreshInterval) {
      var onRefresh = _this.props.onRefresh;

      if (onRefresh) {
        var handler = function handler() {
          var _this$props = _this.props,
              start = _this$props.start,
              end = _this$props.end;
          onRefresh({
            start: start,
            end: end,
            refreshInterval: refreshInterval
          });
        };

        _this.asyncInterval = new _async_interval.AsyncInterval(handler, refreshInterval);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderDatePickerRange", function () {
      var _this$state = _this.state,
          end = _this$state.end,
          hasChanged = _this$state.hasChanged,
          isEndDatePopoverOpen = _this$state.isEndDatePopoverOpen,
          isInvalid = _this$state.isInvalid,
          isStartDatePopoverOpen = _this$state.isStartDatePopoverOpen,
          showPrettyDuration = _this$state.showPrettyDuration,
          start = _this$state.start;
      var _this$props2 = _this.props,
          commonlyUsedRanges = _this$props2.commonlyUsedRanges,
          dateFormat = _this$props2.dateFormat,
          isDisabled = _this$props2.isDisabled,
          locale = _this$props2.locale,
          timeFormat = _this$props2.timeFormat,
          utcOffset = _this$props2.utcOffset,
          compressed = _this$props2.compressed;

      if (showPrettyDuration && !isStartDatePopoverOpen && !isEndDatePopoverOpen) {
        return (0, _react2.jsx)(_date_picker_range.EuiDatePickerRange, {
          className: "euiDatePickerRange--inGroup",
          iconType: false,
          isCustom: true,
          startDateControl: (0, _react2.jsx)("div", null),
          endDateControl: (0, _react2.jsx)("div", null)
        }, (0, _react2.jsx)("button", {
          className: (0, _classnames.default)('euiSuperDatePicker__prettyFormat', {
            'euiSuperDatePicker__prettyFormat--disabled': isDisabled
          }),
          "data-test-subj": "superDatePickerShowDatesButton",
          disabled: isDisabled,
          onClick: _this.hidePrettyDuration
        }, (0, _pretty_duration.prettyDuration)(start, end, commonlyUsedRanges, dateFormat)));
      }

      return (0, _react2.jsx)(_context.EuiI18nConsumer, null, function (_ref4) {
        var contextLocale = _ref4.locale;
        return (0, _react2.jsx)(_date_picker_range.EuiDatePickerRange, {
          className: "euiDatePickerRange--inGroup",
          iconType: false,
          isCustom: true,
          startDateControl: (0, _react2.jsx)(_date_popover_button.EuiDatePopoverButton, {
            className: "euiSuperDatePicker__startPopoverButton",
            compressed: compressed,
            position: "start",
            needsUpdating: hasChanged,
            isInvalid: isInvalid,
            isDisabled: isDisabled,
            onChange: _this.setStart,
            value: start,
            dateFormat: dateFormat,
            utcOffset: utcOffset,
            timeFormat: timeFormat,
            locale: locale || contextLocale,
            isOpen: _this.state.isStartDatePopoverOpen,
            onPopoverToggle: _this.onStartDatePopoverToggle,
            onPopoverClose: _this.onStartDatePopoverClose
          }),
          endDateControl: (0, _react2.jsx)(_date_popover_button.EuiDatePopoverButton, {
            position: "end",
            compressed: compressed,
            needsUpdating: hasChanged,
            isInvalid: isInvalid,
            isDisabled: isDisabled,
            onChange: _this.setEnd,
            value: end,
            dateFormat: dateFormat,
            utcOffset: utcOffset,
            timeFormat: timeFormat,
            locale: locale || contextLocale,
            roundUp: true,
            isOpen: _this.state.isEndDatePopoverOpen,
            onPopoverToggle: _this.onEndDatePopoverToggle,
            onPopoverClose: _this.onEndDatePopoverClose
          })
        });
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleClickUpdateButton", function () {
      if (!_this.state.hasChanged && _this.props.onRefresh) {
        var _this$props3 = _this.props,
            start = _this$props3.start,
            end = _this$props3.end,
            refreshInterval = _this$props3.refreshInterval;

        _this.props.onRefresh({
          start: start,
          end: end,
          refreshInterval: refreshInterval
        });
      } else {
        _this.applyTime();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderUpdateButton", function () {
      var _this$props4 = _this.props,
          isLoading = _this$props4.isLoading,
          isDisabled = _this$props4.isDisabled,
          updateButtonProps = _this$props4.updateButtonProps,
          showUpdateButton = _this$props4.showUpdateButton,
          compressed = _this$props4.compressed;
      if (!showUpdateButton) return null;
      return (0, _react2.jsx)(_flex.EuiFlexItem, {
        grow: false
      }, (0, _react2.jsx)(_super_update_button.EuiSuperUpdateButton, (0, _extends2.default)({
        needsUpdate: _this.state.hasChanged,
        showTooltip: !_this.state.isStartDatePopoverOpen && !_this.state.isEndDatePopoverOpen,
        isLoading: isLoading,
        isDisabled: isDisabled || _this.state.isInvalid,
        onClick: _this.handleClickUpdateButton,
        "data-test-subj": "superDatePickerApplyTimeButton",
        size: compressed ? 's' : 'm',
        iconOnly: showUpdateButton === 'iconOnly'
      }, updateButtonProps)));
    });
    return _this;
  }

  (0, _createClass2.default)(EuiSuperDatePicker, [{
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          commonlyUsedRanges = _this$props5.commonlyUsedRanges,
          customQuickSelectPanels = _this$props5.customQuickSelectPanels,
          dateFormat = _this$props5.dateFormat,
          end = _this$props5.end,
          isAutoRefreshOnly = _this$props5.isAutoRefreshOnly,
          isDisabled = _this$props5.isDisabled,
          isPaused = _this$props5.isPaused,
          onRefreshChange = _this$props5.onRefreshChange,
          recentlyUsedRanges = _this$props5.recentlyUsedRanges,
          refreshInterval = _this$props5.refreshInterval,
          showUpdateButton = _this$props5.showUpdateButton,
          start = _this$props5.start,
          dataTestSubj = _this$props5['data-test-subj'],
          _width = _this$props5.width,
          isQuickSelectOnly = _this$props5.isQuickSelectOnly,
          compressed = _this$props5.compressed; // Force reduction in width if showing quick select only

      var width = isQuickSelectOnly ? 'auto' : _width;
      var autoRefreshAppend = !isPaused ? (0, _react2.jsx)(_auto_refresh.EuiAutoRefreshButton, {
        className: "euiFormControlLayout__append",
        refreshInterval: refreshInterval,
        isDisabled: isDisabled,
        isPaused: isPaused,
        onRefreshChange: this.onRefreshChange,
        shortHand: true
      }) : undefined;
      var quickSelect = (0, _react2.jsx)(_quick_select_popover.EuiQuickSelectPopover, {
        applyRefreshInterval: onRefreshChange ? this.onRefreshChange : undefined,
        applyTime: this.applyQuickTime,
        commonlyUsedRanges: commonlyUsedRanges,
        customQuickSelectPanels: customQuickSelectPanels,
        dateFormat: dateFormat,
        end: end,
        isDisabled: isDisabled,
        isPaused: isPaused,
        recentlyUsedRanges: recentlyUsedRanges,
        refreshInterval: refreshInterval,
        start: start
      });
      var flexWrapperClasses = (0, _classnames.default)('euiSuperDatePicker__flexWrapper', {
        'euiSuperDatePicker__flexWrapper--noUpdateButton': !showUpdateButton,
        'euiSuperDatePicker__flexWrapper--isAutoRefreshOnly': isAutoRefreshOnly,
        'euiSuperDatePicker__flexWrapper--isQuickSelectOnly': isQuickSelectOnly,
        'euiSuperDatePicker__flexWrapper--fullWidth': width === 'full',
        'euiSuperDatePicker__flexWrapper--autoWidth': width === 'auto'
      });
      return (0, _react2.jsx)(_flex.EuiFlexGroup, {
        gutterSize: "s",
        responsive: false,
        className: flexWrapperClasses
      }, isAutoRefreshOnly && onRefreshChange ? (0, _react2.jsx)(_flex.EuiFlexItem, null, (0, _react2.jsx)(_auto_refresh.EuiAutoRefresh, {
        isPaused: isPaused,
        refreshInterval: refreshInterval,
        onRefreshChange: onRefreshChange,
        fullWidth: width === 'full',
        compressed: compressed,
        isDisabled: isDisabled,
        "data-test-subj": dataTestSubj
      })) : (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_flex.EuiFlexItem, null, (0, _react2.jsx)(_form.EuiFormControlLayout, {
        className: "euiSuperDatePicker",
        compressed: compressed,
        isDisabled: isDisabled,
        prepend: quickSelect,
        append: autoRefreshAppend,
        "data-test-subj": dataTestSubj
      }, !isQuickSelectOnly && this.renderDatePickerRange())), this.renderUpdateButton()));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.start !== prevState.prevProps.start || nextProps.end !== prevState.prevProps.end) {
        return {
          prevProps: {
            start: nextProps.start,
            end: nextProps.end
          },
          start: nextProps.start,
          end: nextProps.end,
          isInvalid: isRangeInvalid(nextProps.start, nextProps.end),
          hasChanged: false,
          showPrettyDuration: (0, _pretty_duration.showPrettyDuration)(nextProps.start, nextProps.end, nextProps.commonlyUsedRanges)
        };
      }

      return null;
    }
  }]);
  return EuiSuperDatePicker;
}(_react.Component);

exports.EuiSuperDatePicker = EuiSuperDatePicker;
(0, _defineProperty2.default)(EuiSuperDatePicker, "defaultProps", {
  commonlyUsedRanges: _pretty_duration.commonDurationRanges,
  dateFormat: 'MMM D, YYYY @ HH:mm:ss.SSS',
  end: 'now',
  isAutoRefreshOnly: false,
  isDisabled: false,
  isPaused: true,
  recentlyUsedRanges: [],
  refreshInterval: 1000,
  showUpdateButton: true,
  start: 'now-15m',
  timeFormat: 'HH:mm',
  width: 'restricted'
});