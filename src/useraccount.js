import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserAccountForm = () => {
    const [formData, setFormData] = useState({
        data_nasc: '',
        email: '',
        password: '',
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResponseMessage('');

        try {
            const response = await axios.post('http://localhost:3000/users/novouser', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setResponseMessage('Conta criada com sucesso!');
     
            setFormData({
                data_nasc: '',
                email: '',
                password: ''
            });
        } catch (error) {
            console.error('Erro detalhado:', error);

            if (error.response) {
                // Erro com resposta do servidor
                setResponseMessage(
                    error.response.data.message || 
                    'Erro ao criar conta. Verifique seus dados.'
                );
            } else if (error.request) {
                // Sem resposta do servidor
                setResponseMessage('Sem resposta do servidor. Verifique sua conexão.');
            } else {
                // Erro na configuração da requisição
                setResponseMessage('Erro ao enviar formulário.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h3 className="text-center mb-4">Criar Conta de Usuário</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Data de Nascimento</label>
                                    <input 
                                        type="date" 
                                        className="form-control"
                                        name="data_nasc"
                                        value={formData.data_nasc}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Senha</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Processando...' : 'Criar Conta'}
                                </button>
                            </form>

                            {responseMessage && (
                                <div 
                                    className={`alert mt-3 ${
                                        responseMessage.includes('sucesso') 
                                            ? 'alert-success' 
                                            : 'alert-danger'
                                    }`}
                                >
                                    {responseMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAccountForm;