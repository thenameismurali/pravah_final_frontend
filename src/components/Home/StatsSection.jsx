import { motion } from "framer-motion";

const stats = [
  { value: "5000+", label: "Active Members" },
  { value: "250+", label: "Events Organized" },
  { value: "50K+", label: "Volunteer Hours" },
  { value: "100+", label: "Colleges" },
];

const StatsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="mx-6 mb-20 bg-green-100 rounded-2xl py-10 grid grid-cols-2 md:grid-cols-4 text-center"
    >
      {stats.map((s) => (
        <div key={s.label}>
          <h3 className="text-3xl font-bold text-green-800">{s.value}</h3>
          <p className="text-green-700 text-sm">{s.label}</p>
        </div>
      ))}
    </motion.section>
  );
};

export default StatsSection;
