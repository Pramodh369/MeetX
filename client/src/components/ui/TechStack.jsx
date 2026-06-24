function TechStack() {
  const technologies = [
    {
      name: "React",
      icon: "⚛️",
      description: "Frontend UI development",
    },
    {
      name: "Tailwind CSS",
      icon: "🎨",
      description: "Modern responsive styling",
    },
    {
      name: "Node.js",
      icon: "🟢",
      description: "Backend runtime environment",
    },
    {
      name: "Express.js",
      icon: "🚀",
      description: "REST API development",
    },
    {
      name: "MongoDB",
      icon: "🍃",
      description: "Database management",
    },
    {
      name: "Socket.io",
      icon: "🔌",
      description: "Real-time communication",
    },
    {
      name: "WebRTC",
      icon: "📹",
      description: "Peer-to-peer video calls",
    },
    {
      name: "JWT",
      icon: "🔐",
      description: "Secure authentication",
    },
  ];

  return (
    <section id="techstack" className="px-6 py-18">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center" data-aos="fade-up">
          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-400">
            Technology Stack
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Built With
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent text-transparent">
              Modern Technologies
            </span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40"
            >
              <div className="mb-4 text-5xl">{tech.icon}</div>

              <h3 className="mb-2 text-xl font-semibold">{tech.name}</h3>

              <p className="text-sm text-slate-400">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;
