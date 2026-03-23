import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView,
  TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { fetchProducts, seedProducts } from '../services/firebase';

const INITIAL_PRODUCTS = [
  {
    id: '1',
    brand: 'BonAqua',
    name: 'Вода питьевая негазированная',
    volume: '19 л',
    price: 350,
    emoji: '🔵',
    description: 'Очищена методом обратного осмоса. Идеальна для кулеров.',
  },
  {
    id: '2',
    brand: 'Архыз',
    name: 'Природная горная вода',
    volume: '19 л',
    price: 420,
    emoji: '🏔️',
    description: 'Добывается из горных источников Кавказа. Минерализация 200–500 мг/л.',
  },
  {
    id: '3',
    brand: 'Святой Источник',
    name: 'Питьевая вода',
    volume: '19 л',
    price: 380,
    emoji: '✨',
    description: 'Природная вода из подземных артезианских скважин.',
  },
  {
    id: '4',
    brand: 'Черноголовка',
    name: 'Артезианская вода',
    volume: '19 л',
    price: 400,
    emoji: '💎',
    description: 'Добывается с глубины 120 м. Сбалансированный минеральный состав.',
  },
];

export default function CatalogScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      let data = await fetchProducts();

      // Если база пустая — заполняем начальными данными
      if (data.length === 0) {
        await seedProducts(INITIAL_PRODUCTS);
        data = INITIAL_PRODUCTS;
      }

      setProducts(data);
    } catch (e) {
      setError('Не удалось загрузить каталог. Проверьте интернет-соединение.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Загружаем каталог...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadProducts}>
            <Text style={styles.retryButtonText}>Повторить</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>Каталог воды</Text>
        <Text style={styles.subtitle}>Выберите подходящую марку</Text>

        {products.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.emoji}>{item.emoji}</Text>
              <View style={styles.cardInfo}>
                <Text style={styles.brand}>{item.brand}</Text>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.volume}>{item.volume}</Text>
              </View>
              <Text style={styles.price}>{item.price} ₽</Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() => navigation.navigate('WaterDetail', { product: item })}
              >
                <Text style={styles.detailButtonText}>Подробнее</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Order', { product: item })}
              >
                <Text style={styles.buttonText}>Заказать</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={{ height: SPACING.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:    { flex: 1, backgroundColor: COLORS.background },
  container:   { flex: 1, paddingHorizontal: SPACING.lg },
  centered:    { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.lg },
  title:       { fontSize: FONTS.heading - 4, fontWeight: 'bold', color: COLORS.primary, marginTop: SPACING.lg },
  subtitle:    { fontSize: FONTS.body, color: COLORS.textLight, marginBottom: SPACING.lg },
  loadingText: { marginTop: SPACING.md, fontSize: FONTS.body, color: COLORS.textLight },
  errorText:   { fontSize: FONTS.body, color: '#FF3B30', textAlign: 'center', marginBottom: SPACING.md },
  retryButton: {
    backgroundColor: COLORS.primary, paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg, borderRadius: 12,
  },
  retryButtonText: { color: COLORS.white, fontWeight: '700', fontSize: FONTS.body },
  card: {
    backgroundColor: COLORS.white, borderRadius: 14,
    padding: SPACING.md, marginBottom: SPACING.md,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  cardHeader:  { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  emoji:       { fontSize: 36, marginRight: SPACING.sm },
  cardInfo:    { flex: 1 },
  brand:       { fontSize: FONTS.body, fontWeight: '700', color: COLORS.primary },
  productName: { fontSize: FONTS.caption, color: COLORS.text },
  volume:      { fontSize: FONTS.caption, color: COLORS.textLight },
  price:       { fontSize: FONTS.subheading, fontWeight: 'bold', color: COLORS.text },
  description: { fontSize: FONTS.caption, color: COLORS.textLight, lineHeight: 18, marginBottom: SPACING.sm },
  buttonsRow:  { flexDirection: 'row', gap: SPACING.sm },
  detailButton: {
    flex: 1, paddingVertical: SPACING.sm, borderRadius: 10,
    borderWidth: 1.5, borderColor: COLORS.primary, alignItems: 'center',
  },
  detailButtonText: { color: COLORS.primary, fontWeight: '700', fontSize: FONTS.body - 1 },
  button: {
    flex: 1, backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm, borderRadius: 10, alignItems: 'center',
  },
  buttonText: { color: COLORS.white, fontWeight: '700', fontSize: FONTS.body - 1 },
});
