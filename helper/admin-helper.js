const { Result } = require('express-validator');
var database = require('../config/connection');
var bcrypt = require('bcrypt');
const mailer = require('../config/mail');


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
    getCarsOrderby:(picup,dropoff)=>{
        return new Promise((resolve, reject) => {
            //select * from car_table where car_id NOT IN (select c_id from booking_table where ('${picup}' BETWEEN picup AND dropoff) OR ('${dropoff}' BETWEEN picup AND dropoff)) order by segment;
           var sql = `select * from car_table where car_id NOT IN (select c_id from booking_table where ((('${picup}' BETWEEN picup AND dropoff) OR ('${dropoff}' BETWEEN picup AND dropoff))  OR ('${picup}' < picup AND '${dropoff}' > dropoff)) AND (b_status='success' OR b_status='Processing')) `;
            database.query(sql,(err,result)=>{
                if(err) throw err;
                else{
                    //console.log(result);
                    resolve(result)
                }
            })
        })
    },
    getAllDrivers:(picup,dropoff)=>{
        return new Promise((resolve, reject) => {
            let sql = `select * from driver_table inner join login on driver_table.l_id=login.l_id where driver_id NOT IN (select d_id from booking_table where ((('${picup}' BETWEEN picup AND dropoff) OR ('${dropoff}' BETWEEN picup AND dropoff))  OR ('${picup}' < picup AND '${dropoff}' > dropoff)) AND (b_status='success' OR b_status='Processing'))`;
            database.query(sql,(err,result)=>{
                if(err) throw err;
                else{
                    //console.log(result);
                    resolve(result)
                }
            })
        })
    },
    getAllBookings:()=>{
        return new Promise((resolve, reject) => {
            let sql = `select * from registration inner join booking_table on registration.user_id = booking_table.u_id inner join car_table on booking_table.c_id=car_table.car_id order by time DESC`;
            database.query(sql,(err,result)=>{
                if(err) throw err;
                else resolve(result);
            })
        })

    },
    rejectBooking:(booking_id,car_id,driver_id)=>{
        let sql = `update booking_table set b_status = 'rejected' where booking_id = '${booking_id}'`
        let sql1 = `update car_table set status = 'Available' where car_id = '${car_id}'`
        let sql2 = `update driver_table set status = 'Available' where driver_id = '${driver_id}'`
        return new Promise((resolve, reject) => {
            database.query(sql,(err,result)=>{
                if(err) reject();
                else{
                    database.query(sql1,(err,result)=>{
                        if(err) reject();
                        else{
                            database.query(sql2,(err,result)=>{
                                if(err) reject();
                                else resolve();
                            })
                        }
                    })
                }
            })
        })
    },
    getAllFeedback:()=>{
        return new Promise((resolve, reject) => {
            let sql = `select * from feedback_table order by time desc`
            database.query(sql,(err,result)=>{
                if(err) reject();
                else resolve(result);
            })
        })
    },
    responceInsert:(f_id,res)=>{
        return new Promise((resolve, reject) => {
            let sql = `update feedback_table set response = '${res}' where f_id = '${f_id}'`
            database.query(sql,(err,result)=>{
            if(err) throw(err);
            else resolve();
        })
        })
        
    },
    sendMail:(email,msg,sub)=>{
        return new Promise((resolve, reject) => {
        var mailOptions = {
            from: 'aswinak799@gmail.com',
            to: email,
            subject: sub,
            text: msg,
            };

            mailer.sendMail(mailOptions, function(error, info){
            if (error) {
                reject(error);
            } else {
                resolve(info.response)
                console.log('Email sent: ' + info.response);
            }
            });
            
        })
    },
    BookingStatusChange:(booking_id,status)=>{
        return new Promise((resolve, reject) => {
            let sql = `update booking_table set b_status = '${status}' where booking_id = '${booking_id}'`;
            database.query(sql,(err,result)=>{
                if(err) reject();
                else resolve();
            })
        })
    },
    getallUserFeedback:()=>{
        return new Promise((resolve, reject) => {
            let sql = `select * from user_feed inner join booking_table on user_feed.b_id=booking_table.booking_id inner join registration on booking_table.u_id=registration.user_id inner join login on registration.l_id = login.l_id`;
            database.query(sql,(err,result)=>{
                if (err) reject();
                else resolve(result)
            })
        })
    },
    report:(date)=>{
        let start = date.picup;
        let end = date.dropoff;
        return new Promise((resolve, reject) => {
           let sql = `select count(*) as count,sum(b_amount) as total from booking_table where time between '${start}' AND '${end}'`
           
           database.query(sql,(err,result)=>{
            resolve(result);
            
           }) 
        })
    },
    reportDetails:(date)=>{
        let start = date.picup;
        let end = date.dropoff;
        return new Promise((resolve, reject) => {
            let sql1 = `select * from booking_table inner join car_table on booking_table.c_id=car_table.car_id where time between '${start}' And '${end}'`
            database.query(sql1,(err,result)=>{
                // if(err) throw err;
                // console.log(result1);
                resolve(result)
            })
        })
    }

}