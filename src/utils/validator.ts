export namespace Validation {
  export function isRequired(value: string): boolean {
    return value.trim().length > 0;
  }

  export function isUserIdValid(id: string): boolean {
    const regex = /^\d+$/;
    return regex.test(id);
  }

  export function isYearValid(year: string): boolean {
    const regex = /^(1[0-9]{3}|20[0-9]{2})$/; 
    return regex.test(year);
  }
}