import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ModalConfirmacion({ visible, tipo, onConfirm, onCancel }) {
  const esEliminar = tipo === 'eliminar';
  
  const config = {
    titulo: esEliminar ? '¿Eliminar pieza?' : '¿Confirmar registro?',
    mensaje: esEliminar 
      ? 'Esta acción no se puede deshacer.' 
      : '¿Estás seguro de que deseas guardar esta información?',
    textoBoton: esEliminar ? 'Sí, eliminar' : 'Sí, guardar',
    colorBoton: esEliminar ? '#ff4444' : '#4f46e5',
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.centeredView}>
        <View style={styles.confirmCard}>
          <Text style={styles.title}>{config.titulo}</Text>
          <Text style={styles.message}>{config.mensaje}</Text>
          
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.btn, { backgroundColor: config.colorBoton }]} 
              onPress={onConfirm}
            >
              <Text style={styles.btnText}>{config.textoBoton}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' },
  confirmCard: { width: '85%', backgroundColor: 'white', padding: 25, borderRadius: 20, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#1a1a2e' },
  message: { textAlign: 'center', marginBottom: 25, color: '#6b6b9a' },
  row: { flexDirection: 'row', gap: 12 },
  btn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  btnCancel: { backgroundColor: '#f0efff' },
  btnText: { color: 'white', fontWeight: 'bold' },
  cancelText: { color: '#4f46e5', fontWeight: 'bold' }
});