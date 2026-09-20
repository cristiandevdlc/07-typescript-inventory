import * as fs from 'node:fs';

type Product = { sku: string; stock: number; price: number };
const file = 'inventory.json';
const load = (): Product[] => fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
const save = (items: Product[]) => fs.writeFileSync(file, JSON.stringify(items, null, 2));
const [command, sku, stockText, priceText] = process.argv.slice(2);
const items = load();

if (command === 'add') {
  const stock = Number(stockText), price = Number(priceText);
  if (!sku || !Number.isInteger(stock) || stock < 0 || !Number.isFinite(price) || price < 0) {
    throw new Error('Uso: add SKU STOCK PRECIO');
  }
  const current = items.find(item => item.sku === sku);
  if (current) { current.stock += stock; current.price = price; }
  else items.push({sku, stock, price});
  save(items);
  console.log('Inventario actualizado');
} else if (command === 'list') {
  console.table(items);
} else {
  console.log('Uso: add SKU STOCK PRECIO | list');
}
