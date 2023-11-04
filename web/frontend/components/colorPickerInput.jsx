import {
  Box,
  ColorPicker,
  InlineStack,
  Popover,
  Text,
  TextField,
  BlockStack,
  hexToRgb,
  hsbToRgb,
  rgbToHex,
  rgbToHsb,
} from "@shopify/polaris";
import { useCallback, useState } from "react";

export function ColorPickerInput ({ inputColor = "#fff", label, onChange, helpText = null }) {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );
  const [buttonColor, setButtonColor] = useState(inputColor);
  const activator = (
    <>
      <InlineStack align="start" gap="4">
        <div
          onClick={togglePopoverActive}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "20%",
            background: buttonColor,
            cursor: "pointer",
            border: "1px solid #bbb",
          }}
        ></div>
        <Box>
          <Text>{ label }</Text>
          <Text Variant="bodyMd">{buttonColor}</Text>
        </Box>
      </InlineStack>

      {helpText && <div style={{ paddingTop: "0.4rem"}} ><Text variant="subdued">{helpText}</Text></div>}

    </>
  );
  const [color, setColor] = useState({
    hue: rgbToHsb(hexToRgb('inputColor')).hue,
    brightness: rgbToHsb(hexToRgb('inputColor')).brightness,
    saturation: rgbToHsb(hexToRgb('inputColor')).saturation,
  });

  return (
    <BlockStack align="end">
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}>
        <BlockStack >
          <ColorPicker
            onChange={(value) => {
              let color = {
                alpha: value.alpha,
                hue: value.hue,
                saturation: value.saturation || null, 
                brightness: value.brightness || null
              }
              
              setColor(color);
              const hexColor = rgbToHex(hsbToRgb(color))
              setButtonColor(hexColor);
              onChange(hexColor)
            }}
            allowAlpha
            color={color}
          />
          <Box width="90%" padding="1">
            <TextField value={buttonColor} focused={false} readOnly />
          </Box>
        </BlockStack>
      </Popover>
    </BlockStack>
  );
}
