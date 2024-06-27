import { Link } from "react-router-dom"

export function Warning({label, buttontext, to}) {
    return (
        <div className=" flex flex-row m-1 text-sm p-1 justify-center mt-2">
           <div>
            {label}
            </div> 
            <Link className="underline space-x-1 cursor-pointer" to={to}>
            {buttontext}
            </Link>

        </div>
    )

}