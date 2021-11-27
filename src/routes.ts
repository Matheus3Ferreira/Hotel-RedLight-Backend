import { Router } from 'express'
import { getOcupacoes, getOcupacao, saveOcupacao, updateOcupacao, deleteOcupacao } from './controller/OcupacaoController'
import { getFuncionarios, getFuncionario, saveFuncionario, updateFuncionario, deleteFuncionario } from './controller/FuncionarioController'
import { deleteComodidade, getComodidade, getComodidades, saveComodidade, updateComodidade } from './controller/ComodidadeController';
import { deleteQuarto, getQuartos, getQuarto, saveQuarto, updateQuarto, disponibility } from './controller/QuartoController'
import { deleteHospede, findReservas, getHospede, getHospedes, getMe, saveHospede, updateHospede } from './controller/HospedeController';
import { deleteServico, getOneServico, getServicos, saveServico, updateServico } from './controller/ServicoController'
import { checkReserva, deleteReserva, getReserva, getReservas, saveReserva, updateReserva } from './controller/ReservaController';
import { deleteConsumo, getConsumos, getOneConsumo, saveConsumo, updateConsumo } from './controller/ConsumoController'
import { authHospede, signupHospede } from './controller/authController';
import tokenValidator from './middleware/TokenValidator';

const routes = Router();

routes.post('/auth/signup', signupHospede);
routes.post('/auth', authHospede);

routes.get('/hospede', getHospedes);
routes.get('/hospede/:id', getHospede);
routes.post('/hospede', saveHospede);
routes.put('/hospede/:id', updateHospede);
routes.delete('/hospede/:id', deleteHospede);
routes.get('/hospedefilter/:cpf', findReservas);

routes.get('/ocupacao', getOcupacoes);
routes.get('/ocupacao/:id', getOcupacao);
routes.post('/ocupacao', saveOcupacao);
routes.put('/ocupacao/:id', updateOcupacao);
routes.delete('/ocupacao/:id', deleteOcupacao);

routes.get('/funcionario', getFuncionarios);
routes.get('/funcionario/:id', getFuncionario);
routes.post('/funcionario', saveFuncionario);
routes.put('/funcionario/:id', updateFuncionario);
routes.delete('/funcionario/:id', deleteFuncionario);

routes.get('/comodidade', getComodidades);
routes.get('/comodidade/:id', getComodidade);
routes.post('/comodidade', saveComodidade);
routes.put('/comodidade/:id', updateComodidade);
routes.delete('/comodidade/:id', deleteComodidade);

routes.get('/quarto', getQuartos);
routes.get('/quarto/:id', getQuarto);
routes.post('/quarto', saveQuarto);
routes.put('/quarto/:id', updateQuarto);
routes.delete('/quarto/:id', deleteQuarto);
routes.post('/disponibilidade/quarto', disponibility)

routes.get('/reserva', getReservas);
routes.get('/reserva/:id', getReserva);
routes.post('/reserva', saveReserva);
routes.put('/reserva/:id', updateReserva);
routes.delete('/reserva/:id', deleteReserva);
routes.post('/checkReserva/:id', checkReserva);

routes.get('/servico', getServicos);
routes.get('/servico/:id', getOneServico);
routes.post('/servico', saveServico);
routes.put('/servico/:id', updateServico)
routes.delete('/servico/:id', deleteServico)

routes.get('/consumo', getConsumos);
routes.get('/consumo/:id', getOneConsumo);
routes.post('/consumo', saveConsumo);
routes.put('/consumo/:id', updateConsumo);
routes.delete('/consumo/:id', deleteConsumo);

routes.use(tokenValidator)

routes.get('/me', getMe);

export default routes