import { useSelector } from "react-redux"

const Titles=()=>{
    const titles= useSelector(state=>state.titlesState.titles )
    console.log("titulos en home: ",titles)
    return (
        <div className="w-1/2 h-3/5 bg-blue-200 mx-auto p-8">
            <ul>
            {   titles?.map( (title)=>(
                <li key={title.id}>{title.originalTitleText.text} </li>
                ))   
            }
            </ul>   
        </div>
    )
}

export default Titles