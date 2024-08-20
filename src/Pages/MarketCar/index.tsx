'use client'
import React, { useState } from 'react';
import './MarketCarPages.css';

interface ICurso {
    id: number,
    titulo: string,
    preco: number,
    imagem: string
}

interface IShoppingItem {
    produto: ICurso,
    quantidade: number
}

const cursos: ICurso[] = [
    { id: 1, titulo: "Informática Básica", preco: 520.00, imagem: "https://cfis.com.br/site/wp-content/uploads/2022/06/imagem-informatica-basica-e-avancada.png" },
    { id: 2, titulo: "Mecânico de Motocicletas", preco: 700.00, imagem: "https://s2-g1.glbimg.com/kuHDVr6YgAEZyu16yRVRW2AAPLM=/0x0:600x400/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/a/4/zRZBdATIukJiL2WsR27Q/mecanico-1.jpg" },
    { id: 3, titulo: "Eletricista Predial", preco: 1000.00, imagem: "https://static.wixstatic.com/media/35d76f_f26b2aa6ed3d4b9baddfc07c126b7be3~mv2.jpg/v1/crop/x_1,y_0,w_998,h_494/fill/w_560,h_304,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/eletricista-predial.jpg" },
    { id: 4, titulo: "Auxiliar Administrativo", preco: 425.00, imagem: "https://profissoes.vagas.com.br/wp-content/uploads/2022/09/o-que-faz-assistente-administrativo.jpg" },
    { id: 5, titulo: "Mecânico Automotivo", preco: 920.00, imagem: "https://www.realizzarecursos.com.br/wp-content/uploads/2023/10/Tamanho-padrao-para-o-blog-do-Realizzare-13-768x512.png" },
    { id: 6, titulo: "Redes de computadores", preco: 615.00, imagem: "https://mediamanager.com.br/wp-content/uploads/2023/04/O-que-e-rede-de-computadores.png" }
]

const formatarPreco = (preco: number): string => preco.toFixed(2);

const MarketCarPages = () => {
    const [shoppingCursos, setShoppingCursos] = useState<IShoppingItem[]>([])

    const handleAddCurso = (id: number) => {
        const curso = cursos.find((curso) => curso.id === id)
        const ExisteShoppingCurso = shoppingCursos.find((item => item.produto.id === id))

        if (ExisteShoppingCurso) {
            const newShoppingCurso: IShoppingItem[] = shoppingCursos.map(item => {
                if (item.produto.id === id) ({
                    ...item,
                    quantidade: item.quantidade++
                })
                return item
            })
            setShoppingCursos(newShoppingCurso)
            return
        }

        // Se não houver produto no carrinho
        const carItem: IShoppingItem = {
            produto: curso!,
            quantidade: 1
        }

        const newShoppingCurso: IShoppingItem[] = [...shoppingCursos, carItem]
        setShoppingCursos(newShoppingCurso)
    }

    const handleRemoveCurso = (id: number) => {
        const cursoExisteShopping = shoppingCursos.find((item) => item.produto.id === id);

        if (cursoExisteShopping) {
            if (cursoExisteShopping.quantidade > 1) {
                const newShoppingCurso = shoppingCursos.map((item) => {
                    if (item.produto.id === id) {
                        return {
                            ...item,
                            quantidade: item.quantidade - 1, 
                        };
                    }
                    return item;
                });
                setShoppingCursos(newShoppingCurso);
            } else {
                const newShoppingCurso = shoppingCursos.filter((item) => item.produto.id !== id);
                setShoppingCursos(newShoppingCurso);
            }
        }
    };

    const totalCursos = shoppingCursos.reduce((total, precoAtual) => {
        return total += precoAtual.produto.preco * precoAtual.quantidade
    }, 0)

    return (
        <div className="main-container">
            <header>
                <a href="https://www.se.senai.br/" target="_blank" rel="noopener noreferrer">
                    <img src="https://logodownload.org/wp-content/uploads/2019/08/senai-logo-1.png" alt="Logo SENAI" className="logo" />
                </a>
            </header>
            <div className="container">
                <div className="cursos-container">
                    <h1>Cursos SENAI 2024</h1>
                    <ul>
                        {cursos.map(curso => (
                            <li key={curso.id}>
                                <img src={curso.imagem} alt={curso.titulo} className="curso-imagem" />
                                <p>{curso.titulo}</p>
                                <p>R${formatarPreco(curso.preco)}</p>
                                <button onClick={() => handleAddCurso(curso.id)}>Adicionar</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="carrinho-container">
                    <h1>Carrinho de Compras (Total: R${formatarPreco(totalCursos)})</h1>
                    <ul>
                        {shoppingCursos.map((item) => (
                            <li key={item.produto.id}>
                                <img src={item.produto.imagem} alt={item.produto.titulo} className="carrinho-imagem" />
                                <p>Produto: {item.produto.titulo}</p>
                                <p>Preço: R${formatarPreco(item.produto.preco)}</p>
                                <p>Quantidade: {item.quantidade}</p>
                                <p>Total: R${formatarPreco(item.quantidade * item.produto.preco)}</p>
                                <button onClick={() => handleRemoveCurso(item.produto.id)}>Remover</button>
                            </li>
                        ))}
                    </ul>

                    <button className="print-btn">Imprimir</button>
                </div>
            </div>
        </div>
    )
}

export default MarketCarPages;
