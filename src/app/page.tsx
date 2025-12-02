export default function Home() {
  return (
    <main className="min-h-screen p-8 transition-colors duration-300" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-decorative text-6xl sm:text-8xl" style={{ color: 'var(--theme-accent)' }}>
            Johnny G&apos;s
          </h1>
          <p className="text-2xl" style={{ color: 'var(--theme-text-body)' }}>
            Est. 1975
          </p>
        </div>
      </div>
    </main>
  );
}
