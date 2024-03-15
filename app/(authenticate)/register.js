import {
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import React, { useState } from "react";
import tw from "twrnc";
import { AppFontSize, height, width } from "../../utils/Theme";
import { useFonts } from "expo-font";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import { UserService } from "../../services/userService";

const register = () => {
  const userService = new UserService();
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    GillSansBold: require("../../assets/fonts/GillSansBold.otf"),
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    userService.handleRegister(name, email, password);
    setEmail("");
    setName("");
    setPassword("");
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white items-center`}>
      <View
        style={tw.style({ height: height * 0.2 }, "bg-[#FFC0CB]", "w-[100%]")}
      >
        <View style={tw.style("justify-center", "items-center", "mt-6")}>
          <Image
            style={tw.style({
              width: width * 0.4,
              height: height * 0.06,
              contentFit: "contain",
            })}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/6655/6655045.png",
            }}
          />
        </View>
        <Text
          style={tw.style("mt-5", "text-center", "text-[20px]", {
            fontFamily: "GillSansBold",
            fontSize: AppFontSize.fontSize20,
          })}
        >
          Match mate
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={tw.style("items-center")}>
          <Text
            style={tw.style(
              {
                fontSize: AppFontSize.fontSize16,
                fontWeight: "bold",
              },
              "mt-4",
              "text-[#F9629F]"
            )}
          >
            Register a new Account
          </Text>
        </View>
        <View style={tw.style("justify-center", "items-center", "mt-5")}>
          <Image
            style={tw.style("w-[100px]", "h-[80px]", { contentFit: "cover" })}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/2509/2509078.png",
            }}
          />
        </View>
        <View style={tw.style("mt-1")}>
          <View
            style={tw.style(
              "flex-row",
              "items-center",
              { gap: 5, borderRadius: 5, marginTop: 30 },
              "py-1",
              "bg-[#FFC0CB]"
            )}
          >
            <Ionicons
              style={tw.style("ml-2")}
              name="person-sharp"
              size={24}
              color="white"
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Enter your Name"
              placeholderTextColor={"white"}
              style={tw.style({
                color: "white",
                width: 300,
                marginVertical: 5,
              })}
            />
          </View>
          <View
            style={tw.style(
              "flex-row",
              "items-center",
              { gap: 5, borderRadius: 5, marginTop: 30 },
              "py-1",
              "bg-[#FFC0CB]"
            )}
          >
            <MaterialIcons
              style={tw.style("ml-2")}
              name="email"
              size={24}
              color="white"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter your Email"
              placeholderTextColor={"white"}
              style={tw.style({
                color: "white",
                width: 300,
                marginVertical: 5,
              })}
            />
          </View>
          <View style={tw.style()}>
            <View
              style={tw.style(
                "flex-row",
                "items-center",
                { gap: 5, borderRadius: 5, marginTop: 30 },
                "py-1",
                "bg-[#FFC0CB]"
              )}
            >
              <AntDesign
                style={tw.style("ml-2")}
                name="lock1"
                size={24}
                color="white"
              />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Enter your password"
                placeholderTextColor={"white"}
                secureTextEntry={true}
                style={tw.style({
                  color: "white",
                  width: 300,
                  marginVertical: 5,
                })}
              />
            </View>
          </View>

          <View style={tw.style({ marginTop: 40 })} />
          <Pressable
            style={tw.style(
              {
                width: 200,
                borderRadius: 10,
                marginLeft: "auto",
                marginRight: "auto",
                padding: 15,
              },
              "bg-[#FFC0CB]"
            )}
            onPress={handleRegister}
          >
            <Text
              style={tw.style("text-center", "text-white", {
                fontSize: AppFontSize.fontSize14,
                fontWeight: "bold",
              })}
            >
              Register
            </Text>
          </Pressable>
          <Pressable style={tw`mt-4`} onPress={() => router.replace("/login")}>
            <Text
              style={tw.style("text-center", {
                color: "gray",
                fontSize: AppFontSize.fontSize14,
              })}
            >
              Already have an account? Log in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;
