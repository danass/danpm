import React from 'react';

export default function EducationItem({ icon, institution, degree, duration }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex-shrink-0 pt-1">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{institution}</h3>
        <p className="text-indigo-700">{degree}</p>
        <p className="text-sm text-gray-500">{duration}</p>
      </div>
    </div>
  );
} 