import {
  Box,
  ColorPicker,
  HorizontalStack,
  Popover,
  Text,
  TextField,
  VerticalStack,
  hexToRgb,
  hsbToRgb,
  rgbToHex,
  rgbToHsb,
} from "@shopify/polaris";
import { useCallback, useState } from "react";

export function ColorPickerInput ({ inputColor = "#fff", label, onChange }) {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );
  const [buttonColor, setButtonColor] = useState(inputColor);
  const activator = (
    <HorizontalStack gap={5}>
      <div
        onClick={togglePopoverActive}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "20%",
          background: buttonColor,
          cursor: "pointer",
          border: "1px solid #bbb",
          marginRight: "10px",
        }}
      ></div>
      <Box>
        <Text>{label}</Text>
        <Text Variant="bodySm">{buttonColor}</Text>
      </Box>
    </HorizontalStack>
  );
  const [color, setColor] = useState({
    hue: rgbToHsb(hexToRgb('inputColor')).hue,
    brightness: rgbToHsb(hexToRgb('inputColor')).brightness,
    saturation: rgbToHsb(hexToRgb('inputColor')).saturation,
  });

  return (
    <VerticalStack align="end">
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <VerticalStack align="center" inlineAlign="center">
          <ColorPicker
            onChange={(value) => {
              setColor(value);
              const hexColor = rgbToHex(hsbToRgb(value))
              setButtonColor(hexColor);
              onChange(hexColor)
            }}
            color={color}
          />
          <Box width="90%" padding={1}>
            <TextField value={buttonColor} focused={false} readOnly />
          </Box>
        </VerticalStack>
      </Popover>
    </VerticalStack>
  );
}
