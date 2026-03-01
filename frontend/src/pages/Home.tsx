import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Users, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-primary-600">FounderPlane</div>
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Admin
          </Link>
        </nav>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Know Your Founder Stage
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover where you are in your founder journey and get personalized guidance to scale your business.
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition">
              Start Assessment <ArrowRight size={20} />
            </button>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Quick Assessment', desc: 'Get insights in 5 minutes' },
              { icon: Users, title: 'Expert Guidance', desc: 'Learn from experienced founders' },
              { icon: TrendingUp, title: 'Actionable Plan', desc: 'Clear path to your next milestone' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-lg">
                <Icon className="text-primary-600 mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; 2024 FounderPlane. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
