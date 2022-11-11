const { Result } = require('express-validator');
var database = require('../config/connection');
var bcrypt = require('bcrypt');
const Razorpay = require('razorpay');

var instance = new Razorpay({
    key_id: 'rzp_test_RDsdaax6UE4Dlk',
    key_secret: 'BA4UgUCtVEmV1wImHL0h2vTr',
  });



module.exports = {

    doLogin:(userData)=>{
        var email = userData.email;
        var password = userData.password;
        let data={};
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
            let sql;
            var sql1= `select * from login where email='${email}'`
            database.query(sql1,(err, result) => {
                if (err || result.length === 0)
                    resolve({ status: false });
                else {
                    console.log(result.length)
                    
                        if (result[0].user_type === 'driver') {
                            console.log(result[0].user_type)
                            sql = `select * from driver_table inner join login on driver_table.l_id=login.l_id where email='${email}'`;
                        } else {
                            sql = `select * from registration inner join login on registration.l_id=login.l_id where email='${email}'`;
                        }

                    database.query(sql,async (err,result)=>{
                        if(err) throw err;
                        else {
                            if(result.length>0){
                                console.log(result.length);
                                console.log(result);
                                //var psswd = await bcrypt.hash(password,10);
                                const comparison = await bcrypt.compare(password,result[0].password)
                                if(comparison){
                                    
                                        console.log('success')
                
                                        response.user=result[0]
                                        response.status=true
                                        resolve(response)
                                }else{
                                        console.log('faild')
                                        resolve({status:false})
                                    }
        
                            }else{
                                resolve({status:false})
                            }
        
                        }
                    })

                }
            })
            
             
            
        })
    },
    doSignup:(userData)=>{
        let fname = userData.fname;
        let email = userData.email;
        let dob = userData.dob;
        let gender = userData.gender;
        let phone = userData.phone;
        let address = userData.address;
        let Password = userData.Password;
        let sql='insert into '

        return new Promise(async(resolve,reject)=>{
            Password=await bcrypt.hash(userData.Password,10)
            
           
    
            
        })
       
    },
    updateUser:(UID,LID,data)=>{
        let fname = data.fname;
        let dob = data.dob;
        let gender = data.gender;
        let phone = data.phone;
        let address = data.address;
        let email = data.email;
        return new Promise((resolve, reject) => {
            console.log(data);
           let sqll=`update login set email='${email}' where l_id=${LID}`;
           let sql =`update registration set full_name='${fname}', dob='${dob}',gender='${gender}',phone='${phone}',address='${address}' where user_id=${UID}`
           database.query(sqll,(err,result)=>{
            if(err) {
                reject();
            }
            else{
                database.query(sql,(err,result)=>{
                    if(err) {
                        reject();
                    }
                    else resolve();
                })
            }
           })
        })
    },
    uploadDocument:(data,userId,user_type)=>{
        let document = data.Document;
        return new Promise((resolve, reject) => {
            let sql;
            if(user_type==='customer'){
                sql = `insert into user_docs(document_type,user_id) values('${document}','${userId}')`;
            }else{
                sql = `insert into driver_docs(document_type,d_id) values('${document}','${userId}')`;
            }
            
            database.query(sql,(err,result)=>{
                if(err){
                    reject();
                }else{
                    resolve();
                }
            })
        })
    },
    getDocuments:(l_id,user_type)=>{
        return new Promise((resolve, reject) => {
            let sql;
            if(user_type==='customer'){
                sql = `select * from user_docs inner join registration on user_docs.user_id=registration.user_id where l_id='${l_id}'`;  
            }else{
                sql = `select * from driver_docs inner join driver_table on driver_docs.d_id=driver_table.driver_id where l_id='${l_id}'`;

            }
            database.query(sql,(err,result)=>{
                if(err) throw err;
                else resolve(result)
            })
        })
    },
    getDocumentLength:(userId)=>{
        return new Promise((resolve, reject) => {
            let sql = `select * from user_docs where user_id = '${userId}'`;
            database.query(sql,(err,result)=>{
                if(err) reject();
                else resolve(result.length);
            })
        })
    },
    updateDriver:(DID,LID,data)=>{
        let fname = data.fname;
        let dob = data.dob;
        let gender = data.gender;
        let phone = data.phone;
        let address = data.address;
        let email = data.email;
        let exp = data.exp;
        return new Promise((resolve, reject) => {
            console.log(data);
           let sqll=`update login set email='${email}' where l_id=${LID}`;
           let sql =`update driver_table set name='${fname}', dob='${dob}',gender='${gender}',phone='${phone}',address='${address}',exp='${exp}' where driver_id=${DID}`
           database.query(sqll,(err,result)=>{
            if(err) {
                reject();
            }
            else{
                database.query(sql,(err,result)=>{
                    if(err) {
                        reject();
                    }
                    else resolve();
                })
            }
           })
        })
    },
    existPhone:(phone)=>{
        return new Promise((resolve, reject) => {
            let sql = `select phone from registration where phone = '${phone}'`;
            database.query(sql,(err,resut)=>{
                if(!err) resolve(resut);
            })
        })
    },
    getCategories:()=>{
        return new Promise((resolve, reject) => {
            let sql = `select distinct segment from car_table`;
            database.query(sql,(err,result)=>{
                if(!err) resolve(result);
            })
        })
    },
    getCar:(id)=>{
        return new Promise((resolve, reject) => {
            let sql = `select * from car_table where car_id=${id}`;
            database.query(sql,(err,result)=>{
                if (err) {
                    reject()
                }else{
                    resolve(result[0]);
                }
            })
        })

    },
    placeOrder:(data)=>{
        return new Promise((resolve, reject) => {
            // let values = [data.car_id,data.user_id,data.picup,data.dropoff,data.days,data.amount];
            let sql;
           if (data.driver) {
            sql = `insert into booking_table(c_id,u_id,picup,dropoff,days,b_amount,d_id) values('${data.car_id}','${data.user_id}','${data.picup}','${data.dropoff}','${data.days}','${data.amount}','${data.driver}')`;
           }else{
            sql = `insert into booking_table(c_id,u_id,picup,dropoff,days,b_amount) values('${data.car_id}','${data.user_id}','${data.picup}','${data.dropoff}','${data.days}','${data.amount}')`;

           }
            // sql = `insert into booking_table(c_id,u_id,picup,dropoff,days,amount) values('${data.car_id}','${data.user_id}','${data.picup}','${data.dropoff}','${data.days}','${data.amount}')`;
            database.query(sql,(err,result)=>{
                if (err) {
                    reject();
                }else{
                    
                    resolve(result.insertId);
                }
            })
        })
        

    },
    generateRazorpay:async(orderID,total)=>{
        total = parseInt(total);
        console.log(total," ************");
        return new Promise((resolve, reject) => {
            var options = {
                amount: total*100,
                currency: "INR",
                receipt:''+orderID
            };

           
            instance.orders.create(options,(err,order)=>{
                if(err){
                    throw err;
                }else{
                    console.log('new order:',order);
                    resolve(order)
                }
                
            })
        })
    },

    verifyPayment:(details)=>{
        return new Promise((resolve, reject) => {
            const crypto = require('crypto')
            let hmac = crypto.createHmac('sha256','BA4UgUCtVEmV1wImHL0h2vTr')
            hmac.update(details['payment[razorpay_order_id]']+'|'+details['payment[razorpay_payment_id]']);
            hmac=hmac.digest('hex')
            if(hmac==details['payment[razorpay_signature]']){
                resolve()
            }else{
                reject()
            }
        })
    },
    changeBookingStatus:(b_id)=>{
        return new Promise((resolve, reject) => {
            let sql = `update booking_table set b_status = 'success' where booking_id = '${b_id}'`;
            database.query(sql,(err,result)=>{
                if (err) {
                    reject();
                }else{
                    resolve();
                }
            })
        })
    },
    getBooking:(b_id)=>{
        return new Promise((resolve, reject) => {
            let sql = `select * from booking_table where booking_id = '${b_id}'`;
            database.query(sql,(err,result)=>{
                if(err) reject();
                else resolve(result[0]);
            })
        })
    },
    removeBooking:(b_id)=>{
        return new Promise((resolve, reject) => {
            let sql = `delete from booking_table where booking_id = '${b_id}'`
            database.query(sql,(err,result)=>{
                if(err) reject()
                else resolve()
            })
        })
    },
    changeCarStatus:(car_id)=>{
        return new Promise((resolve, reject) => {
            let sql = `update car_table set status = 'Not available' where car_id = '${car_id}'`
            database.query(sql,(err,result)=>{
                if (err) reject();
                else resolve ();
            })
        })

    },
    getBookings:(user_id)=>{
        return new Promise((resolve, reject) => {
            let sql = `select * from booking_table inner join car_table on booking_table.c_id=car_table.car_id where u_id = '${user_id}' order by time desc`;
            database.query(sql,(err,result)=>{
                if(err) throw err;
                else resolve(result);
            })
        })

    },
    changeDriverStatus:(driver_id)=>{
        return new Promise((resolve, reject) => {
            let sql = `update driver_table set status = 'Not available' where driver_id = '${driver_id}'`;
            database.query(sql,(err,result)=>{
                if(err) reject();
                else resolve();
            })
        })
    },
    getDriverBookings:(dr_id)=>{
        return new Promise((resolve, reject) => {
            let sql = `select * from booking_table inner join car_table on booking_table.c_id=car_table.car_id where d_id='${dr_id}'`;
            database.query(sql,(err,result)=>{
                if(err) reject();
                else resolve(result);
            })
        })
    },
    cancelBooking:(booking_id,car_id,driver_id)=>{
        let sql = `update booking_table set b_status = 'cancelled' where booking_id = '${booking_id}'`
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
    feedback:(data)=>{
        return new Promise((resolve, reject) => {
            // let sql = `insert into feedback_table(name,email_id,phone,subject,message) values('${data.name}','${data.email_id}','${data.phone}','${data.subject}','${data.message}')`;
            let sql = `insert into feedback_table SET ?`
            database.query(sql,data,(err,result)=>{
                if (err) {
                    reject();
                }else{
                    resolve();
                }
            })
        })
    }

}