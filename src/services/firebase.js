import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, push, child } from 'firebase/database';

const firebaseConfig = {
  databaseURL: 'https://aquadelivery-9d159-default-rtdb.europe-west1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

// ─── Товары ───────────────────────────────────────────────

// Загрузить все товары из Firebase
export async function fetchProducts() {
  const snapshot = await get(ref(db, 'products'));
  if (!snapshot.exists()) return [];
  const data = snapshot.val();
  return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
}

// Заполнить Firebase начальными товарами (вызвать один раз)
export async function seedProducts(products) {
  for (const product of products) {
    await set(ref(db, `products/${product.id}`), product);
  }
}

// ─── Заказы ───────────────────────────────────────────────

// Отправить заказ в Firebase
export async function sendOrder(order) {
  const ordersRef = ref(db, 'orders');
  const newRef    = push(ordersRef);
  await set(newRef, {
    ...order,
    status:    'В процессе',
    createdAt: new Date().toISOString(),
  });
  return newRef.key; // возвращаем ID созданного заказа
}
