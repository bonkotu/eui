"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiSideNav = void 0;

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

var _side_nav_item = require("./side_nav_item");

var _button = require("../button");

var _title = require("../title");

var _accessibility = require("../accessibility");

var _services = require("../../services");

var _responsive = require("../responsive");

var _react2 = require("@emotion/react");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EuiSideNav = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EuiSideNav, _Component);

  var _super = _createSuper(EuiSideNav);

  function EuiSideNav() {
    var _this;

    (0, _classCallCheck2.default)(this, EuiSideNav);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "generateId", (0, _services.htmlIdGenerator)('euiSideNav'));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "isItemOpen", function (item) {
      // The developer can force the item to be open.
      if (item.forceOpen) {
        return true;
      } // Of course a selected item is open.


      if (item.isSelected) {
        return true;
      } // The item has to be open if it has a child that's open.


      if (item.items) {
        return item.items.some(_this.isItemOpen);
      }

      return false;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderTree", function (items) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var _this$props = _this.props,
          renderItem = _this$props.renderItem,
          truncate = _this$props.truncate;
      return items.map(function (item) {
        var id = item.id,
            name = item.name,
            isSelected = item.isSelected,
            childItems = item.items,
            icon = item.icon,
            onClick = item.onClick,
            href = item.href,
            forceOpen = item.forceOpen,
            rest = (0, _objectWithoutProperties2.default)(item, ["id", "name", "isSelected", "items", "icon", "onClick", "href", "forceOpen"]); // Root items are always open.

        var isOpen = depth === 0 ? true : _this.isItemOpen(item);
        var renderedItems;

        if (childItems) {
          renderedItems = _this.renderTree(childItems, depth + 1);
        } // Act as an accordion only if item is not linked but has children (and not the root)


        var childrenOnly = depth > 0 && !onClick && !href && !!childItems;
        return (0, _react2.jsx)(_side_nav_item.EuiSideNavItem, (0, _extends2.default)({
          isOpen: isOpen,
          isSelected: !childrenOnly && isSelected,
          isParent: !!childItems,
          icon: icon,
          onClick: onClick,
          href: href,
          items: renderedItems,
          key: id,
          depth: depth,
          renderItem: renderItem,
          truncate: truncate,
          childrenOnly: childrenOnly
        }, rest), name);
      });
    });
    return _this;
  }

  (0, _createClass2.default)(EuiSideNav, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          items = _this$props2.items,
          toggleOpenOnMobile = _this$props2.toggleOpenOnMobile,
          isOpenOnMobile = _this$props2.isOpenOnMobile,
          mobileTitle = _this$props2.mobileTitle,
          mobileBreakpoints = _this$props2.mobileBreakpoints,
          renderItem = _this$props2.renderItem,
          truncate = _this$props2.truncate,
          heading = _this$props2.heading,
          _this$props2$headingP = _this$props2.headingProps,
          headingProps = _this$props2$headingP === void 0 ? {} : _this$props2$headingP,
          rest = (0, _objectWithoutProperties2.default)(_this$props2, ["className", "items", "toggleOpenOnMobile", "isOpenOnMobile", "mobileTitle", "mobileBreakpoints", "renderItem", "truncate", "heading", "headingProps"]);
      var classes = (0, _classnames.default)('euiSideNav', className, {
        'euiSideNav-isOpenMobile': isOpenOnMobile
      }); // To support the extra CSS needed to show/hide/animate the content,
      // We add a className for every breakpoint supported

      var contentClasses = (0, _classnames.default)('euiSideNav__content', mobileBreakpoints === null || mobileBreakpoints === void 0 ? void 0 : mobileBreakpoints.map(function (breakpointName) {
        return "euiSideNav__contentMobile-".concat(breakpointName);
      }));
      var sideNavContentId = this.generateId('content');
      var navContent = (0, _react2.jsx)("div", {
        id: sideNavContentId,
        className: contentClasses
      }, this.renderTree(items));
      var _ref = headingProps,
          _ref$screenReaderOnly = _ref.screenReaderOnly,
          headingScreenReaderOnly = _ref$screenReaderOnly === void 0 ? false : _ref$screenReaderOnly,
          _ref$element = _ref.element,
          HeadingElement = _ref$element === void 0 ? 'h2' : _ref$element,
          titleProps = (0, _objectWithoutProperties2.default)(_ref, ["screenReaderOnly", "element"]);
      var hasMobileVersion = mobileBreakpoints && mobileBreakpoints.length > 0;
      var hasHeader = !!heading;
      var headingNode;
      var sharedHeadingProps = {
        id: (headingProps === null || headingProps === void 0 ? void 0 : headingProps.id) || this.generateId('heading'),
        className: headingProps === null || headingProps === void 0 ? void 0 : headingProps.className,
        'data-test-subj': headingProps === null || headingProps === void 0 ? void 0 : headingProps['data-test-subj'],
        'aria-label': headingProps === null || headingProps === void 0 ? void 0 : headingProps['aria-label']
      };

      if (hasHeader) {
        headingNode = (0, _react2.jsx)(HeadingElement, sharedHeadingProps, heading);

        if (headingScreenReaderOnly) {
          headingNode = (0, _react2.jsx)(_accessibility.EuiScreenReaderOnly, null, headingNode);
        } else {
          headingNode = (0, _react2.jsx)(_title.EuiTitle, (0, _extends2.default)({
            size: "xs"
          }, titleProps, {
            className: (0, _classnames.default)('euiSideNav__heading', headingProps === null || headingProps === void 0 ? void 0 : headingProps.className)
          }), (0, _react2.jsx)(HeadingElement, sharedHeadingProps, heading));
        }
      }

      var mobileNode;
      var breakpoints = mobileBreakpoints;

      if (hasMobileVersion) {
        mobileNode = (0, _react2.jsx)(_responsive.EuiShowFor, {
          sizes: breakpoints || 'none'
        }, (0, _react2.jsx)("nav", (0, _extends2.default)({
          "aria-labelledby": sharedHeadingProps.id,
          className: classes
        }, rest), (0, _react2.jsx)(HeadingElement, sharedHeadingProps, (0, _react2.jsx)(_button.EuiButtonEmpty, {
          className: "euiSideNav__mobileToggle",
          textProps: {
            className: 'euiSideNav__mobileToggleText'
          },
          contentProps: {
            className: 'euiSideNav__mobileToggleContent'
          },
          onClick: toggleOpenOnMobile,
          iconType: "apps",
          iconSide: "right",
          "aria-controls": sideNavContentId,
          "aria-expanded": isOpenOnMobile
        }, mobileTitle || heading)), navContent));
      }

      return (0, _react2.jsx)(_react.default.Fragment, null, mobileNode, (0, _react2.jsx)(_responsive.EuiHideFor, {
        sizes: breakpoints || 'none'
      }, (0, _react2.jsx)("nav", (0, _extends2.default)({
        "aria-labelledby": headingNode ? sharedHeadingProps.id : undefined,
        className: classes
      }, rest), headingNode, navContent)));
    }
  }]);
  return EuiSideNav;
}(_react.Component);

exports.EuiSideNav = EuiSideNav;
(0, _defineProperty2.default)(EuiSideNav, "defaultProps", {
  items: [],
  mobileBreakpoints: ['xs', 's']
});