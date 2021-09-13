export function makeColor (shift) {
    const str = shift.type + shift.category;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

export function round(num, decimals = 0) {
    if (decimals < 0) {
        decimals = decimals * -1;
        const divider = 10 ** decimals;
        num = Math.round(num / divider) * divider;
    }
    const multiplier = 10 ** decimals;
    return Math.round(num * multiplier) / multiplier;
}
