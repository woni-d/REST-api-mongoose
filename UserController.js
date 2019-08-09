const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended:true }));
const User = require('./User');

// User 생성
router.post('/', function(req, res) {
    User.create( {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },
    function(err) {
        if (err) return res.status(500).send("User 생성 실패.");
        res.status(200).send('OK').end();
    });
});
// User 전체 조회
router.get('/', function(req, res) {
    User.find( {}, function(err, users) {
        if (err) return res.status(500).send("User 전체 조회 실패.");
        res.status(200).send(users).end();
    });
});
// User 조회
router.get('/:id', function(req, res) {
    console.log(req.params.id);
    User.findOne({_id: req.params.id}, function (err, user) {
        if (err) return res.status(500).send("User 조회 실패");
        if (!user) return res.status(404).send("User 없음.");
        res.status(200).send(user).end();
    });
});
// User 삭제
router.delete('/:id', function (req, res) {
    console.log(req.params.id);
    User.deleteOne({_id: req.params.id}, function (err, user) {
        if (err) return res.status(500).send("User 삭제 실패");
        res.status(200).send("User 삭제됨.");
    });
});
// User 수정
router.put('/:id', function (req, res) {    
    console.log(req.params.id);
    User.updateOne({_id: req.params.id}, {
        $set :{
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
        }
    }, {returnNewDocument: true}, function (err, user) {
        if (err) return res.status(500).send("User 수정 실패.");
        res.status(200).send(user).end();
    });
});
module.exports = router;