export function InputBox({label, placeholder, onChange, type}) {
    return (
        <div className="flex flex-col p-2 mr-2 mt-2">
            <label className="text-black font-semibold">{label}</label>
            <input type={type} placeholder={placeholder} className="mt-2 border border-slate-300 placeholder:
            text-start py-1 outline-none" onChange={onChange}></input>

        </div>
    )
}