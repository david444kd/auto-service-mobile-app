import type { Service } from './types';

export const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Замена масла',
    emoji: '🛢️',
    description: 'Замена моторного масла и масляного фильтра. Подбор масла по рекомендации производителя.',
    durationMinutes: 30,
    priceFrom: 3500,
    isActive: true,
  },
  {
    id: '2',
    name: 'Замена тормозных колодок',
    emoji: '🔧',
    description: 'Замена передних или задних тормозных колодок с проверкой тормозных дисков.',
    durationMinutes: 60,
    priceFrom: 5000,
    isActive: true,
  },
  {
    id: '3',
    name: 'Шиномонтаж',
    emoji: '🔄',
    description: 'Сезонная смена шин, балансировка колёс, проверка давления.',
    durationMinutes: 45,
    priceFrom: 2000,
    isActive: true,
  },
  {
    id: '4',
    name: 'Диагностика двигателя',
    emoji: '🔍',
    description: 'Компьютерная диагностика двигателя и всех электронных систем автомобиля.',
    durationMinutes: 60,
    priceFrom: 4000,
    isActive: true,
  },
  {
    id: '5',
    name: 'Техническое обслуживание',
    emoji: '⚙️',
    description: 'Комплексное ТО по регламенту: замена фильтров, проверка всех систем, корректировка настроек.',
    durationMinutes: 120,
    priceFrom: 8000,
    isActive: true,
  },
];
