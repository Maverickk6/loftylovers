import {
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { AppFontSize, height, width } from "../../utils/Theme";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserService } from "../../services/userService";

const login = () => {
  const userService = new UserService();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("auth");
        if (token) {
          router.replace("/(tabs)/bio");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLogin();
  }, []);

  const handleLogin = () => {
    userService.handleLogin(email, password, router);
    setEmail("");
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
            Log in to your Account
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
          <View
            style={tw.style(
              "mt-4",
              "flex-row",
              "items-center",
              "justify-between"
            )}
          >
            <Text style={tw.style({ fontSize: AppFontSize.fontSize12 })}>
              Keep Me Logged In
            </Text>
            <Text
              style={tw.style(
                { fontSize: AppFontSize.fontSize12, fontWeight: "bold" },
                "text-[#007FFF]"
              )}
            >
              Forgot Password
            </Text>
          </View>
          <View style={tw.style({ marginTop: 30 })} />
          <Pressable
            onPress={handleLogin}
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
          >
            <Text
              style={tw.style("text-center", "text-white", {
                fontSize: AppFontSize.fontSize14,
                fontWeight: "bold",
              })}
            >
              Login
            </Text>
          </Pressable>
          <Pressable
            style={tw`mt-4`}
            onPress={() => router.replace("/register")}
          >
            <Text
              style={tw.style("text-center", {
                color: "gray",
                fontSize: AppFontSize.fontSize14,
              })}
            >
              Dont have an Account? Sign up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;
