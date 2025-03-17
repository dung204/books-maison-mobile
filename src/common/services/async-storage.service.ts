import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageService {
  public set<T>(key: string, value: T) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  public async get<TDefault, TResult = string>(
    key: string,
    defaultValue: TDefault,
  ): Promise<TResult | TDefault> {
    const item =
      (await AsyncStorage.getItem(key)) || JSON.stringify(defaultValue);
    return JSON.parse(item);
  }

  public remove(key: string) {
    return AsyncStorage.removeItem(key);
  }

  public clear() {
    return AsyncStorage.clear();
  }
}

export const asyncStorageService = new AsyncStorageService();
