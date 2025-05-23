import React from 'react';

export default function SkillItem({ icon, skill }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-md shadow-sm">
        {icon}
        <span>{skill}</span>
    </div>
  );
} 