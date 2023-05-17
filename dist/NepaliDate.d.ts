declare class NepaliDate {
    timestamp: Date;
    year: number;
    month: number;
    day: number;
    static minimum: () => Date;
    static maximum: () => Date;
    constructor(...args: any[]);
    setEnglishDate(date: Date): void;
    getEnglishDate(): Date;
    parse(dateString: string): void;
    getYear(): number;
    getMonth(): number;
    getDate(): number;
    getDay(): number;
    getHours(): number;
    getMinutes(): number;
    getSeconds(): number;
    getMilliseconds(): number;
    getTime(): number;
    setYear(year: number): void;
    setMonth(month: number): void;
    setDate(day: number): void;
    set(year: number, month: number, date: number): void;
    format(formatStr: string): string;
    toString(): string;
}
export default NepaliDate;
