export namespace IdGenerator {
  export function generate(): string {
    return Date.now().toString();
  }
}