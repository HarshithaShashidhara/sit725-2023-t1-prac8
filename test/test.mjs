import * as chai from 'chai';

import chaiHttp from 'chai-http'; 

import server from '../server.mjs';
 

chai.use(chaiHttp);

describe('Card API', () => {
    describe('GET /api/cards', () => {
        it('it should GET all the cards', (done) => {
            chai.request(server)
                .get('/api/cards')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.isArray(res.body.data);
                    done();
                });
        });
    });

    describe('POST /api/cards', () => {
        it('it should add a new card', (done) => {
            chai.request(server)
                .post('/api/cards')
                .send({
                    title: "Test Card",
                    image: "https://example.com/image.jpg",
                    link: "https://example.com",
                    description: "This is a test card"
                })
                .end((err, res) => {
                    assert.equal(res.status, 201);
                    done();
                });
        });
    });

    describe('DELETE /api/cards/:id', () => {
        it('it should delete a card', (done) => {
            chai.request(server)
                .get('/api/cards')
                .end((err, res) => {
                    const cardId = res.body.data[0]._id; // Assuming at least one card exists
                    chai.request(server)
                        .delete(`/api/cards/${cardId}`)
                        .end((err, res) => {
                            assert.equal(res.status, 200);
                            done();
                        });
                });
        });
    });
});
