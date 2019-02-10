export declare const phoneNumber: () => (value: any) => true | {
    valid: boolean;
    message: string;
};
export declare const emailAddress: () => (value: any) => true | {
    valid: boolean;
    message: string;
};
export declare const notEmpty: () => (value: any) => any;
