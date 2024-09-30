import { FormType } from '../types/schema';
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToOption<{
    ui: FormType;
    schema: any;
    initialValue: any;
    logic?: any;
    isLoading?: boolean | undefined;
    hideFormAction?: boolean | undefined;
}>, {
    schema: {};
    initialValue: {};
    logic: null;
    isLoading: boolean;
    hideFormAction: boolean;
}>, {
    handleSubmit: () => void;
    handleCancel: () => void;
    handleStep: (type: "Next" | "Prev") => void;
    model: import('vue').Ref<Record<string, unknown>>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    onSubmit: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<{
    ui: FormType;
    schema: any;
    initialValue: any;
    logic?: any;
    isLoading?: boolean | undefined;
    hideFormAction?: boolean | undefined;
}>, {
    schema: {};
    initialValue: {};
    logic: null;
    isLoading: boolean;
    hideFormAction: boolean;
}>>> & {
    onOnSubmit?: ((...args: any[]) => any) | undefined;
}, {
    initialValue: any;
    schema: any;
    isLoading: boolean;
    logic: any;
    hideFormAction: boolean;
}, {}>, {
    "custom-form"?(_: {}): any;
}>;
export default _default;

type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
