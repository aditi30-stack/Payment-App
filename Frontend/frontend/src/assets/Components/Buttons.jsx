export function Buttons({label, onClick}) {
    return (
        
       <div className="items-center justify-center">
        <button className="bg-black text-white p-1 rounded-lg w-full mt-2" onClick={onClick}>
            {label}
        
        </button>
       </div>
    )
}