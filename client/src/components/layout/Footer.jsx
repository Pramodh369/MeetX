function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 font-bold text-white">
                MX
              </div>

              <h3 className="text-2xl font-bold">
                MeetX
              </h3>
            </div>

            <p className="text-slate-400 leading-7">
              Modern video conferencing platform powered by MERN,
              WebRTC and Socket.io for seamless real-time
              communication and collaboration.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">
              Product
            </h4>

            <ul className="space-y-3 text-slate-400">
              <li>Features</li>
              <li>Workflow</li>
              <li>Technology Stack</li>
              <li>Architecture</li>
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">
              Technologies
            </h4>

            <ul className="space-y-3 text-slate-400">
              <li>React</li>
              <li>Node.js</li>
              <li>MongoDB</li>
              <li>Socket.io</li>
              <li>WebRTC</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">
              Connect
            </h4>

            <ul className="space-y-3">

              <li>
                <a
                  href="https://github.com/Pramodh369"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition hover:text-indigo-400 hover:underline"
                >
                  GitHub 
                </a>
              </li>

              <li>
                <a
                  href="mailto:pramodheragani@gmail.com"
                 className="text-slate-400 transition hover:text-indigo-400 hover:underline"
                >
                  pramodheragani@gmail.com
                </a>
              </li>

            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-slate-500">
          © 2026 MeetX — Built by Pramodh.
        </div>

      </div>
    </footer>
  );
}

export default Footer;