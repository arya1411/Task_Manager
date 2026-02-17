import React, { useState } from 'react'
import {HiMiniPlus , HiOutlineTrash} from "react-icons/hi2"
import { LuPaperclip } from 'react-icons/lu'
const AddAttachmentsInput = ({attachments , setAttachments}) => {

    const [option , setOption ] = useState("");

    const hanldeAddOption  = () => {
        if(option.trim()) {
            setAttachments([...attachments, option.trim()]);
            setOption("");
        }
    };

    const handleDeleteOption = (index) => {
        const updateArr = attachments.filter((_, idx) => idx !== index);
        setAttachments(updateArr);
    };
  return (
    <div>
        {attachments.map((item , index) => (
            <div className="flex justify-between bg-gray-50 dark:bg-dark-surface-2 border border-gray-100 dark:border-dark-border px-3 py-2 rounded-md mb-2 mt-3" key={`${item}-${index}`}>
                <div className="flex-1 flex items-center gap-3 border border-gray-100 dark:border-dark-border">
                    <LuPaperclip className='text-gray-400 dark:text-dark-text-secondary' />
                    <p className="text-xs text-black dark:text-dark-text">{item}</p>    
                </div>
                <button className="cursor-pointer" onClick={() => {
                    handleDeleteOption(index);
                }}>
                    <HiOutlineTrash className = "text-lg text-red-500" />
                </button>
            </div>
        ))}

        <div className="flex items-center gap-5 mt-4">
            <div className="flex-1 flex items-center gap-3 border border-gray-100 dark:border-dark-border rounded-md px-3 bg-white dark:bg-dark-surface-2">
                <LuPaperclip className='text-gray-400 dark:text-dark-text-secondary' />
                <input type="text" placeholder='Add File Link' value={option} onChange={({ target }) => setOption(target.value)} 
                className='w-full text-[13px] text-black dark:text-dark-text outline-none bg-white dark:bg-dark-surface-2 py-2 placeholder:text-gray-400 dark:placeholder:text-dark-text-secondary'
                />
            </div>
            <button className='card-btn text-nowrap' onClick={hanldeAddOption}>
                <HiMiniPlus className='text-lg' /> Add
            </button>
        </div>






    </div>
)
}

export default AddAttachmentsInput