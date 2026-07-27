export const safeReadStorage = (key, fallback = null) => {
  if (typeof window === 'undefined') return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
};

export const safeReadStorageJSON = (key, fallback = null) => {
  const raw = safeReadStorage(key, null);
  if (raw === null) return fallback;

  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

export const safeWriteStorage = (key, value) => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore storage errors (quota, privacy mode, etc.)
  }
};

export const safeWriteStorageJSON = (key, value) => {
  safeWriteStorage(key, JSON.stringify(value));
};

export const safeRemoveStorage = (key) => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore storage errors
  }
};

export const persistAuthToken = (token) => {
  if (token) {
    safeWriteStorage('token', token);
  } else {
    safeRemoveStorage('token');
  }
};
