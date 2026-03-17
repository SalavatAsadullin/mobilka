import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const WATER_PRODUCTS = [
  {
    id: 1,
    brand: 'BonAqua',
    name: 'Вода питьевая негазированная',
    volume: '19 л',
    price: 350,
    emoji: '🔵',
    description: 'Очищена методом обратного осмоса. Идеальна для кулеров.',
    country: 'Россия',
    region: 'Московская область',
    source: 'Артезианская скважина',
    mineralization: '200–400 мг/л',
    ph: '6.5–7.5',
    hardness: 'Мягкая',
    composition: 'Гидрокарбонаты, кальций, магний, натрий',
    certificate: 'ГОСТ Р 52109-2003',
    shelfLife: '12 месяцев',
    about: 'BonAqua — один из самых популярных брендов питьевой воды в России. Вода проходит многоступенчатую очистку методом обратного осмоса, что позволяет удалить все вредные примеси, сохранив при этом полезные минералы.',
  },
  {
    id: 2,
    brand: 'Архыз',
    name: 'Природная горная вода',
    volume: '19 л',
    price: 420,
    emoji: '🏔️',
    description: 'Добывается из горных источников Кавказа. Минерализация 200–500 мг/л.',
    country: 'Россия',
    region: 'Карачаево-Черкесия, Кавказ',
    source: 'Горный природный источник',
    mineralization: '200–500 мг/л',
    ph: '7.0–7.8',
    hardness: 'Средняя',
    composition: 'Гидрокарбонаты, сульфаты, кальций, магний',
    certificate: 'ГОСТ Р 54316-2011',
    shelfLife: '18 месяцев',
    about: 'Архыз добывается в экологически чистом районе Кавказских гор на высоте более 1500 метров над уровнем моря. Природная фильтрация через горные породы обогащает воду полезными минералами и придаёт ей мягкий, приятный вкус.',
  },
  {
    id: 3,
    brand: 'Святой Источник',
    name: 'Питьевая вода',
    volume: '19 л',
    price: 380,
    emoji: '✨',
    description: 'Природная вода из подземных артезианских скважин.',
    country: 'Россия',
    region: 'Нижегородская область',
    source: 'Артезианская скважина глубиной 85 м',
    mineralization: '150–350 мг/л',
    ph: '6.8–7.2',
    hardness: 'Мягкая',
    composition: 'Кальций, магний, калий, натрий, гидрокарбонаты',
    certificate: 'ГОСТ Р 52109-2003',
    shelfLife: '12 месяцев',
    about: 'Святой Источник добывается из глубоких артезианских скважин, защищённых от поверхностного загрязнения. Вода имеет сбалансированный минеральный состав, подходит для ежедневного употребления взрослыми и детьми.',
  },
  {
    id: 4,
    brand: 'Черноголовка',
    name: 'Артезианская вода',
    volume: '19 л',
    price: 400,
    emoji: '💎',
    description: 'Добывается с глубины 120 м. Сбалансированный минеральный состав.',
    country: 'Россия',
    region: 'Московская область, г. Черноголовка',
    source: 'Артезианская скважина глубиной 120 м',
    mineralization: '300–500 мг/л',
    ph: '7.0–7.5',
    hardness: 'Средняя',
    composition: 'Гидрокарбонаты, кальций, магний, фтор',
    certificate: 'ГОСТ Р 54316-2011',
    shelfLife: '24 месяца',
    about: 'Черноголовка добывается в одном из самых экологически чистых районов Подмосковья. Скважина глубиной 120 метров обеспечивает полную защиту от загрязнений. Богатый минеральный состав делает эту воду отличным выбором для поддержания водно-солевого баланса.',
  },
];

export default function CatalogScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>Каталог воды</Text>
        <Text style={styles.subtitle}>Выберите подходящую марку</Text>

        {WATER_PRODUCTS.map((item) => (
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

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, paddingHorizontal: SPACING.lg },
  title: { fontSize: FONTS.heading - 4, fontWeight: 'bold', color: COLORS.primary, marginTop: SPACING.lg },
  subtitle: { fontSize: FONTS.body, color: COLORS.textLight, marginBottom: SPACING.lg },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  emoji: { fontSize: 36, marginRight: SPACING.sm },
  cardInfo: { flex: 1 },
  brand: { fontSize: FONTS.body, fontWeight: '700', color: COLORS.primary },
  productName: { fontSize: FONTS.caption, color: COLORS.text },
  volume: { fontSize: FONTS.caption, color: COLORS.textLight },
  price: { fontSize: FONTS.subheading, fontWeight: 'bold', color: COLORS.text },
  description: { fontSize: FONTS.caption, color: COLORS.textLight, lineHeight: 18, marginBottom: SPACING.sm },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonAdded: { backgroundColor: '#4CAF50' },
  buttonText: { color: COLORS.white, fontWeight: '700', fontSize: FONTS.body - 1 },
  buttonsRow: {
  flexDirection: 'row',
  gap: SPACING.sm,
  },
  detailButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: 'center',
  },
  detailButtonText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: FONTS.body - 1,
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: COLORS.white, fontWeight: '700', fontSize: FONTS.body - 1 },
});


