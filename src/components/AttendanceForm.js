import React, { useState } from 'react';
import './AttendanceForm.css'; // if separate, otherwise it's fine in App.css

function AttendanceForm() {
  const [totalClasses, setTotalClasses] = useState('');
  const [attendedClasses, setAttendedClasses] = useState('');
  const [requiredPercentage, setRequiredPercentage] = useState('75');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const total = parseInt(totalClasses);
    const attended = parseInt(attendedClasses);
    const required = parseInt(requiredPercentage);

    if (!total || !attended || total < attended) {
      setResult({ error: 'Please enter valid class numbers.' });
      return;
    }

    const currentPercentage = (attended / total) * 100;
    let neededClasses = 0;

    if (currentPercentage < required) {
      let newTotal = total;
      let newAttended = attended;
      while ((newAttended / newTotal) * 100 < required) {
        newTotal++;
        newAttended++;
        neededClasses++;
      }
    }

    setResult({
      current: currentPercentage.toFixed(2),
      required,
      eligible: currentPercentage >= required,
      neededClasses,
    });
  };

  const handleReset = () => {
    setTotalClasses('');
    setAttendedClasses('');
    setRequiredPercentage('75');
    setResult(null);
  };

  return (
    <div className="form-container">
      <input
        type="number"
        placeholder="Total Classes"
        value={totalClasses}
        onChange={(e) => setTotalClasses(e.target.value)}
      />
      <input
        type="number"
        placeholder="Attended Classes"
        value={attendedClasses}
        onChange={(e) => setAttendedClasses(e.target.value)}
      />
      <select
        value={requiredPercentage}
        onChange={(e) => setRequiredPercentage(e.target.value)}
      >
        <option value="60">Required: 60%</option>
        <option value="65">Required: 65%</option>
        <option value="70">Required: 70%</option>
        <option value="75">Required: 75%</option>
        <option value="80">Required: 80%</option>
        <option value="85">Required: 85%</option>
        <option value="90">Required: 90%</option>
      </select>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleCalculate}>Calculate</button>
        <button onClick={handleReset} style={{ backgroundColor: '#ccc', color: '#000' }}>Reset</button>
      </div>

      {result && (
        <div className="result-card">
          {result.error ? (
            <p style={{ color: 'red' }}>{result.error}</p>
          ) : (
            <>
              <h2>Current Attendance: {result.current}%</h2>
              <h3>Target: {result.required}%</h3>
              {result.eligible ? (
                <p style={{ color: 'green' }}>You are eligible.</p>
              ) : (
                <>
                  <p style={{ color: 'red' }}>You are not eligible.</p>
                  <p style={{ color: 'red' }}>
                    You need to attend <b>{result.neededClasses}</b> more classes continuously to reach {result.required}%.
                  </p>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AttendanceForm;
