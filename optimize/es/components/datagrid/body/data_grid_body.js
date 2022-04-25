import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import classNames from 'classnames';
import React, { forwardRef, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import { useMutationObserver } from '../../observer/mutation_observer';
import { useResizeObserver } from '../../observer/resize_observer';
import { EuiDataGridCell } from './data_grid_cell';
import { EuiDataGridFooterRow } from './data_grid_footer_row';
import { EuiDataGridHeaderRow } from './header';
import { DefaultColumnFormatter } from './popover_utils';
import { makeRowManager } from './data_grid_row_manager';
import { useFinalGridDimensions, useUnconstrainedHeight, useVirtualizeContainerWidth } from '../utils/grid_height_width';
import { useDefaultColumnWidth, useColumnWidths } from '../utils/col_widths';
import { useRowHeightUtils, useDefaultRowHeight } from '../utils/row_heights';
import { useHeaderFocusWorkaround } from '../utils/focus';
import { useScroll } from '../utils/scrolling';
import { DataGridSortingContext } from '../utils/sorting';
import { IS_JEST_ENVIRONMENT } from '../../../test';
import { jsx as ___EmotionJSX } from "@emotion/react";
export var Cell = function Cell(_ref) {
  var columnIndex = _ref.columnIndex,
      visibleRowIndex = _ref.rowIndex,
      style = _ref.style,
      data = _ref.data;
  var leadingControlColumns = data.leadingControlColumns,
      trailingControlColumns = data.trailingControlColumns,
      columns = data.columns,
      visibleColCount = data.visibleColCount,
      schema = data.schema,
      popoverContents = data.popoverContents,
      columnWidths = data.columnWidths,
      defaultColumnWidth = data.defaultColumnWidth,
      renderCellValue = data.renderCellValue,
      interactiveCellId = data.interactiveCellId,
      setRowHeight = data.setRowHeight,
      schemaDetectors = data.schemaDetectors,
      rowHeightsOptions = data.rowHeightsOptions,
      rowHeightUtils = data.rowHeightUtils,
      rowManager = data.rowManager;

  var _useContext = useContext(DataGridWrapperRowsContext),
      headerRowHeight = _useContext.headerRowHeight;

  var _useContext2 = useContext(DataGridSortingContext),
      getCorrectRowIndex = _useContext2.getCorrectRowIndex;

  var cellContent;
  var isFirstColumn = columnIndex === 0;
  var isLastColumn = columnIndex === visibleColCount - 1;
  var isStripableRow = visibleRowIndex % 2 !== 0;
  var isLeadingControlColumn = columnIndex < leadingControlColumns.length;
  var isTrailingControlColumn = columnIndex >= leadingControlColumns.length + columns.length;
  var dataColumnIndex = columnIndex - leadingControlColumns.length;
  var column = columns[dataColumnIndex];
  var columnId = column === null || column === void 0 ? void 0 : column.id;
  var transformClass = schemaDetectors.filter(function (row) {
    return (column === null || column === void 0 ? void 0 : column.schema) ? (column === null || column === void 0 ? void 0 : column.schema) === row.type : columnId === row.type;
  })[0];
  var textTransform = transformClass === null || transformClass === void 0 ? void 0 : transformClass.textTransform;
  var classes = classNames(_defineProperty({
    'euiDataGridRowCell--stripe': isStripableRow,
    'euiDataGridRowCell--firstColumn': isFirstColumn,
    'euiDataGridRowCell--lastColumn': isLastColumn,
    'euiDataGridRowCell--controlColumn': isLeadingControlColumn || isTrailingControlColumn
  }, "euiDataGridRowCell--".concat(textTransform), textTransform));
  var sharedCellProps = {
    rowIndex: getCorrectRowIndex(visibleRowIndex),
    visibleRowIndex: visibleRowIndex,
    colIndex: columnIndex,
    interactiveCellId: interactiveCellId,
    className: classes,
    style: _objectSpread(_objectSpread({}, style), {}, {
      top: "".concat(parseFloat(style.top) + headerRowHeight, "px")
    }),
    rowHeightsOptions: rowHeightsOptions,
    rowHeightUtils: rowHeightUtils,
    setRowHeight: isFirstColumn ? setRowHeight : undefined,
    rowManager: rowManager
  };

  if (isLeadingControlColumn) {
    var leadingColumn = leadingControlColumns[columnIndex];
    var id = leadingColumn.id,
        rowCellRender = leadingColumn.rowCellRender;
    cellContent = ___EmotionJSX(EuiDataGridCell, _extends({}, sharedCellProps, {
      columnId: id,
      popoverContent: DefaultColumnFormatter,
      width: leadingColumn.width,
      renderCellValue: rowCellRender,
      isExpandable: false
    }));
  } else if (isTrailingControlColumn) {
    var columnOffset = columns.length + leadingControlColumns.length;
    var trailingColumnIndex = columnIndex - columnOffset;
    var trailingColumn = trailingControlColumns[trailingColumnIndex];
    var _id = trailingColumn.id,
        _rowCellRender = trailingColumn.rowCellRender;
    cellContent = ___EmotionJSX(EuiDataGridCell, _extends({}, sharedCellProps, {
      columnId: _id,
      popoverContent: DefaultColumnFormatter,
      width: trailingColumn.width,
      renderCellValue: _rowCellRender,
      isExpandable: false
    }));
  } else {
    // this is a normal data cell
    // offset the column index by the leading control columns
    var columnType = schema[columnId] ? schema[columnId].columnType : null;
    var isExpandable = column.isExpandable !== undefined ? column.isExpandable : true;
    var popoverContent = popoverContents[columnType] || DefaultColumnFormatter;
    var width = columnWidths[columnId] || defaultColumnWidth;
    cellContent = ___EmotionJSX(EuiDataGridCell, _extends({}, sharedCellProps, {
      columnId: columnId,
      column: column,
      columnType: columnType,
      popoverContent: popoverContent,
      width: width || undefined,
      renderCellValue: renderCellValue,
      interactiveCellId: interactiveCellId,
      isExpandable: isExpandable
    }));
  }

  return cellContent;
}; // Context is required to pass props to react-window's innerElementType
// @see https://github.com/bvaughn/react-window/issues/404

export var DataGridWrapperRowsContext = /*#__PURE__*/createContext({
  headerRow: ___EmotionJSX("div", null),
  headerRowHeight: 0,
  footerRow: null
});
var InnerElement = /*#__PURE__*/forwardRef(function (_ref2, ref) {
  var children = _ref2.children,
      style = _ref2.style,
      rest = _objectWithoutProperties(_ref2, ["children", "style"]);

  var _useContext3 = useContext(DataGridWrapperRowsContext),
      headerRowHeight = _useContext3.headerRowHeight,
      headerRow = _useContext3.headerRow,
      footerRow = _useContext3.footerRow;

  return ___EmotionJSX(React.Fragment, null, ___EmotionJSX("div", _extends({
    ref: ref,
    style: _objectSpread(_objectSpread({}, style), {}, {
      height: style.height + headerRowHeight
    })
  }, rest), headerRow, children), footerRow);
});
InnerElement.displayName = 'EuiDataGridInnerElement';
export var EuiDataGridBody = function EuiDataGridBody(props) {
  var leadingControlColumns = props.leadingControlColumns,
      trailingControlColumns = props.trailingControlColumns,
      columns = props.columns,
      visibleColCount = props.visibleColCount,
      schema = props.schema,
      schemaDetectors = props.schemaDetectors,
      popoverContents = props.popoverContents,
      rowCount = props.rowCount,
      _props$visibleRows = props.visibleRows,
      startRow = _props$visibleRows.startRow,
      endRow = _props$visibleRows.endRow,
      visibleRowCount = _props$visibleRows.visibleRowCount,
      renderCellValue = props.renderCellValue,
      renderFooterCellValue = props.renderFooterCellValue,
      interactiveCellId = props.interactiveCellId,
      pagination = props.pagination,
      headerIsInteractive = props.headerIsInteractive,
      handleHeaderMutation = props.handleHeaderMutation,
      setVisibleColumns = props.setVisibleColumns,
      switchColumnPos = props.switchColumnPos,
      onColumnResize = props.onColumnResize,
      rowHeightsOptions = props.rowHeightsOptions,
      virtualizationOptions = props.virtualizationOptions,
      isFullScreen = props.isFullScreen,
      gridStyles = props.gridStyles,
      gridWidth = props.gridWidth,
      gridRef = props.gridRef,
      gridItemsRendered = props.gridItemsRendered,
      wrapperRef = props.wrapperRef;
  /**
   * Grid refs & observers
   */

  var wrapperDimensions = useResizeObserver(wrapperRef.current);
  var outerGridRef = useRef(null); // container that becomes scrollable

  var innerGridRef = useRef(null); // container sized to fit all content

  /**
   * Widths
   */

  var virtualizeContainerWidth = useVirtualizeContainerWidth(outerGridRef.current, gridWidth, pagination === null || pagination === void 0 ? void 0 : pagination.pageSize); // compute the default column width from the container's width and count of visible columns

  var defaultColumnWidth = useDefaultColumnWidth(virtualizeContainerWidth, leadingControlColumns, trailingControlColumns, columns);

  var _useColumnWidths = useColumnWidths({
    columns: columns,
    leadingControlColumns: leadingControlColumns,
    trailingControlColumns: trailingControlColumns,
    defaultColumnWidth: defaultColumnWidth,
    onColumnResize: onColumnResize
  }),
      columnWidths = _useColumnWidths.columnWidths,
      setColumnWidth = _useColumnWidths.setColumnWidth,
      getColumnWidth = _useColumnWidths.getColumnWidth;
  /**
   * Header
   */


  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      headerRowRef = _useState2[0],
      setHeaderRowRef = _useState2[1];

  useMutationObserver(headerRowRef, handleHeaderMutation, {
    subtree: true,
    childList: true
  });

  var _useResizeObserver = useResizeObserver(headerRowRef, 'height'),
      headerRowHeight = _useResizeObserver.height;

  var headerRow = useMemo(function () {
    return ___EmotionJSX(EuiDataGridHeaderRow, {
      ref: setHeaderRowRef,
      switchColumnPos: switchColumnPos,
      setVisibleColumns: setVisibleColumns,
      leadingControlColumns: leadingControlColumns,
      trailingControlColumns: trailingControlColumns,
      columns: columns,
      columnWidths: columnWidths,
      defaultColumnWidth: defaultColumnWidth,
      setColumnWidth: setColumnWidth,
      schema: schema,
      schemaDetectors: schemaDetectors,
      headerIsInteractive: headerIsInteractive
    });
  }, [switchColumnPos, setVisibleColumns, leadingControlColumns, trailingControlColumns, columns, columnWidths, defaultColumnWidth, setColumnWidth, schema, schemaDetectors, headerIsInteractive]);
  useHeaderFocusWorkaround(headerIsInteractive);
  /**
   * Footer
   */

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      footerRowRef = _useState4[0],
      setFooterRowRef = _useState4[1];

  var _useResizeObserver2 = useResizeObserver(footerRowRef, 'height'),
      footerRowHeight = _useResizeObserver2.height;

  var footerRow = useMemo(function () {
    if (renderFooterCellValue == null) return null;
    return ___EmotionJSX(EuiDataGridFooterRow, {
      ref: setFooterRowRef,
      leadingControlColumns: leadingControlColumns,
      trailingControlColumns: trailingControlColumns,
      columns: columns,
      schema: schema,
      popoverContents: popoverContents,
      columnWidths: columnWidths,
      defaultColumnWidth: defaultColumnWidth,
      renderCellValue: renderFooterCellValue,
      rowIndex: visibleRowCount,
      visibleRowIndex: visibleRowCount,
      interactiveCellId: interactiveCellId
    });
  }, [columnWidths, columns, defaultColumnWidth, interactiveCellId, leadingControlColumns, popoverContents, renderFooterCellValue, schema, trailingControlColumns, visibleRowCount]);
  /**
   * Handle scrolling cells fully into view
   */

  useScroll({
    gridRef: gridRef,
    outerGridRef: outerGridRef,
    innerGridRef: innerGridRef,
    headerRowHeight: headerRowHeight,
    footerRowHeight: footerRowHeight,
    visibleRowCount: visibleRowCount,
    hasStickyFooter: !!(renderFooterCellValue && gridStyles.stickyFooter)
  });
  /**
   * Row manager
   */
  // useState instead of useMemo as React reserves the right to drop memoized
  // values in the future, and that would be very bad here

  var _useState5 = useState(function () {
    return makeRowManager(innerGridRef);
  }),
      _useState6 = _slicedToArray(_useState5, 1),
      rowManager = _useState6[0];
  /**
   * Heights
   */


  var rowHeightUtils = useRowHeightUtils({
    gridRef: gridRef.current,
    gridStyles: gridStyles,
    columns: columns
  });

  var _useDefaultRowHeight = useDefaultRowHeight({
    rowHeightsOptions: rowHeightsOptions,
    rowHeightUtils: rowHeightUtils
  }),
      defaultRowHeight = _useDefaultRowHeight.defaultRowHeight,
      setRowHeight = _useDefaultRowHeight.setRowHeight,
      getRowHeight = _useDefaultRowHeight.getRowHeight;

  var unconstrainedHeight = useUnconstrainedHeight({
    rowHeightUtils: rowHeightUtils,
    startRow: startRow,
    endRow: endRow,
    rowHeightsOptions: rowHeightsOptions,
    defaultRowHeight: defaultRowHeight,
    headerRowHeight: headerRowHeight,
    footerRowHeight: footerRowHeight,
    outerGridRef: outerGridRef,
    innerGridRef: innerGridRef
  });
  /**
   * Final grid height & width
   */

  var _useFinalGridDimensio = useFinalGridDimensions({
    unconstrainedHeight: unconstrainedHeight,
    unconstrainedWidth: 0,
    // unable to determine this until the container's size is known
    wrapperDimensions: wrapperDimensions,
    wrapperRef: wrapperRef,
    isFullScreen: isFullScreen,
    rowCount: rowCount
  }),
      finalWidth = _useFinalGridDimensio.finalWidth,
      finalHeight = _useFinalGridDimensio.finalHeight;
  /**
   * Grid resets
   */


  useEffect(function () {
    if (gridRef.current) {
      gridRef.current.resetAfterColumnIndex(0);
    }
  }, [gridRef, columns, columnWidths, defaultColumnWidth]);
  useEffect(function () {
    if (gridRef.current && rowHeightsOptions) {
      gridRef.current.resetAfterRowIndex(0);
    }
  }, [gridRef, pagination === null || pagination === void 0 ? void 0 : pagination.pageIndex, rowHeightsOptions, gridStyles === null || gridStyles === void 0 ? void 0 : gridStyles.cellPadding, gridStyles === null || gridStyles === void 0 ? void 0 : gridStyles.fontSize]);
  useEffect(function () {
    if (gridRef.current) {
      gridRef.current.resetAfterRowIndex(0);
    }
  }, [gridRef, getRowHeight]);
  return IS_JEST_ENVIRONMENT || finalWidth > 0 ? ___EmotionJSX(DataGridWrapperRowsContext.Provider, {
    value: {
      headerRowHeight: headerRowHeight,
      headerRow: headerRow,
      footerRow: footerRow
    }
  }, ___EmotionJSX(Grid, _extends({}, virtualizationOptions ? virtualizationOptions : {}, {
    ref: gridRef,
    onItemsRendered: function onItemsRendered(itemsRendered) {
      gridItemsRendered.current = itemsRendered;
    },
    innerElementType: InnerElement,
    outerRef: outerGridRef,
    innerRef: innerGridRef,
    className: "euiDataGrid__virtualized",
    columnCount: visibleColCount,
    width: finalWidth,
    columnWidth: getColumnWidth,
    height: finalHeight,
    rowHeight: getRowHeight,
    itemData: {
      schemaDetectors: schemaDetectors,
      setRowHeight: setRowHeight,
      leadingControlColumns: leadingControlColumns,
      trailingControlColumns: trailingControlColumns,
      columns: columns,
      visibleColCount: visibleColCount,
      schema: schema,
      popoverContents: popoverContents,
      columnWidths: columnWidths,
      defaultColumnWidth: defaultColumnWidth,
      renderCellValue: renderCellValue,
      interactiveCellId: interactiveCellId,
      rowHeightsOptions: rowHeightsOptions,
      rowHeightUtils: rowHeightUtils,
      rowManager: rowManager
    },
    rowCount: IS_JEST_ENVIRONMENT || headerRowHeight > 0 ? visibleRowCount : 0
  }), Cell)) : null;
};