import pool from "../config/db.js";

const produtoModel = {
    // Nós temos uma consulta para inserir informações na nossa tabela
    insert: async (pProduto) => {
        const sql = 'INSERT INTO produtos (idCategoria, nomeProduto, valorProduto, vinculoImagem, dataCad) VALUES (?,?,?,?,NOW());';
        const values = [pProduto.idCtegoria, pProduto.nomeProduto, pProduto.valorProduto, pProduto.vinculoImagem, pProduto.dataCad ];
        const [rows] = await pool.query(sql, values);
        return rows;
    }, 

    //Aqui temos uma consulta para ver os dados que foram inseridos na tabela
    selectAll: async () => {
        const sql = 'SELECT p.idProduto, p.idCategoria, c.descricaoCategoria, p.nomeProduto, p.valorProduto, p.vinculoImagem, p.dataCad FROM produtos p LEFT JOIN categoria c ON p.idCategoria = c.idCategoria ORDER BY p.idProduto DESC';
        const [rows] = await pool.query(sql);
        return rows;
    },
    selectById: async (id) => {
        const sql = `
            SELECT 
                FROM produtos WHERE idProduto = ?;
        `;
        const [rows] = await pool.query(sql, [id]);
        return rows;
    },
    // Atuallizar o valor que deseja na tabela
      update: async (id, produto) => {
        const sql = `
            UPDATE produtos 
            SET 
                idCategoria = ?,
                nomeProduto = ?,
                valorProduto = ?,
                vinculoImagem = COALESCE(?, vinculoImagem)
            WHERE idProduto = ?
        `;
        // COALESCE mantém imagem antiga se não enviar nova
        const values = [
            produto.idCategoria,
            produto.nomeProduto,
            produto.valorProduto,
            produto.vinculoImagem,
            id
        ];
        const [rows] = await pool.query(sql, values);
        return rows;
      },
    delete: async () => {
        const sql = 'DELETE FROM produtos WHERE idProduto;';
        const [rows] = await pool.query(sql);
        return rows;
    },
};

export default produtoModel;