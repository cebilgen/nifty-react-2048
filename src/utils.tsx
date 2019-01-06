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


/**
 * Wraps setTimeout() in a Promise for usage with async/await.
 * 
 * @param milliseconds - Milliseconds to delay 
 * @param func - Optional function to be called after the delay 
 */
export function delay(milliseconds: number, func: any = undefined): Promise<any> {
    return new Promise<any>(resolve => {
            setTimeout(() => {
                if (typeof func !== 'undefined') {
                    resolve(func())
                }
                else {
                    resolve()
                }
            }, milliseconds)
        })
}
