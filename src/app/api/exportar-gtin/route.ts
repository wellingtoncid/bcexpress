export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

function gerarGTIN13Brasil(qtd: number) {
  const codigos: string[] = [];

  for (let i = 0; i < qtd; i++) {
    let base = '789' + Math.floor(Math.random() * 1_000_000_000).toString().padStart(9, '0');
    base = base.slice(0, 12);
    const digito = calcularDigitoVerificador(base);
    codigos.push(base + digito);
  }

  return codigos;
}

function calcularDigitoVerificador(codigo12: string): number {
  const soma = codigo12
    .split('')
    .map((d, i) => parseInt(d) * (i % 2 === 0 ? 1 : 3))
    .reduce((a, b) => a + b, 0);
  const resto = soma % 10;
  return (10 - resto) % 10;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const qtd = parseInt(searchParams.get('qtd') || '10', 10);
  if (qtd < 1 || qtd > 100000) {
  return new NextResponse('Quantidade inválida. Máximo: 100000.', { status: 400 });
}
  const gtins = gerarGTIN13Brasil(qtd);

  const { default: ExcelJS } = await import('exceljs');

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('GTIN-13');

  worksheet.columns = [{ header: 'Código GTIN-13', key: 'gtin', width: 20 }];
  gtins.forEach(gtin => worksheet.addRow({ gtin }));

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=gtins.xlsx'
    }
  });
}