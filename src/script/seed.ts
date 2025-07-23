import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, 'tabuaMare.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const mesObj of data) {
    const mes = mesObj.mes;
    for (const diaObj of mesObj.dias) {
      const dia = diaObj.dia;
      const horarios = diaObj.mare;

      await prisma.mare.create({
        data: {
          mes,
          dia,
          horarios
        }
      });
    }
  }

  console.log('✅ Dados de maré inseridos com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao inserir dados:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
