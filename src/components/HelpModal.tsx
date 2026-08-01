import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "@/constants/colors";
import { playTapPressFeedback } from "@/lib/feedback";

const STEPS = [
  {
    title: "WATCH",
    body: "The tiles light up one at a time, each with its own tone.",
  },
  {
    title: "REPEAT",
    body: "Tap them back in the same order, from first to last.",
  },
  {
    title: "SURVIVE",
    body: "Each round is a brand new sequence, one tile longer and a little quicker. One wrong tap ends the run.",
  },
];

export function HelpModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  // The modal owns the click for every way out of it, including the Android
  // back button, so callers only have to close it.
  const dismiss = () => {
    playTapPressFeedback();
    onClose();
  };

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      // Modal fades its whole tree, scrim included, in and out. It also stays
      // mounted for the exit animation, so no manual lifecycle is needed.
      animationType="fade"
      onRequestClose={dismiss}
    >
      <View style={styles.root}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          style={styles.scrim}
          onPress={dismiss}
        />
        <View style={styles.card}>
          <Text style={styles.title}>HOW TO PLAY</Text>
          {STEPS.map((step, index) => (
            <View key={step.title} style={styles.step}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
              <View style={styles.stepBody}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepText}>{step.body}</Text>
              </View>
            </View>
          ))}
          <Text style={styles.footnote}>
            Your longest run is saved as your best score.
          </Text>
          <Pressable
            accessibilityRole="button"
            style={styles.closeButton}
            onPress={dismiss}
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
    justifyContent: "center",
  },
  scrim: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: COLORS.scrim,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 28,
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    // One cross-platform shadow. The older shadow*/elevation pair is deprecated
    // on web, and boxShadow covers iOS and Android under the new renderer.
    boxShadow: "0px 10px 24px rgba(0, 0, 0, 0.3)",
  },
  title: {
    marginBottom: 22,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: COLORS.background,
  },
  step: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 18,
  },
  stepNumber: {
    height: 28,
    width: 28,
    backgroundColor: COLORS.background,
    borderRadius: 14,
    textAlign: "center",
    lineHeight: 28,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.secondary,
  },
  stepBody: {
    flex: 1,
  },
  stepTitle: {
    marginBottom: 3,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
    color: COLORS.background,
  },
  stepText: {
    fontSize: 15,
    lineHeight: 21,
    color: COLORS.backgroundMuted,
  },
  footnote: {
    marginTop: 2,
    marginBottom: 22,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.backgroundMuted,
  },
  closeButton: {
    paddingVertical: 13,
    backgroundColor: COLORS.background,
    borderRadius: 10,
  },
  closeButtonText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 1,
    color: COLORS.secondary,
  },
});
