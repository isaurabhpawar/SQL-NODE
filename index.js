const sqlite3 = require("sqlite3").verbose();

// open the database
let db = new sqlite3.Database(
  "./db/chinook.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the chinook database.");
  }
);

db.serialize(() => {
  db.each(
    `SELECT PlaylistId as id,
                  Name as name
           FROM playlists`,
    (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
    }
  );
});
db.run(
  `INSERT INTO BioBox VALUES("Bla",date('now'),time('now'))`,
  function (err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  }
);

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Close the database connection.");
});
