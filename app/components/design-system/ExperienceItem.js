import React from 'react';

export default function ExperienceItem({ icon, company, roles, location, description }) {
  return (
    <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex-shrink-0 pt-1">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{company}</h3>
        {roles.map(role => (
          <p key={role.title} className="text-md text-indigo-700 font-medium">
            {role.title} <span className="text-sm text-gray-500">({role.duration})</span>
          </p>
        ))}
        <p className="text-sm text-gray-500 mb-2">{location}</p>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
} 