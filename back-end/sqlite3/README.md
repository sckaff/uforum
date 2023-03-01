# For testing purposes:
## CREATE TABLES
CREATE TABLE USERS (
   uID INTEGER PRIMARY KEY AUTOINCREMENT,
   email TEXT NOT NULL UNIQUE,
   password TEXT NOT NULL,
   userName  TEXT NOT NULL UNIQUE,
   firstName TEXT NOT NULL,
   lastName TEXT NOT NULL
);

CREATE TABLE POSTS(
   pID INTEGER PRIMARY KEY AUTOINCREMENT,
   userName TEXT NOT NULL,
   title TEXT NOT NULL,
   body TEXT NOT NULL
);


## INSERT VALUES
|| USERS ||


|| POSTS ||
insert into posts values('1', 'Sckaff', 'The Sckaff Title', 'The Sckaff Body');
insert into posts values('2', 'Scaff', 'The Scaff Title', 'The Scaff Body');
insert into posts values('3', 'Nielsen', 'The Nielsen Title', 'The Nielsen Body');
insert into posts values('4', 'Zhao', 'The Zhao Title', 'The Zhao Body');

## DROP TABLES
DROP TABLE USERS;
DROP TABLE POSTS;

# Debugging
Go to site:
- https://www.sqlite.org/
- Download precompiled binaries 64 bit and if uses windows download sqlite tools win32
- Run terminal: 
    `run sqlite3.exe`
- Check if it works - go to sqlite3 folder and run:
    `sqlite3 .\uf_forum.db` (Mac)
    `.open .\uf_forum.db` (Windows)