function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Account",
      description:
        "Sign up securely and access your personalized meeting dashboard.",
    },
    {
      number: "02",
      title: "Start Meeting",
      description: "Create a meeting room instantly with a unique meeting ID.",
    },
    {
      number: "03",
      title: "Share Invitation",
      description:
        "Invite participants by sharing the meeting link or room code.",
    },
    {
      number: "04",
      title: "Collaborate Live",
      description: "Use video calls, chat and screen sharing in real time.",
    },
  ];

  return (
    <section id="workflow" className="px-6 py-18">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center" data-aos="fade-up">
          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-400">
            Workflow
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            How MeetX
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              data-aos="flip-left"
              data-aos-delay={index * 150}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-4 text-4xl font-bold text-indigo-400">
                {step.number}
              </div>

              <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>

              <p className="text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
