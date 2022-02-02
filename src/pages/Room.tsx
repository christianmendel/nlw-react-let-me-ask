import { FormEvent, useState } from 'react'
import {useParams} from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import { Button } from '../Components/Button'
import { RoomCode } from '../Components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { database } from '../Services/firebase'

import '../styles/room.css'

type RoomParams = {
    id:string;
}

export function Room(){
    const {user} = useAuth()
    const params = useParams<RoomParams>()
    const roomId = params.id === undefined? '' : params.id;

    const [newQuestion,setNewQuestion]= useState('')
    
    async function handleSendQuestion(e:FormEvent){
        e.preventDefault()

        if(newQuestion.trim()===''){
            return;
        }
        if(!user){
            throw new Error('Erro, faça login na sua conta do Google!')
        }
        
        const question = {
            content:newQuestion,
            author:{
                name:user.nome,
                avatar:user.avatar,

            },
            isHighligted: false,
            isAnswered:false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)
        setNewQuestion('')
    }
    return(
      <div id="page_room">
          <header>
              <div className="content_header">
                  <img src={logoImg} alt="logoImg" className='logoImg'/>
                  <RoomCode code={roomId}/>
              </div>
          </header>

          <main>
            <div className='room_title'>
                <h1>Sala React</h1>
                <span className='span_pergs'>4 perguntas</span>
            </div>
            <form onSubmit={handleSendQuestion}>
                <textarea placeholder='O que você quer perguntar?'
                    onChange={e => setNewQuestion(e.target.value)}
                    value={newQuestion}
                />
                <div className='form_footer'>
                    <span className='span_footer'>Para enviar uma pergunta, <button className='span_button'>faça seu login</button></span>
                    <Button type='submit' disabled={!user}>Enviar pergunta</Button>
                </div>
            </form>
          </main>
      </div>
    )
}