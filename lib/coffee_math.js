/**
 * Coverts given degrees into radians.
 * @param {Number} deg
 * @returns
 */
const rad = (deg) => {
    return (deg * Math.PI) / 180;
};

/**
 * Converts given radians into degrees.
 * @param {Number} rad
 * @returns
 */
const deg = (rad) => {
    return (rad * 180) / Math.PI;
};

/**
 * Finds the logarithm of x with base
 * @param {Number} base
 * @param {Number} x
 */
const logBase = (base, x) => {
    return Math.log(x) / Math.log(base);
};
