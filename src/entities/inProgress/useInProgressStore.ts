import { InProgress } from '@/entities/inProgress/InProgress';
import { storeFactory } from '@/shared/lib/storeFactory';

export const useInProgressStore = storeFactory(InProgress);
