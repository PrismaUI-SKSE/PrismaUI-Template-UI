export type SKSE_API_Call = (eventName: string, data: string) => void;
export type SKSE_API_SendToSKSE = (fnName: string, data: string) => void;

export type ClassNames<T extends string> = { [key in T]?: string };
