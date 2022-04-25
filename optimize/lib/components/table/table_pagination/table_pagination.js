"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiTablePagination = void 0;

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

var _button = require("../../button");

var _context_menu = require("../../context_menu");

var _flex = require("../../flex");

var _pagination = require("../../pagination");

var _popover = require("../../popover");

var _i18n = require("../../i18n");

var _react2 = require("@emotion/react");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EuiTablePagination = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EuiTablePagination, _Component);

  var _super = _createSuper(EuiTablePagination);

  function EuiTablePagination() {
    var _this;

    (0, _classCallCheck2.default)(this, EuiTablePagination);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      isPopoverOpen: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onButtonClick", function () {
      _this.setState({
        isPopoverOpen: !_this.state.isPopoverOpen
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "closePopover", function () {
      _this.setState({
        isPopoverOpen: false
      });
    });
    return _this;
  }

  (0, _createClass2.default)(EuiTablePagination, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          activePage = _this$props.activePage,
          _this$props$itemsPerP = _this$props.itemsPerPage,
          itemsPerPage = _this$props$itemsPerP === void 0 ? 50 : _this$props$itemsPerP,
          _this$props$itemsPerP2 = _this$props.itemsPerPageOptions,
          itemsPerPageOptions = _this$props$itemsPerP2 === void 0 ? [10, 20, 50, 100] : _this$props$itemsPerP2,
          _this$props$hidePerPa = _this$props.hidePerPageOptions,
          hidePerPageOptions = _this$props$hidePerPa === void 0 ? false : _this$props$hidePerPa,
          _this$props$onChangeI = _this$props.onChangeItemsPerPage,
          onChangeItemsPerPage = _this$props$onChangeI === void 0 ? function () {} : _this$props$onChangeI,
          onChangePage = _this$props.onChangePage,
          pageCount = _this$props.pageCount,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["activePage", "itemsPerPage", "itemsPerPageOptions", "hidePerPageOptions", "onChangeItemsPerPage", "onChangePage", "pageCount"]);
      var button = (0, _react2.jsx)(_button.EuiButtonEmpty, {
        size: "xs",
        color: "text",
        iconType: "arrowDown",
        iconSide: "right",
        "data-test-subj": "tablePaginationPopoverButton",
        onClick: this.onButtonClick
      }, (0, _react2.jsx)(_i18n.EuiI18n, {
        token: "euiTablePagination.rowsPerPage",
        default: "Rows per page"
      }), ": ", itemsPerPage);
      var items = itemsPerPageOptions.map(function (itemsPerPageOption) {
        return (0, _react2.jsx)(_context_menu.EuiContextMenuItem, {
          key: itemsPerPageOption,
          icon: itemsPerPageOption === itemsPerPage ? 'check' : 'empty',
          onClick: function onClick() {
            _this2.closePopover();

            onChangeItemsPerPage(itemsPerPageOption);
          },
          "data-test-subj": "tablePagination-".concat(itemsPerPageOption, "-rows")
        }, (0, _react2.jsx)(_i18n.EuiI18n, {
          token: "euiTablePagination.rowsPerPageOption",
          values: {
            rowsPerPage: itemsPerPageOption
          },
          default: "{rowsPerPage} rows"
        }));
      });
      var itemsPerPagePopover = (0, _react2.jsx)(_popover.EuiPopover, {
        button: button,
        isOpen: this.state.isPopoverOpen,
        closePopover: this.closePopover,
        panelPaddingSize: "none",
        anchorPosition: "upRight"
      }, (0, _react2.jsx)(_context_menu.EuiContextMenuPanel, {
        items: items
      }));
      return (0, _react2.jsx)(_flex.EuiFlexGroup, {
        justifyContent: "spaceBetween",
        alignItems: "center",
        responsive: false,
        gutterSize: "s",
        className: "eui-xScroll"
      }, (0, _react2.jsx)(_flex.EuiFlexItem, {
        grow: false
      }, hidePerPageOptions ? null : itemsPerPagePopover), (0, _react2.jsx)(_flex.EuiFlexItem, {
        grow: false
      }, (0, _react2.jsx)(_pagination.EuiPagination, (0, _extends2.default)({
        pageCount: pageCount,
        activePage: activePage,
        onPageClick: onChangePage
      }, rest))));
    }
  }]);
  return EuiTablePagination;
}(_react.Component);

exports.EuiTablePagination = EuiTablePagination;