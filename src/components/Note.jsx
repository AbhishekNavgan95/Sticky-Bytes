import React, { forwardRef } from 'react';
import { IoMdClose } from "react-icons/io";

const Note = forwardRef(({ note, onMouseDown, onRemove }, ref) => {
    return (
        <div
            onMouseDown={onMouseDown}
            ref={ref}
            style={{ left: `${note?.position?.x}px`, top: `${note?.position?.y}px` }}
            className='gap-x-3 transition-all ease-out duration-200 select-none w-max max-w-[350px] absolute flex flex-col justify-between cursor-move items-start shadow-md shadow-gray-900 bg-yellow-200'
        >
            <span className='flex justify-end w-full bg-yellow-500 py-2 px-3'>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering onMouseDown
                        onRemove(note.id);
                    }}
                    className='text-xl px-1'
                >
                    <IoMdClose />
                </button>
            </span>
             <span className='select-none text-xl text-wrap pt-2 pb-3 px-5'>
                {note.text}
            </span>

        </div>
    );
});

export default Note;
