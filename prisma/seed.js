import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed...');

    await prisma.filme.createMany({
    data: [
      {
        titulo: "O Poderoso Chefão",
        descricao: "O patriarca de uma dinastia do crime transfere o controle para seu filho.",
        duracao: 175,
        genero: "Crime",
        nota: 9.20,
        avaliacao: true
      },
      {
        titulo: "Interestelar",
        descricao: "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço.",
        duracao: 169,
        genero: "Ficção Científica",
        nota: 8.70,
        avaliacao: true
      },
      {
        titulo: "Parasita",
        descricao: "A relação entre uma família pobre e uma rica toma um rumo sombrio.",
        duracao: 132,
        genero: "Suspense",
        nota: 8.50,
        avaliacao: true
      },
      {
        titulo: "Batman: O Cavaleiro das Trevas",
        descricao: "Batman enfrenta o caos psicológico provocado pelo Coringa.",
        duracao: 152,
        genero: "Ação",
        nota: 9.00,
        avaliacao: true
      },
      {
        titulo: "A Viagem de Chihiro",
        descricao: "Uma menina de 10 anos entra em um mundo governado por deuses e espíritos.",
        duracao: 125,
        genero: "Animação",
        nota: 8.60,
        avaliacao: true
      },
      {
        titulo: "O Senhor dos Anéis: O Retorno do Rei",
        descricao: "A batalha final pelo destino da Terra Média e a destruição do Anel.",
        duracao: 201,
        genero: "Fantasia",
        nota: 9.00,
        avaliacao: true
      },
      {
        titulo: "Pulp Fiction",
        descricao: "Histórias de crime se entrelaçam de forma não linear em Los Angeles.",
        duracao: 154,
        genero: "Policial",
        nota: 8.90,
        avaliacao: false
      },
      {
        titulo: "O Auto da Compadecida",
        descricao: "As aventuras dos nordestinos João Grilo e Chicó no sertão paraibano.",
        duracao: 104,
        genero: "Comédia",
        nota: 8.70,
        avaliacao: true
      },
      {
        titulo: "Hereditário",
        descricao: "Uma família descobre segredos terríveis sobre sua ancestralidade após o luto.",
        duracao: 127,
        genero: "Terror",
        nota: 7.30,
        avaliacao: true
      },
      {
        titulo: "Titanic",
        descricao: "Um romance épico que floresce durante a trágica viagem do navio RMS Titanic.",
        duracao: 194,
        genero: "Romance",
        nota: 7.90,
        avaliacao: false
      }
    ]
  })
    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
