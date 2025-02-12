const express = require("express")
const authenticateToken = require("../middlewares/user.middleware")
const {registerUser,loginUser,dashboard,createUser,getUsers,getUser,updateUser,deleteUser } = require("../controllers/user.controller")

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)

router.get("/dashboard",authenticateToken,dashboard)
router.post("/",authenticateToken,createUser)
router.get("/",authenticateToken,getUsers)
router.get("/:id",authenticateToken,getUser)
router.put("/:id",authenticateToken,updateUser)
router.delete("/:id",authenticateToken,deleteUser)

module.exports = router