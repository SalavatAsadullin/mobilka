import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const STORAGE_KEY = 'login_form';

export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  // Загружаем сохранённый email при открытии экрана
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        const saved = JSON.parse(raw);
        setForm((prev) => ({ ...prev, email: saved.email || '' }));
      }
    }).catch(() => {});
  }, []);

  // Сохраняем email при каждом изменении (пароль не сохраняем из соображений безопасности)
  const updateField = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));

    if (field === 'email') {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ email: value })).catch(() => {});
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = 'Введите email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Некорректный email';
    if (!form.password) newErrors.password = 'Введите пароль';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validate()) {
      navigation.replace('Main');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Вход</Text>
          <Text style={styles.subtitle}>Введите данные для входа</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="example@mail.ru"
            placeholderTextColor={COLORS.textLight}
            value={form.email}
            onChangeText={(v) => updateField('email', v)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorText}>⚠ {errors.email}</Text>}

          <Text style={styles.label}>Пароль</Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Ваш пароль"
            placeholderTextColor={COLORS.textLight}
            value={form.password}
            onChangeText={(v) => updateField('password', v)}
            secureTextEntry
          />
          {errors.password && <Text style={styles.errorText}>⚠ {errors.password}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link} onPress={() => navigation.replace('Register')}>
            <Text style={styles.linkText}>Нет аккаунта? Зарегистрироваться</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, paddingHorizontal: SPACING.lg },
  title: { fontSize: FONTS.heading - 4, fontWeight: 'bold', color: COLORS.primary, marginTop: SPACING.xl },
  subtitle: { fontSize: FONTS.body, color: COLORS.textLight, marginBottom: SPACING.lg },
  label: { fontSize: FONTS.body - 1, fontWeight: '600', color: COLORS.text, marginBottom: 6, marginTop: SPACING.sm },
  input: {
    backgroundColor: COLORS.white, borderRadius: 12,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm + 4,
    fontSize: FONTS.body - 1, color: COLORS.text,
    borderWidth: 1.5, borderColor: '#E5E5EA',
  },
  inputError: { borderColor: '#FF3B30' },
  errorText: { fontSize: FONTS.caption, color: '#FF3B30', marginTop: 4 },
  button: {
    backgroundColor: COLORS.primary, paddingVertical: SPACING.md,
    borderRadius: 14, alignItems: 'center', marginTop: SPACING.lg,
  },
  buttonText: { color: COLORS.white, fontSize: FONTS.body, fontWeight: '700' },
  link: { alignItems: 'center', paddingVertical: SPACING.lg },
  linkText: { color: COLORS.primary, fontSize: FONTS.body },
});
