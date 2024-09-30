import { BaseElement } from '../types';
import { Ref } from 'vue';
export declare const useBaseValidity: (ui: BaseElement | undefined, val: Ref<any>, parentErr?: (val: number) => void) => {
    err: import('vue').ComputedRef<string>;
    calValidation: (n: unknown) => void;
    showStar: import('vue').ComputedRef<boolean>;
    showGblError: Ref<boolean>;
    showLocalErr: Ref<boolean>;
};
export declare const useBlockValidity: (parentErr?: (val: number) => void) => {
    errCnt: Ref<number>;
    updateErr: (val: number) => void;
    isValid: () => boolean;
};
