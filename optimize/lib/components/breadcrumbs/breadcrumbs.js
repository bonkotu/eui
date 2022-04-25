"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiBreadcrumbs = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("../i18n");

var _inner_text = require("../inner_text");

var _link = require("../link");

var _popover = require("../popover");

var _icon = require("../icon");

var _services = require("../../services");

var _breakpoint = require("../../services/breakpoint");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var CONTENT_CLASSNAME = 'euiBreadcrumb__content';
var responsiveDefault = {
  xs: 1,
  s: 2,
  m: 4
};

var limitBreadcrumbs = function limitBreadcrumbs(breadcrumbs, max, allBreadcrumbs) {
  var breadcrumbsAtStart = [];
  var breadcrumbsAtEnd = [];
  var limit = Math.min(max, breadcrumbs.length);
  var start = Math.floor(limit / 2);
  var overflowBreadcrumbs = allBreadcrumbs.slice(start, start + breadcrumbs.length - limit);

  if (overflowBreadcrumbs.length) {
    overflowBreadcrumbs[overflowBreadcrumbs.length - 1]['aria-current'] = 'false';
  }

  for (var i = 0; i < limit; i++) {
    // We'll alternate with displaying breadcrumbs at the end and at the start, but be biased
    // towards breadcrumbs the end so that if max is an odd number, we'll have one more
    // breadcrumb visible at the end than at the beginning.
    var isEven = i % 2 === 0; // We're picking breadcrumbs from the front AND the back, so we treat each iteration as a
    // half-iteration.

    var normalizedIndex = Math.floor(i * 0.5);
    var indexOfBreadcrumb = isEven ? breadcrumbs.length - 1 - normalizedIndex : normalizedIndex;
    var breadcrumb = breadcrumbs[indexOfBreadcrumb];

    if (isEven) {
      breadcrumbsAtEnd.unshift(breadcrumb);
    } else {
      breadcrumbsAtStart.push(breadcrumb);
    }
  }

  var EuiBreadcrumbCollapsed = function EuiBreadcrumbCollapsed() {
    var _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        isPopoverOpen = _useState2[0],
        setIsPopoverOpen = _useState2[1];

    var ariaLabel = (0, _i18n.useEuiI18n)('euiBreadcrumbs.collapsedBadge.ariaLabel', 'See collapsed breadcrumbs');
    var ellipsisButton = (0, _react2.jsx)(_link.EuiLink, {
      className: CONTENT_CLASSNAME,
      color: "subdued",
      "aria-label": ariaLabel,
      title: ariaLabel,
      onClick: function onClick() {
        return setIsPopoverOpen(!isPopoverOpen);
      }
    }, "\u2026 ", (0, _react2.jsx)(_icon.EuiIcon, {
      type: "arrowDown",
      size: "s"
    }));
    return (0, _react2.jsx)("li", {
      className: "euiBreadcrumb euiBreadcrumb--collapsed"
    }, (0, _react2.jsx)(_popover.EuiPopover, {
      button: ellipsisButton,
      isOpen: isPopoverOpen,
      closePopover: function closePopover() {
        return setIsPopoverOpen(false);
      }
    }, (0, _react2.jsx)(EuiBreadcrumbs, {
      className: "euiBreadcrumbs__inPopover",
      breadcrumbs: overflowBreadcrumbs,
      responsive: false,
      truncate: false,
      max: 0
    })));
  };

  if (max < breadcrumbs.length) {
    breadcrumbsAtStart.push((0, _react2.jsx)(EuiBreadcrumbCollapsed, {
      key: "collapsed"
    }));
  }

  return [].concat(breadcrumbsAtStart, breadcrumbsAtEnd);
};

