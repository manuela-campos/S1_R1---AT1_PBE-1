import { Router } from "express";
import uploadImage from "../middlewares/uploadImage.middleware.js";
import categoriaController from "../controllers/categoria.controller.js";

const categoriaRoutes = Router();

categoriaRoutes.post('/categoria', uploadImage, categoriaController.criar);
categoriaRoutes.put('/categoria/:idCategoria', categoriaController.editar);
categoriaRoutes.get('/categoria', categoriaController.listarTodos);
categoriaRoutes.get('/categoria/:idCategoria', categoriaController.buscarPorId);
categoriaRoutes.delete('/categoria/:idCategoria', categoriaController.excluirProduto);

export default categoriaRoutes;