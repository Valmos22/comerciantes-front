export const TypeEnum = {
    income: "income",
    expense: "expense",
} as const;

type TypeEnum = typeof TypeEnum[keyof typeof TypeEnum];

export interface IFormInput {
    type: TypeEnum
    category: string
    amount: number
    date: string
    description: string
}