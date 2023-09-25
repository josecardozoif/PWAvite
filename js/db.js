import { openDB } from "idb";
import { createElement } from "react";

let db;

async function createDB() {
    try {
        db = await openDB('banco', 1, {
            upgrade(db, oldVersion, newVersion, transaction) {
                switch (oldVersion) {
                    case 0:
                    case 1:
                        const store = db.createObjectStore('pessoas', {
                        //A propriedade nome será o campo chave
                            keyPath: 'nome'
                        });
                        // Criando um índice id na store, deve estar contido no objeto do banco.
                        store.createIndex('id', 'id');
                        showResult("Banco de dados criado!");
                }
            }
        });
        showResult("Banco de dados aberto.");
    } catch (e) {
        showResult("Erro ao criar o banco de dados: " + e.message)
    }
}

window.addEventListener("DOMContentLoaded", async event => {
    createDB();
    const form = document.getElementsByTagName('form')[0]
    form.addEventListener('submit', (e) => {e.preventDefault(); addData('form')});
    const botao = document.getElementsByTagName('button')
    botao[1].addEventListener('click', getData);
})

async function addData(form) {//fixo pra add o fulano
    const tx = await db.transaction('pessoas', 'readwrite');
    const store = tx.objectStore('pessoas');
    store.put({ 
        nome: form.nome.value,
        idade: form.idade.value
     });
    await tx.done;
    form.reset();
    getData();
}

async function getData() {
    if (db == undefined) {
        showResult("O banco de dados está fechado");
        return;
    }

    const tx = await db.transaction('pessoas', 'readonly');
    const store = tx.objectStore('pessoas');
    const value = await store.getAll();
    showUsers(value)
    
    if (value) {
        showResult("Dados do banco: " + JSON.stringify
        (value))
    } else {
        showResult("Não há nenhum dado no banco!")
    }
}

async function deleteData() {
    if (db == undefined) {
        showResult("O banco de dados está fechado");
        return;
    }

    const tx = await db.transaction('pessoas', 'readwrite');
    const store = tx.objectStore('pessoas');
    const user = await store.get(userName);
    if(user){
        store.delete(userName);
        getData();
    } else {
        showResult("Dados não encontrados no banco!")
    }
}

async function showUsers(users) {
    const lista = document.querySelector('.listar');
    lista.innerHTML = '';
    users.map(user => {
        const userHTML = document.createElement('code');
        const userInfo = document.createElement('p');
        userInfo.innerHTML = `${user.nome} | ${user.idade}`

        const deletar = document.createElement('button');
        deletar.innerHTML = 'Delete';
        deletar.addEventListener('click', () => deleteData(user.nome))

        userHTML.appendChild(userInfo);
        userHTML.appendChild(deletar);

        lista.appendChild(userHTML);
    })
}

function showResult(text) {
    document.querySelector("output").innerHTML = text;
}