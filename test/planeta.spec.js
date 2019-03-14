/**
 * Arquivo para teste da api
 * A API utilizada neste projeto eh
 * @see http://localhost:3000/
 *
 * @author Sérgio Barros
 */

/**
 * Carrega as bibliotecas que vamos utilizar
 * O mocha nao eh carregado aqui, pois ele que executa este arquivo
 */
const urlBase = "http://localhost:3000/";

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe("Teste API Desafio B2W", () => {

    describe('/', () => {
        it("Testando GET Raiz", (done) => {
            chai.request(urlBase) // Endereço do servidor
                .get("") // endpoint que vamos testar
                .end((err, res) => { // testes a serem realizados
                    res.should.have.status(200); // verificando se o retorno e um status code 200
                    res.body.should.have.property('title');
                    res.body.should.have.property('version');
                    done();
                });
        });
    });

    describe('/GET Planetas', () => {
        it('Testando GET todos os Planetas', (done) => {
            chai.request(urlBase) // Endereço do servidor
                .get('planeta') // endpoint que vamos testar
                .end((err, res) => { // testes a serem realizados
                    res.should.have.status(200); // verificando se o retorno e um status code 200
                    res.body.should.be.a('array'); // Verificando se o retorno e um array
                    done();
                });
        });
    });

    describe('/POST Planeta', () => {
        it('Verificar o cadastro de Planeta', (done) => {
            let planeta = { // Vamos deinir o planeta que vamos inserir
                "nome": "Yavin IV",
                "clima": "clima 2",
                "terreno": "terreno 2"
            };
            chai.request(urlBase)
                .post('planeta')
                .send(planeta) // vamos enviar esse arquivo
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

    });

    describe('/GET/:id planeta', () => {
        it('GET em Planeta por ID', (done) => {
            let _id = "5c871cc88e244035e4291896";

            chai.request(urlBase)
                .get('planeta/admin/' + _id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('_id').eql(_id); // Verificamos se existe a propriedade _id, e se ela e igual a _id criada
                    res.body.should.have.property('nome'); // Verificamos se existe a propriedade 
                    res.body.should.have.property('clima');
                    done();
                });
        });
    });

    describe('/GET/:nome planeta', () => {
        it('GET em Planeta por Nome', (done) => {
            let nome = "Yavin IV";
            chai.request(urlBase)
                .get('planeta/' + nome)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('nome').eql(nome); // Verificamos se existe a propriedade nome, e se ela e igual a nome criada
                    res.body.should.have.property('nome'); // Verificamos se existe a propriedade 
                    res.body.should.have.property('clima');
                    done();
                });
        });
    });

    describe('/DELETE', () => {
        it('DELETE Planeta', (done) => {
            let planeta = { // Vamos deinir o planeta que vamos deletar
                "id": "5c8685170404051b28a11f09"
            };
            chai.request(urlBase)
                .delete('planeta/')
                .send(planeta) // vamos enviar esse arquivo
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Planeta Removido com Sucesso!');
                    done();
                });
        });
    });
});