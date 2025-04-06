import { Text, View } from "react-native";
import AnimatedIntro from "../component/AnimatedIntro";
import ButtonLoginSheet from "@/component/ButtonLoginSheet";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <AnimatedIntro />
      <ButtonLoginSheet />
    </View>
  );
}
