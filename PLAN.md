# UI Plan: Мобильное приложение для записи в автосервис
_Saved 2026-02-23, обновлён 2026-02-23_

## Context

Приложение для клиентов автомастерской. Основная цель — дать возможность быстро записаться на обслуживание. Минимум экранов, чёткий пользовательский путь.

---

## Экраны (2 таба)

### Экран 1 — «Запись» (таб 1, index)

Главная страница — сразу форма записи (без промежуточного экрана выбора услуги).

ScrollView на `bg-slate-900`, паддинг `p-4`:

```
1. Выбор услуги
   ServicePicker — список услуг с выделением выбранной (rose-500 accent)

2. Дата и время
   Горизонтальный скролл дней (14 дней вперёд)
   Сетка слотов по времени (09:00–18:00)
   — слоты подгружаются useTimeSlots(serviceId, date)
   — недоступные: opacity-40 disabled

3. Автомобиль
   Input: Марка и модель
   Input: Год выпуска (numeric)
   Input: Гос. номер

4. Контакты
   Input: Имя
   Input: Телефон (+7 маска)

5. Комментарий (необязательно, multiline)

6. Button primary fullWidth lg: "Записаться"
   — disabled пока форма невалидна
   — при успехе: router.replace('/(tabs)/bookings') + toast success
   — при ошибке: toast error
```

React Hook Form + Zod валидация.

---

### Экран 2 — «Мои записи» (таб 2, bookings)

ScrollView + RefreshControl:

```
Если записей нет:
  🗓 "Нет записей" / "Запишитесь на обслуживание"
  Button outline: "Записаться" → переход на таб Запись

Предстоящие:
  BookingCard elevated
    StatusBadge + дата
    Название услуги + автомобиль
    Button outline sm: "Отменить" (если pending/confirmed и дата в будущем)
      → openModal('cancel-booking', { bookingId })
      → подтверждение → PATCH /bookings/:id → toast + invalidate

История:
  BookingCard default (компактный)
    StatusBadge + дата + услуга + авто
```

---

## Навигация

```
app/
  _layout.tsx              ← Stack root, без modal экранов
  (tabs)/
    _layout.tsx            ← 2 таба — "Запись" (📝) и "Записи" (📋)
    index.tsx              ← Экран 1 (форма записи)
    bookings.tsx           ← Экран 2 (мои записи)
```

Флоу:
- Таб «Запись» → выбрать услугу → заполнить форму → submit → таб «Записи»
- Таб «Записи» → empty state «Записаться» → таб «Запись»
- Таб «Записи» → «Отменить» → modal confirm → PATCH API

---

## FSD-структура

### Entities

**`src/entities/service/`**
- `model/types.ts` — `serviceSchema` + `Service` type
- `model/mockData.ts` — `MOCK_SERVICES` (5 услуг)
- `api/serviceApi.ts` — GET /services, GET /services/:id
- `api/serviceKeys.ts` — query keys
- `hooks/useServices.ts`, `useService(id)`
- `ui/ServiceCard.tsx`
- `index.ts`

**`src/entities/booking/`**
- `model/types.ts` — `Booking`, `BookingStatus`, `Car`, `createBookingSchema`
- `api/bookingApi.ts` — GET/POST/PATCH bookings
- `api/bookingKeys.ts`
- `hooks/useBookings.ts`, `useCreateBooking()`, `useCancelBooking()`
- `ui/BookingCard.tsx`, `ui/StatusBadge.tsx`
- `index.ts`

**`src/entities/time-slot/`**
- `model/types.ts` — `TimeSlot`
- `api/timeSlotApi.ts` — GET /services/:id/slots?date=YYYY-MM-DD
- `api/timeSlotKeys.ts`
- `hooks/useTimeSlots(serviceId, date)`
- `index.ts`

### Features

**`src/features/book-service/`**
- `ui/BookingForm.tsx` — полная форма без пропов: выбор услуги + дата/слот + авто + контакты
- `ui/ServicePicker.tsx` — список услуг с подсветкой выбранной
- `ui/DateSelector.tsx` — горизонтальный скролл дат
- `ui/TimeSlotGrid.tsx` — сетка слотов
- `ui/ServiceSummaryCard.tsx` — read-only карточка (используется при deeplink, если нужно)
- `index.ts`

**`src/features/cancel-booking/`**
- `ui/CancelConfirmModal.tsx`
- `index.ts`

### Widgets

**`src/widgets/bookings-list/`** — useBookings() + BookingCard + split upcoming/past + empty state + CancelConfirmModal

### App-pages

- `src/app-pages/home/` — рендерит `BookingForm` напрямую
- `src/app-pages/bookings/` — Header + BookingsList

---

## Типы данных

```typescript
// Service
{ id, name, emoji, description, durationMinutes, priceFrom, isActive }

// BookingStatus
'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'

// Car (sub-object Booking)
{ make: string, year: number, plateNumber: string }

// Booking
{ id, serviceId, service, status, scheduledAt, car, customerName, customerPhone, comment, createdAt }

// TimeSlot
{ time: "09:00", isAvailable: boolean, scheduledAt: ISO }
```

---

## API endpoints

| Method | Endpoint | Назначение |
|--------|----------|------------|
| GET | `/services` | Список услуг |
| GET | `/services/:id` | Одна услуга |
| GET | `/services/:id/slots?date=YYYY-MM-DD` | Доступные слоты |
| GET | `/bookings?phone=...` | Записи клиента |
| POST | `/bookings` | Создать запись |
| PATCH | `/bookings/:id` | Отменить запись |

---

## Текущий статус (Фаза 1 — UI без реального API)

### Реализовано
- Все entity слои (service, booking, time-slot) с типами, API-клиентами, хуками
- `BookingForm` — форма с `ServicePicker`, `DateSelector`, `TimeSlotGrid`, RHF + Zod
- `BookingsPage` — список записей с `BookingsList`, `CancelConfirmModal`
- Навигация: 2 таба (📝 Запись, 📋 Записи)
- Mock данные через `MOCK_SERVICES`

### Следующая фаза (Фаза 2 — подключение API)
- Заменить `MOCK_SERVICES` на `useServices()` в `BookingForm`
- Подключить реальный `useBookings(phone)` в `BookingsList`
- Добавить toast уведомления через Zustand UI store
- Настроить `API_URL` в `.env.local`

---

## Проверка результата

1. `npx expo start` + открыть в симуляторе
2. Таб «Запись»: отображается выбор услуги, форма, кнопка «Записаться»
3. Выбор услуги выделяет карточку rose-500 accent
4. Форма записи: выбор даты/слота, заполнение полей, Zod валидация
5. После submit: переход на таб «Записи», alert «Запись создана»
6. Таб «Записи»: отображается запись, кнопка «Отменить» открывает modal
7. Отмена: запись меняет статус, toast «Запись отменена»
8. `npm run typecheck` — нет ошибок
9. `npm run lint` — нет ошибок
