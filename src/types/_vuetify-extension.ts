export module Vuetify {
    export type SelectOption<T> = {
        title: string;
        value: T;
        disabled?: boolean;
    };
}