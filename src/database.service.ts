import { Injectable } from '@nestjs/common';
import {Database} from 'sqlite3';
import {WordEntryDto} from './model/word-entry.dto';

@Injectable()
export class DatabaseService {
    protected readonly db = new Database('words.sqlite');
    constructor(){
        this.db.serialize(() => {
            // noinspection TsLint
            this.db.run(`
              CREATE TABLE IF NOT EXISTS words ( 
                  id               INTEGER NOT NULL
                                           PRIMARY KEY AUTOINCREMENT,
                  word             TEXT    NOT NULL,
                  translation      TEXT,
                  correct_answers  INTEGER DEFAULT 0,
                  iteration        INTEGER DEFAULT -1,
                  next_show_date   TEXT,
                  last_update_date TEXT
              );
            `);
        });
    }
    //TODO get upsert result?
    public upsertWord(word: WordEntryDto){
        this.db.serialize(()=>{
            this.db.run(`
                INSERT INTO words (id, word, translation, correct_answers, iteration, next_show_date, last_update_date)
                  VALUES (?,?,?,?,?,?,?)
                  ON CONFLICT (id) DO UPDATE SET
                    word = excluded.word,
                    translation = excluded.translation,
                    correct_answers = excluded.correct_answers,
                    iteration = excluded.iteration,
                    next_show_date = excluded.next_show_date,
                    last_update_date = excluded.last_update_date;
            `,
                [word.id, word.word, word.translation, word.correct_answers, word.iteration, word.next_show_date, word.last_update_date],
                err => { if (err) console.log("Error during word upsert:",err) }
            );
        });
    }
    async getWords() {
        return await new Promise((resolve, reject) => {
            this.db.all("select * from words", (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            })
        })
    }
}
