"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiColorPicker = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _chromaJs = _interopRequireDefault(require("chroma-js"));

var _form = require("../form");

var _i18n = require("../i18n");

var _popover = require("../popover");

var _spacer = require("../spacer");

var _services = require("../../services");

var _color_picker_swatch = require("./color_picker_swatch");

var _hue = require("./hue");

var _saturation = require("./saturation");

var _utils = require("./utils");

var _react2 = require("@emotion/react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
function isKeyboardEvent(event) {
  return (0, _typeof2.default)(event) === 'object' && 'key' in event;
}

var getOutput = function getOutput(text) {
  var showAlpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var color = (0, _utils.getChromaColor)(text, true);
  var isValid = true;

  if (!showAlpha && color !== null) {
    isValid = color.alpha() === 1;
  } // Note that if a consumer has disallowed opacity,
  // we still return the color with an alpha channel, but mark it as invalid


  return color ? {
    rgba: color.rgba(),
    hex: color.hex(),
    isValid: isValid
  } : {
    rgba: _utils.RGB_FALLBACK,
    hex: _utils.HEX_FALLBACK,
    isValid: false
  };
};

var getHsv = function getHsv(hsv) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Chroma's passthrough (RGB) parsing determines that black/white/gray are hue-less and returns `NaN`
  // For our purposes we can process `NaN` as `0` if necessary
  if (!hsv) return _utils.HSV_FALLBACK;
  var hue = isNaN(hsv[0]) ? fallback : hsv[0];
  return [hue, hsv[1], hsv[2]];
};

