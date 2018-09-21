import {Body, Controller, Get, Put} from '@nestjs/common';
import {DatabaseService} from './database.service';
import {SyncRequestBodyDto} from './model/sync-request-body.dto';
import {WordEntryDto} from './model/word-entry.dto';

@Controller('sync')
export class SyncController {
    constructor(protected db: DatabaseService) { }

    @Put()
    public updateDatabase(@Body() body: SyncRequestBodyDto){
        // console.log('received update request: ',body);
        body.words.forEach((word: WordEntryDto)=>{
            console.log("processing word:", word);
            this.db.upsertWord(word);
        });
        return {
            status: 'ok',
        }
    }
    @Get()
    public getWordsList(){
        return this.db.getWords();
    }
}
