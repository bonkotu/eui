"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiDataGridColumnResizer = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@emotion/react");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MINIMUM_COLUMN_WIDTH = 40;

var EuiDataGridColumnResizer = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EuiDataGridColumnResizer, _Component);

  var _super = _createSuper(EuiDataGridColumnResizer);

  function EuiDataGridColumnResizer() {
    var _this;

    (0, _classCallCheck2.default)(this, EuiDataGridColumnResizer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      initialX: 0,
      offset: 0
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMouseDown", function (e) {
      _this.setState({
        initialX: e.pageX
      });

      window.addEventListener('mouseup', _this.onMouseUp);
      window.addEventListener('blur', _this.onMouseUp);
      window.addEventListener('mousemove', _this.onMouseMove); // don't let this action steal focus

      e.preventDefault();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMouseUp", function () {
      var offset = _this.state.offset;
      var _this$props = _this.props,
          columnId = _this$props.columnId,
          columnWidth = _this$props.columnWidth,
          setColumnWidth = _this$props.setColumnWidth;
      setColumnWidth(columnId, Math.max(MINIMUM_COLUMN_WIDTH, columnWidth + offset));

      _this.setState({
        offset: 0
      });

      window.removeEventListener('mouseup', _this.onMouseUp);
      window.removeEventListener('blur', _this.onMouseUp);
      window.removeEventListener('mousemove', _this.onMouseMove);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMouseMove", function (e) {
      var columnWidth = _this.props.columnWidth;

      _this.setState(function (_ref) {
        var initialX = _ref.initialX;
        return {
          offset: Math.max(e.pageX - initialX, -(columnWidth - MINIMUM_COLUMN_WIDTH))
        };
      });
    });
    return _this;
  }

  (0, _createClass2.default)(EuiDataGridColumnResizer, [{
    key: "render",
    value: function render() {
      var offset = this.state.offset;
      return (0, _react2.jsx)("div", {
        className: "euiDataGridColumnResizer",
        "data-test-subj": "dataGridColumnResizer",
        style: {
          marginRight: "".concat(-offset, "px")
        },
        onMouseDown: this.onMouseDown
      });
    }
  }]);
  return EuiDataGridColumnResizer;
}(_react.Component);

exports.EuiDataGridColumnResizer = EuiDataGridColumnResizer;