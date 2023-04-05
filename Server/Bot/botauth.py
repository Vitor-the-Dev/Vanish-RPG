import sqlite3
import os
import hashlib

def createnewuser(message):
            
    if len(message) != 5:
        return "Invalid new user, please certify you are sending on the format: createnewuser name password discordtag email"
        
    conn = sqlite3.connect('Server\\db\\Users.db')
    cursor = conn.cursor()
    cursor.execute("""SELECT email FROM users WHERE email = ?""", (message[4],))
    cursoremailout = cursor.fetchall()
    print(message[4])
    print(cursoremailout)
    if not message[4] in cursoremailout:
        print("batata")
        for i in cursoremailout:
            print(i)              
              
    if not (message[4], ) in cursoremailout:
                
        cursor = conn.cursor()
        salt = os.urandom(32) #give us a 32 char salt 

        inlist = [] #the list we are going to submit to the db
        inlist.append(message[1]) #add name to the inlist 
        inlist.append(hashlib.pbkdf2_hmac("sha512", message[2].encode("utf-8"), salt, 12000, dklen=128)) #the password, encrypted with sha512
        inlist.append(message[3]) #the discord tag of the user in question
        inlist.append(salt) #storing the salt to retrieve later
        inlist.append(message[4]) #email, must be unique 

        cursor.executemany("""INSERT INTO users (name, password, discordtag, salt, email) VALUES (?,?,?,?,?)""", [inlist])
        conn.commit()
            
        return "User " + message[1] + " created with success, don't forget to delete your last user submission! Discord bots cannot delete messages in DMs"    
        
    else:
        return "Invalid new user, this email is already registered" 
    
#salt = os.urandom(32)
#print(salt)
#print(type(salt))

#message="secretpassword"
#a = hashlib.pbkdf2_hmac("sha512", message.encode("utf-8"), salt, 12000, dklen=128)
#print(a)
#print(type(a))

#conn = sqlite3.connect('../db/Users.db')
#cursor = conn.cursor()
#cursor.execute("""SELECT * FROM users WHERE email = ?""", ("vanish@lunamail.com",))
#cursoremailout = cursor.fetchall()
#print(cursoremailout)
