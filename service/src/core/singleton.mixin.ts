/**
 * Generic Singleton Mixin
 * Provides singleton pattern functionality to any class
 */
export function Singleton<T extends new (...args: any[]) => any>(Base: T) {
  return class extends Base {
    private static instance: InstanceType<T>;

    public static getInstance(...args: ConstructorParameters<T>): InstanceType<T> {
      if (!this.instance) {
        this.instance = new this(...args) as InstanceType<T>;
      }
      return this.instance;
    }
  } as T & {
    getInstance(...args: ConstructorParameters<T>): InstanceType<T>;
  };
}
