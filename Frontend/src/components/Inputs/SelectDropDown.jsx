import React, { useMemo, useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'

const SelectDropDown = ({ option = [], value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false)

    const selectedLabel = useMemo(() => {
        const match = option.find((opt) => opt.value === value)
        return match?.label
    }, [option, value])

    const handleSelect = (selected) => {
        onChange(selected.value)
        setIsOpen(false)
    }

    return (
        <div className="relative w-full">
            <button
                type="button"
                className="w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md mt-2 flex justify-between items-center"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className="truncate">{selectedLabel || placeholder}</span>
                <span className="ml-2">
                    <LuChevronDown
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-slate-100 bg-white shadow">
                    {option.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50"
                            onClick={() => handleSelect(opt)}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SelectDropDown