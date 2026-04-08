import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ModalRegistro({ visible, onSave, onCancel, insets }) {
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [serie, setSerie] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSave = () => {
    onSave({ nombre, marca, serie, precio, fecha });
    // Limpiar campos
    setNombre(''); setMarca(''); setSerie(''); setPrecio(''); setFecha('');
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={[styles.modalContent, { paddingTop: insets.top }]}>
        <Text style={styles.modalTitle}>Registro de piezas</Text>
        <TextInput placeholder="Pieza" style={styles.input} onChangeText={setNombre} />
        <TextInput placeholder="Marca" style={styles.input} onChangeText={setMarca} />
        <TextInput placeholder="No. Serie" style={styles.input} onChangeText={setSerie} />
        <TextInput placeholder="Precio" style={styles.input} keyboardType="numeric" onChangeText={setPrecio} />
        <TextInput placeholder="Fecha (YYYY-MM-DD)" style={styles.input} onChangeText={setFecha} />
        <View style={styles.row}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}><Text>Guardar</Text></TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}><Text>Cancelar</Text></TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: { flex: 1, padding: 30 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderBottomWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  saveBtn: { padding: 15, backgroundColor: '#e1e1e1', borderRadius: 5 },
  cancelBtn: { padding: 15, backgroundColor: '#ffcccc', borderRadius: 5 },
});