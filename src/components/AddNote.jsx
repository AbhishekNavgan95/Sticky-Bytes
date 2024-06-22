import React, { useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import { v4 as uuidv4 } from 'uuid';

const AddNote = ({ notes, setNotes }) => {

    const [input, setInput] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input === "") return

        const newNote = {
            text: input,
            id: uuidv4()
        }

        setNotes([...notes, newNote])
        setInput("")
    }

    return (
        <form className='fixed flex justify-center w-full bottom-0' onSubmit={handleSubmit}>
            <div className='  mx-auto flex justify-center w-full bg-[#f5ffbe45]'>
                <div className='relative mx-auto w-10/12 flex items-center text-xl'>

                    <p className='absolute top-[-60%] right-0 mx-5 text-gray-500'>Created by- Abhishek Navgan</p>

                    <input
                        type="text"
                        placeholder='Add a note'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className='bg-[#00000000] placeholder:text-gray-100 text-white py-3 outline-none h-full w-full text-3xl px-5'
                    />

                    <button type='submit' className=' text-white px-3 py-2 h-full text-3xl'><IoIosAdd /></button>

                </div>
            </div>
        </form>
    )
}

export default AddNote