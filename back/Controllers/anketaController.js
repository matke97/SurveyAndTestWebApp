const express = require('express');
const mongo = require('mongodb').MongoClient;
const assert =  require('assert');

//const url = 'mongodb://localhost/27017/';
/**
 * Url of AtlasDB cluster
 */
const url = 'mongodb+srv://milos:milos@cluster0-urmck.mongodb.net/test?retryWrites=true&w=majority';
const ObjectId  = require('mongodb').ObjectID;

/***************
 * @brief Handler for inserting created survey/test
 * param[in] req -> Body contains info about new survey/test - name, description, start and expiration dates, list of questions, 
 *                  author name, number of pages to diplay sur/test
 * param[out] res -> Returns ok if inserting was successfully, error msg if wasn't
 * 
 **************/
module.exports.registerSurvey = async function(req, res)
{
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');
    const odg = await dbo.collection('anketa').findOne( {naziv: req.body.naziv} );
    if(odg != null)
    {
        res.status(401).json( {error: 'Anketa vec postoji'} );
        db.close();
        return;
    }
    dbo.collection('anketa').insertOne(
    {
        pitanjaLista:req.body.pitanjaLista,
        naziv:req.body.naziv,
        opis:req.body.opis,
        pocetak:new Date(req.body.pocetak),
        kraj : new Date(req.body.kraj),
        personalizovana : req.body.personalizovana,
        tip : req.body.tip,
        autor : req.body.autor,
        brStrana : req.body.brStrana,
        vreme: req.body.vreme 
    });
    const listaP = req.body.pitanjaLista;
    var pitanja = await dbo.collection('pitanja').find().project({tekstPitanja : 1}).toArray();
    for(p of listaP)
    {
        
        const found = pitanja.find(element => element.tekstPitanja == p.tekstPitanja);
        if(found == null)
        {
            await dbo.collection('pitanja').insertOne( {tekstPitanja: p.tekstPitanja} );
        }
    }
    res.status(200).json( {ok : true} );
    db.close();
};


/***************
 * @brief Handler for http get req for getting all questions that available surveys/tests have
 * param[in] req -> /
 * param[out] res -> Returns whole collection pitanja in MongoDB database AnketaDB
 * 
 **************/
module.exports.getQuestions =async function(req, res)
{
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');
    
    dbo.collection('pitanja').find({}).toArray( function(err, result)
    {
        if(err)
        {
            res.status(401).json({error: err});
            db.close();
        }
        console.log(result);
        res.status(200).json(result);
        db.close();  

    });
};

/***************
 * @brief Handler for http post req /anketa/getDostupne - getting all available surveys and tests that examinee can fill
 * param[in] req -> UserName of user who sends a request 
 * param[out] res -> Returns all available surveys and tests that isn't created by user
 * 
 **************/
module.exports.getAvailableSurveysTests = async function(req, res)
{
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');
    var danas = new Date();
    console.log(req.body);
    // {"pocetak" :  {$lte : danas}, "kraj" : {$gte : danas}, 
    var info = await dbo.collection('anketa').find({"autor" : {$ne : req.body.userName} })
    .project({_id: 1, naziv : 1, opis : 1, personalizovana : 1, vreme : 1, tip: 1, pocetak : 1, kraj : 1}).toArray();
    var resposne = [];
    for(let a of info)
    {
        //"_idAnkete" : ObjectId(a._id)}, "_idUser" : req.body._idUser
    console.log("_idAnkete:" , a._id, "_idUser:" , req.body._idUser)
        var pop = await dbo.collection('popunjene').findOne({"_idAnkete" : a._id.toString(), "_idUser" : req.body._idUser});
        console.log('REZZ', pop);
        if(pop != null)
        {
            resposne.push({
                _id : a._id,
                naziv : a.naziv,
                opis : a.opis,
                personalizovana : a.personalizovana,
                vreme : a.vreme ? a.vreme : null,
                pocetak: a.pocetak,
                kraj : a.kraj,
                tip: a.tip,
                popunjena : true,
                brPoena : pop.osvojeno ? pop.osvojeno : null,
                maxPoena : pop.maxPoena ? pop.maxPoena : null
            });
        }else
        {
            resposne.push({
                _id : a._id,
                naziv : a.naziv,
                opis : a.opis,
                personalizovana : a.personalizovana,
                vreme : a.vreme ? a.vreme : null,
                pocetak: a.pocetak,
                kraj : a.kraj,
                tip: a.tip,
                popunjena : false
            });
        }
    }
    
    res.status(200).json(resposne);
    db.close();
    
};

/***************
 * @brief Handler for getting Survey/Test by id
 * param[in] req -> id of survey/test in mongodb collection(table)
 * param[out] res -> Selected survey/test or error if suvey/test don't exists
 * 
 **************/
