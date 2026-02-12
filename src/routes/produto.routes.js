import { Router } from "express";
import uploadImage from "../middlewares/uploadImage.middleware.js";
import produtoController from "../controllers/produto.controller.js";

const produtoRoutes = Router();

produtoRoutes.post('/produtos', uploadImage, produtoController.criar);
produtoRoutes.put('/produtos/:idProduto', produtoController.editar);
produtoRoutes.get('/produtos', produtoController.listarTodos);
produtoRoutes.get('/produtos/:idProduto', produtoController.buscarPorId);
produtoRoutes.delete('/produto/:idProduto', produtoController.excluirProduto);

export default produtoRoutes;