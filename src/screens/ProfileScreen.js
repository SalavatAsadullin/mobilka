import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const ORDERS = [
  { id: '№1024', date: '19 февраля 2025', product: 'BonAqua 19 л × 2', status: 'В процессе', statusColor: '#FF9500' },
  { id: '№1018', date: '3 февраля 2025', product: 'Архыз 19 л × 1', status: 'Отменён', statusColor: '#FF3B30' },
  { id: '№1009', date: '20 января 2025', product: 'Черноголовка 19 л × 3', status: 'Выполнен', statusColor: '#4CAF50' },
];

export default function ProfileScreen({ navigation }) {
  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выйти', style: 'destructive', onPress: () => navigation.replace('Welcome') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>А</Text>
          </View>
          <Text style={styles.name}>Алексей Иванов</Text>
          <Text style={styles.email}>alexey@example.com</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Заказов</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Выполнено</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Отменено</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>История заказов</Text>
        {ORDERS.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{order.id}</Text>
              <View style={[styles.statusBadge, { backgroundColor: order.statusColor + '20' }]}>
                <Text style={[styles.statusText, { color: order.statusColor }]}>{order.status}</Text>
              </View>
            </View>
            <Text style={styles.orderProduct}>{order.product}</Text>
            <Text style={styles.orderDate}>{order.date}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        </TouchableOpacity>

        <View style={{ height: SPACING.xl }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, paddingHorizontal: SPACING.lg },
  profileHeader: { alignItems: 'center', marginTop: SPACING.lg, marginBottom: SPACING.lg },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  avatarText: { fontSize: 36, color: COLORS.white, fontWeight: 'bold' },
  name: { fontSize: FONTS.subheading, fontWeight: 'bold', color: COLORS.text },
  email: { fontSize: FONTS.caption, color: COLORS.textLight, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.lg },
  statCard: {
    flex: 1, backgroundColor: COLORS.white, borderRadius: 12,
    padding: SPACING.md, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  statNumber: { fontSize: FONTS.subheading - 2, fontWeight: 'bold', color: COLORS.primary },
  statLabel: { fontSize: FONTS.caption, color: COLORS.textLight, marginTop: 2, textAlign: 'center' },
  sectionTitle: { fontSize: FONTS.subheading - 2, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm },
  orderCard: {
    backgroundColor: COLORS.white, borderRadius: 12, padding: SPACING.md,
    marginBottom: SPACING.sm,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  orderId: { fontSize: FONTS.body - 1, fontWeight: '700', color: COLORS.text },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  statusText: { fontSize: FONTS.caption, fontWeight: '600' },
  orderProduct: { fontSize: FONTS.body - 1, color: COLORS.text },
  orderDate: { fontSize: FONTS.caption, color: COLORS.textLight, marginTop: 2 },
  logoutButton: {
    marginTop: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FF3B30',
    alignItems: 'center',
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: FONTS.body,
    fontWeight: '600',
  },
});