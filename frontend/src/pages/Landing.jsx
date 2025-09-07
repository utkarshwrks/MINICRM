import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const features = [
    {
      title: "Customer Management",
      desc: "Easily manage all your customers in one place.",
      icon: "👥",
    },
    {
      title: "Track Leads",
      desc: "Monitor your sales pipeline and boost conversions.",
      icon: "📊",
    },
    {
      title: "Secure Access",
      desc: "Your data is safe with modern authentication.",
      icon: "🔐",
    },
  ];

  const testimonials = [
    {
      name: "Amit Sharma",
      role: "Startup Founder",
      feedback:
        "Mini CRM helped me organize leads and close deals faster. Highly recommended!",
    },
    {
      name: "Priya Verma",
      role: "Marketing Manager",
      feedback:
        "Very lightweight and easy to use. Perfect for small businesses like ours.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">Mini CRM</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between flex-1 px-8 md:px-20 py-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Manage Your{" "}
            <span className="text-blue-600">Customers</span> &{" "}
            <span className="text-blue-600">Leads</span> Smartly
          </h2>
          <p className="text-lg text-gray-600">
            A lightweight CRM solution to keep track of your customers, monitor
            leads, and grow your business efficiently.
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100 transition"
            >
              Login
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mt-10 md:mt-0"
        >
          <img
            src="https://illustrations.popsy.co/gray/customer-support.svg"
            alt="CRM Illustration"
            className="w-full"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Why Choose Mini CRM?
        </h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h4 className="text-xl font-semibold text-blue-600">
                {f.title}
              </h4>
              <p className="text-gray-600 mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-blue-100">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
          What Our Users Say
        </h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto px-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <p className="text-gray-700 italic">"{t.feedback}"</p>
              <div className="mt-4">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 text-center bg-blue-600 text-white">
        <h3 className="text-3xl font-bold mb-4">
          Start managing your business today
        </h3>
        <Link
          to="/register"
          className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Get Started Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-white shadow-inner">
        <p className="text-gray-500">
          © {new Date().getFullYear()} Mini CRM. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
