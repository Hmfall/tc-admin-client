import type { EventLayoutPosition } from '@/entities/event/model/types';

export const eventsLayoutPositions: EventLayoutPosition[] = [
  {
    value: 'center',
    name: 'По центру',
  },
  {
    value: 'top',
    name: 'Сверху',
  },
  {
    value: 'left',
    name: 'Слева',
  },
  {
    value: 'right',
    name: 'Справа',
  },
];

export const eventsLayoutPositionsMap = new Map(
  eventsLayoutPositions.map(({ value, name }) => [
    value,
    {
      value,
      name,
    },
  ]),
);
