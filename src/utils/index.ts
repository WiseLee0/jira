
export const isVoid = (value: unknown) =>
    value === undefined || value === null || value === "";

export const cleanObj = (object: { [key: string]: unknown }) => {
    const result = { ...object };
    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isVoid(value)) {
            delete result[key];
        }
    });
    return result;
};