import {useParams} from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import { Button } from '../Components/Button'
import { RoomCode } from '../Components/RoomCode'

import '../styles/room.css'

type RoomParams = {
    id:string;
}

export function Room(){
    const params = useParams<RoomParams>()
    const roomId = params.id === undefined? '' : params.id;
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
            <form>
                <textarea placeholder='O que você quer perguntar?'/>
                <div className='form_footer'>
                    <span className='span_footer'>Para enviar uma pergunta, <button className='span_button'>faça seu login</button></span>
                    <Button type='submit'>Enviar pergunta</Button>
                </div>
            </form>
          </main>
      </div>
    )
}