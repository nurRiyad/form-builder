export declare const useLoader: () => {
    loadData: (fName?: string) => Promise<void>;
    isLoading: import('vue').Ref<boolean>;
    data: import('vue').Ref<any>;
};
