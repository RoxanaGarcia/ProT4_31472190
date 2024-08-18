import mysqlConnection from 'mysql2/promise';
const properties = {
host:'localhost',
user:'root',
password: '123456',
database: 'rest-api'

}

export const pool = mysqlConnection.createPool(properties);