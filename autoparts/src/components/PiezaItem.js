import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function PiezaItem({ item, onPress, onDelete }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>Pieza: {item.nombre}</Text>
        <Text>Fecha de Cambio: {item.fecha}</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Text style={styles.deleteText}>Eliminar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  itemTitle: { fontWeight: 'bold', fontSize: 16 },
  deleteText: { color: 'red', fontWeight: '500' },
});