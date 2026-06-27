import { useState } from 'react';

function StudentForm({ onAddStudent }) {
  const [rollNumber, setRollNumber] = useState('');
  const [name, setName] = useState('');
  const [marks, setMarks] = useState('');
  const [error, setError] = useState('');

  const validateRollNumber = (value) => /^[0-9]*$/.test(value);
  const validateName = (value) => /^[a-zA-Z ]*$/.test(value);
  const validateMarks = (value) => /^[0-9]*$/.test(value);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!rollNumber.trim() || !name.trim() || !marks.trim()) {
      setError('All fields are required before submitting.');
      return;
    }

    if (!validateRollNumber(rollNumber)) {
      setError('Roll number must contain only digits.');
      return;
    }

    if (!validateName(name)) {
      setError('Name must contain only letters and spaces.');
      return;
    }

    if (!validateMarks(marks)) {
      setError('Marks must contain only digits.');
      return;
    }

    const numericMarks = Number(marks);
    if (numericMarks < 0 || numericMarks > 100) {
      setError('Marks must be between 0 and 100.');
      return;
    }

    const newStudent = {
      rollNumber: rollNumber.trim(),
      name: name.trim(),
      marks: marks.trim(),
    };

    onAddStudent(newStudent);
    setRollNumber('');
    setName('');
    setMarks('');
    setError('');
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="rollNumber">Roll Number</label>
        <input
          id="rollNumber"
          type="text"
          inputMode="numeric"
          value={rollNumber}
          onChange={(event) => {
            const value = event.target.value;
            if (validateRollNumber(value)) {
              setRollNumber(value);
            }
          }}
          placeholder="Enter roll number"
        />
        <p className="input-note">Only numbers are allowed.</p>
      </div>

      <div className="form-row">
        <label htmlFor="studentName">Name</label>
        <input
          id="studentName"
          type="text"
          value={name}
          onChange={(event) => {
            const value = event.target.value;
            if (validateName(value)) {
              setName(value);
            }
          }}
          placeholder="Enter student name"
        />
        <p className="input-note">Only letters and spaces are allowed.</p>
      </div>

      <div className="form-row">
        <label htmlFor="marks">Marks (out of 100)</label>
        <input
          id="marks"
          type="text"
          inputMode="numeric"
          value={marks}
          onChange={(event) => {
            const value = event.target.value;
            if (validateMarks(value)) {
              setMarks(value);
            }
          }}
          placeholder="Enter marks from 0 to 100"
        />
        <p className="input-note">Only numbers between 0 and 100 are allowed.</p>
      </div>

      <button className="primary-button" type="submit">
        Add Student
      </button>

      {error && <div className="form-error">{error}</div>}
    </form>
  );
}

export default StudentForm;
