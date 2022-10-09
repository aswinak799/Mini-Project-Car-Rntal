const { Result } = require('express-validator');
var database = require('../config/connection');
var bcrypt = require('bcrypt');



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

}