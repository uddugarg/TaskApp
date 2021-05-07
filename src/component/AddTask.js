import React, { useState } from 'react'

const AddTask = ({ onAdd }) => {

    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    // console.log(task);
    // console.log(day);
    // console.log(reminder);

    const onSubmit = (e) => {
        e.preventDefault();

        if(!text){
            alert('Please Add a task to continue');
            return
        }

        onAdd({ text, day, reminder });

        setText('');
        setDay('');
        setReminder(false);
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder='Add Tasks' onChange={(e) => setText(e.target.value)} value={text} />
            </div>
            <div className="form-control">
                <label>Day and Time</label>
                <input type="text" placeholder='Add Day and Time' onChange={(e) => setDay(e.target.value)} value={day} />
            </div>
            <div className="form-control form-control-check">
                <label>Reminder</label>
                <input type="checkbox" onChange={(e) => setReminder(e.currentTarget.checked)} checked={reminder} />
            </div>

            <input type="submit" className="btn btn-block" value='Save' />
        </form>
    )
}

export default AddTask
