function Features() {
  const features = [
    {
      title: "HD Video Meetings",
      description:
        "Conduct high-quality video conferences with low latency and crystal clear communication.",
      icon: "🎥",
    },
    {
      title: "Real-Time Chat",
      description:
        "Exchange messages instantly during meetings using Socket.io powered chat.",
      icon: "💬",
    },
    {
      title: "Screen Sharing",
      description:
        "Share your screen seamlessly for presentations, demos and collaboration.",
      icon: "🖥️",
    },
    {
      title: "Secure Authentication",
      description:
        "JWT-based authentication ensures secure access to meetings and user accounts.",
      icon: "🔒",
    },
    {
      title: "Meeting History",
      description:
        "Access previous meetings, participants and activity records anytime.",
      icon: "📋",
    },
    {
      title: "Responsive Design",
      description:
        "Optimized experience across desktop, tablet and mobile devices.",
      icon: "📱",
    },
  ];

  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">

        <div className="mb-16 text-center">

          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-400">
            Platform Features
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Everything You Need For
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Modern Collaboration
            </span>
          </h2>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/30"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>

              <h3 className="mb-3 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;