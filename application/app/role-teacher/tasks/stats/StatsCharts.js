'use client';

import { useState, useMemo } from 'react';
import { 
  PieChart, Pie, BarChart, Bar, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, ReferenceLine, 
  LabelList, ScatterChart, Scatter, ZAxis,
  ComposedChart, Area, Line, Bar as RechartsBar
} from 'recharts';

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

const chartColors = {
  success: '#34C759',
  fail: '#FF2D55',
  error: '#FF3B30',
  time: '#5AC8FA',
  average: '#AF52DE'
};

export function SuccessRateChart({ submissions = [] }) {
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

  const successRate = (data[0].value / (data[0].value + data[1].value)) * 100;

  return (
    <div className="w-full h-48 rounded-lg bg-gray-50/5 p-3 flex flex-col">
      <h3 className="text-xs font-medium text-gray-200 mb-1">Tasa de éxito</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              paddingAngle={2}
              dataKey="value"
              children={
                data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))
              }
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-200 text-sm font-medium"
            >
              {successRate.toFixed(0)}%
            </text>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function SyntaxErrorsChart({ submissions = [] }) {
  const data = useMemo(() => {
    if (!submissions.length) return [];
    
    const submissionsWithErrors = submissions.filter(sub => 
      sub.errores_sintacticos && sub.errores_sintacticos.length > 0
    ).length;
    
    const submissionsWithoutErrors = submissions.length - submissionsWithErrors;
    const errorPercentage = (submissionsWithErrors / submissions.length) * 100;
    
    return [
      { name: 'Con errores', value: submissionsWithErrors, color: chartColors.error },
      { name: 'Sin errores', value: submissionsWithoutErrors, color: chartColors.success }
    ];
  }, [submissions]);

  if (!submissions.length) {
    return <EmptyChart title="Errores sintácticos" />;
  }

  const errorPercentage = (data[0].value / (data[0].value + data[1].value)) * 100;

  return (
    <div className="w-full h-48 rounded-lg bg-gray-50/5 p-3 flex flex-col">
      <h3 className="text-xs font-medium text-gray-200 mb-1">Envíos con errores</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              paddingAngle={2}
              dataKey="value"
              children={
                data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))
              }
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-200 text-sm font-medium"
            >
              {errorPercentage.toFixed(0)}%
            </text>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function TypingTimeChart({ submissions = [] }) {
  const averageTime = useMemo(() => {
    if (!submissions.length) return 0;
    
    const validTimes = submissions
      .map(s => s.typing_duration_seconds || 0)
      .filter(time => time > 0);
      
    if (validTimes.length === 0) return 0;
    
    const sum = validTimes.reduce((a, b) => a + b, 0);
    return sum / validTimes.length;
  }, [submissions]);

  if (!submissions.length) {
    return <EmptyChart title="Tiempo promedio" />;
  }

  return (
    <div className="w-full h-48 rounded-lg bg-gray-50/5 p-3 flex flex-col items-center justify-center">
      <h3 className="text-xs font-medium text-gray-200 mb-1">Tiempo promedio por envío</h3>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-gray-200">
          {averageTime.toFixed(1)}
        </div>
        <div className="text-xs text-gray-400 mt-1">segundos</div>
      </div>
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
