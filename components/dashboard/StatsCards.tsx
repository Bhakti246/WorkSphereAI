"use client";

interface Props {
  totalEmployees: number;
  presentToday: number;
  onLeave: number;
  payrollCount: number;
}

export default function StatsCards({
  totalEmployees,
  presentToday,
  onLeave,
  payrollCount,
}: Props) {
  const cards = [
    {
      title: "Employees",
      value: totalEmployees,
    },
    {
      title: "Present",
      value: presentToday,
    },
    {
      title: "On Leave",
      value: onLeave,
    },
    {
      title: "Payrolls",
      value: payrollCount,
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white/5 border border-white/10 rounded-3xl p-6"
        >
          <h3 className="text-gray-400">
            {card.title}
          </h3>

          <p className="text-4xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}