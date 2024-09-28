import { Router } from "express"
import { ClientController } from "./ClientController"

const router = Router()

const clientController = new ClientController()

router.post('/client', (req, res) => clientController.registerClientController(req, res))
router.get('/client/:id', (req, res) => clientController.getClientController(req, res))
router.get('/client', (req, res) => clientController.listClientController(req, res))

export { router }
