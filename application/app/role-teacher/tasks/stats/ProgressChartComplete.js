'use client';

import { useEffect, useState } from 'react';
import { TrendingUp } from "lucide-react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { SuccessRateChart, SyntaxErrorsChart, TypingTimeChart } from './StatsCharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/95 text-white text-xs p-3 rounded-md shadow-lg">
        <p className="font-medium mb-1">Intento {label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="flex items-center gap-2 py-0.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span>{entry.name}: <span className="font-medium">{entry.value.toFixed(1)}</span></span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const studentColors = [
  '#007AFF',
  '#5AC8FA',
  '#34C759',
  '#FF9500',
  '#FF2D55',
  '#AF52DE',
];

export default function ProgressChart({ submissions = [] }) {
  const [chartData, setChartData] = useState([]);
  const [studentSeries, setStudentSeries] = useState([]);

  useEffect(() => {
    if (submissions.length === 0) return;

    const submissionsByStudent = {};
    submissions.forEach(submission => {
      const userId = submission.user_id;
      if (!submissionsByStudent[userId]) {
        submissionsByStudent[userId] = [];
      }
      submissionsByStudent[userId].push(submission);
    });

    Object.keys(submissionsByStudent).forEach(userId => {
      submissionsByStudent[userId].sort((a, b) => {
        return new Date(a.submission_date) - new Date(b.submission_date);
      });
    });

    const maxAttempts = Math.max(
      ...Object.values(submissionsByStudent).map(subs => subs.length)
    );
    const chartPoints = [];
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const point = { attempt: attempt + 1 };
      chartPoints.push(point);
    }

    const activeStudents = [];
    Object.keys(submissionsByStudent).forEach((userId, index) => {
      const studentColor = studentColors[index % studentColors.length];
      const studentName = `Estudiante ${userId}`;
      
      activeStudents.push({
        id: userId,
        name: studentName,
        color: studentColor
      });
      
      submissionsByStudent[userId].forEach((submission, attemptIndex) => {
        if (chartPoints[attemptIndex]) {
          chartPoints[attemptIndex][`student_${userId}`] = submission.puntaje_similitud || 0;
        }
      });
    });
    
    setChartData(chartPoints);
    setStudentSeries(activeStudents);
  }, [submissions]);

  if (submissions.length === 0) {
    return (
      <div className="w-full flex flex-col space-y-6">
        <div className="w-full h-64 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50/5">
          <TrendingUp className="h-12 w-12 text-gray-400 mb-2" />
          <div className="text-sm text-gray-400">
            No hay datos de submisiones disponibles
          </div>
        </div>
        
        {/* Gráficos vacíos */}
        <div className="w-full grid grid-cols-3 gap-4">
          <SuccessRateChart submissions={[]} />
          <SyntaxErrorsChart submissions={[]} />
          <TypingTimeChart submissions={[]} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Gráfico principal de evolución de puntajes */}
      <div className="w-full h-64 rounded-lg p-6 bg-gray-50/5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-medium text-gray-200">progreso de los estudiantes</h3>
          <div className="flex flex-wrap gap-3">
            {studentSeries.map((student) => (
              <div key={student.id} className="flex items-center gap-1.5 text-xs text-gray-300">
                <div 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: student.color }}
                />
                <span>{student.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height="85%">
          <LineChart
            data={chartData}
            margin={{ left: 5, right: 5, top: 10, bottom: 5 }}
          >
            <CartesianGrid 
              vertical={false} 
              horizontal={false}
            />
            
            {/* Líneas de referencia horizontales */}
            {[2, 4, 6, 8].map((y) => (
              <ReferenceLine 
                key={`ref-line-${y}`} 
                y={y} 
                stroke="#333" 
                strokeDasharray="3 3" 
                strokeOpacity={0.3} 
              />
            ))}
            
            <XAxis 
              dataKey="attempt"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: '#999', fontSize: 11 }}
            />
            <YAxis 
              domain={[0, 10]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#999', fontSize: 11 }}
              tickMargin={10}
              width={25}
              ticks={[0, 2, 4, 6, 8, 10]}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={false}
            />
            
            {studentSeries.map((student) => (
              <Line
                key={student.id}
                type="monotone"
                dataKey={`student_${student.id}`}
                stroke={student.color}
                strokeWidth={2.5}
                dot={{
                  fill: student.color,
                  r: 4,
                  strokeWidth: 0
                }}
                activeDot={{
                  fill: student.color,
                  stroke: '#111',
                  strokeWidth: 2,
                  r: 6,
                }}
                name={student.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Gráficos estadísticos complementarios */}
      <div className="w-full grid grid-cols-3 gap-4">
        <SuccessRateChart submissions={submissions} />
        <SyntaxErrorsChart submissions={submissions} />
        <TypingTimeChart submissions={submissions} />
      </div>
    </div>
  );
}
