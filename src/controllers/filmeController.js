import * as model from '../models/filmeModel.js';

export const getAll = async (req, res) => {
    try {
        const filme = await model.findAll(req.query);

        if (!filme || filme.length === 0) {
            return res.status(200).json({
                message: 'Nenhum registro encontrado.',
            });
        }
        res.json(filme);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar registros' });
    }
};

export const create = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados do filme!',
            });
        }

        const { titulo, descricao, duracao, genero, nota } = req.body;


        if (!titulo || titulo.trim().length < 3) {
            return res
                .status(400)
                .json({ error: 'O título é obrigatório e deve conter no mínimo 3 caracteres.' });
        }
        if (!descricao || descricao.trim().length < 10) {
            return res.status(400).json({
                error: 'A descrição é obrigatória e deve conter no mínimo 10 caracteres.',
            });
        }
        if (!duracao || !Number.isInteger(duracao) || duracao <= 0) {
            return res
                .status(400)
                .json({ error: 'A duração deve ser um número inteiro positivo.' });
        }
        if (duracao > 300) {
            return res.status(400).json({
                error: 'Filmes com duração superior a 300 minutos não podem ser cadastrados.',
            });
        }
        const generosValidos = [
            'Ação',
            'Drama',
            'Comédia',
            'Terror',
            'Romance',
            'Animação',
            'Ficção Científica',
            'Suspense',
        ];
        if (!genero || !generosValidos.includes(genero)) {
            return res.status(400).json({
                error: 'O gênero deve ser um dos valores: Ação, Drama, Comédia, Terror, Romance, Animação, Ficção Científica, Suspense.',
            });
        }
        if (nota === undefined || nota === null || nota < 0 || nota > 10) {
            return res.status(400).json({ error: 'A nota (nota) deve estar entre 0 e 10.' });
        }


        const existeFilme = await model.findAll({ titulo: titulo.trim() });
        if (existeFilme.length > 0) {
            return res
                .status(400)
                .json({ error: 'Não é permitido cadastrar filmes com título duplicado.' });
        }

        const data = await model.create({
            titulo: titulo.trim(),
            descricao: descricao.trim(),
            duracao: parseInt(duracao),
            genero,
            nota: parseFloat(nota),
            avaliacao: true,
        });

        res.status(201).json({
            message: 'Filme cadastrado com sucesso!',
            data,
        });
    } catch (error) {
        console.error('Erro ao criar:', error);
        res.status(500).json({ error: 'Erro interno no servidor ao salvar o filme.' });
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const data = await model.findById(id);
        if (!data) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }
        res.json({ data });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar registro' });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados do filme!',
            });
        }

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const filmeExiste = await model.findById(id);
        if (!filmeExiste) {
            return res.status(404).json({ error: 'Filme não encontrado para atualizar.' });
        }
        const data = await model.update(id, req.body);
        res.json({
            message: `O filme "${data.titulo}" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        res.status(500).json({ error: 'Erro ao atualizar filme' });
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('ID recebido da URL:', id);

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const filmeExiste = await model.findById(id);
        console.log('Resultado da busca no banco:', filmeExiste);
        if (!filmeExiste) {
            return res.status(404).json({ error: 'Filme não encontrado para deletar.' });
        }

        await model.remove(id);
        res.json({
            message: `O filme "${filmeExiste.titulo}" foi deletado com sucesso!`,
            deletado: filmeExiste,
        });

        res.status(200).json({
            message: 'Filme apagado com sucesso!',
            filmeRemovido: filmeExiste,
        });

    } catch (error) {
        console.error('Erro ao deletar:', error);
        res.status(500).json({ error: 'Erro ao deletar filme' });
    }
};
