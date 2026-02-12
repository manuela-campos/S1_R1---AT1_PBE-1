import multer from "multer";
import path from "path"; // Conseguir colocar arquivos e imagens
import crypto from "crypto";
import fs from "fs"; // manipular pastas e diretórios

// pasta que vai apontar o upload
// cria um caminho absoluto na raiz do projeto (path.resolve)
const baseUploadDir = path.resolve(process.cwd(), "uploads");

// função para verificar se o diretório existe
const verificaDir = (dir) => {
  if (!fs.existsSync(dir)) {
    // se não existir, vamos criar um
    fs.mkdirSync(dir, { recursive: true });
  }
};

// folder = nome da pasta
// allowedTypes = tipo de arquivo
// fileSize = tamanho do arquivo
const createMulter = ({ folder, allowedTypes, fileSize }) => {
  // Monta caminho do diretório base (uploads) + pasta
  const uploadDir = path.join(baseUploadDir, folder);
  // Verifica se o diretório não existe para criar
  verificaDir(uploadDir);

  // Função para armazenar
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // retorna um diretório
    },
    filename: (req, file, cb) => {
      // criar o nome do nosso arquivo
      const hash = crypto.randomBytes(12).toString("hex");
      cb(null, `${hash}-${file.originalname}`);
    },
  });

  // tamanho do arquivo
  const fileFilter = (req, file, cb) => {
    // verifica se o tipo de arquivo esta de acordo com o tamanho determinado
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Tipo de arquivo não permitido"));
    }
    cb(null, true);
  };
  return multer({
    storage,
    limits: { fileSize },
    fileFilter,
  });
};

export default createMulter;