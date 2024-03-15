import {
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { AppFontSize, height, width } from "../../utils/Theme";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";

const select = () => {
  const router = useRouter();
  const [option, setOption] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  });

  const updateGender = async () => {
    try {
      const response = await axios.put(
        `http://192.168.0.107:3000/users/${userId}/gender`,
        { gender: option }
      );
      console.log(response.data);
      if (response.status == 200) {
        router.replace("(tabs)/bio");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={tw.style({ flex: 1, backgroundColor: "white", padding: 12 })}>
      <Pressable
        onPress={() => setOption("male")}
        style={tw.style(
          {
            backgroundColor: "#F0F0F0",
            marginTop: 25,
            borderRadius: 5,
            borderColor: option == "male" ? "#D0D0D0" : "transparent",
            borderWidth: option == "male" ? 1 : 0,
          },
          "p-3",
          "justify-between",
          "flex-row",
          "items-center"
        )}
      >
        <Text style={tw.style({ fontSize: 16, fontWeight: 500 })}>
          I am a Man
        </Text>
        <Image
          style={tw`w-[50px] h-[50px]`}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/12442/12442425.png",
          }}
        />
      </Pressable>
      <Pressable
        onPress={() => setOption("female")}
        style={tw.style(
          {
            backgroundColor: "#F0F0F0",
            marginTop: 25,
            borderRadius: 5,
            borderColor: option == "female" ? "#D0D0D0" : "transparent",
            borderWidth: option == "female" ? 1 : 0,
          },
          "p-3",
          "justify-between",
          "flex-row",
          "items-center"
        )}
      >
        <Text style={tw.style({ fontSize: 16, fontWeight: 500 })}>
          I am a Woman
        </Text>
        <Image
          style={tw`w-[50px] h-[50px]`}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/9844/9844179.png",
          }}
        />
      </Pressable>
      <Pressable
        onPress={() => setOption("nonbinary")}
        style={tw.style(
          {
            backgroundColor: "#F0F0F0",
            marginTop: 25,
            borderRadius: 5,
            borderColor: option == "nonbinary" ? "#D0D0D0" : "transparent",
            borderWidth: option == "nonbinary" ? 1 : 0,
          },
          "p-3",
          "justify-between",
          "flex-row",
          "items-center"
        )}
      >
        <Text style={tw.style({ fontSize: 16, fontWeight: 500 })}>
          I am a Non-Binary
        </Text>
        <Image
          style={tw`w-[50px] h-[50px]`}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/12442/12442425.png",
          }}
        />
      </Pressable>
      {option && (
        <Pressable
          onPress={updateGender}
          style={tw.style(
            { marginTop: 25, backgroundColor: "black", borderRadius: 4 },
            "p-3"
          )}
        >
          <Text
            style={tw.style("text-center", "text-white", { fontWeight: 600 })}
          >
            Done
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default select;
