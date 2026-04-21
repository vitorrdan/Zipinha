const Database = require('better-sqlite3')
const path = require('path')

const DB_PATH = path.join(__dirname, '..', '..', 'zipinha.db')


//abre ou cria o arquivo do banco
const db = new Database(DB_PATH)

db.exec(`
    CREATE TABLE IF NOT EXISTS entregas(
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        aluno       TEXT NOT NULL,
        atividade   TEXT NOT NULL,
        arquivo_nome    TEXTO NOT NULL,
        drive_url       TEXT NOT NULL,
        criado_em       TEXT NOT NULL
    )
    `)

console.log(`Banco de dados pronto em:`, DB_PATH)    

// Recebe um objeto
function salvarEntrega({aluno, atividade, arquivo_nome, drive_url}){
    const criado_em = new Date().toISOString()

    const query = db.prepare(`
        INSERT INTO entregas(aluno, atividade, arquivo_nome, drive_url, criado_em) 
        VALUES (?, ?, ?, ?, ?)
    `)

    const resultado = query.run(aluno, atividade, arquivo_nome, drive_url, criado_em)

    return resultado.lastInsertRowid
}

function listarEntregas(){
    return db.prepare(`
        SELECT * FROM entregas ORDER BY criado_em DESC
        `).all()
}

function listarPorAluno(aluno){
    return db.prepare(`
        SELECT * FROM entregas WHERE aluno = (?) ORDER BY criado_em DESC
        `).all(aluno)
}

function deleteEntrega(id){
    return db.prepare(`
        DELETE FROM entregas WHERE id = (?)
        `).run(id)
}


module.exports = {salvarEntrega, listarEntregas,listarPorAluno, deleteEntrega}