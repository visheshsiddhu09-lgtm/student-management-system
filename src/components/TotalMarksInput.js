function TotalMarksInput({ totalMarks, onTotalMarksChange }) {
  return (
    <div className="form-row">
      <label htmlFor="totalMarks">Total Marks</label>
      <input
        id="totalMarks"
        type="text"
        inputMode="numeric"
        value={totalMarks}
        onChange={(event) => {
          const value = event.target.value;
          if (/^[0-9]*$/.test(value)) {
            onTotalMarksChange(value === '' ? '' : Number(value));
          }
        }}
        placeholder="Enter maximum total marks"
      />
      <p className="input-note">Use the total marks to calculate percentage.</p>
    </div>
  );
}

export default TotalMarksInput;
