import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "@/constants/colors";

export function HelpModal({
  visible,
  onClose
}: {
  visible: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      // Modal fades its whole tree, scrim included, in and out. It also stays
      // mounted for the exit animation, so no manual lifecycle is needed.
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          style={styles.scrim}
          onPress={onClose}
        />
        <View style={styles.card}>
          <Text style={styles.title}>HOW TO PLAY</Text>
          <Text style={styles.body}>
            Tiles flash on screen in a particular sequence. Remember the
            sequence and repeat it. Every round adds one more tile.
          </Text>
          <Pressable
            accessibilityRole="button"
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>GOT IT</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  scrim: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: COLORS.scrim
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 24,
    backgroundColor: COLORS.secondary,
    borderRadius: 12
  },
  title: {
    marginBottom: 12,
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.background
  },
  body: {
    fontSize: 20,
    lineHeight: 28,
    color: COLORS.background
  },
  closeButton: {
    marginTop: 24,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
    borderRadius: 8
  },
  closeButtonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.secondary
  }
});
