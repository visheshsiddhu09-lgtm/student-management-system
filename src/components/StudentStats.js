function StudentStats({ students, summary, totalMarks }) {
  const sortedStudents = [...students].sort((a, b) => Number(b.marks) - Number(a.marks));
  const displayTotalMarks = totalMarks || 100;
  const averagePercentage = displayTotalMarks > 0 ? Math.round((summary.average / displayTotalMarks) * 100) : 0;

  return (
    <div>
      <div className="stats-header">
        <div>
          <p className="eyebrow">Performance Overview</p>
          <h3>Compare overall student scores</h3>
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-badge">
          <span>Total Records</span>
          <strong>{summary.totalRecords}</strong>
        </div>
        <div className="stat-badge">
          <span>Average Marks</span>
          <strong>{summary.average}</strong>
        </div>
        <div className="stat-badge">
          <span>Average %</span>
          <strong>{averagePercentage}%</strong>
        </div>
        <div className="stat-badge">
          <span>Total Marks</span>
          <strong>{displayTotalMarks}</strong>
        </div>
      </div>

      <div className="graph-container">
        {sortedStudents.length > 0 ? (
          sortedStudents.slice(0, 4).map((student) => {
            const percentage = displayTotalMarks > 0 ? Math.round((Number(student.marks) / displayTotalMarks) * 100) : 0;
            const width = Math.min(100, percentage);
            return (
              <div key={student.rollNumber} className="graph-row">
                <div className="graph-label">
                  <span>{student.name}</span>
                  <strong>{percentage}%</strong>
                </div>
                <div className="graph-bar">
                  <div className="graph-fill" style={{ width: `${width}%` }} />
                </div>
              </div>
            );
          })
        ) : (
          <p className="validation-text">Add a student to see performance bars.</p>
        )}
      </div>

      <div className="graph-legend">
        <div>
          <strong>Average Score</strong>
          <p>{summary.average}</p>
        </div>
        <div>
          <strong>Max Score</strong>
          <p>{summary.max}</p>
        </div>
        <div>
          <strong>Min Score</strong>
          <p>{summary.min}</p>
        </div>
        <div>
          <strong>Percentage Base</strong>
          <p>{displayTotalMarks}</p>
        </div>
      </div>
    </div>
  );
}

export default StudentStats;
