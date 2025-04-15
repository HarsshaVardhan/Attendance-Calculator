import React from 'react';

function ResultCard({ percentage, required, extraClassesNeeded }) {
  return (
    <div className="result-card">
      <h2>Current Attendance: {percentage}%</h2>
      <h3>Target: {required}%</h3>
      {percentage >= required ? (
        <p style={{ color: 'green' }}>You are eligible!</p>
      ) : (
        <div style={{ color: 'red' }}>
          <p>You are not eligible.</p>
          <p>You need to attend <strong>{extraClassesNeeded}</strong> more class{extraClassesNeeded > 1 ? 'es' : ''} continuously to reach {required}%.</p>
        </div>
      )}
    </div>
  );
}

export default ResultCard;
