export function asserisDefined<T>(val : T): asserts val is NonNullable<T> {
    if (!val) {
        throw Error("Expected 'val' to be denined, but received " + val)
    }
}