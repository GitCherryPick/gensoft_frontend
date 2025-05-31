'use client';

import { useState, useMemo } from 'react';
import { PieChart, Pie, BarChart, Bar, Cell, RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';

// Componente para el tooltip personalizado
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/95 text-white text-xs p-3 rounded-md shadow-lg">
        <p className="font-medium mb-1">{payload[0].name}</p>
        <p className="flex items-center gap-2 py-0.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].color }}></span>
          <span>{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

// Colores consistentes con el esquema principal
const chartColors = {
  success: '#34C759',
  fail: '#FF2D55',
  error: '#FF3B30',
  time: '#5AC8FA',
  average: '#AF52DE'
};

export function SuccessRateChart({ submissions = [] }) {
  // Procesar datos para obtener tasa de éxito
  const data = useMemo(() => {
    if (!submissions.length) return [];
    
    const totalStudents = new Set(submissions.map(s => s.user_id)).size;
    const successfulStudents = new Set(
      submissions
        .filter(s => s.estructura_igual_a_objetivo === true)
        .map(s => s.user_id)
    ).size;
    
    return [
      { name: 'Exitosos', value: successfulStudents, color: chartColors.success },
      { name: 'No exitosos', value: totalStudents - successfulStudents, color: chartColors.fail }
    ];
  }, [submissions]);

  if (!submissions.length) {
    return <EmptyChart title="Tasa de éxito" />;
  }

  return (
    <div className="w-full h-48 rounded-lg bg-gray-50/5 p-4">
      <h3 className="text-xs font-medium text-gray-200 mb-2">Tasa de éxito</h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={35}
            outerRadius={60}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-200 text-sm font-medium"
          >
            {data[0].value} / {data[0].value + data[1].value}
          </text>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SyntaxErrorsChart({ submissions = [] }) {
  // Procesar datos para obtener errores sintácticos
  const data = useMemo(() => {
    if (!submissions.length) return [];
    
    const submissionsWithErrors = submissions.filter(s => 
      s.errores_sintacticos && s.errores_sintacticos.length > 0
    ).length;
    
    const submissionsWithoutErrors = submissions.length - submissionsWithErrors;
    
    return [
      { name: 'Con errores', value: submissionsWithErrors, color: chartColors.error },
      { name: 'Sin errores', value: submissionsWithoutErrors, color: chartColors.success }
    ];
  }, [submissions]);

  if (!submissions.length) {
    return <EmptyChart title="Errores sintácticos" />;
  }

  return (
    <div className="w-full h-48 rounded-lg bg-gray-50/5 p-4">
      <h3 className="text-xs font-medium text-gray-200 mb-2">Errores sintácticos</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} layout="vertical">
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[4, 4, 4, 4]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TypingTimeChart({ submissions = [] }) {
  // Procesar datos para obtener tiempo de escritura
  const data = useMemo(() => {
    if (!submissions.length) return [];
    
    // Agrupar por estudiante
    const timesByStudent = {};
    submissions.forEach(s => {
      const userId = s.user_id;
      if (!timesByStudent[userId]) {
        timesByStudent[userId] = [];
      }
      timesByStudent[userId].push(s.typing_duration_seconds || 0);
    });
    
    // Calcular promedio por estudiante
    return Object.entries(timesByStudent).map(([userId, times]) => {
      const average = times.reduce((sum, time) => sum + time, 0) / times.length;
      return {
        name: `Estudiante ${userId}`,
        value: average,
        fill: chartColors.time
      };
    });
  }, [submissions]);

  if (!submissions.length) {
    return <EmptyChart title="Tiempo promedio" />;
  }

  return (
    <div className="w-full h-48 rounded-lg bg-gray-50/5 p-4">
      <h3 className="text-xs font-medium text-gray-200 mb-2">Tiempo promedio</h3>
      <ResponsiveContainer width="100%" height="85%">
        <RadialBarChart 
          innerRadius="30%" 
          outerRadius="80%" 
          data={data} 
          startAngle={180} 
          endAngle={0}
        >
          <RadialBar 
            minAngle={15} 
            background
            clockWise={true} 
            dataKey="value" 
          />
          <Tooltip content={<CustomTooltip />} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

function EmptyChart({ title }) {
  return (
    <div className="w-full h-48 rounded-lg bg-gray-50/5 p-4 flex flex-col items-center justify-center">
      <div className="text-xs text-gray-400">
        No hay datos disponibles para {title}
      </div>
    </div>
  );
}
