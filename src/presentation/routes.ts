import { Router } from "express"
import { ClientController } from "./ClientController"
import { UserController } from "./UserController"
import { AuthJWT } from "../application/services/Auth"

const router = Router()

const clientController = new ClientController()
const userController = new UserController()

const auth = new AuthJWT()

router.post('/login', (req, res) => userController.LoginUserController(req, res))

router.post('/client', auth.authenticateJWT,  (req, res) => clientController.registerClientController(req, res))
router.get('/client/:id', auth.authenticateJWT, (req, res) => clientController.getClientController(req, res))
router.get('/client', auth.authenticateJWT, (req, res) => clientController.listClientController(req, res))

export { router }
