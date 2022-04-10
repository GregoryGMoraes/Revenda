exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('carros').del()
  await knex('carros').insert([
    {modelo: "Focus", marca: "Ford", ano: 2013, preco: 39900.00, revendedor_id: 1},
    {modelo: "Toro", marca: "Fiat", ano: 2018, preco: 180000.00, revendedor_id: 3},
    {modelo: "Prisma", marca: "Chevrolet", ano: 2014, preco: 34500.00, revendedor_id: 2},
    {modelo: "Gol", marca: "Volkswagem", ano: 2010, preco: 20000.00, revendedor_id: 4},
    {modelo: "Fiesta", marca: "Ford", ano: 2017, preco: 42300.00, revendedor_id: 1},
    {modelo: "S10", marca: "Chevrolet", ano: 2020, preco: 218000.00, revendedor_id: 2},
    {modelo: "Argo", marca: "Fiat", ano: 2019, preco: 48000.00, revendedor_id: 3},
    {modelo: "Polo", marca: "Volkswagem", ano: 2012, preco: 32500.00, revendedor_id: 4},
  ]);
};
