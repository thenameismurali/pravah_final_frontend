import { Leaf, Users, Wind } from "lucide-react";
import { motion } from "framer-motion";

const MissionSection = () => {
  return (
    <section className="py-16 px-6 text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-3xl font-semibold text-green-800"
      >
        Our Mission
      </motion.h2>

      <p className="mt-3 text-green-700 max-w-2xl mx-auto">
        Empowering students to create meaningful change through sustainable
        action and community service
      </p>

      <div className="mt-12 grid md:grid-cols-3 gap-8">
        <MissionCard
          icon={<Leaf />}
          title="Sustainability"
          desc="Environmental initiatives that create lasting impact"
        />
        <MissionCard
          icon={<Users />}
          title="Community"
          desc="Connect with passionate changemakers nationwide"
        />
        <MissionCard
          icon={<Wind />}
          title="Flow"
          desc="Seamless coordination of events and activities"
        />
      </div>
    </section>
  );
};

const MissionCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -6 }}
    className="bg-white rounded-2xl p-6 shadow-md"
  >
    <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-700 rounded-xl mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-sm text-green-700">{desc}</p>
  </motion.div>
);

export default MissionSection;
