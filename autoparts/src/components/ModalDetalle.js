import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ModalDetalle({ visible, pieza, onClose }) {
  if (!pieza) return null;

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.centeredView}>
        <View style={styles.detailCard}>
          <Text style={styles.modalTitle}>Detalle de la pieza</Text>
          <View style={styles.infoGap}>
            <Text>
              <Text style={styles.bold}>Pieza:</Text> {pieza.nombre}
            </Text>
            <Text>
              <Text style={styles.bold}>Marca:</Text> {pieza.marca}
            </Text>
            <Text>
              <Text style={styles.bold}>No Serie:</Text> {pieza.serie}
            </Text>
            <Text>
              <Text style={styles.bold}>Precio:</Text> ${pieza.precio}
            </Text>
            <Text>
              <Text style={styles.bold}>Fecha:</Text> {pieza.fecha}
            </Text>
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  detailCard: {
    width: "85%",
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  infoGap: { marginVertical: 20, gap: 10 },
  bold: { fontWeight: "bold" },
  closeBtn: {
    alignSelf: "center",
    padding: 10,
    borderTopWidth: 1,
    width: "100%",
    alignItems: "center",
  },
});
