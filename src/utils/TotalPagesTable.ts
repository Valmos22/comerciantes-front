import type { Product } from "./TransactionType";

export const totalPagesTable = (totalData: number, pageSize: number) => {
    return Math.ceil(totalData / pageSize);
}

export const currentData = (data: Product[], currentPage: number, pageSize: number) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const current = data?.slice(startIndex, endIndex);
    const currentTwo = data?.slice(startIndex, endIndex);
    return { current, currentTwo }
}
