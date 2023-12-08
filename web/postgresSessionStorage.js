import fs from 'fs';
import { Session } from '@shopify/shopify-api';

import pgPromise from "pg-promise"

const pgp = pgPromise({/* Initialization Options */ });
// const DB = pgp('postgres://postgres:password@localhost:5433/test')
const DB = pgp('postgres://default:oAqP7JpmdXc5@ep-jolly-voice-76934282.us-east-1.postgres.vercel-storage.com:5432/verceldb?ssl=true')

export class PostgresSessionStorage {
    filename = ""
    constructor() {
        this.init();
    }

    async storeSession (session) {
        try {
            console.log('---------------- adding session --------------', session)
            await DB.none('INSERT INTO shopify_sessions(id, shop, state, is_online, scope, access_token) VALUES(${id}, ${shop}, ${state}, ${isOnline}, ${scope}, ${accessToken})', session);
            return true;

        } catch (err) {
            // error on read
            console.log(err)
            return false;
        }
    }

    async loadSession (id) {
        try {
            console.log('************* load session ***************')
            // const lines = this.readLines();
            const session = await DB.one('SELECT * FROM shopify_sessions WHERE id = $1', id)

            if (session) {
                console.log('session exist', session)

                return {
                    id: session.id,
                    shop: session.shop,
                    state: session.state,
                    isOnline: session.is_online,
                    scope: session.scope,
                    accessToken: session.access_token,
                    isActive: (scope) => true
                }
            }
            // // process each line
            // for (const line of lines) {
            //     // split the line by comma into columns
            //     const columns = line.split(',');
            //     // check if the id column matches (second column is value of 'id')
            //     if (columns[1] === id) {
            //         // if the session id already exists, convert to session and return
            //         return Session.fromPropertyArray(
            //             this.columnsToPropertyArray(columns),
            //         );
            //     }
            // }

            return undefined;
        } catch (err) {
            // error on read
            return undefined;
        }
    }

    async deleteSession (id) {
        try {
            const lines = this.readLines();

            // process each line
            for (let i = 0; i < lines.length; i++) {
                // split the line by comma into columns
                const columns = lines[i].split(',');
                // check if the id column matches (second column is value of 'id')
                if (columns[1] === id) {
                    // if the session id matches, remove the line
                    lines.splice(i, 1);
                    break;
                }
            }

            try {
                this.writeLines(lines);
                return true;
            } catch (err) {
                // error on write
                return false;
            }
        } catch (err) {
            // error on read
            return false;
        }
    }

    async deleteSessions (ids) {
        try {
            const lines = this.readLines();

            // process each line
            for (let i = 0; i < lines.length; i++) {
                // split the line by comma into columns
                const columns = lines[i].split(',');
                // check if the id column matches (second column is value of 'id')
                if (ids.includes(columns[1])) {
                    // if the session id already exists, remove the line
                    lines.splice(i, 1);
                }
            }

            try {
                this.writeLines(lines);
                return true;
            } catch (err) {
                // error on write
                return false;
            }
        } catch (err) {
            // error on read
            return false;
        }
    }

    async findSessionsByShop (shop) {
        try {
            console.log('************* find session ***************')
            // const lines = this.readLines();

            // const sessions = [];

            // // process each line
            // for (const line of lines) {
            //     // split the line by comma into columns
            //     const columns = line.split(',');
            //     // check if the shop column matches (fourth column is value of 'shop')
            //     if (columns[3] === shop) {
            //         // if the shop matches, convert to session and add to array
            //         sessions.push(
            //             Session.fromPropertyArray(this.columnsToPropertyArray(columns)),
            //         );
            //     }
            // }

            // return sessions;
        } catch (err) {
            // error on read
            return [];
        }
    }

    init () {
        const createSessionTableIfExistsSQL = `CREATE TABLE IF NOT EXISTS shopify_sessions (
            id VARCHAR ( 255 ) PRIMARY KEY,
            shop VARCHAR ( 255 ) NOT NULL,
            state VARCHAR ( 255 ) NOT NULL,
            is_online BOOLEAN NOT NULL,
            expires INT ,
            scope VARCHAR ( 255 ) NOT NULL,
            access_token VARCHAR ( 255 ) NOT NULL,
            online_access_info VARCHAR ( 255 )
        );`
        DB.any(createSessionTableIfExistsSQL)

    }

    readLines () {
        // read contents of the file
        const data = fs.readFileSync(this.filename, {
            encoding: 'utf8',
            flag: 'r',
        });

        // split the contents by new line
        return data.split(/\r?\n/);
    }

    writeLines (lines) {
        // write the lines back to the file
        fs.writeFileSync(this.filename, lines.join('\n'), {
            encoding: 'utf8',
            flag: 'w',
        });
    }

    columnsToPropertyArray (columns) {
        const propertyArray = [];
        for (let i = 0; i < columns.length; i += 2) {
            propertyArray.push([columns[i], columns[i + 1]]);
        }
        return propertyArray;
    }
}
