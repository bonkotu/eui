"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiControlBar = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _accessibility = require("../accessibility");

var _breadcrumbs = require("../breadcrumbs");

var _button = require("../button");

var _i18n = require("../i18n");

var _icon = require("../icon");

var _portal = require("../portal");

var _react2 = require("@emotion/react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EuiControlBar = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EuiControlBar, _Component);

  var _super = _createSuper(EuiControlBar);

  function EuiControlBar() {
    var _this;

    (0, _classCallCheck2.default)(this, EuiControlBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "bar", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      selectedTab: ''
    });
    return _this;
  }

  (0, _createClass2.default)(EuiControlBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.position === 'fixed') {
        var height = this.bar ? this.bar.clientHeight : -1;
        document.body.style.paddingBottom = "".concat(height, "px");

        if (this.props.bodyClassName) {
          document.body.classList.add(this.props.bodyClassName);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.style.paddingBottom = '';

      if (this.props.bodyClassName) {
        document.body.classList.remove(this.props.bodyClassName);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          showContent = _this$props.showContent,
          controls = _this$props.controls,
          size = _this$props.size,
          leftOffset = _this$props.leftOffset,
          rightOffset = _this$props.rightOffset,
          maxHeight = _this$props.maxHeight,
          showOnMobile = _this$props.showOnMobile,
          style = _this$props.style,
          position = _this$props.position,
          bodyClassName = _this$props.bodyClassName,
          landmarkHeading = _this$props.landmarkHeading,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["children", "className", "showContent", "controls", "size", "leftOffset", "rightOffset", "maxHeight", "showOnMobile", "style", "position", "bodyClassName", "landmarkHeading"]);

      var styles = _objectSpread(_objectSpread({}, style), {}, {
        left: leftOffset,
        right: rightOffset,
        maxHeight: maxHeight
      });

      var classes = (0, _classnames.default)('euiControlBar', className, {
        'euiControlBar-isOpen': showContent,
        'euiControlBar--large': size === 'l',
        'euiControlBar--medium': size === 'm',
        'euiControlBar--small': size === 's',
        'euiControlBar--fixed': position === 'fixed',
        'euiControlBar--absolute': position === 'absolute',
        'euiControlBar--relative': position === 'relative',
        'euiControlBar--showOnMobile': showOnMobile
      });

      var handleTabClick = function handleTabClick(control, e) {
        _this2.setState({
          selectedTab: control.id
        }, function () {
          control.onClick(e);
        });
      };

      var controlItem = function controlItem(control, index) {
        switch (control.controlType) {
          case 'button':
            {
              var controlType = control.controlType,
                  id = control.id,
                  _control$color = control.color,
                  color = _control$color === void 0 ? 'ghost' : _control$color,
                  label = control.label,
                  _className = control.className,
                  _rest = (0, _objectWithoutProperties2.default)(control, ["controlType", "id", "color", "label", "className"]);

              return (0, _react2.jsx)(_button.EuiButton, (0, _extends2.default)({
                key: id + index,
                className: (0, _classnames.default)('euiControlBar__button', _className),
                color: color
              }, _rest, {
                size: "s"
              }), label);
            }

          case 'icon':
            {
              var _controlType = control.controlType,
                  _id = control.id,
                  iconType = control.iconType,
                  _className2 = control.className,
                  _control$color2 = control.color,
                  _color = _control$color2 === void 0 ? 'ghost' : _control$color2,
                  onClick = control.onClick,
                  href = control.href,
                  _rest2 = (0, _objectWithoutProperties2.default)(control, ["controlType", "id", "iconType", "className", "color", "onClick", "href"]);

              return onClick || href ? (0, _react2.jsx)(_button.EuiButtonIcon, (0, _extends2.default)({
                key: _id + index,
                className: (0, _classnames.default)('euiControlBar__buttonIcon', _className2),
                onClick: onClick,
                href: href,
                color: _color
              }, _rest2, {
                iconType: iconType
              })) : (0, _react2.jsx)(_icon.EuiIcon, (0, _extends2.default)({
                key: _id + index,
                className: (0, _classnames.default)('euiControlBar__icon', _className2),
                type: iconType,
                color: _color
              }, _rest2));
            }

          case 'divider':
            return (0, _react2.jsx)("div", {
              key: control.controlType + index,
              className: "euiControlBar__divider"
            });

          case 'spacer':
            return (0, _react2.jsx)("div", {
              key: control.controlType + index,
              className: "euiControlBar__spacer"
            });

          case 'text':
            {
              var _controlType2 = control.controlType,
                  _id2 = control.id,
                  text = control.text,
                  _className3 = control.className,
                  _rest3 = (0, _objectWithoutProperties2.default)(control, ["controlType", "id", "text", "className"]);

              return (0, _react2.jsx)("div", (0, _extends2.default)({
                key: _id2,
                className: (0, _classnames.default)('euiControlBar__text', _className3)
              }, _rest3), text);
            }

          case 'tab':
            {
              var _controlType3 = control.controlType,
                  _id3 = control.id,
                  _label = control.label,
                  _onClick = control.onClick,
                  _className4 = control.className,
                  _rest4 = (0, _objectWithoutProperties2.default)(control, ["controlType", "id", "label", "onClick", "className"]);

              var tabClasses = (0, _classnames.default)('euiControlBar__tab', {
                'euiControlBar__tab--active': showContent && _id3 === _this2.state.selectedTab
              }, _className4);
              return (0, _react2.jsx)("button", (0, _extends2.default)({
                key: _id3 + index,
                className: tabClasses,
                onClick: function onClick(event) {
                  return handleTabClick(control, event);
                }
              }, _rest4), _label);
            }

          case 'breadcrumbs':
            {
              var _controlType4 = control.controlType,
                  _id4 = control.id,
                  _rest5 = (0, _objectWithoutProperties2.default)(control, ["controlType", "id"]);

              return (0, _react2.jsx)(_breadcrumbs.EuiBreadcrumbs, (0, _extends2.default)({
                className: "euiControlBar__breadcrumbs",
                key: control.id
              }, _rest5));
            }
        }
      };

      var controlBar = (0, _react2.jsx)(_i18n.EuiI18n, {
        token: "euiControlBar.screenReaderHeading",
        default: "Page level controls"
      }, function (screenReaderHeading) {
        return (// Though it would be better to use aria-labelledby than aria-label and not repeat the same string twice
          // A bug in voiceover won't list some landmarks in the rotor without an aria-label
          (0, _react2.jsx)("section", (0, _extends2.default)({
            className: classes,
            "aria-label": landmarkHeading ? landmarkHeading : screenReaderHeading
          }, rest, {
            style: styles
          }), (0, _react2.jsx)(_accessibility.EuiScreenReaderOnly, null, (0, _react2.jsx)("h2", null, landmarkHeading ? landmarkHeading : screenReaderHeading)), (0, _react2.jsx)("div", {
            className: "euiControlBar__controls",
            ref: function ref(node) {
              _this2.bar = node;
            }
          }, controls.map(function (control, index) {
            return controlItem(control, index);
          })), _this2.props.showContent ? (0, _react2.jsx)("div", {
            className: "euiControlBar__content"
          }, children) : null)
        );
      });
      return position === 'fixed' ? (0, _react2.jsx)(_portal.EuiPortal, null, controlBar, (0, _react2.jsx)(_accessibility.EuiScreenReaderOnly, null, (0, _react2.jsx)("p", {
        "aria-live": "assertive"
      }, landmarkHeading ? (0, _react2.jsx)(_i18n.EuiI18n, {
        token: "euiControlBar.customScreenReaderAnnouncement",
        default: "There is a new region landmark called {landmarkHeading} with page level controls at the end of the document.",
        values: {
          landmarkHeading: landmarkHeading
        }
      }) : (0, _react2.jsx)(_i18n.EuiI18n, {
        token: "euiControlBar.screenReaderAnnouncement",
        default: "There is a new region landmark with page level controls at the end of the document."
      })))) : controlBar;
    }
  }]);
  return EuiControlBar;
}(_react.Component);

exports.EuiControlBar = EuiControlBar;
(0, _defineProperty2.default)(EuiControlBar, "defaultProps", {
  leftOffset: 0,
  rightOffset: 0,
  position: 'fixed',
  size: 'l',
  showContent: false,
  showOnMobile: false
});