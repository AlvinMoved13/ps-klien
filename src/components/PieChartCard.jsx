import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const PieChartCard = ({ data, title, dataKey, color }) => {
  const colors = Array.isArray(color) ? color : [color];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Tooltip />
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
            labelLine={false}
            fill={colors[0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartCard;