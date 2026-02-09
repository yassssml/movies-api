import prisma from '../utils/prismaClient.js';

export const create = async (data) => {
    return await prisma.filme.create({ data });
};

export const findAll = async (filters = {}) => {
    const {
        titulo,
        descricao,
        duracao,
        genero,
        nota,
        avaliacao,
        title, // Suporte para 'title' (alternativa a 'titulo')
        genre, // Suporte para 'genre' (alternativa a 'genero')
        available, // Disponibilidade (alternativa a 'avaliacao')
        minRating, // Nota mínima
        maxDuration, // Duração máxima
    } = filters;

    const where = {};

    // Título (busca parcial, case-insensitive)
    const tituloFiltro = titulo || title;
    if (tituloFiltro) where.titulo = { contains: tituloFiltro, mode: 'insensitive' };

    // Descrição
    if (descricao) where.descricao = { contains: descricao, mode: 'insensitive' };

    // Duração (exata)
    if (duracao !== undefined) where.duracao = parseInt(duracao);

    // Duração máxima
    if (maxDuration !== undefined) {
        where.duracao = { ...where.duracao, lte: parseInt(maxDuration) };
    }

    // Gênero
    const generoFiltro = genero || genre;
    if (generoFiltro) where.genero = { contains: generoFiltro, mode: 'insensitive' };

    // Nota (exata)
    if (nota !== undefined) where.nota = parseFloat(nota);

    // Nota mínima
    if (minRating !== undefined) {
        where.nota = { ...where.nota, gte: parseFloat(minRating) };
    }

    // Disponibilidade (avaliacao)
    const avaliacaoFiltro = available !== undefined ? available : avaliacao;
    if (avaliacaoFiltro !== undefined) {
        where.avaliacao = avaliacaoFiltro === 'true' || avaliacaoFiltro === true;
    }

    return await prisma.filme.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });
};

export const findById = async (id) => {
    return await prisma.filme.findUnique({
        where: { id: parseInt(id) },
    });
};

export const update = async (id, data) => {
    return await prisma.filme.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id) => {
    return await prisma.filme.delete({
        where: { id: parseInt(id) },
    });
};
