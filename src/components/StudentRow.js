function StudentRow({ student, totalMarks, onDelete }) {
  const numericMarks = Number(student.marks);
  const base = totalMarks || 100;
  const percentage = base > 0 ? ((numericMarks / base) * 100).toFixed(1) : '0.0';

  return (
    <tr>
      <td>{student.rollNumber}</td>
      <td>{student.name}</td>
      <td>{student.marks}</td>
      <td>{base > 0 ? `${percentage}%` : 'N/A'}</td>
      <td>
        <button className="delete-button" type="button" onClick={() => onDelete(student.rollNumber)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default StudentRow;
