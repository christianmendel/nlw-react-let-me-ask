
import {Link, useNavigate} from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import '../styles/auth.css'
import { Button } from '../Components/Button'
import {FormEvent, useState} from 'react'
import { useAuth } from '../hooks/useAuth'
import {auth,database,firebase} from '../Services/firebase'

export function NewRoom(){
    const {user} = useAuth()
    const navigate = useNavigate()
    const [newRoom,setNewRoom] = useState('');

    async function handleCreateRoom(e:FormEvent){
        e.preventDefault()
        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms')
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId:user?.id
        })
        navigate(`/rooms/${firebaseRoom.key}´`)
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder='Nome da sala'
                            onChange={e =>setNewRoom(e.target.value)}
                            value={newRoom}
                        />
                        <Button type='submit'>Criar sala</Button>
                    </form>
                    <p className='p-entrarSala'>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}