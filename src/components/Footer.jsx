import {AiFillFacebook} from "react-icons/ai"
import {AiOutlineInstagram} from "react-icons/ai"
import {AiOutlineTwitter} from "react-icons/ai"
import {AiFillYoutube} from "react-icons/ai"

const Footer=()=>{
    return(
        <div className="flex flex-col items-center mt-40">

            <div className="flex flex-row  justify-center">
                <AiFillFacebook className="w-10 h-10 mx-4"/>
                <AiOutlineInstagram className="w-10 h-10 mx-4"/>
                <AiOutlineTwitter className="w-10 h-10 mx-4"/>
                <AiFillYoutube className="w-10 h-10 mx-4"/>
            </div>
            <div className="flex flex-col text-center  md:flex-row mt-8 justify-center">
                <span className=" mx-14 text-2xl font-bold text-gray-700">Conditions of use</span>
                <span className=" mx-14 text-2xl font-bold text-gray-700">Privacy & Policy</span>
                <span className=" mx-14 text-2xl font-bold text-gray-700">Press room</span>
            </div>

            <span className="text-lg mt-8 mb-8 md:text-2xl font-bold text-gray-500">©2012 MovieBox by Jhonny Zambrano</span>

        </div>
    )
}

export default Footer