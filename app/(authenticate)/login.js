import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import React from "react";
import tw from "twrnc";
import { height, width } from "../../utils/Theme";

const login = () => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white items-center`}>
      <View
        style={tw.style({ height: height * 0.21 }, "bg-pink-300", "w-[100%]")}
      >
        <View style={tw.style("justify-center", "items-center", "mt-6")}>
          <Image
            style={tw.style({
              width: width * 0.5,
              height: height * 0.08,
              contentFit: "contain",
            })}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/6655/6655045.png",
            }}
          />
        </View>
        <Text
          style={tw.style("mt-5", "text-center", "text-[20px]", {
            fontFamily: "GillSans-SemiBold",
          })}
        >
          Match mate
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default login;
