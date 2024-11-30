import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDataForm = () => {
    const [formData, setFormData] = useState({
        id: '',
        nome: '',
        descricao: '',
        preco: '',
        estoque: '',
    });

    const [produtos, setProdutos] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');

    // Função para carregar os produtos do backend
    const carregarProdutos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/produtos');
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            setResponseMessage('Erro ao carregar produtos');
        }
    };

    // Usar useEffect para carregar os produtos quando o componente montar
    useEffect(() => {
        carregarProdutos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const { nome, descricao, preco, estoque } = formData;
            if (!nome || !descricao || !preco || !estoque) {
                setResponseMessage('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            const response = await axios.post('http://localhost:3000/produtos', { nome, descricao, preco, estoque });
            setResponseMessage('Produto salvo com sucesso!');
            handleClear();
            carregarProdutos(); 
        } catch (error) {
            console.error('Erro ao salvar o produto:', error);
            setResponseMessage(`Erro ao salvar o produto: ${error.response?.data?.error || error.message}`);
        }
    };

    const handleClear = () => {
        setFormData({
            id: '',
            nome: '',
            descricao: '',
            preco: '',
            estoque: '',
        });
        setResponseMessage('');
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card p-4 shadow-sm">
                        <h3>Cadastro de Produtos</h3>
                        <form className="form-group" onSubmit={handleSave}>
                        <div className="mb-3">
                    <label className="fw-bold text-center d-block">Produto:</label>
                    <input
                        type='text'
                        name='nome'
                        value={formData.nome}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <div className="mb-3">
                    <label className="fw-bold text-center d-block">Descrição:</label>
                    <input
                        type='text'
                        name='descricao'
                        value={formData.descricao}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <div className="mb-3">
                    <label className="fw-bold text-center d-block">Preço:</label>
                    <input
                        type='number'
                        step="0.01"
                        name='preco'
                        value={formData.preco}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <div className="mb-3">
                    <label className="fw-bold text-center d-block">Estoque:</label>
                    <input
                        type='number'
                        name='estoque'
                        value={formData.estoque}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                            <button type="submit" className="btn btn-success btn-block mt-3 mx-1" onClick={handleSave}>Salvar</button>
                            <button type="button" className="btn btn-danger btn-block mt-3 mx-1" onClick={handleClear}>Limpar</button>
                        </form>
                        {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card p-4 shadow-sm">
                        <h3>Produtos Cadastrados</h3>
                        <ul className="list-group">
                            {produtos.map((produto) => (
                                <li key={produto.id} className="list-group-item">
                                    <h5>{produto.nome}</h5>
                                    <p>{produto.descricao}</p>
                                    <p>Preço: R$ {produto.preco}</p>
                                    <p>Estoque: {produto.estoque}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDataForm;