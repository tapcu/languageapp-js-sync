export class WordEntryDto {
    readonly id: number;
    readonly word: string;
    readonly translation: string;
    readonly correct_answers: number;
    readonly iteration: number;
    readonly next_show_date: string;
}