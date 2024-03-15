import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export class UserService {
  constructor() {}
  router = useRouter();
  async handleLogin(email, password) {
   
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.0.107:3000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("auth", token);
        console.log("Login successful");
        this.router.replace("/(authenticate)/select");
      })
      .catch((err) => console.log(err));
  }

  async handleRegister(name, email, password) {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post("http://192.168.0.107:3000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration Successful",
          "Your have been registered successfully",
          [
            {
              text: "Cancel",
              onPress: () => console.log("cancel"),
              style: "cancel",
            },
            {
              text: "Ok",
              onPress: () => console.log("ok"),
            },
          ]
        );
      })
      .catch((error) => {
        console.log("error while registering the user", error);
        Alert.alert(
          "registration failed",
          "An error occurred during registration"
        );
      });
  }
}
