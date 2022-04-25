"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiPagination = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _pagination_button = require("./pagination_button");

var _i18n = require("../i18n");

var _text = require("../text");

var _pagination_button_arrow = require("./pagination_button_arrow");

var _services = require("../../services");

var _accessibility = require("../accessibility");

var _react2 = require("@emotion/react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var MAX_VISIBLE_PAGES = 5;
var NUMBER_SURROUNDING_PAGES = Math.floor(MAX_VISIBLE_PAGES * 0.5);

var EuiPagination = function EuiPagination(_ref) {
  var className = _ref.className,
      _ref$pageCount = _ref.pageCount,
      pageCount = _ref$pageCount === void 0 ? 1 : _ref$pageCount,
      _ref$activePage = _ref.activePage,
      activePage = _ref$activePage === void 0 ? 0 : _ref$activePage,
      _ref$onPageClick = _ref.onPageClick,
      onPageClick = _ref$onPageClick === void 0 ? function () {} : _ref$onPageClick,
      _compressed = _ref.compressed,
      ariaControls = _ref['aria-controls'],
      _ref$responsive = _ref.responsive,
      responsive = _ref$responsive === void 0 ? ['xs', 's'] : _ref$responsive,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["className", "pageCount", "activePage", "onPageClick", "compressed", "aria-controls", "responsive"]);
  var isResponsive = (0, _services.useIsWithinBreakpoints)(responsive, !!responsive); // Force to `compressed` version if specified or within the responsive breakpoints

  var compressed = _compressed || isResponsive;

  var safeClick = function safeClick(e, pageIndex) {
    e.preventDefault();

    if (ariaControls) {
      var controlledElement = document.getElementById(ariaControls);

      if (controlledElement) {
        controlledElement.focus();
      }
    }

    onPageClick(pageIndex);
  };

  var classes = (0, _classnames.default)('euiPagination', className);
  var firstButton = (pageCount < 1 || compressed) && (0, _react2.jsx)(_pagination_button_arrow.EuiPaginationButtonArrow, {
    type: "first",
    ariaControls: ariaControls,
    onClick: function onClick(e) {
      return safeClick(e, 0);
    },
    disabled: activePage === 0
  });
  var previousButton = (0, _react2.jsx)(_pagination_button_arrow.EuiPaginationButtonArrow, {
    type: "previous",
    ariaControls: ariaControls,
    onClick: function onClick(e) {
      return safeClick(e, activePage - 1);
    },
    disabled: activePage === 0
  });
  var nextButton = (0, _react2.jsx)(_pagination_button_arrow.EuiPaginationButtonArrow, {
    type: "next",
    ariaControls: ariaControls,
    onClick: function onClick(e) {
      return safeClick(e, activePage + 1);
    },
    disabled: activePage === -1 || activePage === pageCount - 1
  });
  var lastButton = (pageCount < 1 || compressed) && (0, _react2.jsx)(_pagination_button_arrow.EuiPaginationButtonArrow, {
    type: "last",
    ariaControls: ariaControls,
    onClick: function onClick(e) {
      return safeClick(e, pageCount ? pageCount - 1 : -1);
    },
    disabled: activePage === -1 || activePage === pageCount - 1
  });
  var centerPageCount;

  if (pageCount) {
    var sharedButtonProps = {
      activePage: activePage,
      ariaControls: ariaControls,
      safeClick: safeClick,
      pageCount: pageCount
    };

    if (compressed) {
      centerPageCount = (0, _react2.jsx)(_text.EuiText, {
        size: "s",
        className: "euiPagination__compressedText"
      }, (0, _react2.jsx)(_i18n.EuiI18n, {
        token: "euiPagination.pageOfTotalCompressed",
        default: "{page} of {total}",
        values: {
          page: (0, _react2.jsx)("span", null, activePage + 1),
          total: (0, _react2.jsx)("span", null, pageCount)
        }
      }));
    } else {
      var pages = [];
      var firstPageInRange = Math.max(0, Math.min(activePage - NUMBER_SURROUNDING_PAGES, pageCount - MAX_VISIBLE_PAGES));
      var lastPageInRange = Math.min(pageCount, firstPageInRange + MAX_VISIBLE_PAGES);

      for (var i = firstPageInRange, index = 0; i < lastPageInRange; i++, index++) {
        pages.push((0, _react2.jsx)(PaginationButtonWrapper, (0, _extends2.default)({
          pageIndex: i,
          key: i
        }, sharedButtonProps)));
      }

      var firstPageButtons = [];

      if (firstPageInRange > 0) {
        firstPageButtons.push((0, _react2.jsx)(PaginationButtonWrapper, (0, _extends2.default)({
          pageIndex: 0,
          key: 0
        }, sharedButtonProps)));

        if (firstPageInRange > 1 && firstPageInRange !== 2) {
          firstPageButtons.push((0, _react2.jsx)(_i18n.EuiI18n, {
            key: "startingEllipses",
            token: "euiPagination.firstRangeAriaLabel",
            default: "Skipping pages 2 to {lastPage}",
            values: {
              lastPage: firstPageInRange
            }
          }, function (firstRangeAriaLabel) {
            return (0, _react2.jsx)("li", {
              "aria-label": firstRangeAriaLabel,
              className: "euiPaginationButton-isPlaceholder euiPagination__item"
            }, "\u2026");
          }));
        } else if (firstPageInRange === 2) {
          firstPageButtons.push((0, _react2.jsx)(PaginationButtonWrapper, (0, _extends2.default)({
            pageIndex: 1,
            key: 1
          }, sharedButtonProps)));
        }
      }

      var lastPageButtons = [];

      if (lastPageInRange < pageCount) {
        if (lastPageInRange + 1 === pageCount - 1) {
          lastPageButtons.push((0, _react2.jsx)(PaginationButtonWrapper, (0, _extends2.default)({
            pageIndex: lastPageInRange,
            key: lastPageInRange
          }, sharedButtonProps)));
        } else if (lastPageInRange < pageCount - 1) {
          lastPageButtons.push((0, _react2.jsx)(_i18n.EuiI18n, {
            key: "endingEllipses",
            token: "euiPagination.lastRangeAriaLabel",
            default: "Skipping pages {firstPage} to {lastPage}",
            values: {
              firstPage: lastPageInRange + 1,
              lastPage: pageCount - 1
            }
          }, function (lastRangeAriaLabel) {
            return (0, _react2.jsx)("li", {
              "aria-label": lastRangeAriaLabel,
              className: "euiPaginationButton-isPlaceholder euiPagination__item"
            }, "\u2026");
          }));
        }

        lastPageButtons.push((0, _react2.jsx)(PaginationButtonWrapper, (0, _extends2.default)({
          pageIndex: pageCount - 1,
          key: pageCount - 1
        }, sharedButtonProps)));
      }

      var selectablePages = pages;

      var accessibleName = _objectSpread(_objectSpread({}, rest['aria-label'] && {
        'aria-label': rest['aria-label']
      }), rest['aria-labelledby'] && {
        'aria-labelledby': rest['aria-labelledby']
      });

      centerPageCount = (0, _react2.jsx)("ul", (0, _extends2.default)({}, accessibleName, {
        className: "euiPagination__list"
      }), firstPageButtons, selectablePages, lastPageButtons);
    }
  } // All the i18n strings used to build the whole SR-only text


  var lastLabel = (0, _i18n.useEuiI18n)('euiPagination.last', 'Last');
  var pageLabel = (0, _i18n.useEuiI18n)('euiPagination.page', 'Page');
  var ofLabel = (0, _i18n.useEuiI18n)('euiPagination.of', 'of');
  var collectionLabel = (0, _i18n.useEuiI18n)('euiPagination.collection', 'collection');
  var fromEndLabel = (0, _i18n.useEuiI18n)('euiPagination.fromEndLabel', 'from end'); // Based on the `activePage` count, build the front of the SR-only text
  // i.e. `Page 1`, `Page 2 from end`, `Last Page`

  var accessiblePageString = function accessiblePageString() {
    if (activePage < -1) return "".concat(pageLabel, " ").concat(Math.abs(activePage), " ").concat(fromEndLabel);
    if (activePage === -1) return "".concat(lastLabel, " ").concat(pageLabel);
    return "".concat(pageLabel, " ").concat(activePage + 1);
  }; // If `pageCount` is unknown call it `collection`


  var accessibleCollectionString = pageCount === 0 ? collectionLabel : pageCount.toString(); // Create the whole string with total pageCount or `collection`

  var accessiblePageCount = "".concat(accessiblePageString(), " ").concat(ofLabel, " ").concat(accessibleCollectionString);
  return (0, _react2.jsx)("nav", (0, _extends2.default)({
    className: classes
  }, rest), (0, _react2.jsx)(_accessibility.EuiScreenReaderOnly, null, (0, _react2.jsx)("span", {
    "aria-atomic": "true",
    "aria-relevant": "additions text",
    role: "status"
  }, accessiblePageCount)), firstButton, previousButton, centerPageCount, nextButton, lastButton);
};

exports.EuiPagination = EuiPagination;

var PaginationButtonWrapper = function PaginationButtonWrapper(_ref2) {
  var pageIndex = _ref2.pageIndex,
      _ref2$inList = _ref2.inList,
      inList = _ref2$inList === void 0 ? true : _ref2$inList,
      activePage = _ref2.activePage,
      pageCount = _ref2.pageCount,
      ariaControls = _ref2.ariaControls,
      safeClick = _ref2.safeClick,
      disabled = _ref2.disabled;
  var button = (0, _react2.jsx)(_pagination_button.EuiPaginationButton, {
    isActive: pageIndex === activePage,
    totalPages: pageCount,
    onClick: function onClick(e) {
      return safeClick(e, pageIndex);
    },
    pageIndex: pageIndex,
    "aria-controls": ariaControls,
    disabled: disabled
  });

  if (inList) {
    return (0, _react2.jsx)("li", {
      className: "euiPagination__item"
    }, button);
  }

  return button;
};