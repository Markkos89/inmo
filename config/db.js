const mysql = require('mysql')

const local_conn = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    port: "3306",
    database: "inmoville", 
    dateStrings : true
})

exports.db = () => {
    let connection = local_conn

    return {
        //Abre la conexion, ejecuta el sql y la cierra.
        query : (sql,params) => {
            console.log("")
            console.log(sql)
            console.log(params)
            console.log("")
            return new Promise ((resolve,reject) => {
                connection.query(sql,params, (err, rows, fields) => {
                    if(err){
                        console.error(err)
                        reject(err)
                    }
                    else{
                        resolve(rows)
                    }
                })
            })
        },
        //Un objeto con las funciones connect, query y end. se usa para multiples consultas en una sola conexion
        connectionObj : {
            start : () => {
                connection.connect()
            },
            query : (sql,params) => {
                return new Promise ((resolve,reject) => {
                    connection.query(sql,params, (err, rows, fields) => {
                        if(err){
                            console.error(err)
                            reject(err)
                        }
                        else{
                            resolve(rows)
                        }
                    })
                })
            },
            end : () => {
                connection.end()
            }
        }
    }

}