module.exports.getSurveyByID = async function(req, res)
{
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');
    dbo.collection('anketa').findOne({_id: ObjectId(req.body._id)}, function(err, result)
    {
        if(err)
        {
           res.status(401).json({error: err});
           db.close();
           return;
        }
        console.log(result);
        res.status(200).json(result);
        db.close();
    });
};

/***************
 * @brief Remove selected survey/test
 * param[in] req -> id of survey/test in mongodb collection(table)
 * param[out] res -> OK / error 
 * 
 **************/
module.exports.removeSurvey = async function(req, res)
{
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');
    dbo.collection('anketa').deleteOne({_id : ObjectId(req.body._id)}, function(err, result)
    {
        if(err)
        {
           res.status(401).json({error: err});
           db.close();
           return;
        }
        console.log('1 document deleted');
        res.status(200).json({ok : 'ok'});
        db.close();
    });    
}

/***************
 * @brief Handler for getting suveys and tests that were created by user who sends request
 * param[in] req -> UserName 
 * param[out] res -> List of surveys and tests created by user / error 
 * 
 **************/
module.exports.getMySurveys = async function(req, res)
{
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');
    
    dbo.collection('anketa').find( {"autor" : req.body.userName } )
    .project( {_id: 1, naziv : 1, opis : 1, personalizovana : 1, vreme : 1, tip: 1, pocetak : 1, kraj : 1} )
    .toArray(function(err, result) 
    {
        if(err)
        {
           res.status(401).json({error: err});
           db.close();
        }
        console.log(result);
        res.status(200).json(result);
        db.close();   
    });  
};

/***************
 * @brief Save state of uncomplete survey. When examinee starts to fill survey and exit it, app saves current state- stores all answers to questions  
 * param[in] req -> UserName of examinee
 * param[out] res -> OK
 * 
 **************/
module.exports.insertNedovrsenu = async function(req,res)
{
    console.log('SAVE STATE');
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');
    var query = {_idAnkete : req.body._idAnkete, _idUser : req.body._idUser};
    const ima = await dbo.collection('nedovrsene').findOne(query);
    if(ima != null)
    {
        dbo.collection('nedovrsene').updateOne(query, {$set : {odgovori: req.body.odgovori}}, function(err, result)
        {
            if(err)
            {
                res.status(401).json({error: err});
                db.close();
            }
            console.log('Updated');
            res.status(200).json({ok:"ok"});
            db.close();
        });
    } 
    else
    {
        dbo.collection('nedovrsene').insertOne(req.body, function(err, result)
        {
            if(err)
            {
                res.status(401).json({error: err});
                db.close();
            }
            else
            {
                console.log('Inserted');
                res.status(200).json({ok:"ok"});
                db.close();
            }
        });
    }
};

/***************
 * @brief Handler for submiting filled test
 * param[in] req -> JSON object contains info about answers, questions and examinee and id of test
 * param[out] res -> Return number of points scored on test
 * 
 **************/
module.exports.submitTest = async function(req, res)
{
    console.log('SUBMIT TEST');
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');
    const ceoTest =await dbo.collection('anketa').findOne({_id : ObjectId(req.body._idAnkete)});
  
    if(ceoTest == null)
    {
        //nema ga 
        res.status(401).json({error : "Test koji ste popunjavali vise ne postoji."});
        db.close();
        return;
    }

    var brPoena = 0, maxPoena = 0;
    var poeniPoPitanju = [];
    
    
    for(pitanje of ceoTest.pitanjaLista)
    {
        maxPoena += pitanje.brPoena;
        var ind = req.body.pitanja.indexOf(pitanje.tekstPitanja);
        console.log(ind);
        poeniPoPitanju[ind] = 0;
        //pitanje.tacanOdgovor
        switch(pitanje.tipOdgovra)
        {
            //Question type1
            case 1:
                if(req.body.odgovori[ind] != null)
                {
                    if(req.body.odgovori[ind] == pitanje.tacanOdgovor)
                    {
                        brPoena += pitanje.brPoena;
                        poeniPoPitanju[ind] = pitanje.brPoena;
                    }
                }
            break;

            //Question type2
            case 2:
                if(req.body.odgovori[ind] != null && req.body.odgovori[ind] != '')
                {
                    var str = req.body.odgovori[ind].replace(/\s+/g, '');
                    var str2 = pitanje.tacanOdgovor.replace(/\s+/g, '');
                    console.log('PRVI ', str.toLowerCase(), ' DRUGI ', str2.toLowerCase());
                    if(str.toLowerCase() == str2.toLowerCase())
                    {       
                        brPoena += pitanje.brPoena;
                        poeniPoPitanju[ind] = pitanje.brPoena;
                    }
                }
            break;

            //Question type4
            case 4:
                if(req.body.odgovori[ind] != null)
                {
                    if(req.body.odgovori[ind] == pitanje.tacanOdgovor)
                    {
                        brPoena += pitanje.brPoena;
                        poeniPoPitanju[ind] = pitanje.brPoena;
                    }
                }
            break;

            //Question type5
            case 5:
                var koef = pitanje.brPoena / pitanje.tacanOdgovor.length;
                var osvojeno = 0;
                var brnetacnih = 0;
                if(req.body.odgovori[ind] != null)
                {
                    // console.log('HAJDE PRORADI1212', req.body.odgovori[ind]);
                    if(req.body.odgovori[ind].length != pitanje.odgovori.length)
                    {              
                        for(let odg of req.body.odgovori[ind])
                        {
                            if(pitanje.tacanOdgovor.indexOf(odg) != -1)
                            {
                                osvojeno += koef;
                            }
                            else
                            {
                                brnetacnih += 1;
                            }
                        }
                        osvojeno -= brnetacnih /  pitanje.odgovori.length;
                    }
                }
                
                brPoena += (osvojeno > 0) ? osvojeno :0;
                poeniPoPitanju[ind] = (osvojeno > 0) ? osvojeno :0;
            break;
        }
    }//end for

    var obj = 
            {
                osvojenoPoena : brPoena,
                maxPoena : maxPoena,
                osvojenoPoPitanju : poeniPoPitanju
            };
                
    dbo.collection('popunjene').insertOne(
        {
                _idAnkete : req.body._idAnkete,
                _idUser : req.body._idUser,
                pitanja : req.body.pitanja,
                odgovori : req.body.odgovori,
                ispitanik: req.body.ispitanik,
                osvojenoPoPitanju : poeniPoPitanju,
                osvojeno : brPoena,
                maxPoena : maxPoena,
                tip : 'test'
        }, function(err, result)
        {
                if(err)
                {
                    res.status(401).json({error:err});
                    db.close();
                    return;
                }

                

                res.status(200).json(obj);
                db.close();
        });
    
};

