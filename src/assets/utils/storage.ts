const storage = globalThis.sessionStorage;
const localStorage = globalThis.localStorage;

export function save(key: string, value: any) {
  storage.setItem(key, value);
}

export function read(key: string) {
  return storage.getItem(key);
}

export function clear(key: string, clearAll = false) {
  if (clearAll) {
    storage.clear();
  } else {
    storage.removeItem(key);
  }
}

export function localStorageSave(key: string, value: any) {
  localStorage.setItem(key, value);
}

export function localStorageRead(key: string) {
  return localStorage.getItem(key);
}

export function localStorageClear() {
  localStorage.clear();
}
