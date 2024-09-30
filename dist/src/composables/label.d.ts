import { Ref } from 'vue';
export declare const useLabel: (model: Ref<any>) => {
    isLabelHoisted: Ref<boolean>;
    hoist: () => boolean;
    unHoist: () => void;
};
