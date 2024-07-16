export module Validation {
    export type Rule = (val: any) => boolean | string;
    export type Rules = Record<string, Rule[]>;

    // export type Regex = Record<string, RegExp>;

    // export type Validator = {
    //   regex: Regex;
    //   required: Rule;
    // };
}



