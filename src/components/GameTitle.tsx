import {
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle
} from "react-native";
import { COLORS } from "@/constants/colors";

export function GameTitle({
  title,
  subtitle,
  style
}: {
  title: string;
  subtitle: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 64,
    fontWeight: "700",
    color: COLORS.primary
  },
  subtitle: {
    fontSize: 54,
    fontWeight: "600",
    color: COLORS.secondary
  }
});
