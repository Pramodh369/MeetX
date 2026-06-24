function Features() {
  const features = [
    {
      title: "HD Video Meetings",
      description:
        "Experience smooth, high-quality video communication powered by WebRTC for seamless collaboration.",
      icon: "🎥",
    },
    {
      title: "Real-Time Chat",
      description:
        "Send instant messages during meetings and keep conversations flowing without interruptions.",
      icon: "💬",
    },
    {
      title: "Screen Sharing",
      description:
        "Present ideas, demos and documents effortlessly with one-click screen sharing.",
      icon: "🖥️",
    },
    {
      title: "Meeting Timer",
      description:
        "Track meeting duration in real time and stay productive throughout every session.",
      icon: "⏱️",
    },
    {
      title: "Secure Access",
      description:
        "JWT authentication and protected routes ensure every meeting remains secure.",
      icon: "🔒",
    },
    {
      title: "Responsive Experience",
      description:
        "Enjoy a consistent experience across desktop, tablet and mobile devices.",
      icon: "📱",
    },
  ];

  return (
    <section id="features" className="relative px-6 py-18">
      {" "}
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center" data-aos="fade-up">
          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-400">
            Platform Features
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Everything You Need For
            <span className="block bg-gradient-to-r from-indigo-400 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              Modern Collaboration
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            MeetX combines video meetings, messaging, screen sharing and secure
            collaboration into one powerful platform designed for modern teams.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-3 hover:border-indigo-500/30 hover:bg-white/[0.08]"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-4xl transition-all duration-300 group-hover:scale-110">
                {feature.icon}
              </div>

              <h3 className="mb-4 text-xl font-semibold">{feature.title}</h3>

              <p className="leading-7 text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
