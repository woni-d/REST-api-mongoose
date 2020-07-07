const express = require('express');
const User = require('../model/User');

const router = express.Router();

// User 전체 조회
router.get('/', async (req, res) => {
    try {
        const users = await User.getUserList();
        res.status(200).send(users);
    } catch (err) {
        console.log(err);
        res.status(500).send("GET /users was failed");
    }
});

// User 조회
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.getUser(id);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(400).end();
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("GET /users/:id was failed");
    }
});

// User 생성
router.post('/', async (req, res) => {
    try {
        await User.createUser(req.body);
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(500).send("POST /users was failed");
    }
});

// User 수정
router.put('/:id', async (req, res) => {    
    try {
        const { id } = req.params;
        await User.updateUser({ userId: id, ...req.body });
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send("PUT /users/:id was failed");
    }
});

// User 삭제
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.deleteUser(id);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send("DELETE /users/:id was failed");
    }
});

module.exports = router;
