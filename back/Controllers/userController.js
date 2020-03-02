const express = require('express');
const mongo = require('mongodb').MongoClient;
const assert =  require('assert');

//const url = 'mongodb://localhost/27017/';

//URL of Atlas cluster
const url = 'mongodb+srv://milos:milos@cluster0-urmck.mongodb.net/test?retryWrites=true&w=majority';
const ObjectId  = require('mongodb').ObjectID;

/***************
 * @brief Handler for login action of user
 * param[in] req -> 
 * param[out] res -> Ok if userName/password exits in registred useres table / error 
 * 
 **************/
module.exports.login = function(req, res)
{
    console.log('PokusajLogina:' + req.body.userName);
    mongo.connect(url,{ useUnifiedTopology: true }, (err, db) =>{
        assert.equal(null, err);
        var dbo = db.db('AnketaDB');
       
        dbo.collection("user").findOne({userName : req.body.userName})
            .then(function(data){
                if(!data)
                {
                    console.log('nema nista');
                    res.status(401).json({error : "User not found"});
                    return;
                }
                if(data.password != req.body.password)
                {
                    res.status(401).json({error : "Invalid password"});
                    return;
                }
                else
                {
                    res.status(200).json(data);
                }

            }).catch(err => res.status(500).json(err));
        db.close();    
    })
};

/***************
 * @brief Handler for register post req
 * param[in] req -> JSON object - all inforamtion about new user
 * param[out] res -> Ok / error message
 * 
 **************/
module.exports.register =async function(req, res)
{
    console.log(req.body);
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');
    const odg = await dbo.collection('user').findOne({userName: req.body.userName});
    const odg2 = await dbo.collection('waitRegister').findOne({userName: req.body.userName});
    
    if(odg != null || odg2 != null)
    {
        res.status(401).json({error : "UserName exists"});
        db.close();
        return;
    }
    
    const br = await dbo.collection('user').find({email : req.body.email}).project({email : 1}).toArray();
    if(br.length >= 2)
    {
        res.status(401).json({error : "Max number of users per mail registred"});
    }
    else
    {
        console.log(typeof req.body.datum_rodj);
        dbo.collection('waitRegister').insertOne({ime:  req.body.ime, prezime :  req.body.prezime, userName:  req.body.userName, email:  req.body.email, password:  req.body.password, jmbg: req.body.jmbg, mesto_rodj: req.body.mesto_rodj, datum_rodj: new Date( req.body.datum_rodj)});
        res.status(200).json({"ok" : true});
    }
    db.close();
};

/***************
 * @brief Handler provides info to registrations that wait confirmation from admin
 * params[in] req -> /
 * params[out] res -> Array of JSON object(name, userName and email of user)
 * 
 **************/
module.exports.getNaCekanju = async function(req, res)
{
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');
    const odg = await dbo.collection('waitRegister').find({}).project({ime : 1, userName: 1, email: 1}).toArray();

    db.close();
    console.log(odg);
    res.status(200).json(odg);
};

/***************
 * @brief Handler to approve registration  
 * param[in] req -> userName of user to be confirmed
 * param[out] res -> Ok/err
 * 
 **************/
module.exports.approveReg = async function(req, res)
{
   
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');
    console.log( req.body.userName);
    const odg = await dbo.collection('waitRegister').findOne({userName: req.body.userName});
    console.log(odg);
    if(odg != null)
    {
        //delete odg['_id'];
        console.log(odg);
        
        await dbo.collection('user').insertOne(odg);
        dbo.collection('waitRegister').deleteOne({userName: req.body.userName});
        dbo.collection('user').updateOne({userName : req.body.userName}, {$set : {tip : req.body.tip}});
    }
    db.close();
    res.status(200).json({"ok" : true});
};

/***************
 * @brief Handler to disapprove registration  
 * param[in] req -> userName of user to be confirmed
 * param[out] res -> Ok/err
 * 
 **************/
module.exports.disapproveReg = async function(req, res)
{
    
    const db = await mongo.connect(url,{ useNewUrlParser: true });
    var dbo = db.db('AnketaDB');
    console.log('Disapprove' + req.body.userName);
    const odg =await dbo.collection('waitRegister').deleteOne({userName: req.body.userName});
    res.status(200).json({ "ok" : true });
    db.close();
};

/***************
 * @brief Handler to return all registred users in app
 * param[in] req -> /
 * param[out] res -> Array of all registred users
 * 
 **************/
module.exports.registredUsers =  async function(req, res)
{
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');
    const odg = await dbo.collection('user').find({}).toArray();

    db.close();
    console.log(odg);
    res.status(200).json(odg);
};

/***************
 * @brief Handler to delete selected user 
 * param[in] req -> userName of user to be delted
 * param[out] res -> Ok/err
 * 
 **************/
module.exports.deleteUser = async function(req,res)
{
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');
    dbo.collection('user').deleteOne({userName : req.body.userName});
    db.close();
    res.status(200).json({'ok' : true});
};

/***************
 * @brief Handler to change pass of client  
 * param[in] req -> userName, old and new password
 * param[out] res -> Ok/err
 * 
 **************/
module.exports.changePass =async function(req, res)
{
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');

      dbo.collection('user').updateOne({_id : ObjectId(req.body._id), password: req.body.oldPassword}, {$set : {password : req.body.newPassord}}, function(err, result){
        if(err)
        {
            res.status(401).json({error:err});
            db.close();
            return;
        }
        console.log('PROBA PASS', result.modifiedCount);
        if(result.modifiedCount == 0)
        {
            res.status(401).json({error: "Invalid password"});
        }else{
            res.status(200).json({ok : 'ok'});
        }
        db.close();
    });
};