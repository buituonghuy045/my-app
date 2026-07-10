import React from 'react'

export default function Modal() {
    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">add staff</h3>
                <div className="modal-action">
                    <form method="dialog">
                        <label htmlFor="">ID: </label>
                        <input type="text" id='staffID' required />
                        <label htmlFor="staffName">Full name: </label>
                        <input type="text" id='staffName' required />
                        <label htmlFor="roleStaff">Role: </label>
                        <input type="text" id='roleStaff' required />
                        <label htmlFor="staffEmail">Email: </label>
                        <input type="text" id='staffEmail' required />
                        <button className="btn">Add</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
