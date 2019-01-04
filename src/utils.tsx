/**
 * Returns a random integer between two values, inclusive.
 * https://mzl.la/2qChqI1
 * 
 * @param min - Minimum value 
 * @param max - Maximum value
 */
export function randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
