<script setup>
import { ref, reactive, onMounted } from "vue";
import MarcaApi from "@/api/marcas";
const marcaApi = new MarcaApi();

const defaultMarca = { id: null, nome: "", nacionalidade: "" || null};
const marcas = ref([]);
const marca = reactive({ ...defaultMarca });

onMounted(async () => {
  marcas.value = await marcaApi.buscarTodasAsMarca();
  console.log(marcas.value)
});

function limpar() {
  Object.assign(marca, { ...defaultMarca });
}

async function salvar() {
  if (marca.id) {
    await marcaApi.atualizarMarca(marca);
  } else {
    await marcaApi.adicionarMarca(marca);
  }
  marcas.value = await marcaApi.buscarTodasAsMarca();
  limpar();
}

function editar(marca_para_editar) {
  Object.assign(marca, marca_para_editar);
}

async function excluir(id) {
  await marcaApi.excluirMarca(id);
  marcas.value = await marcaApi.buscarTodasAsMarca();
  limpar();
}
</script>

<template>
  <h1>marca</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="marca.nome" placeholder="Nome" />
    <input type="text" v-model="marca.nacionalidade" placeholder="Nacionalidade" />
    <button @click="salvar" class="gap">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
      <li v-for="marca in marcas" :key="marca.id">
        <span @click="editar(marca)">
        ({{ marca.id }}) - {{ marca.nome }} - {{ marca.nacionalidade }}
      </span>
      <button @click="excluir(marca.id)">X</button>
    </li>
  </ul>
</template>