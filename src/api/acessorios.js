import axios from "axios";
export default class AcessoriosApi {
  async buscarTodasAsAcessorios() {
    const { data } = await axios.get("/acessorios/");
    return data.results;
  }
  async adicionarAcessorios(acessorio) {
    const { data } = await axios.post("/acessorio/", acessorio);
    return data.results;
  }
  async atualizarAcessorio(acessorio) {
    const { data } = await axios.put(`/acessorio/${acessorio.id}/`, acessorio);
    return data.results;
  }
  async excluirAcessorio(id) {
    const { data } = await axios.delete(`/acessorios/${id}/`);
    return data.results;
  }
}