import type { UseGlobalStore } from '@/store';
import { VIEWPORT_WIDTH, VIEWPORT_UNIT } from 'config/const';

export const pxToVw = (px: number = 0) => {
  return (px / VIEWPORT_WIDTH) * 100 + VIEWPORT_UNIT;
};

export const setUserAgent = (store: UseGlobalStore) => {
  // ?statusHeight=100&token=Beare
  const params = new URLSearchParams(window.location.search);
  store.SET_GLOBAL_STATE({
    token: params.get('token') || '',
    // statusHeight: params.get('statusHeight') || '',
  });
};
