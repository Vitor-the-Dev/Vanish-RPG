import sqlite3 from 'sqlite3';
import crypto from 'crypto';
import path from 'path';
const dbpath = path.join('..', 'db', 'Users.db')

let db = new sqlite3.Database(dbpath, (err) => {
    if (err) {
        return console.error(err.message);
    }

    const createUsersTable = async () => {
        return await new Promise((resolve, reject) => {
            const query =`
            CREATE TABLE IF NOT EXISTS users (
            id integer PRIMARY KEY,
            name text,
            password binary(128),
            discordtag text,
            salt binary(32),
            email text )`;
            db.run(query, (err) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                resolve(1);
            });
        });
    }
    createUsersTable();
    console.log('Connected to Users database.');
    
});
//Here we need to return name, password, discordtag, email and id for proper use by the frontend and express-session, else our promise will never get resolved in the front, resulting in no alteration of the login page
let safesql = `SELECT name, password, discordtag, email, id FROM users WHERE Email = ? AND Password = ?`

export async function auth(Email, Password) {
    return await new Promise((resolve, reject) => {

        db.get(safesql, [Email, Password], (err, rows) => {
            if (err) {
                console.error(err.message);
                console.log("error!")
                reject(err);
            }
            if (!rows) {
                console.log("access denied! Invalid password " + Password)
                return resolve(rows)
            }
            //console.log(rows)
            //console.log("Access granted for " + Email + "with password " + Password)
            return resolve(rows)
            
        });
    });
}

let safesql2 = `SELECT id FROM users WHERE Id = ?`

export async function getid(Id) {
    return await new Promise((resolve, reject) => {

        db.get(safesql2, Id, (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            if (!rows) {
                //console.log("access denied!")
                return resolve(row)
            }  
            console.log(rows)
            return resolve(row)
            
        });
    });
}

let sqlsalt = `SELECT salt FROM users WHERE Email = ?`

export async function getsalt(Email) {
    return await new Promise((resolve, reject) => {

        db.get(sqlsalt, Email, (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            if (!rows) {
                //console.log("access denied! No salt for " + Email)
                return resolve(rows)
            }
            //console.log("Salt " + rows.salt + " found for " + Email + " Dis be a message from getsalt")
            return resolve(rows.salt)
            
        });
    });

}

export async function hashPassword(password, salt) {
    return await new Promise((resolve, reject) => {
        try {
            const hash = crypto.pbkdf2Sync(password, salt, 12000, 128, 'sha512')
            //console.log(hash + " this is the hash from hash")
            resolve(hash);
        }
        catch (err) {
            reject(err)
        }
    });
}

export function dbclose() {
    db.close()
}

export async function log(whatlogged) {
    return 0 
}
