<script setup>
import { ref, reactive, onMounted } from "vue";
import CoresApi from "@/api/cores";
const coresApi = new CoresApi();

const defaultCor = { id: null, nome: ""};
const cores = ref([]);
const cor = reactive({ ...defaultCor });

onMounted(async () => {
  cores.value = await coresApi.buscarTodasAsCor();
  console.log(cores.value)
});

function limpar() {
  Object.assign(cor, { ...defaultCor });
}

async function salvar() {
  if (cor.id) {
    await coresApi.atualizarCor(cor);
  } else {
    await coresApi.adicionarCor(cor);
  }
  cores.value = await coresApi.buscarTodasAsCor();
  limpar();
}

function editar(cor_para_editar) {
  Object.assign(cor, cor_para_editar);
}

async function excluir(id) {
  await coresApi.excluirCores(id);
  cores.value = await coresApi.buscarTodasAsCor();
  limpar();
}
</script>

<template>
  <h1>cores</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="cor.nome" placeholder="Nome" />
    <button @click="salvar" class="gap">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
      <li v-for="cor in cores" :key="cor.id">
        <span @click="editar(cor)">
        ({{ cor.id }}) - {{ cor.nome }}
      </span>
      <button @click="excluir(cor.id)">X</button>
    </li>
  </ul>
</template>