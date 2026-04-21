export function Header({ titulo, subtitulo }) {
  return (
    <header className="bg-teal-600 px-6 py-4 flex items-center gap-3">
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
        <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <div>
        <h3 className="text-white font-medium text-base">{titulo}</h3>
        <p className="text-teal-100 text-sm">{subtitulo}</p>
      </div>
    </header>
  )
}