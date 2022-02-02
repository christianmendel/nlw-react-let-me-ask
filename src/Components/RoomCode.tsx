import { Url } from 'url'
import copyImg from '../assets/images/copy.svg'
import '../styles/roomCode.css'

type RoomCodeProps = {
    code: string
}

export function RoomCode(props:RoomCodeProps) {
    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code)
    }
    return (
        <button className='room_code' onClick={copyRoomCodeToClipboard}>
            <div className='divRoomCode'>
                <img src={copyImg} alt="copyImg" />
            </div>
            <span className='SpanRoomCode'>Sala #{props.code}</span>
        </button>
    )
}