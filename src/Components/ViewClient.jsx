import { useContext, useState } from "react";
import { styled } from "styled-components";
import ClientsContext from "../Contexts/ClientsContext";
import {BsFillPrinterFill} from 'react-icons/bs';
import {FaEdit} from 'react-icons/fa';
import {RiDeleteBin6Fill} from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import trashIcon from '/trash.png';

export default function ViewClient()
{
    const {usuarios,setUsuarios,viewingClient,setViewingClient,setEditingClient} = useContext(ClientsContext);

    const navigate = useNavigate();

    function edit(e)
    {
        e.stopPropagation();
        setEditingClient(viewingClient);
        setViewingClient(null);
        navigate('/');
    }

    function deleteThis(e)
    {
      e.stopPropagation();
      Swal.fire({
        title: `<span style="font-family: 'Mulish', sans-serif;font-size: 20px">Remover ${viewingClient.nome}?</span>`,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#07bc0c',
        confirmButtonText: 'Remover',
        cancelButtonText: 'Cancelar',
        width: 300,
        heightAuto: false,
        imageUrl:trashIcon,
        imageWidth: 100,
        imageHeight: 100,
      }).then((result) => {
        if (result.isConfirmed) {
          setUsuarios(usuarios.filter(fuser => fuser.id != viewingClient.id));
          setViewingClient(null);
        }
      });
    }
    
    return (
       <>
       {viewingClient &&  
            <Modal onClick={()=> setViewingClient(null)}>
                <ViewClientDiv onClick={(e) => e.stopPropagation()}>
                    <p><strong>Nome: </strong> {viewingClient.nome}</p>
                    <p><strong>Endereço: </strong> {viewingClient.rua + ' ' + viewingClient.numero + ' - ' + viewingClient.bairro + ' - ' + viewingClient.cidade }</p>
                    <p><strong>Forma de pagamento: </strong> {viewingClient.formadepagamento }</p>
                    <p><strong>Vencimento dia: </strong> {viewingClient.vencimento}</p>
                    <p><strong>Valor combinado: </strong> <em> R$ {viewingClient.valorCombinado}</em></p>
                    <p><strong>Obs: </strong>{viewingClient.observacao == '' ? '--------' : viewingClient.observacao}</p>
                    <button><BsFillPrinterFill/>Imprimir Recibo</button>
                    <div className="actions">
                        <FaEdit onClick={edit} className="edit-btn"/>
                        <RiDeleteBin6Fill onClick={deleteThis} className="delete-btn"/>
                    </div>
                </ViewClientDiv>
            </Modal>
        }
       </>
    );
}

const ViewClientDiv = styled.div`
    max-width: 600px;
    max-height: 600px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-55%);
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 20px 20px 20px 20px;
    gap: 5px;
    overflow: hidden;

    p{
        &:nth-child(1)
        {
            margin-right: 80px;
        }
    }

    em{
        color: #07bc0c;
        font-weight: bold;
    }

    button{
        border: 0;
        width: 140px;
        position: absolute;
        right: 10px;
        bottom: 10px;
        cursor: pointer;
        font-weight: bold;
        height: 30px;
        padding: 0 5px 0 5px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    .actions{
        position: absolute;
        right: 10px;
        top: 10px;
        display: flex;
        gap: 5px;

        .edit-btn,.delete-btn{
            cursor: pointer;
            font-size: 17px;
            &:hover{
                font-size: 19px;
            }
        }

        .edit-btn{
            color: #07bc0c;
        }
        .delete-btn{
            color: red;
        }
    }
`;

const Modal = styled.div`

width: 100%;
height: 100%;
background-color: rgba(0,0,0,0.7);
position: fixed;
left: 0;
top: 0;
`;