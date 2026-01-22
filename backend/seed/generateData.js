const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "schema_db"
});

for (let i = 0; i < 500000; i++) {
  const name = faker.person.fullName();
  const dept = faker.commerce.department();
  const status = faker.helpers.arrayElement(["Active", "Inactive"]);

  db.query(
    "INSERT INTO employees (name, department, status) VALUES (?, ?, ?)",
    [name, dept, status]
  );
}

console.log("Data generated");
