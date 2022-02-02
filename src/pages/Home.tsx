import {useNavigate} from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'

import { Button } from '../Components/Button'
import { useAuth } from '../hooks/useAuth'

import '../styles/auth.css'
import { FormEvent, useState } from 'react'
import { database } from '../Services/firebase'

export function Home(){
    
    const navigate = useNavigate()
    const {user, signInWithGoogle} = useAuth()
    const [roomCode,setRoomCode]= useState('')
  
    async function handleCreateRoom(){
        if(!user){
           await signInWithGoogle()
        }
        navigate('/rooms/new')
    }

    async function handleJoinRoom(e:FormEvent){
        e.preventDefault()

        if(roomCode.trim()===''){
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()
        if(!roomRef.exists()){
            alert('A sala não existe!')
            return;
        }
        navigate(`/rooms/${roomCode}´`)
    }

    return(
        <div id='page-auth'>
            <aside>
               <img src={illustrationImg} alt="illustrationImg" />
               <strong>Crie salas de Q&amp;A</strong>
               <p>Tire duvidas em tempo Real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logo} alt="logo" className='logo-img' />
                    <button onClick={handleCreateRoom} className='create-room'>
                        <img src={googleIcon} alt="" className='google-img'/>
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form action="" onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder='Digite o codigo da sala'
                            onChange={e => setRoomCode(e.target.value)}
                            value={roomCode}
                        />
                        <Button type='submit'>Entrar na Sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}