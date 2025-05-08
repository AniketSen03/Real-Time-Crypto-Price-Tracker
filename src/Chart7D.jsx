import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Chart7D = ({ data }) => (
  <div className="w-32 h-12">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={2} dot={false} />
        <XAxis dataKey="time" hide />
        <YAxis hide domain={['auto', 'auto']} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default Chart7D;
