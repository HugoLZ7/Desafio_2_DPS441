import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  StatusBar,
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
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
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
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View>
          <Text style={styles.headerSubtitle}>Inventario</Text>
          <Text style={styles.headerTitle}>Piezas</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{piezas.length}</Text>
        </View>
      </View>

      {/* Lista */}
      <View style={styles.listContainer}>
        {piezas.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>📦</Text>
            </View>
            <Text style={styles.emptyTitle}>Sin piezas registradas</Text>
            <Text style={styles.emptySubtitle}>
              Toca el botón para agregar tu primera pieza
            </Text>
          </View>
        ) : (
          <FlatList
            data={piezas}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
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
      </View>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 24 }]}
        onPress={() => setRegistroVisible(true)}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>＋</Text>
        <Text style={styles.fabLabel}>Agregar pieza</Text>
      </TouchableOpacity>

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
  container: {
    flex: 1,
    backgroundColor: "#f4f5f7",
  },

  /* ── Header ── */
  header: {
    backgroundColor: "#1a1a2e",
    paddingHorizontal: 24,
    paddingBottom: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerSubtitle: {
    color: "#9b9bc4",
    fontSize: 13,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  badge: {
    backgroundColor: "#4f46e5",
    borderRadius: 20,
    minWidth: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* ── Lista ── */
  listContainer: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100,
  },

  /* ── Estado vacío ── */
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e8e9f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyIconText: {
    fontSize: 34,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#9b9bc4",
    textAlign: "center",
    lineHeight: 20,
  },

  /* ── FAB ── */
  fab: {
    position: "absolute",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4f46e5",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 32,
    gap: 8,
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabIcon: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 22,
    fontWeight: "400",
  },
  fabLabel: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});