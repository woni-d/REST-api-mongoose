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
 *    responses:
 *      200:
 *        description: 전체 조회
 *        examples:
 *          application/json: |
 *            [
 *              {
 *                "_id": "5f040e2d44433b0f37bd62b8",
 *                "name": "Yewon Kim",
 *                "email": "1234@naver.com",
 *                "password": "asdf1234",
 *                "__v": 0
 *              }
 *            ]
 *            
 *      500:
 *        description: 전체 조회
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.getUserList();
        res.status(200).send(users);
    } catch (err) {
        console.log(err);
        res.status(500).send("GET /users was failed");
    }
});

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: User 조회
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: 사용자 아이디 전달
 *    responses:
 *      200:
 *        description: 조회 성공
 *      400:
 *        description: 필수 파라미터가 잘못 전달됨
 *      500:
 *        description: 조회 실패
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
 *     - in: body
 *       name: user
 *       description: The user to create.
 *       schema:
 *         type: object
 *         required:
 *           - userName
 *         properties:
 *           name:
 *             type: string
 *           email:
 *             type: string
 *           password:
 *             type: string
 *    responses:
 *      201:
 *        description: 생성 성공
 *      500:
 *        description: 생성 실패
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
 * /users/{id}:
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
 *        description: The user to update.
 *        schema:
 *          type: object
 *          required:
 *            - userName
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      200:
 *        description: 수정 성공
 *      500:
 *        description: 수정 실패
 */
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

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    summary: User 삭제
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: 사용자 아이디 전달
 *    responses:
 *      200:
 *        description: 삭제 성공
 *      500:
 *        description: 삭제 실패
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
