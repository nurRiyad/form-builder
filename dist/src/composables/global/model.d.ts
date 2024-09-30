export declare const useGlobalModel: () => {
    model: import('vue').Ref<Record<string, unknown>>;
    setValue: (key: string, val: any) => void;
    getValue: (key: string) => unknown;
    deleteValue: (key: string) => void;
    clearModel: () => {};
};
