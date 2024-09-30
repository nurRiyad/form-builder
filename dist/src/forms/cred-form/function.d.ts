export function useFunc(model: any): {
    isCredAws: ({ cData, params }: {
        cData: any;
        params: any;
    }) => boolean;
    isCredAzure: import('vue').ComputedRef<boolean>;
    initFun: () => string;
    loadData: () => Promise<any>;
    loadData1: () => Promise<any>;
    loadData2: () => Promise<any>;
    checkOnChange: () => void;
    watchTest: () => string;
    keyIdLoader: () => Promise<any>;
};
