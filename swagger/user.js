const express = require('express');
const User = require('../model/User');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: 사용자
 */

module.exports = router;

/**
 * @swagger
 * /users:
 *  get:
 *    summary: User 전체 조회
 *    tags: [User]
 *    response:
 *      200:
 *        description: 성공
 *      500:
 *        $ref: '#/components/res/INTERVAL_ERROR'
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.getUserList();
        res.status(500).send("GET /users was failed");
        // res.status(200).send(users);
        // next(new INVALID_REQUEST("안녕!"));
    } catch (err) {
        console.log(err);
    }
});

/**
 * @swagger
 * /users/:id:
 *  get:
 *    summary: User 조회
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: 사용자 아이디 전달
 *    response:
 *      200:
 *        description: 성공
 *      400:
 *        $ref: '#/components/res/INVALID_REQUEST'
 *      500:
 *        $ref: '#/components/res/INTERVAL_ERROR'
 */
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

/**
 * @swagger
 * /users:
 *  post:
 *    summary: User 생성
 *    tags: [User]
 *    parameters:
 *      - in: body
 *        name: user
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        description: 새로운 유저의 이름, 이메일, 패스워드 전달
 *        propertise:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *    response:
 *      201:
 *        description: 생성 성공
 *      500:
 *        $ref: '#/components/res/INTERVAL_ERROR'
 */
router.post('/', async (req, res) => {
    try {
        await User.createUser(req.body);
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(500).send("POST /users was failed");
    }
});

/**
 * @swagger
 * /users/:id:
 *  put:
 *    summary: User 수정
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: 사용자 아이디 전달
 *      - in: body
 *        name: user
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        description: 새로운 유저의 이름, 이메일, 패스워드 전달
 *        propertise:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *    response:
 *      200:
 *        description: 수정 성공
 *      500:
 *        $ref: '#/components/res/INTERVAL_ERROR'
 */
router.put('/:id', async (req, res) => {    
    try {
        const { id } = req.params;
        console.log(req.body);
        await User.updateUser({ userId: id, ...req.body });
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send("PUT /users/:id was failed");
    }
});

/**
 * @swagger
 * /users/:id:
 *  delete:
 *    summary: User 삭제
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: 사용자 아이디 전달
 *    response:
 *      200:
 *        description: 수정 삭제
 *      500:
 *        $ref: '#/components/res/INTERVAL_ERROR'
 */
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
