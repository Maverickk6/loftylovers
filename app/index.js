import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Redirect } from "expo-router";

const index = () => {

  return (
    <View>
      <Redirect href="/(authenticate)/login" />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
