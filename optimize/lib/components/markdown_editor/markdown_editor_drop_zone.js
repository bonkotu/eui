"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiMarkdownEditorDropZone = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactDropzone = require("react-dropzone");

var _markdown_editor_footer = require("./markdown_editor_footer");

var _resize_observer = require("../observer/resize_observer");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
var getUnacceptedItems = function getUnacceptedItems(items, dropHandlers) {
  var unacceptedItems = [];

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var isAccepted = false;

    for (var j = 0; j < dropHandlers.length; j++) {
      if (dropHandlers[j].accepts(item.type)) {
        isAccepted = true;
        break;
      }
    }

    if (!isAccepted) {
      unacceptedItems.push(item);
    }
  }

  return unacceptedItems;
};

var EuiMarkdownEditorDropZone = function EuiMarkdownEditorDropZone(props) {
  var _React$useState = _react.default.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      isDragging = _React$useState2[0],
      toggleDragging = _React$useState2[1];

  var _React$useState3 = _react.default.useState(false),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      isUploadingFiles = _React$useState4[0],
      toggleUploadingFiles = _React$useState4[1];

  var _React$useState5 = _react.default.useState(false),
      _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
      isDraggingError = _React$useState6[0],
      toggleDraggingError = _React$useState6[1];

  var children = props.children,
      uiPlugins = props.uiPlugins,
      errors = props.errors,
      dropHandlers = props.dropHandlers,
      insertText = props.insertText,
      hasUnacceptedItems = props.hasUnacceptedItems,
      setHasUnacceptedItems = props.setHasUnacceptedItems,
      setEditorFooterHeight = props.setEditorFooterHeight,
      isEditing = props.isEditing;
  var classes = (0, _classnames.default)('euiMarkdownEditorDropZone', {
    'euiMarkdownEditorDropZone--isDragging': isDragging,
    'euiMarkdownEditorDropZone--hasError': hasUnacceptedItems,
    'euiMarkdownEditorDropZone--isDraggingError': isDraggingError
  });

  var _React$useState7 = _react.default.useState(null),
      _React$useState8 = (0, _slicedToArray2.default)(_React$useState7, 2),
      editorFooterRef = _React$useState8[0],
      setEditorFooterRef = _React$useState8[1];

  var _useResizeObserver = (0, _resize_observer.useResizeObserver)(editorFooterRef, 'height'),
      editorFooterHeight = _useResizeObserver.height;

  (0, _react.useEffect)(function () {
    if (editorFooterHeight !== 0) {
      setEditorFooterHeight(editorFooterHeight);
    }
  }, [setEditorFooterHeight, isEditing, editorFooterHeight]);

  var _useDropzone = (0, _reactDropzone.useDropzone)({
    disabled: dropHandlers.length === 0,
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    preventDropOnDocument: false,
    // multiple: false,
    onDragOver: function onDragOver(e) {
      var result;

      if (e.dataTransfer) {
        var unacceptedItems = getUnacceptedItems(e.dataTransfer.items, dropHandlers);
        setHasUnacceptedItems(unacceptedItems.length > 0);
        toggleDraggingError(unacceptedItems.length > 0);
        result = unacceptedItems.length === 0;
      } else {
        setHasUnacceptedItems(false);
        result = false;
      }

      toggleDragging(result);

      if (result === false) {
        e.preventDefault();
      }

      return result;
    },
    onDragEnter: function onDragEnter(e) {
      var result;

      if (e.dataTransfer) {
        var unacceptedItems = getUnacceptedItems(e.dataTransfer.items, dropHandlers);
        setHasUnacceptedItems(unacceptedItems.length > 0);
        toggleDraggingError(unacceptedItems.length > 0);
        result = unacceptedItems.length === 0;
      } else {
        setHasUnacceptedItems(false);
        result = false;
      }

      toggleDragging(result);

      if (result === false) {
        e.preventDefault();
      }

      return result;
    },
    onDragLeave: function onDragLeave() {
      toggleDragging(false);
    },
    onDrop: function onDrop(acceptedFiles) {
      var fileHandlers = []; // verify all files being dropped are supported

      preparation: for (var i = 0; i < acceptedFiles.length; i++) {
        var file = acceptedFiles[i];

        for (var j = 0; j < dropHandlers.length; j++) {
          if (dropHandlers[j].accepts(file.type)) {
            fileHandlers.push(dropHandlers[j]);
            continue preparation;
          }
        } // if we get here then a file isn't handled


        setHasUnacceptedItems(true);
        toggleDragging(false);
        toggleDraggingError(false);
        return;
      }

      toggleUploadingFiles(true);
      var resolved = [];

      for (var _i = 0; _i < acceptedFiles.length; _i++) {
        var _file = acceptedFiles[_i];
        var handler = fileHandlers[_i];
        resolved.push(handler.getFormattingForItem(_file));
      }

      Promise.all(resolved).then(function (results) {
        results.forEach(function (_ref) {
          var text = _ref.text,
              config = _ref.config;
          return insertText(text, config);
        });
      }).catch(function () {}).then(function () {
        toggleDragging(false);
        toggleUploadingFiles(false);
        toggleDraggingError(false);
      });
    }
  }),
      getRootProps = _useDropzone.getRootProps,
      getInputProps = _useDropzone.getInputProps,
      open = _useDropzone.open;

  return (0, _react2.jsx)("div", (0, _extends2.default)({}, getRootProps(), {
    className: classes
  }), children, (0, _react2.jsx)(_markdown_editor_footer.EuiMarkdownEditorFooter, {
    ref: setEditorFooterRef,
    uiPlugins: uiPlugins,
    openFiles: function openFiles() {
      setHasUnacceptedItems(false);
      open();
    },
    isUploadingFiles: isUploadingFiles,
    hasUnacceptedItems: hasUnacceptedItems,
    dropHandlers: dropHandlers,
    errors: errors
  }), (0, _react2.jsx)("input", getInputProps()));
};

exports.EuiMarkdownEditorDropZone = EuiMarkdownEditorDropZone;