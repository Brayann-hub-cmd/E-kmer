export const safeArray = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    if (Array.isArray(data?.data)) return data.data;
    return [];
};

export const safeObject = (data) => {
    if (data && typeof data === "object" && !Array.isArray(data)) return data;
    return {};
};
