exports.seed = async function(knex) {
  // Deletes ALL existing entries
<<<<<<< HEAD
  await knex('revendedores').del()
  await knex('revendedores').insert([
=======
  await knex('fornecedores').del()
  await knex('fornecedores').insert([
>>>>>>> f871c98ae362048a6137ccf37329d814ba78e143
    {nome: "Ford Satte Alam", contato: "3256.0014 - Paulo"},
    {nome: "Chevrolet Uvel", contato: "3269.2998 - Janaina"},
    {nome: "Fiat Felice", contato: "3215.2958 - Eduardo"},
    {nome: "Volkswagen Panambra", contato: "3358.9467 - Fabricio"},
    ]);
};
