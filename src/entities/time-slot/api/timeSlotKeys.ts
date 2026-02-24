export const timeSlotKeys = {
  all: ['time-slots'] as const,
  byServiceAndDate: (serviceId: string, date: string) =>
    [...timeSlotKeys.all, serviceId, date] as const,
};
