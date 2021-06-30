import copyImg from "../assets/images/copy.svg";
import "../styles/room-code.scss";
export function RoomCode() {

    function copyRoomCode (){

    }

    return(
        <button className="room-code">
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #1238123712321</span>
        </button>
    )
}