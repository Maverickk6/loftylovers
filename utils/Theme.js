import { Dimensions, PixelRatio } from "react-native";

export const { height, width } = Dimensions.get("screen");
const pixelRatio = PixelRatio.getFontScale();

export class CustomColors {
  static appBackgroundColor = "#F7F7F8";
  static appMainColor = "#2A60F1";
}

export class AppFontSize {
  static getFontSize = (num) => {
    return num / pixelRatio;
  };

  static fontSize24 = this.getFontSize(24);
  static fontSize22 = this.getFontSize(22);
  static fontSize20 = this.getFontSize(20);
  static fontSize18 = this.getFontSize(18);
  static fontSize16 = this.getFontSize(16);
  static fontSize14 = this.getFontSize(14);
  static fontSize12 = this.getFontSize(12);
  static fontSize10 = this.getFontSize(10);
}
