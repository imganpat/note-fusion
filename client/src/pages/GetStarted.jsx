import { Link } from "react-router-dom";

const features = [
  {
    title: "Secure Notes",
    description: "Protect your notes with secure authentication.",
  },
  {
    title: "Full-Screen View",
    description: "Enjoy full-screen readability for all your notes.",
  },
  {
    title: "Share with Ease",
    description: "Share notes with view-only access for recipients.",
  },
  {
    title: "Cross-Platform Sync",
    description: "Access your notes from any device, anywhere.",
  },
];

const testimonials = [
  {
    name: "Preety Singh",
    feedback:
      "Note Fusion has completely transformed how I organize my thoughts. The full-screen view is a game changer!",
    avatar: "P",
  },
  {
    name: "Alex Jhonson",
    feedback:
      "I love how secure and easy it is to share notes. Highly recommended for students and professionals alike!",
    avatar: "A",
  },
  {
    name: "Rahul Sharma",
    feedback:
      "Cross-platform access means I can check my notes on the go. Brilliant app!",
    avatar: "R",
  },
];

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <nav className="flex h-20 items-center justify-between border-b border-blue-900/30 py-4">
          <div className="text-2xl font-bold text-blue-50">NoteFusion</div>
          <div className="flex gap-4">
            <Link
              to="/auth/login"
              className="hidden rounded border border-blue-500 px-4 py-2 font-semibold text-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-white sm:flex"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="rounded bg-blue-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-blue-600"
            >
              Sign Up
            </Link>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative z-10 flex max-w-3xl flex-col items-center justify-center text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Welcome to <span className="text-blue-400">NoteFusion</span>
            </h1>
            <p className="mb-10 text-xl leading-relaxed text-blue-100">
              Securely create, organize, and share your notes with ease.
              Experience full-screen viewing and seamless note sharing where
              only you can edit your notes.
            </p>
            <Link to="/auth/register">
              <button className="group flex items-center rounded bg-blue-500 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-600">
                Get Started
              </button>
            </Link>
          </div>

          {/* Background decorative elements */}
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
        </div>
        {/* Features Section */}
        <div id="features" className="py-20">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Why <span className="text-blue-400">NoteFusion</span>?
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-lg border-none bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex flex-col items-center text-center">
                  {/* <div className="mb-4 rounded-full bg-blue-950/50 p-3">{feature.icon}</div> */}
                  <h3 className="mb-2 text-xl font-semibold text-blue-50">
                    {feature.title}
                  </h3>
                  <p className="text-blue-100">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            What Our Users Say
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-lg border-none bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="mb-6 text-lg italic text-blue-100">
                  "{testimonial.feedback}"
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 font-bold">
                    {testimonial.avatar}
                  </span>
                  <div className="font-medium text-blue-50">
                    {testimonial.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-20 rounded-2xl bg-gradient-to-r from-blue-900/50 to-blue-800/30 p-10 text-center backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Ready to organize your notes better?
          </h2>
          <p className="mb-8 text-blue-100">
            Join thousands of users who have transformed their note-taking
            experience.
          </p>
          <Link to="/auth/register">
            <button className="rounded bg-blue-500 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-600">
              Get Started Now
            </button>
          </Link>
        </div>

        {/* Footer */}
        <footer className="border-t border-blue-900/30 py-8 text-center text-sm text-blue-200">
          &copy; {new Date().getFullYear()} NoteFusion. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default GetStarted;
