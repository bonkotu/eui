"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFilePicker = exports.DISPLAYS = void 0;

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

var _validatable_control = require("../validatable_control");

var _button = require("../../button");

var _progress = require("../../progress");

var _icon = require("../../icon");

var _i18n = require("../../i18n");

var _loading = require("../../loading");

var _accessibility = require("../../../services/accessibility");

var _react2 = require("@emotion/react");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var displayToClassNameMap = {
  default: null,
  large: 'euiFilePicker--large'
};
var DISPLAYS = (0, _common.keysOf)(displayToClassNameMap);
exports.DISPLAYS = DISPLAYS;

var EuiFilePicker = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EuiFilePicker, _Component);

  var _super = _createSuper(EuiFilePicker);

  function EuiFilePicker() {
    var _this;

    (0, _classCallCheck2.default)(this, EuiFilePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      promptText: null,
      isHoveringDrop: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "fileInput", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "generatedId", (0, _accessibility.htmlIdGenerator)()());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleChange", function () {
      if (!_this.fileInput) return;

      if (_this.fileInput.files && _this.fileInput.files.length > 1) {
        _this.setState({
          promptText: (0, _react2.jsx)(_i18n.EuiI18n, {
            token: "euiFilePicker.filesSelected",
            default: "{fileCount} files selected",
            values: {
              fileCount: _this.fileInput.files.length
            }
          })
        });
      } else if (_this.fileInput.files && _this.fileInput.files.length === 0) {
        _this.setState({
          promptText: null
        });
      } else {
        _this.setState({
          promptText: _this.fileInput.value.split('\\').pop()
        });
      }

      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(_this.fileInput.files);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "removeFiles", function (e) {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }

      if (!_this.fileInput) return;
      _this.fileInput.value = '';

      _this.handleChange();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "showDrop", function () {
      if (!_this.props.disabled) {
        _this.setState({
          isHoveringDrop: true
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "hideDrop", function () {
      _this.setState({
        isHoveringDrop: false
      });
    });
    return _this;
  }

  (0, _createClass2.default)(EuiFilePicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return (0, _react2.jsx)(_i18n.EuiI18n, {
        token: "euiFilePicker.clearSelectedFiles",
        default: "Clear selected files"
      }, function (clearSelectedFiles) {
        var _this2$props = _this2.props,
            id = _this2$props.id,
            name = _this2$props.name,
            initialPromptText = _this2$props.initialPromptText,
            className = _this2$props.className,
            disabled = _this2$props.disabled,
            compressed = _this2$props.compressed,
            onChange = _this2$props.onChange,
            isInvalid = _this2$props.isInvalid,
            fullWidth = _this2$props.fullWidth,
            isLoading = _this2$props.isLoading,
            display = _this2$props.display,
            rest = (0, _objectWithoutProperties2.default)(_this2$props, ["id", "name", "initialPromptText", "className", "disabled", "compressed", "onChange", "isInvalid", "fullWidth", "isLoading", "display"]);
        var promptId = "".concat(id || _this2.generatedId, "-filePicker__prompt");
        var isOverridingInitialPrompt = _this2.state.promptText != null;
        var normalFormControl = display === 'default';
        var classes = (0, _classnames.default)('euiFilePicker', displayToClassNameMap[display], {
          euiFilePicker__showDrop: _this2.state.isHoveringDrop,
          'euiFilePicker--compressed': compressed,
          'euiFilePicker--fullWidth': fullWidth,
          'euiFilePicker-isInvalid': isInvalid,
          'euiFilePicker-isLoading': isLoading,
          'euiFilePicker-hasFiles': isOverridingInitialPrompt
        }, className);
        var clearButton;

        if (isLoading && normalFormControl) {
          // Override clear button with loading spinner if it is in loading state
          clearButton = (0, _react2.jsx)(_loading.EuiLoadingSpinner, {
            className: "euiFilePicker__loadingSpinner"
          });
        } else if (isOverridingInitialPrompt) {
          if (normalFormControl) {
            clearButton = (0, _react2.jsx)("button", {
              type: "button",
              "aria-label": clearSelectedFiles,
              className: "euiFilePicker__clearButton",
              onClick: _this2.removeFiles
            }, (0, _react2.jsx)(_icon.EuiIcon, {
              className: "euiFilePicker__clearIcon",
              type: "cross"
            }));
          } else {
            clearButton = (0, _react2.jsx)(_button.EuiButtonEmpty, {
              "aria-label": clearSelectedFiles,
              className: "euiFilePicker__clearButton",
              size: "xs",
              onClick: _this2.removeFiles
            }, (0, _react2.jsx)(_i18n.EuiI18n, {
              token: "euiFilePicker.removeSelected",
              default: "Remove"
            }));
          }
        } else {
          clearButton = null;
        }

        var loader = !normalFormControl && isLoading && (0, _react2.jsx)(_progress.EuiProgress, {
          size: "xs",
          color: "accent",
          position: "absolute"
        });
        return (0, _react2.jsx)("div", {
          className: classes
        }, (0, _react2.jsx)("div", {
          className: "euiFilePicker__wrap"
        }, (0, _react2.jsx)(_validatable_control.EuiValidatableControl, {
          isInvalid: isInvalid
        }, (0, _react2.jsx)("input", (0, _extends2.default)({
          type: "file",
          id: id,
          name: name,
          className: "euiFilePicker__input",
          onChange: _this2.handleChange,
          ref: function ref(input) {
            _this2.fileInput = input;
          },
          onDragOver: _this2.showDrop,
          onDragLeave: _this2.hideDrop,
          onDrop: _this2.hideDrop,
          disabled: disabled,
          "aria-describedby": promptId
        }, rest))), (0, _react2.jsx)("div", {
          className: "euiFilePicker__prompt",
          id: promptId
        }, (0, _react2.jsx)(_icon.EuiIcon, {
          className: "euiFilePicker__icon",
          type: "importAction",
          size: normalFormControl ? 'm' : 'l',
          "aria-hidden": "true"
        }), (0, _react2.jsx)("div", {
          className: "euiFilePicker__promptText"
        }, _this2.state.promptText || initialPromptText), clearButton, loader)));
      });
    }
  }]);
  return EuiFilePicker;
}(_react.Component);

exports.EuiFilePicker = EuiFilePicker;
(0, _defineProperty2.default)(EuiFilePicker, "defaultProps", {
  initialPromptText: (0, _react2.jsx)(_i18n.EuiI18n, {
    token: "euiFilePicker.promptText",
    default: "Select or drag and drop a file"
  }),
  compressed: false,
  display: 'large'
});