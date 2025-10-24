import { StyleSheet } from "react-native";
import Name from "./Name";
import Username from "./Username";
import Bio from "./Bio";
import Link from "./Link";
import Gender from "./Gender";

const EditingProfile = ({ navigation, route }) => {
  const { module, email } = route.params;

  const components = {
    Name: <Name navigation={navigation} />,
    Username: <Username navigation={navigation} />,
    Bio: <Bio navigation={navigation} />,
    Link: <Link navigation={navigation} />,
    Gender: <Gender navigation={navigation} />,
  };

  return components[module];
};

export default EditingProfile;

const styles = StyleSheet.create({});
