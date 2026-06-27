import StudentRow from './StudentRow';

function StudentList({ students, totalMarks, onDeleteStudent }) {
  return (
    <section className="student-list">
      <h2>Student Records</h2>

      {students.length === 0 ? (
        <p className="empty-state">No student records yet. Add a student to see the list here.</p>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th>Roll No.</th>
              <th>Name</th>
              <th>Marks</th>
              <th>Percentage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <StudentRow
                key={student.rollNumber}
                student={student}
                totalMarks={totalMarks}
                onDelete={onDeleteStudent}
              />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default StudentList;
