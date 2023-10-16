import firebase from "../config";
import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import App from "@/pages/_app";

export default class ColecaoCliente implements ClienteRepositorio {

    #conversor = {
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.nome,
                idade: cliente.idade,
            }
        },
        // Recebendo os dados do Firebase e retornando um Cliente
        fromFirestort(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente {
            const dados = snapshot.data(options)
            return new Cliente(dados.nome, dados.idade, snapshot.id)
        }
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
        // Se o ID estiver setado ele vai auterar
        if (cliente?.id) {
           await this.#colecao().doc(cliente.id).set(cliente)
           return cliente
        } else { // Caso não esteja setado ele vai adicionar
           const docRef = await this.#colecao().add(cliente)
           const doc = await docRef.get()
           return doc.data()
        }
    }

    async excluir(cliente: Cliente): Promise<void> {
        return this.#colecao().doc(cliente.id).delete()
    }

    async obterTodos(): Promise<Cliente[]> {
        const query = await this.#colecao().get()
        return query.docs.map((doc: { data: () => any; }) => doc.data()) ?? []
    }

    #colecao() {
        return firebase
        .firestore().collection('clientes')
        .withConverter(this.#conversor)
    }
}