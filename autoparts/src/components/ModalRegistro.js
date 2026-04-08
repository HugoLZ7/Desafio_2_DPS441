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

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function CalendarioModal({ visible, fecha, onSelect, onClose }) {
  const hoy = new Date();
  const [viewYear, setViewYear] = useState(fecha ? fecha.getFullYear() : hoy.getFullYear());
  const [viewMonth, setViewMonth] = useState(fecha ? fecha.getMonth() : hoy.getMonth());

  const cambiarMes = (delta) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0) { m = 11; y--; }
    setViewMonth(m);
    setViewYear(y);
  };

  const primerDia = new Date(viewYear, viewMonth, 1).getDay();
  const diasEnMes = new Date(viewYear, viewMonth + 1, 0).getDate();
  const celdas = Array(primerDia).fill(null).concat(
    Array.from({ length: diasEnMes }, (_, i) => i + 1)
  );
  while (celdas.length % 7 !== 0) celdas.push(null);

  const esSelecc = (d) =>
    fecha &&
    d === fecha.getDate() &&
    viewMonth === fecha.getMonth() &&
    viewYear === fecha.getFullYear();

  const esHoy = (d) =>
    d === hoy.getDate() &&
    viewMonth === hoy.getMonth() &&
    viewYear === hoy.getFullYear();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity style={cal.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={cal.card}>
          <View style={cal.navRow}>
            <TouchableOpacity onPress={() => cambiarMes(-1)} style={cal.navBtn}>
              <Text style={cal.navArrow}>‹</Text>
            </TouchableOpacity>
            <Text style={cal.navTitle}>
              {MONTHS[viewMonth]} {viewYear}
            </Text>
            <TouchableOpacity onPress={() => cambiarMes(1)} style={cal.navBtn}>
              <Text style={cal.navArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={cal.weekRow}>
            {DAYS.map((d) => (
              <Text key={d} style={cal.weekDay}>{d}</Text>
            ))}
          </View>

          <View style={cal.grid}>
            {celdas.map((d, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  cal.cell,
                  esSelecc(d) && cal.cellSelected,
                  esHoy(d) && !esSelecc(d) && cal.cellToday,
                ]}
                onPress={() => d && onSelect(new Date(viewYear, viewMonth, d))}
                disabled={!d}
              >
                <Text
                  style={[
                    cal.cellText,
                    esSelecc(d) && cal.cellTextSelected,
                    esHoy(d) && !esSelecc(d) && cal.cellTextToday,
                    !d && { opacity: 0 },
                  ]}
                >
                  {d ?? "·"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={cal.todayBtn}
            onPress={() => {
              setViewMonth(hoy.getMonth());
              setViewYear(hoy.getFullYear());
              onSelect(hoy);
            }}
          >
            <Text style={cal.todayBtnText}>Hoy</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

export default function ModalRegistro({ visible, onSave, onCancel, insets }) {
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [serie, setSerie] = useState("");
  const [precio, setPrecio] = useState("");
  const [fecha, setFecha] = useState(null);
  const [calVisible, setCalVisible] = useState(false);

  // Función para resetear el formulario
  const limpiarFormulario = () => {
    setNombre("");
    setMarca("");
    setSerie("");
    setPrecio("");
    setFecha(null);
  };

  const handleSave = () => {
    // Validación de campos obligatorios
    if (!nombre.trim() || !marca.trim() || !fecha) {
      Alert.alert(
        "Campos incompletos",
        "Por favor completa la pieza, la marca y la fecha para continuar.",
        [{ text: "Entendido" }]
      );
      return;
    }

    const fechaStr = fecha ? fecha.toISOString().split("T")[0] : "";
    
    // Enviamos los datos
    onSave({ nombre, marca, serie, precio, fecha: fechaStr });
    
    // Limpiamos inmediatamente ya que no hay opción de "Revisar"
    limpiarFormulario();
  };

  const handleCancel = () => {
    limpiarFormulario();
    onCancel();
  };

  const formatFecha = (d) => {
    if (!d) return null;
    return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  };

  const fields = [
    { label: "Pieza", value: nombre, setter: setNombre, placeholder: "Ej. Motor de arranque" },
    { label: "Marca", value: marca, setter: setMarca, placeholder: "Ej. Bosch" },
    { label: "No. Serie", value: serie, setter: setSerie, placeholder: "Ej. SN-00123" },
    { label: "Precio", value: precio, setter: setPrecio, placeholder: "0.00", keyboardType: "numeric" },
  ];

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

          {fields.map(({ label, value, setter, placeholder, keyboardType }) => (
            <View key={label} style={styles.fieldBlock}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#9b9bc4"
                value={value}
                onChangeText={setter}
                keyboardType={keyboardType ?? "default"}
              />
            </View>
          ))}

          <View style={styles.fieldBlock}>
            <Text style={styles.label}>Fecha</Text>
            <TouchableOpacity
              style={[styles.input, styles.dateBtn]}
              onPress={() => setCalVisible(true)}
              activeOpacity={0.7}
            >
              <Text style={fecha ? styles.dateText : styles.datePlaceholder}>
                {fecha ? formatFecha(fecha) : "Seleccionar fecha"}
              </Text>
              <Text style={styles.calIcon}>📅</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.saveBtn} 
            onPress={handleSave} 
            activeOpacity={0.85}
          >
            <Text style={styles.saveBtnText}>Guardar pieza</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <CalendarioModal
        visible={calVisible}
        fecha={fecha}
        onSelect={(d) => { setFecha(d); setCalVisible(false); }}
        onClose={() => setCalVisible(false)}
      />
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
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700", letterSpacing: -0.3 },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: { color: "#fff", fontSize: 14, fontWeight: "600" },
  form: { padding: 24, paddingBottom: 48 },
  pill: {
    alignSelf: "flex-start",
    backgroundColor: "#ebe9ff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 28,
  },
  pillText: { color: "#4f46e5", fontSize: 12, fontWeight: "600", letterSpacing: 0.4 },
  fieldBlock: { marginBottom: 20 },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b6b9a",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 8,
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
  dateText: { fontSize: 15, color: "#1a1a2e", fontWeight: "500" },
  datePlaceholder: { fontSize: 15, color: "#9b9bc4" },
  calIcon: { fontSize: 16 },
  saveBtn: {
    marginTop: 16,
    backgroundColor: "#4f46e5",
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: "center",
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  saveBtnText: { color: "#fff", fontSize: 16, fontWeight: "700", letterSpacing: 0.3 },
});

const cal = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(10,10,30,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: { backgroundColor: "#fff", borderRadius: 24, padding: 20, width: "100%", maxWidth: 360 },
  navRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0efff",
    justifyContent: "center",
    alignItems: "center",
  },
  navArrow: { fontSize: 22, color: "#4f46e5", lineHeight: 26 },
  navTitle: { fontSize: 16, fontWeight: "700", color: "#1a1a2e", letterSpacing: -0.2 },
  weekRow: { flexDirection: "row", marginBottom: 8 },
  weekDay: { flex: 1, textAlign: "center", fontSize: 11, fontWeight: "600", color: "#9b9bc4", letterSpacing: 0.4 },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: { width: `${100 / 7}%`, aspectRatio: 1, justifyContent: "center", alignItems: "center", borderRadius: 10 },
  cellSelected: { backgroundColor: "#4f46e5" },
  cellToday: { backgroundColor: "#ebe9ff" },
  cellText: { fontSize: 14, color: "#1a1a2e" },
  cellTextSelected: { color: "#fff", fontWeight: "700" },
  cellTextToday: { color: "#4f46e5", fontWeight: "700" },
  todayBtn: { marginTop: 16, backgroundColor: "#f0efff", borderRadius: 12, paddingVertical: 12, alignItems: "center" },
  todayBtnText: { color: "#4f46e5", fontSize: 14, fontWeight: "700" },
});