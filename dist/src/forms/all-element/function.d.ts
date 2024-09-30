export function useFunc(model: any): {
    multiLoader: () => Promise<any>;
    singleLoader1: () => Promise<any>;
    singleLoader2: () => Promise<any>;
    fNameLoader: () => Promise<any>;
};
