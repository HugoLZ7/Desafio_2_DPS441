import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ModalDetalle({ visible, pieza, onClose }) {
  if (!pieza) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>

          <Text style={styles.title}>Detalle de la pieza</Text>

          <View style={styles.divider} />

          <View style={styles.infoContainer}>
            {renderItem("Pieza", pieza.nombre)}
            {renderItem("Marca", pieza.marca)}
            {renderItem("No. Serie", pieza.serie)}
            {renderItem("Precio", `$${pieza.precio}`)}
            {renderItem("Fecha", pieza.fecha)}
          </View>

          <TouchableOpacity style={styles.button} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const renderItem = (label, value) => (
  <View style={styles.row} key={label}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || "—"}</Text>
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(10,10,30,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a2e",
    textAlign: "center",
    marginBottom: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#ececf5",
    marginVertical: 12,
  },

  infoContainer: {
    gap: 14,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f8ff",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b6b9a",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a2e",
  },

  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});