/***************
 * @brief Handler for submiting filled survey
 * param[in] req -> JSON object contains info about answers, questions and examinee and id of test
 * param[out] res -> OK /err
 * 
 **************/
module.exports.submitSurvey = async function(req, res)
{
    console.log('SUBMIT Survey');
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');
    const celaAnketa =await  dbo.collection('anketa').findOne({_id :ObjectId(req.body._idAnkete)});
    console.log(req.body);
    if(celaAnketa == null)
    {
        //nema ga 
        res.status(401).json({error : "Anketa koju ste popunjavali vise ne postoji."});
        db.close();
        return;
    }
    var query = {_idAnkete : req.body._idAnkete, _idUser : req.body._idUser};
    const ima = await dbo.collection('nedovrsene').findOne(query);
    if(ima != null)
    {    
        const obr = await dbo.collection('nedovrsene').deleteOne(query);
    }
     
     var data;
     if(celaAnketa.personalizovana)
     {
        data = 
        {
            _idAnkete : req.body._idAnkete,
            _idUser : req.body._idUser,
            pitanja : req.body.pitanja,
            odgovori : req.body.odgovori,
            ispitanik: req.body.ispitanik ? req.body.ispitanik : null,
            tip : 'anketa'
        };
     }
     else
     {
         data = {
            _idAnkete : req.body._idAnkete,
            _idUser : req.body._idUser,
            pitanja : req.body.pitanja,
            odgovori : req.body.odgovori,
            tip : 'anketa' 
         };
     }
    console.log('OVDE SMOOO', data);

    dbo.collection('popunjene').insertOne(data,
    function(err, result)
    {
        if(err)
        {
            res.status(401).json({error:err});
            db.close();
            return;
        }
        res.status(200).json({ok : "ok"});
        db.close();
    });
    
};

/***************
 * @brief Handler for getting uncomplete survey
 * param[in] req -> JSON object contains id of survey and id of user
 * param[out] res -> Return survey
 * 
 **************/
module.exports.getNedovrsena =async function(req, res)
{
    console.log('GET nedovrsena');
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');
    var query = {_idAnkete : req.body._idAnkete, _idUser : req.body._idUser};
    dbo.collection('nedovrsene').findOne(query, function(err, result)
    {
        if(err)
        {
            res.status(401).json({error:err});
            db.close();
            return;
        }

        res.status(200).json(result);   
        db.close();
    });

};

/***************
 * @brief Returns info about comleted test/survey
 * param[in] req -> id of survey/test
 * param[out] res -> Returns info about comleted test/survey
 * 
 **************/
module.exports.getPopunjene =async function(req, res)
{
    const db = await mongo.connect(url,{ useUnifiedTopology: true });
    var dbo = db.db('AnketaDB');
    dbo.collection('popunjene').find({_idAnkete: req.body._idAnkete}).toArray(function(err, result){
        if(err)
        {
            res.status(401).json({error:err});
            db.close();
            return;
        }

        res.status(200).json(result);   
        db.close();
    });    
};