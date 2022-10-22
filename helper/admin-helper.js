const { Result } = require('express-validator');
var database = require('../config/connection');
var bcrypt = require('bcrypt');


module.exports = {
    addCar:(data)=>{
        console.log(data);
        var brand = data.brand;
        var model = data.model;
        var amount = data.amount;
        var fuel = data.fuel;
        var reg = data.register_no;
        var segment = data.segment;
        var kms = data.kms;
        let transmission = data.transmission;
        let seat = data.seat;
        return new Promise((resolve, reject) => {
            var sql = `INSERT INTO car_table(brand,model,amount,fuel,reg_no,segment,kms,transmission,no_of_seat) values("${brand}","${model}","${amount}","${fuel}","${reg}","${segment}","${kms}","${transmission}","${seat}")`
            database.query(sql,(err,result)=>{
                if(err) reject();
                else{
                    resolve(result)
                }
            })
        })

    },
    getCars:()=>{
        return new Promise((resolve, reject) => {
           var sql = `select * from car_table`;
            database.query(sql,(err,result)=>{
                if(err) throw err;
                else{
                    //console.log(result);
                    resolve(result)
                }
            })
        })
    },

    changeStatus:(status,carId)=>{
        return new Promise((resolve, reject) => {
           var sql = `update car_table set status='${status}' where car_id='${carId}'`;
           database.query(sql,(err,result)=>{
            if(err) throw err;
            else{
                resolve(result)
            }
           }) 
        })
    },
    addDriver:async(data)=>{
        let password = await bcrypt.hash(data.passwd,10);
        
            let name=data.name
            let address=data.address
            let gender=data.gender
            let exp=data.exp
            let phone=data.phone
            let email=data.email
            let dob=data.dob
            let status;
            
        return new Promise((resolve, reject) => {
            var sql1 =  `INSERT INTO login(user_type,email,password) values("driver","${email}","${password}")`;
            database.query(sql1,(err,result)=>{
                if(err) {
                    status=false;
                    reject(status)
                }
                else{
                    var l_id = result.insertId;
                    var sql = `INSERT INTO driver_table(name,address,gender,exp,phone,dob,l_id) values("${name}","${address}","${gender}","${exp}","${phone}","${dob}","${l_id}")`;
                    database.query(sql,(err,result)=>{
                        if(err) {
                            console.log(err);
                            status=false;
                            reject(status);
                        }
                        else{
                            status=true;
                            resolve(status)
                        }
                    })

                }

            })
        })
    },
    getDrivers:()=>{
        return new Promise((resolve, reject) => {
           var sql = `select * from driver_table`;
            database.query(sql,(err,result)=>{
                if(err) throw err;
                else{
                    //console.log(result);
                    resolve(result)
                }
            })
        })
    },
    changeDriverStatus:(status,driverId)=>{
        return new Promise((resolve, reject) => {
           var sql = `update driver_table set status='${status}' where driver_id='${driverId}'`;
           database.query(sql,(err,result)=>{
            if(err) throw err;
            else{
                resolve(result)
            }
           }) 
        })
    },
    getAcar:(carId)=>{
        return new Promise((resolve, reject) => {
            let sql = `select * from car_table where car_id = '${carId}'`;
            database.query(sql,(err,result)=>{
                if(err) throw err;
                else{
                    resolve(result[0])
                }
            }) 
        })
    },
    updateCar:(data)=>{
        let id = data.carId;
        let amount = data.amount;
        let kms = data.kms;
        return new Promise((resolve, reject) => {
            var sql = `update car_table set amount = ${amount},kms = ${kms} where car_id= ${id}`
            database.query(sql,(err,result)=>{
                if(err) reject({status:false});
                else resolve({status:true});
            })
        })
    },
    deleteCar:(carId)=>{
        return new Promise((resolve, reject) => {
            var sql = `delete from car_table where car_id =${carId}`;
            database.query(sql,(err,result)=>{
                if(err){
                    
                    resolve({status:false})
                }else{
                    resolve({status:true})
                }
            })
        })
    },
    getDriver:(D_id)=>{
        return new Promise((resolve, reject) => {
            let sql = `select * from driver_table inner join login on driver_table.l_id=login.l_id where driver_id = ${D_id} `
            database.query(sql,(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    },
    getAllUsers:()=>{
        return new Promise((resolve, reject) => {
            let sql = `select * from registration natural join login where user_type != 'admin'`;
            database.query(sql,(err,result)=>{
                if(err) reject();
                else {
                    let len = result.length;
                    let dob;
                    for(i = 0;i<len;i++){
                        dob = result[i].dob;
                        // console.log('****************',dob,"***************",dob.toDateString());
                        result[i].dob = dob.toDateString()
                    }
                    resolve(result);
                }
            })
        })
    },
    getUser:(userId)=>{
        return new Promise((resolve, reject) => {
            let sql = `select * from registration natural join login where user_id='${userId}'`;
            database.query(sql,(err,result)=>{
                if(err) throw err;
                else resolve(result);
            })
        })
    },
    getCarsOrderby:()=>{
        return new Promise((resolve, reject) => {
           var sql = `select * from car_table order by segment`;
            database.query(sql,(err,result)=>{
                if(err) throw err;
                else{
                    //console.log(result);
                    resolve(result)
                }
            })
        })
    },
    getAllDrivers:()=>{
        return new Promise((resolve, reject) => {
            let sql = `select * from driver_table inner join login on driver_table.l_id=login.l_id`;
            database.query(sql,(err,result)=>{
                if(err) throw err;
                else{
                    //console.log(result);
                    resolve(result)
                }
            })
        })
    },
}