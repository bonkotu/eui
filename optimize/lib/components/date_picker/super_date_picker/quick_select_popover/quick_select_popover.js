"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiQuickSelectPopover = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _button = require("../../../button");

var _icon = require("../../../icon");

var _popover = require("../../../popover");

var _title = require("../../../title");

var _spacer = require("../../../spacer");

var _horizontal_rule = require("../../../horizontal_rule");

var _text = require("../../../text");

var _quick_select = require("./quick_select");

var _commonly_used_time_ranges = require("./commonly_used_time_ranges");

var _recently_used = require("./recently_used");

var _refresh_interval = require("../../auto_refresh/refresh_interval");

var _react2 = require("@emotion/react");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EuiQuickSelectPopover = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EuiQuickSelectPopover, _Component);

  var _super = _createSuper(EuiQuickSelectPopover);

  function EuiQuickSelectPopover() {
    var _this;

    (0, _classCallCheck2.default)(this, EuiQuickSelectPopover);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      isOpen: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "closePopover", function () {
      _this.setState({
        isOpen: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "togglePopover", function () {
      _this.setState(function (prevState) {
        return {
          isOpen: !prevState.isOpen
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "applyTime", function (_ref) {
      var start = _ref.start,
          end = _ref.end,
          quickSelect = _ref.quickSelect,
          _ref$keepPopoverOpen = _ref.keepPopoverOpen,
          keepPopoverOpen = _ref$keepPopoverOpen === void 0 ? false : _ref$keepPopoverOpen;

      _this.props.applyTime({
        start: start,
        end: end
      });

      if (quickSelect) {
        _this.setState({
          prevQuickSelect: quickSelect
        });
      }

      if (!keepPopoverOpen) {
        _this.closePopover();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderDateTimeSections", function () {
      var _this$props = _this.props,
          commonlyUsedRanges = _this$props.commonlyUsedRanges,
          dateFormat = _this$props.dateFormat,
          end = _this$props.end,
          recentlyUsedRanges = _this$props.recentlyUsedRanges,
          start = _this$props.start;
      var prevQuickSelect = _this.state.prevQuickSelect;
      return (0, _react2.jsx)(_react.Fragment, null, (0, _react2.jsx)(_quick_select.EuiQuickSelect, {
        applyTime: _this.applyTime,
        start: start,
        end: end,
        prevQuickSelect: prevQuickSelect
      }), commonlyUsedRanges.length > 0 && (0, _react2.jsx)(_horizontal_rule.EuiHorizontalRule, {
        margin: "s"
      }), (0, _react2.jsx)(_commonly_used_time_ranges.EuiCommonlyUsedTimeRanges, {
        applyTime: _this.applyTime,
        commonlyUsedRanges: commonlyUsedRanges
      }), recentlyUsedRanges.length > 0 && (0, _react2.jsx)(_horizontal_rule.EuiHorizontalRule, {
        margin: "s"
      }), (0, _react2.jsx)(_recently_used.EuiRecentlyUsed, {
        applyTime: _this.applyTime,
        commonlyUsedRanges: commonlyUsedRanges,
        dateFormat: dateFormat,
        recentlyUsedRanges: recentlyUsedRanges
      }), _this.renderCustomQuickSelectPanels());
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderCustomQuickSelectPanels", function () {
      var customQuickSelectPanels = _this.props.customQuickSelectPanels;

      if (!customQuickSelectPanels) {
        return null;
      }

      return customQuickSelectPanels.map(function (_ref2) {
        var title = _ref2.title,
            content = _ref2.content;
        return (0, _react2.jsx)(_react.Fragment, {
          key: title
        }, (0, _react2.jsx)(_horizontal_rule.EuiHorizontalRule, {
          margin: "s"
        }), (0, _react2.jsx)(_title.EuiTitle, {
          size: "xxxs"
        }, (0, _react2.jsx)("span", null, title)), (0, _react2.jsx)(_spacer.EuiSpacer, {
          size: "xs"
        }), (0, _react2.jsx)(_text.EuiText, {
          size: "s",
          className: "euiQuickSelectPopover__section"
        }, /*#__PURE__*/_react.default.cloneElement(content, {
          applyTime: _this.applyTime
        })));
      });
    });
    return _this;
  }

  (0, _createClass2.default)(EuiQuickSelectPopover, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          applyRefreshInterval = _this$props2.applyRefreshInterval,
          isDisabled = _this$props2.isDisabled,
          isPaused = _this$props2.isPaused,
          refreshInterval = _this$props2.refreshInterval;
      var isOpen = this.state.isOpen;
      var quickSelectButton = (0, _react2.jsx)(_button.EuiButtonEmpty, {
        className: "euiFormControlLayout__prepend",
        textProps: {
          className: 'euiQuickSelectPopover__buttonText'
        },
        onClick: this.togglePopover,
        "aria-label": "Date quick select",
        size: "xs",
        iconType: "arrowDown",
        iconSide: "right",
        isDisabled: isDisabled,
        "data-test-subj": "superDatePickerToggleQuickMenuButton"
      }, (0, _react2.jsx)(_icon.EuiIcon, {
        type: "calendar"
      }));
      return (0, _react2.jsx)(_popover.EuiPopover, {
        button: quickSelectButton,
        isOpen: isOpen,
        closePopover: this.closePopover,
        anchorPosition: "downLeft",
        anchorClassName: "euiQuickSelectPopover__anchor"
      }, (0, _react2.jsx)("div", {
        className: "euiQuickSelectPopover__content",
        "data-test-subj": "superDatePickerQuickMenu"
      }, this.renderDateTimeSections(), applyRefreshInterval && (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_horizontal_rule.EuiHorizontalRule, {
        margin: "s"
      }), (0, _react2.jsx)(_refresh_interval.EuiRefreshInterval, {
        onRefreshChange: applyRefreshInterval,
        isPaused: isPaused,
        refreshInterval: refreshInterval
      }))));
    }
  }]);
  return EuiQuickSelectPopover;
}(_react.Component);

exports.EuiQuickSelectPopover = EuiQuickSelectPopover;