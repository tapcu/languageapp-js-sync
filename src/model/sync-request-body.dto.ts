import {WordEntryDto} from './word-entry.dto';

export class SyncRequestBodyDto { //see https://docs.nestjs.com/controllers
    readonly words: WordEntryDto[];
}