var EuiColorPicker = function EuiColorPicker(_ref) {
  var button = _ref.button,
      className = _ref.className,
      color = _ref.color,
      _ref$compressed = _ref.compressed,
      compressed = _ref$compressed === void 0 ? false : _ref$compressed,
      disabled = _ref.disabled,
      _ref$display = _ref.display,
      display = _ref$display === void 0 ? 'default' : _ref$display,
      _ref$fullWidth = _ref.fullWidth,
      fullWidth = _ref$fullWidth === void 0 ? false : _ref$fullWidth,
      id = _ref.id,
      isInvalid = _ref.isInvalid,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? 'default' : _ref$mode,
      onBlur = _ref.onBlur,
      onChange = _ref.onChange,
      onFocus = _ref.onFocus,
      _ref$readOnly = _ref.readOnly,
      readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
      _ref$swatches = _ref.swatches,
      swatches = _ref$swatches === void 0 ? _services.VISUALIZATION_COLORS : _ref$swatches,
      popoverZIndex = _ref.popoverZIndex,
      prepend = _ref.prepend,
      append = _ref.append,
      _ref$showAlpha = _ref.showAlpha,
      showAlpha = _ref$showAlpha === void 0 ? false : _ref$showAlpha,
      format = _ref.format,
      _ref$secondaryInputDi = _ref.secondaryInputDisplay,
      secondaryInputDisplay = _ref$secondaryInputDi === void 0 ? 'none' : _ref$secondaryInputDi,
      _ref$isClearable = _ref.isClearable,
      isClearable = _ref$isClearable === void 0 ? false : _ref$isClearable,
      placeholder = _ref.placeholder,
      dataTestSubj = _ref['data-test-subj'];

  var _useEuiI18n = (0, _i18n.useEuiI18n)(['euiColorPicker.popoverLabel', 'euiColorPicker.colorLabel', 'euiColorPicker.colorErrorMessage', 'euiColorPicker.transparent', 'euiColorPicker.alphaLabel', 'euiColorPicker.openLabel', 'euiColorPicker.closeLabel'], ['Color selection dialog', 'Color value', 'Invalid color value', 'Transparent', 'Alpha channel (opacity) value', 'Press the escape key to close the popover', 'Press the down key to open a popover containing color options']),
      _useEuiI18n2 = (0, _slicedToArray2.default)(_useEuiI18n, 7),
      popoverLabel = _useEuiI18n2[0],
      colorLabel = _useEuiI18n2[1],
      colorErrorMessage = _useEuiI18n2[2],
      transparent = _useEuiI18n2[3],
      alphaLabel = _useEuiI18n2[4],
      openLabel = _useEuiI18n2[5],
      closeLabel = _useEuiI18n2[6];

  var preferredFormat = (0, _react.useMemo)(function () {
    if (format) return format;
    var parsed = (0, _utils.parseColor)(color);
    return parsed != null && (0, _typeof2.default)(parsed) === 'object' ? 'rgba' : 'hex';
  }, [color, format]);
  var chromaColor = (0, _react.useMemo)(function () {
    return (0, _utils.getChromaColor)(color, showAlpha);
  }, [color, showAlpha]);

  var _useState = (0, _react.useState)('100'),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      alphaRangeValue = _useState2[0],
      setAlphaRangeValue = _useState2[1];

  var alphaChannel = (0, _react.useMemo)(function () {
    return chromaColor ? chromaColor.alpha() : 1;
  }, [chromaColor]);
  (0, _react.useEffect)(function () {
    var percent = (alphaChannel * 100).toFixed();
    setAlphaRangeValue(percent);
  }, [alphaChannel]);

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isColorSelectorShown = _useState4[0],
      setIsColorSelectorShown = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      inputRef = _useState6[0],
      setInputRef = _useState6[1]; // Ideally this is uses `useRef`, but `EuiFieldText` isn't ready for that


  var prevColor = (0, _react.useRef)(chromaColor ? chromaColor.rgba().join() : null);

  var _useState7 = (0, _react.useState)(chromaColor ? getHsv(chromaColor.hsv()) : _utils.HSV_FALLBACK),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      colorAsHsv = _useState8[0],
      setColorAsHsv = _useState8[1];

  var usableHsv = (0, _react.useMemo)(function () {
    if (chromaColor && chromaColor.rgba().join() !== prevColor.current) {
      var _chromaColor$hsv = chromaColor.hsv(),
          _chromaColor$hsv2 = (0, _slicedToArray2.default)(_chromaColor$hsv, 3),
          h = _chromaColor$hsv2[0],
          s = _chromaColor$hsv2[1],
          v = _chromaColor$hsv2[2];

      var hue = isNaN(h) ? colorAsHsv[0] : h;
      return [hue, s, v];
    }

    return colorAsHsv;
  }, [chromaColor, colorAsHsv]);
  var saturationRef = (0, _react.useRef)(null);
  var swatchRef = (0, _react.useRef)(null);
  var testSubjAnchor = (0, _classnames.default)('euiColorPickerAnchor', dataTestSubj);

  var updateColorAsHsv = function updateColorAsHsv(_ref2) {
    var _ref3 = (0, _slicedToArray2.default)(_ref2, 3),
        h = _ref3[0],
        s = _ref3[1],
        v = _ref3[2];

    setColorAsHsv(getHsv([h, s, v], usableHsv[0]));
  };

  var classes = (0, _classnames.default)('euiColorPicker', className);
  var popoverClass = 'euiColorPicker__popoverAnchor';
  var panelClasses = (0, _classnames.default)('euiColorPicker__popoverPanel', {
    'euiColorPicker__popoverPanel--pickerOnly': mode === 'picker' && secondaryInputDisplay !== 'bottom',
    'euiColorPicker__popoverPanel--customButton': button
  });
  var swatchClass = 'euiColorPicker__swatchSelect';
  var inputClasses = (0, _classnames.default)('euiColorPicker__input', {
    'euiColorPicker__input--inGroup': prepend || append
  });

  var handleOnChange = function handleOnChange(text) {
    var output = getOutput(text, showAlpha);

    if (output.isValid) {
      prevColor.current = output.rgba.join();
    }

    onChange(text, output);
  };

  var handleOnBlur = function handleOnBlur() {
    // `onBlur` also gets called when the popover is closing
    // so prevent a second `onBlur` if the popover is open
    if (!isColorSelectorShown && onBlur) {
      onBlur();
    }
  };

  var closeColorSelector = function closeColorSelector() {
    var shouldDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (onBlur) {
      onBlur();
    }

    if (shouldDelay) {
      setTimeout(function () {
        return setIsColorSelectorShown(false);
      });
    } else {
      setIsColorSelectorShown(false);
    }
  };

  var showColorSelector = function showColorSelector() {
    if (isColorSelectorShown || readOnly) return;

    if (onFocus) {
      onFocus();
    }

    setIsColorSelectorShown(true);
  };

  var handleToggle = function handleToggle() {
    if (isColorSelectorShown) {
      closeColorSelector();
    } else {
      showColorSelector();
    }
  };

  var handleFinalSelection = function handleFinalSelection() {
    // When the trigger is an input, focus the input so you can adjust
    if (inputRef) {
      inputRef.focus();
    }

    closeColorSelector(true);
  };

  var handleOnKeyDown = function handleOnKeyDown(event) {
    if (event.key === _services.keys.ENTER) {
      if (isColorSelectorShown) {
        handleFinalSelection();
      } else {
        showColorSelector();
      }
    }
  };

  var handleInputActivity = function handleInputActivity(event) {
    if (isKeyboardEvent(event)) {
      if (event.key === _services.keys.ENTER) {
        event.preventDefault();
        handleToggle();
      }
    } else {
      showColorSelector();
    }
  };

  var handleToggleOnKeyDown = function handleToggleOnKeyDown(event) {
    if (event.key === _services.keys.ARROW_DOWN) {
      event.preventDefault();

      if (isColorSelectorShown) {
        var nextFocusEl = mode !== 'swatch' ? saturationRef : swatchRef;

        if (nextFocusEl.current) {
          nextFocusEl.current.focus();
        }
      } else {
        showColorSelector();
      }
    }
  };

  var handleColorInput = function handleColorInput(event) {
    handleOnChange(event.target.value);
    var newColor = (0, _utils.getChromaColor)(event.target.value, showAlpha);

    if (newColor) {
      updateColorAsHsv(newColor.hsv());
    }
  };

  var handleClearInput = function handleClearInput() {
    handleOnChange('');

    if (secondaryInputDisplay === 'none' && isColorSelectorShown) {
      closeColorSelector();
    }
  };

  var updateWithHsv = function updateWithHsv(hsv) {
    var color = _chromaJs.default.hsv.apply(_chromaJs.default, (0, _toConsumableArray2.default)(hsv)).alpha(alphaChannel);

    var formatted;

    if (preferredFormat === 'rgba') {
      formatted = alphaChannel < 1 ? color.rgba().join(_utils.RGB_JOIN) : color.rgb().join(_utils.RGB_JOIN);
    } else {
      formatted = color.hex();
    }

    handleOnChange(formatted);
    updateColorAsHsv(hsv);
  };

  var handleColorSelection = function handleColorSelection(color) {
    var _usableHsv = (0, _slicedToArray2.default)(usableHsv, 1),
        h = _usableHsv[0];

    var _color = (0, _slicedToArray2.default)(color, 3),
        s = _color[1],
        v = _color[2];

    var newHsv = [h, s, v];
    updateWithHsv(newHsv);
  };

  var handleHueSelection = function handleHueSelection(hue) {
    var _usableHsv2 = (0, _slicedToArray2.default)(usableHsv, 3),
        s = _usableHsv2[1],
        v = _usableHsv2[2];

    var newHsv = [hue, s, v];
    updateWithHsv(newHsv);
  };

  var handleSwatchSelection = function handleSwatchSelection(color) {
    var newColor = (0, _utils.getChromaColor)(color, showAlpha);
    handleOnChange(color);

    if (newColor) {
      updateColorAsHsv(newColor.hsv());
    }

    handleFinalSelection();
  };

  var handleAlphaSelection = function handleAlphaSelection(e, isValid) {
    var target = e.target;
    setAlphaRangeValue(target.value || '');

    if (isValid) {
      var alpha = parseInt(target.value, 10) / 100;
      var newColor = chromaColor ? chromaColor.alpha(alpha) : null;
      var hex = newColor ? newColor.hex() : _utils.HEX_FALLBACK;
      var rgba = newColor ? newColor.rgba() : _utils.RGB_FALLBACK;

      var _text;

      if (preferredFormat === 'rgba') {
        _text = alpha < 1 ? rgba.join(_utils.RGB_JOIN) : rgba.slice(0, 3).join(_utils.RGB_JOIN);
      } else {
        _text = hex;
      }

      onChange(_text, {
        hex: hex,
        rgba: rgba,
        isValid: !!newColor
      });
    }
  };

  var inlineInput = secondaryInputDisplay !== 'none' && (0, _react2.jsx)(_form.EuiFormRow, {
    display: "rowCompressed",
    isInvalid: isInvalid,
    error: isInvalid ? colorErrorMessage : null
  }, (0, _react2.jsx)(_form.EuiFormControlLayout, {
    clear: isClearable && color && !readOnly && !disabled ? {
      onClick: handleClearInput
    } : undefined,
    readOnly: readOnly,
    compressed: compressed
  }, (0, _react2.jsx)(_form.EuiFieldText, {
    compressed: true,
    value: color ? color.toUpperCase() : _utils.HEX_FALLBACK,
    placeholder: !color ? placeholder || transparent : undefined,
    onChange: handleColorInput,
    isInvalid: isInvalid,
    disabled: disabled,
    readOnly: readOnly,
    "aria-label": colorLabel,
    autoComplete: "off",
    "data-test-subj": "euiColorPickerInput_".concat(secondaryInputDisplay)
  })));
  var showSecondaryInputOnly = mode === 'secondaryInput';
  var showPicker = mode !== 'swatch' && !showSecondaryInputOnly;
  var showSwatches = mode !== 'picker' && !showSecondaryInputOnly;
  var composite = (0, _react2.jsx)(_react.default.Fragment, null, secondaryInputDisplay === 'top' && (0, _react2.jsx)(_react.default.Fragment, null, inlineInput, (0, _react2.jsx)(_spacer.EuiSpacer, {
    size: "s"
  })), showPicker && (0, _react2.jsx)("div", {
    onKeyDown: handleOnKeyDown
  }, (0, _react2.jsx)(_saturation.EuiSaturation, {
    id: id,
    color: usableHsv,
    hex: chromaColor ? chromaColor.hex() : undefined,
    onChange: handleColorSelection,
    ref: saturationRef
  }), (0, _react2.jsx)(_hue.EuiHue, {
    id: id,
    hue: usableHsv[0],
    hex: chromaColor ? chromaColor.hex() : undefined,
    onChange: handleHueSelection
  })), showSwatches && (0, _react2.jsx)("ul", {
    className: "euiColorPicker__swatches"
  }, swatches.map(function (swatch, index) {
    return (0, _react2.jsx)("li", {
      className: "euiColorPicker__swatch-item",
      key: swatch
    }, (0, _react2.jsx)(_color_picker_swatch.EuiColorPickerSwatch, {
      className: swatchClass,
      color: swatch,
      onClick: function onClick() {
        return handleSwatchSelection(swatch);
      },
      ref: index === 0 ? swatchRef : undefined
    }));
  })), secondaryInputDisplay === 'bottom' && (0, _react2.jsx)(_react.default.Fragment, null, mode !== 'picker' && (0, _react2.jsx)(_spacer.EuiSpacer, {
    size: "s"
  }), inlineInput), showAlpha && (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_spacer.EuiSpacer, {
    size: "s"
  }), (0, _react2.jsx)(_form.EuiRange, {
    className: "euiColorPicker__alphaRange",
    "data-test-subj": "euiColorPickerAlpha",
    compressed: true,
    showInput: true,
    max: 100,
    min: 0,
    value: alphaRangeValue,
    append: "%",
    onChange: handleAlphaSelection,
    "aria-label": alphaLabel
  })));
  var buttonOrInput;

  if (button) {
    buttonOrInput = /*#__PURE__*/(0, _react.cloneElement)(button, {
      onClick: handleToggle,
      id: id,
      disabled: disabled,
      'data-test-subj': testSubjAnchor
    });
  } else {
    var colorStyle = chromaColor ? chromaColor.css() : undefined;
    buttonOrInput = (0, _react2.jsx)(_form.EuiFormControlLayout, {
      icon: !readOnly ? {
        type: 'arrowDown',
        side: 'right'
      } : undefined,
      clear: isClearable && color && !readOnly && !disabled ? {
        onClick: handleClearInput
      } : undefined,
      readOnly: readOnly,
      fullWidth: fullWidth,
      compressed: compressed,
      onKeyDown: handleToggleOnKeyDown,
      prepend: prepend,
      append: append
    }, (0, _react2.jsx)("div", {
      // Used to pass the chosen color through to form layout SVG using currentColor
      style: {
        color: colorStyle
      }
    }, (0, _react2.jsx)(_form.EuiFieldText, {
      className: inputClasses,
      onClick: handleInputActivity,
      onKeyDown: handleInputActivity,
      onBlur: handleOnBlur,
      value: color ? color.toUpperCase() : _utils.HEX_FALLBACK,
      placeholder: !color ? placeholder || transparent : undefined,
      id: id,
      onChange: handleColorInput,
      icon: chromaColor ? 'swatchInput' : 'stopSlash',
      inputRef: setInputRef,
      isInvalid: isInvalid,
      compressed: compressed,
      disabled: disabled,
      readOnly: readOnly,
      fullWidth: fullWidth,
      autoComplete: "off",
      "data-test-subj": testSubjAnchor,
      "aria-label": isColorSelectorShown ? openLabel : closeLabel
    })));
  }

  return display === 'inline' ? (0, _react2.jsx)("div", {
    className: classes
  }, composite) : (0, _react2.jsx)(_popover.EuiPopover, {
    initialFocus: inputRef !== null && inputRef !== void 0 ? inputRef : undefined,
    button: buttonOrInput,
    isOpen: isColorSelectorShown,
    closePopover: handleFinalSelection,
    zIndex: popoverZIndex,
    className: popoverClass,
    panelClassName: panelClasses,
    display: button ? 'inlineBlock' : 'block',
    attachToAnchor: button ? false : true,
    anchorPosition: "downLeft",
    panelPaddingSize: "s",
    tabIndex: -1,
    "aria-label": popoverLabel,
    focusTrapProps: inputRef ? {
      shards: [inputRef]
    } : undefined
  }, (0, _react2.jsx)("div", {
    className: classes,
    "data-test-subj": "euiColorPickerPopover"
  }, composite));
};

exports.EuiColorPicker = EuiColorPicker;