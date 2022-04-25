"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldValueSelectionFilter = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _predicate = require("../../../services/predicate");

var _services = require("../../../services");

var _popover = require("../../popover");

var _field_search = require("../../form/field_search");

var _filter_group = require("../../filter_group");

var _loading = require("../../loading");

var _spacer = require("../../spacer");

var _icon = require("../../icon");

var _query4 = require("../query");

var _ast = require("../query/ast");

var _react2 = require("@emotion/react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var defaults = {
  config: {
    multiSelect: true,
    filterWith: 'prefix',
    loadingMessage: 'Loading...',
    noOptionsMessage: 'No options found',
    searchThreshold: 10
  }
};

var FieldValueSelectionFilter = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(FieldValueSelectionFilter, _Component);

  var _super = _createSuper(FieldValueSelectionFilter);

  function FieldValueSelectionFilter(props) {
    var _this;

    (0, _classCallCheck2.default)(this, FieldValueSelectionFilter);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "selectItems", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "searchInput", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resolveOptionsLoader", function () {
      var options = _this.props.config.options;

      if ((0, _predicate.isArray)(options)) {
        return function () {
          return Promise.resolve(options);
        };
      }

      return function () {
        var cachedOptions = _this.state.cachedOptions;

        if (cachedOptions) {
          return Promise.resolve(cachedOptions);
        }

        return options().then(function (opts) {
          // If a cache time is set, populate the cache and also schedule a
          // cache reset.
          if (_this.props.config.cache != null && _this.props.config.cache > 0) {
            _this.setState({
              cachedOptions: opts
            });

            setTimeout(function () {
              _this.setState({
                cachedOptions: null
              });
            }, _this.props.config.cache);
          }

          return opts;
        });
      };
    });
    var _options = props.config.options;
    var preloadedOptions = (0, _predicate.isArray)(_options) ? {
      all: _options,
      shown: _options
    } : null;
    _this.selectItems = [];
    _this.state = {
      popoverOpen: false,
      error: null,
      options: preloadedOptions,
      activeItems: []
    };
    return _this;
  }

  (0, _createClass2.default)(FieldValueSelectionFilter, [{
    key: "closePopover",
    value: function closePopover() {
      this.setState({
        popoverOpen: false
      });
    }
  }, {
    key: "onButtonClick",
    value: function onButtonClick() {
      var _this2 = this;

      this.setState(function (prevState) {
        if (!prevState.popoverOpen) {
          // loading options updates the state, so we'll do that in the animation frame
          window.requestAnimationFrame(function () {
            _this2.loadOptions();
          });
        }

        return {
          options: null,
          error: null,
          popoverOpen: !prevState.popoverOpen
        };
      });
    }
  }, {
    key: "loadOptions",
    value: function loadOptions() {
      var _this3 = this;

      var loader = this.resolveOptionsLoader();
      this.setState({
        options: null,
        error: null
      });
      loader().then(function (options) {
        var items = {
          on: [],
          off: [],
          rest: []
        };
        var _this3$props = _this3.props,
            query = _this3$props.query,
            config = _this3$props.config;

        var multiSelect = _this3.resolveMultiSelect();

        if (options) {
          options.forEach(function (op) {
            var optionField = op.field || config.field;

            if (optionField) {
              var clause = multiSelect === 'or' ? query.getOrFieldClause(optionField, op.value) : query.getSimpleFieldClause(optionField, op.value);

              var checked = _this3.resolveChecked(clause);

              if (!checked) {
                items.rest.push(op);
              } else if (checked === 'on') {
                items.on.push(op);
              } else {
                items.off.push(op);
              }
            }

            return;
          });
        }

        _this3.setState({
          error: null,
          activeItems: items.on,
          options: {
            all: options,
            shown: [].concat((0, _toConsumableArray2.default)(items.on), (0, _toConsumableArray2.default)(items.off), (0, _toConsumableArray2.default)(items.rest))
          }
        });
      }).catch(function () {
        _this3.setState({
          options: null,
          error: 'Could not load options'
        });
      });
    }
  }, {
    key: "filterOptions",
    value: function filterOptions() {
      var _this4 = this;

      var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.setState(function (prevState) {
        if ((0, _predicate.isNil)(prevState.options)) {
          return {};
        }

        var predicate = _this4.getOptionFilter();

        return _objectSpread(_objectSpread({}, prevState), {}, {
          options: _objectSpread(_objectSpread({}, prevState.options), {}, {
            shown: prevState.options.all.filter(function (option, i, options) {
              var name = _this4.resolveOptionName(option).toLowerCase();

              var query = q.toLowerCase();
              return predicate(name, query, options);
            })
          })
        });
      });
    }
  }, {
    key: "getOptionFilter",
    value: function getOptionFilter() {
      var filterWith = this.props.config.filterWith || defaults.config.filterWith;

      if (typeof filterWith === 'function') {
        return filterWith;
      }

      if (filterWith === 'includes') {
        return function (name, query) {
          return name.includes(query);
        };
      }

      return function (name, query) {
        return name.startsWith(query);
      };
    }
  }, {
    key: "resolveOptionName",
    value: function resolveOptionName(option) {
      return option.name || option.value.toString();
    }
  }, {
    key: "onOptionClick",
    value: function onOptionClick(field, value, checked) {
      var multiSelect = this.resolveMultiSelect();
      var _this$props$config = this.props.config,
          _this$props$config$au = _this$props$config.autoClose,
          autoClose = _this$props$config$au === void 0 ? true : _this$props$config$au,
          _this$props$config$op = _this$props$config.operator,
          operator = _this$props$config$op === void 0 ? _ast.Operator.EQ : _this$props$config$op; // we're closing popover only if the user can only select one item... if the
      // user can select more, we'll leave it open so she can continue selecting

      if (!multiSelect && autoClose) {
        this.closePopover();

        var _query = checked ? this.props.query.removeSimpleFieldClauses(field) : this.props.query.removeSimpleFieldClauses(field).addSimpleFieldValue(field, value, true, operator);

        this.props.onChange(_query);
      } else {
        if (multiSelect === 'or') {
          var _query2 = checked ? this.props.query.removeOrFieldValue(field, value) : this.props.query.addOrFieldValue(field, value, true, operator);

          this.props.onChange(_query2);
        } else {
          var _query3 = checked ? this.props.query.removeSimpleFieldValue(field, value) : this.props.query.addSimpleFieldValue(field, value, true, operator);

          this.props.onChange(_query3);
        }
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(index, event) {
      switch (event.key) {
        case _services.keys.ARROW_DOWN:
          if (index < this.selectItems.length - 1) {
            event.preventDefault();
            this.selectItems[index + 1].focus();
          }

          break;

        case _services.keys.ARROW_UP:
          if (index < 0) {
            return; // it's coming from the search box... nothing to do... nowhere to go
          }

          if (index === 0 && this.searchInput) {
            event.preventDefault();
            this.searchInput.focus();
          } else if (index > 0) {
            event.preventDefault();
            this.selectItems[index - 1].focus();
          }

      }
    }
  }, {
    key: "resolveMultiSelect",
    value: function resolveMultiSelect() {
      var config = this.props.config;
      return !(0, _predicate.isNil)(config.multiSelect) ? config.multiSelect : defaults.config.multiSelect;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.query.text.length) this.loadOptions();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.query !== prevProps.query) this.loadOptions();
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props = this.props,
          query = _this$props.query,
          config = _this$props.config;
      var multiSelect = this.resolveMultiSelect();
      var activeTop = this.isActiveField(config.field);
      var activeItem = this.state.options ? this.state.options.all.some(function (item) {
        return _this5.isActiveField(item.field);
      }) : false;
      var activeItemsCount = this.state.activeItems.length;
      var active = (activeTop || activeItem) && activeItemsCount > 0;
      var button = (0, _react2.jsx)(_filter_group.EuiFilterButton, {
        iconType: "arrowDown",
        iconSide: "right",
        onClick: this.onButtonClick.bind(this),
        hasActiveFilters: active,
        numActiveFilters: active ? activeItemsCount : undefined,
        grow: true
      }, config.name);
      var searchBox = this.renderSearchBox();
      var content = this.renderContent(config.field, query, config, multiSelect);
      return (0, _react2.jsx)(_popover.EuiPopover, {
        button: button,
        isOpen: this.state.popoverOpen,
        closePopover: this.closePopover.bind(this),
        panelPaddingSize: "none",
        anchorPosition: "downCenter",
        panelClassName: "euiFilterGroup__popoverPanel"
      }, searchBox, content);
    }
  }, {
    key: "renderSearchBox",
    value: function renderSearchBox() {
      var _this6 = this;

      var threshold = this.props.config.searchThreshold || defaults.config.searchThreshold;

      if (this.state.options && this.state.options.all.length >= threshold) {
        var disabled = this.state.error != null;
        return (0, _react2.jsx)(_popover.EuiPopoverTitle, {
          paddingSize: "s"
        }, (0, _react2.jsx)(_field_search.EuiFieldSearch, {
          inputRef: function inputRef(ref) {
            return _this6.searchInput = ref;
          },
          disabled: disabled,
          incremental: true,
          onSearch: function onSearch(query) {
            return _this6.filterOptions(query);
          },
          onKeyDown: this.onKeyDown.bind(this, -1),
          compressed: true
        }));
      }
    }
  }, {
    key: "renderContent",
    value: function renderContent(field, query, config, multiSelect) {
      var _this7 = this;

      if (this.state.error) {
        return this.renderError(this.state.error);
      }

      if ((0, _predicate.isNil)(this.state.options)) {
        return this.renderLoader();
      }

      if (this.state.options.shown.length === 0) {
        return this.renderNoOptions();
      }

      if (this.state.options == null) {
        return;
      }

      var items = [];
      this.state.options.shown.forEach(function (option, index) {
        var optionField = option.field || field;

        if (optionField == null) {
          throw new Error('option.field or field should be provided in <FieldValueSelectionFilter/>');
        }

        var clause = multiSelect === 'or' ? query.getOrFieldClause(optionField, option.value) : query.getSimpleFieldClause(optionField, option.value);

        var checked = _this7.resolveChecked(clause);

        var onClick = function onClick() {
          // clicking a checked item will uncheck it and effective remove the filter (value = undefined)
          _this7.onOptionClick(optionField, option.value, checked);
        };

        var item = (0, _react2.jsx)(_filter_group.EuiFilterSelectItem, {
          key: index,
          checked: checked,
          onClick: onClick,
          ref: function ref(_ref) {
            return _this7.selectItems[index] = _ref;
          },
          onKeyDown: _this7.onKeyDown.bind(_this7, index)
        }, option.view ? option.view : _this7.resolveOptionName(option));
        items.push(item);
      });
      return (0, _react2.jsx)("div", {
        className: "euiFilterSelect__items"
      }, items);
    }
  }, {
    key: "resolveChecked",
    value: function resolveChecked(clause) {
      if (clause) {
        return _query4.Query.isMust(clause) ? 'on' : 'off';
      }
    }
  }, {
    key: "renderLoader",
    value: function renderLoader() {
      var message = this.props.config.loadingMessage || defaults.config.loadingMessage;
      return (0, _react2.jsx)("div", {
        className: "euiFilterSelect__note"
      }, (0, _react2.jsx)("div", {
        className: "euiFilterSelect__noteContent"
      }, (0, _react2.jsx)(_loading.EuiLoadingChart, {
        size: "m"
      }), (0, _react2.jsx)(_spacer.EuiSpacer, {
        size: "xs"
      }), (0, _react2.jsx)("p", null, message)));
    }
  }, {
    key: "renderError",
    value: function renderError(message) {
      return (0, _react2.jsx)("div", {
        className: "euiFilterSelect__note"
      }, (0, _react2.jsx)("div", {
        className: "euiFilterSelect__noteContent"
      }, (0, _react2.jsx)(_icon.EuiIcon, {
        size: "m",
        type: "faceSad",
        color: "danger"
      }), (0, _react2.jsx)(_spacer.EuiSpacer, {
        size: "xs"
      }), (0, _react2.jsx)("p", null, message)));
    }
  }, {
    key: "renderNoOptions",
    value: function renderNoOptions() {
      var message = this.props.config.noOptionsMessage || defaults.config.noOptionsMessage;
      return (0, _react2.jsx)("div", {
        className: "euiFilterSelect__note"
      }, (0, _react2.jsx)("div", {
        className: "euiFilterSelect__noteContent"
      }, (0, _react2.jsx)(_icon.EuiIcon, {
        type: "minusInCircle"
      }), (0, _react2.jsx)(_spacer.EuiSpacer, {
        size: "xs"
      }), (0, _react2.jsx)("p", null, message)));
    }
  }, {
    key: "isActiveField",
    value: function isActiveField(field) {
      if (typeof field !== 'string') {
        return false;
      }

      var query = this.props.query;
      var multiSelect = this.resolveMultiSelect();

      if (multiSelect === 'or') {
        return query.hasOrFieldClause(field);
      }

      return query.hasSimpleFieldClause(field);
    }
  }]);
  return FieldValueSelectionFilter;
}(_react.Component);

exports.FieldValueSelectionFilter = FieldValueSelectionFilter;