import React, { forwardRef } from 'react';
import { IoMdClose } from "react-icons/io";

const Note = forwardRef(({ note, onMouseDown, onRemove }, ref) => {
    return (
        <div
            onMouseDown={onMouseDown}
            ref={ref}
            style={{ left: `${note?.position?.x}px`, top: `${note?.position?.y}px` }}
            className='gap-x-3 select-none max-w-[350px] absolute flex justify-between cursor-move items-start rounded-lg shadow-md shadow-gray-900 px-5 py-5 bg-yellow-200'
        >
            <span className='select-none text-xl text-wrap'>
                {note.text}
            </span>
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering onMouseDown
                    onRemove(note.id);
                }}
                className='ml-4 bg-red-500  rounded-full aspect-square text-white px-1'
            > 
                <IoMdClose />
            </button>
        </div>
    );
});

export default Note;
