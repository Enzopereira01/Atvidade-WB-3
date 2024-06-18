import React, { Component, createRef } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import styles from '../styles/myStyles.module.css';

type Props = {
    tema: string;
};

type Produto = {
    id: number;
    nome: string;
    preco: number;
    quantidadeEstoque: number;
    quantidadeVendida?: number;
    genero?: string;
};

type Servico = {
    id: number;
    nome: string;
    preco: number;
    duracaoMinutos: number;
};

type Cliente = {
    id: number;
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataNascimento: string;
    dataEmissaoCPF: string;
    rg: string;
    dataEmissaoRG: string;
    telefone: string;
    genero: string;
    email: string;
    produtosComprados: Produto[];
    servicosConsumidos: Servico[];
};

type State = {
    clienteSelecionado: Cliente | null;
    clienteProdutoSelecionado: Cliente | null;
    clienteServicoSelecionado: Cliente | null;
};

export default class ListarClientes extends Component<Props, State> {
    modalClienteRef: React.RefObject<HTMLDivElement> = createRef();
    modalProdutoRef: React.RefObject<HTMLDivElement> = createRef();
    modalServicoRef: React.RefObject<HTMLDivElement> = createRef();

    constructor(props: Props) {
        super(props);
        this.state = {
            clienteSelecionado: null,
            clienteProdutoSelecionado: null,
            clienteServicoSelecionado: null
        };
    }

    componentDidMount() {
        M.AutoInit();
    }

    componentDidUpdate() {
        if (this.modalClienteRef.current) {
            M.Modal.init(this.modalClienteRef.current);
        }
        if (this.modalProdutoRef.current) {
            M.Modal.init(this.modalProdutoRef.current);
        }
        if (this.modalServicoRef.current) {
            M.Modal.init(this.modalServicoRef.current);
        }
    }

    handleItemClick = (cliente: Cliente) => {
        this.setState({ clienteSelecionado: cliente }, () => {
            const instance = M.Modal.getInstance(this.modalClienteRef.current!);
            instance.open();
        });
    };

    handleProdutoItemClick = (cliente: Cliente) => {
        this.setState({ clienteProdutoSelecionado: cliente }, () => {
            const instance = M.Modal.getInstance(this.modalProdutoRef.current!);
            instance.open();
        });
    };

    handleServicoItemClick = (cliente: Cliente) => {
        this.setState({ clienteServicoSelecionado: cliente }, () => {
            const instance = M.Modal.getInstance(this.modalServicoRef.current!);
            instance.open();
        });
    };

    handleCloseModal = () => {
        this.setState({ clienteSelecionado: null, clienteProdutoSelecionado: null, clienteServicoSelecionado: null });
    };

    handleEdit = (clienteId: number) => {
        console.log(`Edit client with ID: ${clienteId}`);
        // Aqui você poderia implementar a lógica para editar o cliente com o ID fornecido
    };

    handleDelete = (clienteId: number) => {
        console.log(`Delete client with ID: ${clienteId}`);
        // Aqui você poderia implementar a lógica para deletar o cliente com o ID fornecido
    };

    render() {
        const estilo = `collection-item active ${this.props.tema}`;

        const clientes: Cliente[] = [
            // Clientes omitidos para brevidade
        ];

        const produtosPorQuantidade = [...clientes].sort((a, b) => {
            const totalA = a.produtosComprados.reduce((sum, prod) => sum + (prod.quantidadeVendida || 0), 0);
            const totalB = b.produtosComprados.reduce((sum, prod) => sum + (prod.quantidadeVendida || 0), 0);
            return totalB - totalA;
        }).slice(0, 3);

        const produtosPorValor = [...clientes].sort((a, b) => {
            const valorA = a.produtosComprados.reduce((sum, prod) => sum + (prod.quantidadeVendida || 0) * prod.preco, 0);
            const valorB = b.produtosComprados.reduce((sum, prod) => sum + (prod.quantidadeVendida || 0) * prod.preco, 0);
            return valorB - valorA;
        }).slice(0, 3);

        const servicosPorQuantidade = [...clientes].sort((a, b) => {
            const totalA = a.servicosConsumidos.length;
            const totalB = b.servicosConsumidos.length;
            return totalB - totalA;
        }).slice(0, 3);

        const servicosPorValor = [...clientes].sort((a, b) => {
            const valorA = a.servicosConsumidos.reduce((sum, servico) => sum + (servico.preco || 0), 0);
            const valorB = b.servicosConsumidos.reduce((sum, servico) => sum + (servico.preco || 0), 0);
            return valorB - valorA;
        }).slice(0, 3);

        return (
            <div className="container">
                <h5>Clientes</h5>
                <div className="collection">
                    {clientes.map((cliente, index) => (
                        <div key={cliente.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a
                                onClick={() => this.handleItemClick(cliente)}
                                style={{ flex: 1, cursor: 'pointer' }}
                            >
                                {cliente.nome}
                            </a>
                            <div>
                                <button onClick={() => this.handleEdit(cliente.id)} className="btn btn-small blue">Editar</button>
                                <button onClick={() => this.handleDelete(cliente.id)} className="btn btn-small red">Deletar</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Restante do código omitido para brevidade */}
            </div>
        );
    }
}
