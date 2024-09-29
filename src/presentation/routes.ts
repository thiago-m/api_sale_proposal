import { Router } from "express"
import { ClientController } from "./ClientController"
import { UserController } from "./UserController"
import { AuthJWT } from "../application/services/Auth"
import { ProductController } from "./ProductController"
import { ServiceController } from "./ServiceController.ts"

const router = Router()

const userController = new UserController()
const clientController = new ClientController()
const productController = new ProductController()
const serviceController = new ServiceController()

const auth = new AuthJWT()

router.post('/login', (req, res) => userController.LoginUserController(req, res))

router.post('/client', auth.authenticateJWT,  (req, res) => clientController.registerClientController(req, res))
router.get('/client/:id', auth.authenticateJWT, (req, res) => clientController.getClientController(req, res))
router.get('/client', auth.authenticateJWT, (req, res) => clientController.listClientController(req, res))

router.post('/product', auth.authenticateJWT,  (req, res) => productController.registerProductController(req, res))
router.get('/product', auth.authenticateJWT, (req, res) => productController.listProductController(req, res))

router.post('/service', auth.authenticateJWT,  (req, res) => serviceController.registerServiceController(req, res))
router.get('/service', auth.authenticateJWT, (req, res) => serviceController.listServiceController(req, res))

export { router }
