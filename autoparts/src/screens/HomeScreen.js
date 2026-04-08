import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";

import PiezaItem from "../components/PiezaItem";
import ModalRegistro from "../components/ModalRegistro";
import ModalDetalle from "../components/ModalDetalle";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [piezas, setPiezas] = useState([]);
  const [registroVisible, setRegistroVisible] = useState(false);
  const [detalleVisible, setDetalleVisible] = useState(false);
  const [selectedPieza, setSelectedPieza] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const data = await AsyncStorage.getItem("@piezas_key");
      if (data) setPiezas(JSON.parse(data));
    } catch (e) {
      console.error(e);
    }
  };

  const agregarPieza = async (nuevaPieza) => {
    if (!nuevaPieza.nombre || !nuevaPieza.fecha) {
      Alert.alert("Error", "La pieza y la fecha son obligatorias");
      return;
    }
    const listaActualizada = [...piezas, { ...nuevaPieza, id: uuidv4() }].sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha),
    );

    setPiezas(listaActualizada);
    await AsyncStorage.setItem("@piezas_key", JSON.stringify(listaActualizada));
    setRegistroVisible(false);
  };

  const eliminarPieza = async (id) => {
    const filtrados = piezas.filter((p) => p.id !== id);
    setPiezas(filtrados);
    await AsyncStorage.setItem("@piezas_key", JSON.stringify(filtrados));
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <Text style={styles.header}>Piezas</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setRegistroVisible(true)}
      >
        <Text>Agregar Pieza</Text>
      </TouchableOpacity>

      {piezas.length === 0 ? (
        <View style={styles.center}>
          <Text>No hay piezas. Agregue una.</Text>
        </View>
      ) : (
        <FlatList
          data={piezas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PiezaItem
              item={item}
              onPress={(p) => {
                setSelectedPieza(p);
                setDetalleVisible(true);
              }}
              onDelete={eliminarPieza}
            />
          )}
        />
      )}

      <ModalRegistro
        visible={registroVisible}
        onSave={agregarPieza}
        onCancel={() => setRegistroVisible(false)}
        insets={insets}
      />

      <ModalDetalle
        visible={detalleVisible}
        pieza={selectedPieza}
        onClose={() => setDetalleVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { fontSize: 24, textAlign: "center", marginVertical: 20 },
  addButton: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 15,
    marginHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
