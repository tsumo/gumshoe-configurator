export const range = (i: number): number[] => [...Array(i).keys()]

export const randomStr = () => (Math.random() + 1).toString(36).substring(2)
