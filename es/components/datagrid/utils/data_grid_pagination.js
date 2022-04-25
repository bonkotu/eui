function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import React, { useCallback, useContext } from 'react';
import { useEuiI18n } from '../../i18n'; // Note: this file must be named data_grid_pagination to match i18n tokens

import { EuiTablePagination } from '../../table/table_pagination';
import { DataGridFocusContext } from './focus';
import { jsx as ___EmotionJSX } from "@emotion/react";
export var EuiDataGridPaginationRenderer = function EuiDataGridPaginationRenderer(_ref) {
  var pageIndex = _ref.pageIndex,
      pageSize = _ref.pageSize,
      pageSizeOptions = _ref.pageSizeOptions,
      _onChangePage = _ref.onChangePage,
      onChangeItemsPerPage = _ref.onChangeItemsPerPage,
      rowCount = _ref.rowCount,
      controls = _ref.controls,
      ariaLabel = _ref['aria-label'];
  var detailedPaginationLabel = useEuiI18n('euiDataGridPagination.detailedPaginationLabel', 'Pagination for preceding grid: {label}', {
    label: ariaLabel !== null && ariaLabel !== void 0 ? ariaLabel : ''
  });
  var paginationLabel = useEuiI18n('euiDataGridPagination.paginationLabel', 'Pagination for preceding grid'); // Focus the first data cell & scroll back to the top of the grid whenever paginating to a new page

  var _useContext = useContext(DataGridFocusContext),
      setFocusedCell = _useContext.setFocusedCell;

  var onChangePage = useCallback(function (pageIndex) {
    _onChangePage(pageIndex);

    setFocusedCell([0, 0]);
  }, [setFocusedCell, _onChangePage]);
  var pageCount = Math.ceil(rowCount / pageSize);

  var minSizeOption = pageSizeOptions && _toConsumableArray(pageSizeOptions).sort(function (a, b) {
    return a - b;
  })[0];

  if (rowCount < (minSizeOption || pageSize)) {
    /**
     * Do not render the pagination when:
     * 1. Rows count is less than min pagination option (rows per page)
     * 2. Rows count is less than pageSize (the case when there are no pageSizeOptions provided)
     */
    return null;
  } // hide select rows per page if pageSizeOptions is undefined or an empty array


  var hidePerPageOptions = !pageSizeOptions || pageSizeOptions.length === 0;
  return ___EmotionJSX("div", {
    className: "euiDataGrid__pagination"
  }, ___EmotionJSX(EuiTablePagination, {
    "aria-controls": controls,
    activePage: pageIndex,
    hidePerPageOptions: hidePerPageOptions,
    itemsPerPage: pageSize,
    itemsPerPageOptions: pageSizeOptions,
    pageCount: pageCount,
    onChangePage: onChangePage,
    onChangeItemsPerPage: onChangeItemsPerPage,
    "aria-label": ariaLabel ? detailedPaginationLabel : paginationLabel
  }));
};