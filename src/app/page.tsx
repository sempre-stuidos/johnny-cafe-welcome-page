export default function Home() {
  return (
    <main className="min-h-screen p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-decorative text-6xl sm:text-8xl" style={{ color: 'var(--theme-accent)' }}>
            Johnny G&apos;s
          </h1>
          <p className="text-2xl" style={{ color: 'var(--theme-text-body)' }}>
            Est. 1975
          </p>
        </div>

        <div className="space-y-6" style={{ color: 'var(--theme-text-body)' }}>
          <h2>Typography System Demo</h2>
          <h3>Heading 3 - FjallaOne Font</h3>
          <h4>Heading 4 - FjallaOne Font</h4>
          <h5>Heading 5 - FjallaOne Font</h5>
          <h6>Heading 6 - FjallaOne Font</h6>
          
          <p>
            This is body text using Geist Sans. The theme toggle in the navigation allows you to 
            switch between day and night themes. Notice how the background and text colors change 
            smoothly with transitions.
          </p>
          
          <p className="text-decorative text-3xl" style={{ color: 'var(--theme-accent)' }}>
            Yellowtail font for decorative elements
          </p>
          
          <div className="font-mono p-4 rounded" style={{ backgroundColor: 'var(--theme-bg-secondary)' }}>
            <code>This is monospace text using Geist Mono</code>
          </div>
        </div>
      </div>
    </main>
  );
}
