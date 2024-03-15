import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Button,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Image } from "expo-image";
import tw from "twrnc";
import { Entypo, AntDesign } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const [option, setOption] = useState("AD");
  const [description, setDescription] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [userId, setUserId] = useState("");
  const [selectedTurnOns, setSelectedTurnOns] = useState([]);
  const [lookingOptions, setLookingOptions] = useState([]);
  const [selectedImgUrl, setImgUrl] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserDescription();
    }
  }, [userId]);

  const fetchUserDescription = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.107:3000/users/${userId}`
      );
      console.log(response);
      const user = response.data;
      setDescription(user?.user?.description);
      setSelectedTurnOns(user?.user?.turnOns);
    } catch (error) {
      console.log("error fetching user description", error);
    }
  };

  const profileImages = [
    {
      image:
        "https://images.pexels.com/photos/1042140/pexels-photo-1042140.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      image:
        "https://images.pexels.com/photos/1215695/pexels-photo-1215695.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      image:
        "https://images.pexels.com/photos/7580971/pexels-photo-7580971.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const turnons = [
    {
      id: "0",
      name: "Music",
      description: "Pop Rock-Indie pick our sound track",
    },
    {
      id: "10",
      name: "Kissing",
      description:
        " It's a feeling of closeness, where every touch of lips creates a symphony of emotions.",
    },
    {
      id: "1",
      name: "Fantasies",
      description:
        "Fantasies can be deeply personal, encompassing diverse elements such as romance",
    },
    {
      id: "2",
      name: "Nibbling",
      description:
        "playful form of biting or taking small, gentle bites, typically done with the teeth",
    },
    {
      id: "3",
      name: "Desire",
      description: "powerful emotion or attainment of a particular person.",
    },
  ];

  const data = [
    {
      id: "0",
      name: "Casual",
      description: "Let's keep it easy and see where it goes",
    },
    {
      id: "1",
      name: "Long Term",
      description: "How about a one life stand",
    },
    {
      id: "2",
      name: "Virtual",
      description: "Let's have some virtual fun",
    },
    {
      id: "3",
      name: "Open for Anything",
      description: "Let's Vibe and see where it goes",
    },
  ];

  const handleTurnOnToggle = (turnOn) => {
    console.log("turn on", turnOn);
    if (selectedTurnOns.includes(turnOn)) {
      removeTurnOn(turnOn);
    } else {
      addTurnOn(turnOn);
    }
  };

  const addTurnOn = async (turnOn) => {
    try {
      const response = await axios.put(
        `http://192.168.0.107:3000/users/${userId}/turn-ons/add`,
        {
          turnOn: turnOn,
        }
      );
      console.log(response.data);
      if (response.status == 200) {
        setSelectedTurnOns([...selectedTurnOns, turnOn]);
      }
    } catch (error) {
      console.log("Error adding turn On", error);
    }
  };

  const removeTurnOn = async (turnOn) => {
    try {
      const response = await axios.put(
        `http://192.168.0.107:3000/users/${userId}/turn-ons/remove`,
        {
          turnOn: turnOn,
        }
      );
      if (response.status == 200) {
        setSelectedTurnOns(selectedTurnOns.filter((item) => item !== turnOn));
      }
    } catch (error) {
      console.log("error removing turn On", error);
    }
  };

  const updateUserDescription = async () => {
    try {
      const response = await axios.put(
        `http://192.168.0.107:3000/users/${userId}/description`,
        {
          description: description,
        }
      );
      // console.log(response.data);
      if (response.status === 200) {
        Alert.alert("Success", "Description updated Successfully");
      }
      setDescription("");
    } catch (error) {
      console.log("error updating user description");
    }
  };

  const renderImageCarousel = ({ item }) => (
    <View style={tw.style("w-full", "justify-center", "items-center")}>
      <Image
        style={tw.style({
          width: "65%",
          contentFit: "cover",
          height: 290,
          borderRadius: 10,
          transform: [{ rotate: "-5deg" }],
        })}
        source={{ uri: item?.image }}
      />
      <Text>
        {activeSlide + 1} / {profileImages.length}
      </Text>
    </View>
  );

  return (
    <ScrollView>
      <View>
        <Image
          style={tw.style("w-full", { contentFit: "cover", height: 200 })}
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/018/977/074/original/animated-backgrounds-with-liquid-motion-graphic-background-cool-moving-animation-for-your-background-free-video.jpg",
          }}
        />
        <View>
          <View>
            <Pressable
              style={tw.style({
                padding: 10,
                backgroundColor: "#DDA0DD",
                width: 300,
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: 10,
                position: "absolute",
                top: -60,
                left: "50%",
                transform: [{ translateX: -150 }],
                justifyContent: "center",
                alignItems: "center",
              })}
            >
              <Image
                style={tw.style("w-[60px]", "h-[60px]", {
                  contentFit: "cover",
                  borderRadius: 30,
                })}
                source={{
                  uri: "https://images.pexels.com/photos/2085739/pexels-photo-2085739.jpeg?auto=cover",
                }}
              />
              <Text
                style={tw.style({
                  fontSize: 16,
                  fontWeight: "600",
                  marginTop: 6,
                })}
              >
                Lagos
              </Text>
              <Text style={tw.style({ marginTop: 4, fontSize: 15 })}>
                16 years 190 days
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View
        style={tw.style(
          "mt-[80]",
          "flex-row",
          "mx-5",
          "items-center",
          { gap: 25 },
          "justify-center"
        )}
      >
        <Pressable onPress={() => setOption("AD")}>
          <Text
            style={tw.style({
              fontSize: 16,
              fontWeight: "500",
              color: option == "AD" ? "black" : "gray",
            })}
          >
            AD
          </Text>
        </Pressable>
        <Pressable onPress={() => setOption("Photos")}>
          <Text
            style={tw.style({
              fontSize: 16,
              fontWeight: "500",
              color: option == "Photos" ? "black" : "gray",
            })}
          >
            Photos
          </Text>
        </Pressable>
        <Pressable onPress={() => setOption("Turn-ons")}>
          <Text
            style={tw.style({
              fontSize: 16,
              fontWeight: "500",
              color: option == "Turn-ons" ? "black" : "gray",
            })}
          >
            Turn-ons
          </Text>
        </Pressable>
        <Pressable onPress={() => setOption("Looking For")}>
          <Text
            style={tw.style({
              fontSize: 16,
              fontWeight: "500",
              color: option == "Looking For" ? "black" : "gray",
            })}
          >
            Looking For
          </Text>
        </Pressable>
      </View>
      <View style={tw.style("mx-[14px]", "my-[15px]")}>
        {option == "AD" && (
          <View
            style={tw.style({
              borderColor: "#202020",
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              height: 300,
            })}
          >
            <TextInput
              multiline
              style={tw.style({
                fontFamily: "Helvetica",
                fontSize: description ? 17 : 17,
              })}
              placeholder="Write your Ad for people to like you"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <Pressable
              onPress={updateUserDescription}
              style={tw.style(
                "flex-row",
                "items-center",
                { gap: 15, borderRadius: 5, padding: 10 },
                "justify-center",
                "bg-black",
                "mt-auto"
              )}
            >
              <Text
                style={tw.style("text-white", "text-center", {
                  fontSize: 15,
                  fontWeight: "500",
                })}
              >
                Publish in Feed
              </Text>
              <Entypo name="mask" size={24} color="white" />
            </Pressable>
          </View>
        )}
      </View>

      <View style={tw.style({ marginHorizontal: 14 })}>
        {option == "Photos" && (
          <View>
            <Carousel
              data={profileImages}
              renderItem={renderImageCarousel}
              sliderWidth={350}
              itemWidth={300}
              onSnapToItem={(index) => setActiveSlide(index)}
            />
            <View style={tw.style({ marginTop: 25 })}>
              <Text>Add a picture of yourself</Text>
              <View
                style={tw.style(
                  "flex-row",
                  "items-center",
                  {
                    gap: 5,
                    paddingVertical: 5,
                    borderRadius: 5,
                    marginTop: 10,
                  },
                  "bg-[#DCDCDC]"
                )}
              >
                <Entypo
                  style={tw.style("ml-2")}
                  name="image"
                  size={24}
                  color="black"
                />
                <TextInput
                  style={tw.style({
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                  })}
                  placeholder="enter your email"
                />
              </View>
              <Button style={tw.style("mt-[5px]")} title="Add Image" />
            </View>
          </View>
        )}
      </View>

      <View style={tw.style({ marginHorizontal: 14 })}>
        {option == "Turn-ons" && (
          <View>
            {turnons?.map((item, index) => (
              <Pressable
                onPress={() => handleTurnOnToggle(item?.name)}
                key={index}
                style={tw.style("bg-[#FFFDD0]", "p-[10px]", "my-[10px]")}
              >
                <View
                  style={tw.style("flex-row", "items-center", "justify-center")}
                >
                  <Text
                    style={tw.style("text-center", {
                      fontSize: 15,
                      fontWeight: "bold",
                      flex: 1
                    })}
                  >
                    {item?.name}
                  </Text>
                  {selectedTurnOns.includes(item?.name) && (
                    <AntDesign name="checkcircle" size={16} color="#17B169" />
                  )}
                </View>
                <Text
                  style={tw.style("mt-1", "text-center", {
                    fontSize: 15,
                    color: "gray",
                  })}
                >
                  {item?.description}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
      <View style={tw.style("mx-[14px]")}>
        {option == "Looking For" && (
          <>
            <View>
              <FlatList
                columnWrapperStyle={tw.style("justify-between")}
                numColumns={2}
                data={data}
                renderItem={({ item }) => (
                  <Pressable
                    style={tw.style(
                      "bg-white",
                      "p-4",
                      "justify-center",
                      "items-center",
                      "w-[150px]",
                      "m-[10px]",
                      {
                        borderRadius: 5,
                        borderColor: "#fd5c63",
                        borderWidth: 0.7,
                      }
                    )}
                  >
                    <Text
                      style={tw.style("text-center", {
                        fontSize: 13,
                        fontWeight: "500",
                      })}
                    >
                      {item?.name}
                    </Text>
                    <Text
                      style={tw.style(
                        { color: "gray", fontSize: 13 },
                        "w-[140px]",
                        "mt-[10px]",
                        "text-center"
                      )}
                    >
                      {item?.description}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
