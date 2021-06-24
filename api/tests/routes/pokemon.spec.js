/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};



describe('GET /pokemons/:id', () => {
  it('responds with 200', () => agent.get('/pokemons/1').expect(200));
  it('respond one pokemon', () =>
  agent.get('/pokemons/1').then((res) => {
    expect(res.body.nombre).to.be.equal('bulbasaur');
  }));

  xdescribe('GET /pokemons/', () => {
    it('responds with 200', () => agent.get('/pokemons').expect(200));
    it('responds 40 pokemon or more', () =>
    agent.get('/pokemons/').then((res) => {
      expect(res.body).to.have.lengthOf.above(40);
    }));
  });
});
