import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";

export default function ModalRegistro({ visible, onSave, onCancel, insets }) {
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [serie, setSerie] = useState("");
  const [precio, setPrecio] = useState("");
  const [fecha, setFecha] = useState(null);
  const [calVisible, setCalVisible] = useState(false);

  const limpiarFormulario = () => {
    setNombre("");
    setMarca("");
    setSerie("");
    setPrecio("");
    setFecha(null);
  };

  const handleSave = () => {
    if (!nombre.trim() || !marca.trim() || !fecha) {
      Alert.alert(
        "Campos incompletos",
        "Por favor completa la pieza, la marca y la fecha para continuar.",
        [{ text: "Entendido" }]
      );
      return;
    }

    onSave({ nombre, marca, serie, precio, fecha });
    limpiarFormulario();
  };

  const handleCancel = () => {
    limpiarFormulario();
    onCancel();
  };

  const formatFecha = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")} ${[
      "Enero","Febrero","Marzo","Abril","Mayo","Junio",
      "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ][date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={[styles.root, { paddingTop: insets.top }]}> 

        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel} style={styles.closeBtn}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nueva pieza</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.pill}>
            <Text style={styles.pillText}>Completa los campos</Text>
          </View>

          <Text style={styles.label}>Pieza</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Motor de arranque"
            placeholderTextColor="#9b9bc4"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Marca</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Bosch"
            placeholderTextColor="#9b9bc4"
            value={marca}
            onChangeText={setMarca}
          />

          <Text style={styles.label}>No. Serie</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. SN-00123"
            placeholderTextColor="#9b9bc4"
            value={serie}
            onChangeText={setSerie}
          />

          <Text style={styles.label}>Precio</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor="#9b9bc4"
            value={precio}
            onChangeText={setPrecio}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Fecha</Text>
          <TouchableOpacity
            style={[styles.input, styles.dateBtn]}
            onPress={() => setCalVisible(true)}
          >
            <Text style={fecha ? styles.dateText : styles.datePlaceholder}>
              {fecha ? formatFecha(fecha) : "Seleccionar fecha"}
            </Text>
            <Text style={styles.calIcon}>📅</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Guardar pieza</Text>
          </TouchableOpacity>

        </ScrollView>

        {/* Calendario */}
        <Modal visible={calVisible} transparent animationType="fade">
          <View style={cal.overlay}>
            <View style={cal.card}>

              <Calendar
                onDayPress={(day) => {
                  setFecha(day.dateString);
                  setCalVisible(false);
                }}
                markedDates={{
                  [fecha]: {
                    selected: true,
                    selectedColor: "#4f46e5",
                  },
                }}
                theme={{
                  todayTextColor: "#4f46e5",
                  arrowColor: "#4f46e5",
                  selectedDayBackgroundColor: "#4f46e5",
                  textDayFontWeight: "500",
                  textMonthFontWeight: "700",
                  textDayHeaderFontWeight: "600",
                }}
              />

              <TouchableOpacity style={cal.todayBtn} onPress={() => setCalVisible(false)}>
                <Text style={cal.todayBtnText}>Cerrar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f4f5f7" },
  header: {
    backgroundColor: "#1a1a2e",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: { color: "#fff" },

  form: { padding: 24, paddingBottom: 48 },
  pill: {
    alignSelf: "flex-start",
    backgroundColor: "#ebe9ff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 28,
  },
  pillText: { color: "#4f46e5", fontSize: 12, fontWeight: "600" },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b6b9a",
    marginTop: 10,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#1a1a2e",
    borderWidth: 1,
    borderColor: "#e4e4f0",
  },

  dateBtn: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  dateText: { color: "#1a1a2e", fontWeight: "500" },
  datePlaceholder: { color: "#9b9bc4" },
  calIcon: { fontSize: 16 },

  saveBtn: {
    marginTop: 16,
    backgroundColor: "#4f46e5",
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});

const cal = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(10,10,30,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    width: "100%",
    maxWidth: 360,
  },
  todayBtn: {
    marginTop: 16,
    backgroundColor: "#f0efff",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  todayBtnText: {
    color: "#4f46e5",
    fontSize: 14,
    fontWeight: "700",
  },
});
