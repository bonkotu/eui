"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiSelectableList = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactWindow = require("react-window");

var _auto_sizer = require("../../auto_sizer");

var _highlight = require("../../highlight");

var _selectable_list_item = require("./selectable_list_item");

var _react2 = require("@emotion/react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EuiSelectableList = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EuiSelectableList, _Component);

  var _super = _createSuper(EuiSelectableList);

  (0, _createClass2.default)(EuiSelectableList, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var activeOptionIndex = this.props.activeOptionIndex;

      if (this.listBoxRef && this.props.searchable !== true) {
        this.listBoxRef.setAttribute('aria-activedescendant', "".concat(this.props.makeOptionId(activeOptionIndex)));
      }

      if (this.listRef && typeof this.props.activeOptionIndex !== 'undefined') {
        this.listRef.scrollToItem(this.props.activeOptionIndex, 'auto');
      }
    }
  }]);

  function EuiSelectableList(props) {
    var _this;

    (0, _classCallCheck2.default)(this, EuiSelectableList);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "listRef", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "listBoxRef", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setListRef", function (ref) {
      _this.listRef = ref;

      if (ref && _this.props.activeOptionIndex) {
        ref.scrollToItem(_this.props.activeOptionIndex, 'auto');
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "removeScrollableTabStop", function (ref) {
      // Firefox adds a tab stop for scrollable containers
      // We handle this inside so need to stop firefox from doing its thing
      if (ref) {
        ref.setAttribute('tabindex', '-1');
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setListBoxRef", function (ref) {
      _this.listBoxRef = ref;
      var _this$props = _this.props,
          listId = _this$props.listId,
          searchable = _this$props.searchable,
          singleSelection = _this$props.singleSelection,
          ariaLabel = _this$props['aria-label'],
          ariaLabelledby = _this$props['aria-labelledby'],
          ariaDescribedby = _this$props['aria-describedby'];

      if (ref) {
        ref.setAttribute('id', listId);
        ref.setAttribute('role', 'listbox');

        if (searchable !== true) {
          ref.setAttribute('tabindex', '0');

          if (singleSelection !== 'always' && singleSelection !== true) {
            ref.setAttribute('aria-multiselectable', 'true');
          }
        }

        if (typeof ariaLabel === 'string') {
          ref.setAttribute('aria-label', ariaLabel);
        } else if (typeof ariaLabelledby === 'string') {
          ref.setAttribute('aria-labelledby', ariaLabelledby);
        }

        if (typeof ariaDescribedby === 'string') {
          ref.setAttribute('aria-labelledby', ariaDescribedby);
        }
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "ListRow", /*#__PURE__*/(0, _react.memo)(function (_ref) {
      var data = _ref.data,
          index = _ref.index,
          style = _ref.style;
      var option = data[index];

      var optionData = option.data,
          _option = (0, _objectWithoutProperties2.default)(option, ["data"]);

      var label = option.label,
          isGroupLabel = option.isGroupLabel,
          checked = option.checked,
          disabled = option.disabled,
          prepend = option.prepend,
          append = option.append,
          ref = option.ref,
          key = option.key,
          searchableLabel = option.searchableLabel,
          _data = option.data,
          optionRest = (0, _objectWithoutProperties2.default)(option, ["label", "isGroupLabel", "checked", "disabled", "prepend", "append", "ref", "key", "searchableLabel", "data"]);

      if (isGroupLabel) {
        return (0, _react2.jsx)("li", (0, _extends2.default)({
          role: "presentation",
          className: "euiSelectableList__groupLabel",
          style: style // @ts-ignore complex

        }, optionRest), prepend, label, append);
      }

      var labelCount = data.filter(function (option) {
        return option.isGroupLabel;
      }).length;
      return (0, _react2.jsx)(_selectable_list_item.EuiSelectableListItem, (0, _extends2.default)({
        id: _this.props.makeOptionId(index),
        style: style,
        key: key || label.toLowerCase(),
        onMouseDown: function onMouseDown() {
          _this.props.setActiveOptionIndex(index);
        },
        onClick: function onClick() {
          return _this.onAddOrRemoveOption(option);
        },
        ref: ref ? ref.bind(null, index) : undefined,
        isFocused: _this.props.activeOptionIndex === index,
        title: searchableLabel || label,
        checked: checked,
        disabled: disabled,
        prepend: prepend,
        append: append,
        "aria-posinset": index + 1 - labelCount,
        "aria-setsize": data.length - labelCount,
        onFocusBadge: _this.props.onFocusBadge,
        allowExclusions: _this.props.allowExclusions,
        showIcons: _this.props.showIcons
      }, optionRest), _this.props.renderOption ? _this.props.renderOption( // @ts-ignore complex
      _objectSpread(_objectSpread({}, _option), optionData), _this.props.searchValue) : (0, _react2.jsx)(_highlight.EuiHighlight, {
        search: _this.props.searchValue
      }, label));
    }, _reactWindow.areEqual));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onAddOrRemoveOption", function (option) {
      if (option.disabled) {
        return;
      }

      var _this$props2 = _this.props,
          allowExclusions = _this$props2.allowExclusions,
          options = _this$props2.options,
          _this$props2$visibleO = _this$props2.visibleOptions,
          visibleOptions = _this$props2$visibleO === void 0 ? options : _this$props2$visibleO;

      _this.props.setActiveOptionIndex(visibleOptions.findIndex(function (_ref2) {
        var label = _ref2.label;
        return label === option.label;
      }), function () {
        if (option.checked === 'on' && allowExclusions) {
          _this.onExcludeOption(option);
        } else if (option.checked === 'on' || option.checked === 'off') {
          _this.onRemoveOption(option);
        } else {
          _this.onAddOption(option);
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onAddOption", function (addedOption) {
      var _this$props3 = _this.props,
          onOptionClick = _this$props3.onOptionClick,
          options = _this$props3.options,
          singleSelection = _this$props3.singleSelection;
      var updatedOptions = options.map(function (option) {
        // if singleSelection is enabled, uncheck any selected option(s)
        var updatedOption = _objectSpread({}, option);

        if (singleSelection) {
          delete updatedOption.checked;
        } // if this is the now-selected option, check it


        if (option === addedOption) {
          updatedOption.checked = 'on';
        }

        return updatedOption;
      });
      onOptionClick(updatedOptions);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onRemoveOption", function (removedOption) {
      var _this$props4 = _this.props,
          onOptionClick = _this$props4.onOptionClick,
          singleSelection = _this$props4.singleSelection,
          options = _this$props4.options;
      var updatedOptions = options.map(function (option) {
        var updatedOption = _objectSpread({}, option);

        if (option === removedOption && singleSelection !== 'always') {
          delete updatedOption.checked;
        }

        return updatedOption;
      });
      onOptionClick(updatedOptions);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onExcludeOption", function (excludedOption) {
      var _this$props5 = _this.props,
          onOptionClick = _this$props5.onOptionClick,
          options = _this$props5.options;
      excludedOption.checked = 'off';
      var updatedOptions = options.map(function (option) {
        var updatedOption = _objectSpread({}, option);

        if (option === excludedOption) {
          updatedOption.checked = 'off';
        }

        return updatedOption;
      });
      onOptionClick(updatedOptions);
    });
    return _this;
  }

  (0, _createClass2.default)(EuiSelectableList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props6 = this.props,
          className = _this$props6.className,
          options = _this$props6.options,
          searchValue = _this$props6.searchValue,
          onOptionClick = _this$props6.onOptionClick,
          renderOption = _this$props6.renderOption,
          forcedHeight = _this$props6.height,
          windowProps = _this$props6.windowProps,
          rowHeight = _this$props6.rowHeight,
          activeOptionIndex = _this$props6.activeOptionIndex,
          makeOptionId = _this$props6.makeOptionId,
          showIcons = _this$props6.showIcons,
          singleSelection = _this$props6.singleSelection,
          visibleOptions = _this$props6.visibleOptions,
          allowExclusions = _this$props6.allowExclusions,
          bordered = _this$props6.bordered,
          searchable = _this$props6.searchable,
          onFocusBadge = _this$props6.onFocusBadge,
          listId = _this$props6.listId,
          setActiveOptionIndex = _this$props6.setActiveOptionIndex,
          ariaLabel = _this$props6['aria-label'],
          ariaLabelledby = _this$props6['aria-labelledby'],
          ariaDescribedby = _this$props6['aria-describedby'],
          isVirtualized = _this$props6.isVirtualized,
          rest = (0, _objectWithoutProperties2.default)(_this$props6, ["className", "options", "searchValue", "onOptionClick", "renderOption", "height", "windowProps", "rowHeight", "activeOptionIndex", "makeOptionId", "showIcons", "singleSelection", "visibleOptions", "allowExclusions", "bordered", "searchable", "onFocusBadge", "listId", "setActiveOptionIndex", "aria-label", "aria-labelledby", "aria-describedby", "isVirtualized"]);
      var optionArray = visibleOptions || options;
      var heightIsFull = forcedHeight === 'full';
      var calculatedHeight = heightIsFull ? false : forcedHeight; // If calculatedHeight is still undefined, then calculate it

      if (calculatedHeight === undefined) {
        var maxVisibleOptions = 7;
        var numVisibleOptions = optionArray.length;
        var numVisibleMoreThanMax = optionArray.length > maxVisibleOptions;

        if (numVisibleMoreThanMax) {
          // Show only half of the last one to indicate there's more to scroll to
          calculatedHeight = (maxVisibleOptions - 0.5) * rowHeight;
        } else {
          calculatedHeight = numVisibleOptions * rowHeight;
        }
      }

      var classes = (0, _classnames.default)('euiSelectableList', {
        'euiSelectableList-fullHeight': heightIsFull,
        'euiSelectableList-bordered': bordered
      }, className);
      return (0, _react2.jsx)("div", (0, _extends2.default)({
        className: classes
      }, rest), isVirtualized ? (0, _react2.jsx)(_auto_sizer.EuiAutoSizer, {
        disableHeight: !heightIsFull
      }, function (_ref3) {
        var width = _ref3.width,
            height = _ref3.height;
        return (0, _react2.jsx)(_reactWindow.FixedSizeList, (0, _extends2.default)({
          ref: _this2.setListRef,
          outerRef: _this2.removeScrollableTabStop,
          className: "euiSelectableList__list",
          "data-skip-axe": "scrollable-region-focusable",
          width: width,
          height: calculatedHeight || height,
          itemCount: optionArray.length,
          itemData: optionArray,
          itemSize: rowHeight,
          innerElementType: "ul",
          innerRef: _this2.setListBoxRef
        }, windowProps), _this2.ListRow);
      }) : (0, _react2.jsx)("div", {
        className: "euiSelectableList__list",
        ref: this.removeScrollableTabStop
      }, (0, _react2.jsx)("ul", {
        ref: this.setListBoxRef
      }, optionArray.map(function (_, index) {
        return /*#__PURE__*/_react.default.createElement(_this2.ListRow, {
          key: index,
          data: optionArray,
          index: index
        }, null);
      }))));
    }
  }]);
  return EuiSelectableList;
}(_react.Component);

exports.EuiSelectableList = EuiSelectableList;
(0, _defineProperty2.default)(EuiSelectableList, "defaultProps", {
  rowHeight: 32,
  searchValue: '',
  isVirtualized: true
});