var EuiBreadcrumbs = function EuiBreadcrumbs(_ref) {
  var breadcrumbs = _ref.breadcrumbs,
      className = _ref.className,
      _ref$responsive = _ref.responsive,
      responsive = _ref$responsive === void 0 ? responsiveDefault : _ref$responsive,
      _ref$truncate = _ref.truncate,
      truncate = _ref$truncate === void 0 ? true : _ref$truncate,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 5 : _ref$max,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["breadcrumbs", "className", "responsive", "truncate", "max"]);
  var ariaLabel = (0, _i18n.useEuiI18n)('euiBreadcrumbs.nav.ariaLabel', 'Breadcrumbs');

  var _useState3 = (0, _react.useState)((0, _breakpoint.getBreakpoint)(typeof window === 'undefined' ? -Infinity : window.innerWidth)),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      currentBreakpoint = _useState4[0],
      setCurrentBreakpoint = _useState4[1];

  var functionToCallOnWindowResize = (0, _services.throttle)(function () {
    var newBreakpoint = (0, _breakpoint.getBreakpoint)(window.innerWidth);

    if (newBreakpoint !== currentBreakpoint) {
      setCurrentBreakpoint(newBreakpoint);
    } // reacts every 50ms to resize changes and always gets the final update

  }, 50); // Add window resize handlers

  (0, _react.useEffect)(function () {
    window.addEventListener('resize', functionToCallOnWindowResize);
    return function () {
      window.removeEventListener('resize', functionToCallOnWindowResize);
    };
  }, [responsive, functionToCallOnWindowResize]);
  var breadcrumbElements = breadcrumbs.map(function (breadcrumb, index) {
    var text = breadcrumb.text,
        href = breadcrumb.href,
        onClick = breadcrumb.onClick,
        truncate = breadcrumb.truncate,
        breadcrumbClassName = breadcrumb.className,
        breadcrumbRest = (0, _objectWithoutProperties2.default)(breadcrumb, ["text", "href", "onClick", "truncate", "className"]);
    var isLastBreadcrumb = index === breadcrumbs.length - 1;
    var className = (0, _classnames.default)('euiBreadcrumb', {
      'euiBreadcrumb--last': isLastBreadcrumb,
      'euiBreadcrumb--truncate': truncate
    });
    var linkProps = {
      className: (0, _classnames.default)(CONTENT_CLASSNAME, breadcrumbClassName),
      'aria-current': isLastBreadcrumb ? 'page' : undefined
    };
    var link = (0, _react2.jsx)(_inner_text.EuiInnerText, null, function (ref, innerText) {
      var title = innerText === '' ? undefined : innerText;

      if (!href && !onClick) {
        return (0, _react2.jsx)("span", (0, _extends2.default)({
          ref: ref,
          title: title
        }, linkProps, breadcrumbRest), text);
      }

      return (0, _react2.jsx)(_link.EuiLink, (0, _extends2.default)({
        ref: ref,
        color: isLastBreadcrumb ? 'text' : 'subdued',
        onClick: onClick,
        href: href,
        title: title
      }, linkProps, breadcrumbRest), text);
    });
    return (0, _react2.jsx)("li", {
      className: className,
      key: index
    }, link);
  }); // Use the default object if they simply passed `true` for responsive

  var responsiveObject = (0, _typeof2.default)(responsive) === 'object' ? responsive : responsiveDefault; // The max property collapses any breadcrumbs past the max quantity.
  // This is the same behavior we want for responsiveness.
  // So calculate the max value based on the combination of `max` and `responsive`

  var calculatedMax = max; // Set the calculated max to the number associated with the currentBreakpoint key if it exists

  if (responsive && responsiveObject[currentBreakpoint]) {
    calculatedMax = responsiveObject[currentBreakpoint];
  } // Final check is to make sure max is used over a larger breakpoint value


  if (max && calculatedMax) {
    calculatedMax = max < calculatedMax ? max : calculatedMax;
  }

  var limitedBreadcrumbs = calculatedMax ? limitBreadcrumbs(breadcrumbElements, calculatedMax, breadcrumbs) : breadcrumbElements;
  var classes = (0, _classnames.default)('euiBreadcrumbs', className, {
    'euiBreadcrumbs--truncate': truncate
  });
  return (0, _react2.jsx)("nav", (0, _extends2.default)({
    "aria-label": ariaLabel,
    className: classes
  }, rest), (0, _react2.jsx)("ol", {
    className: "euiBreadcrumbs__list"
  }, limitedBreadcrumbs));
};

exports.EuiBreadcrumbs = EuiBreadcrumbs;