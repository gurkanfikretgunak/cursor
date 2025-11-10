export default function Footer() {
  return (
    <footer style={{
      marginTop: 'auto',
      padding: '1.5rem 1rem',
      textAlign: 'center',
      borderTop: '1px solid #ddd',
      fontSize: 'clamp(0.85rem, 2.5vw, 0.9rem)',
      color: '#666',
    }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <p style={{ margin: '0 0 0.5rem 0', lineHeight: '1.6' }}>
          Gurkan Fikret Gunak |{' '}
          <a
            href="https://github.com/gurkanfikretgunak"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: '#0066cc', 
              textDecoration: 'underline',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.25em 0',
            }}
          >
            GitHub
          </a>
          {' | '}
          <a
            href="https://x.com/gurkandev"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: '#0066cc', 
              textDecoration: 'underline',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.25em 0',
            }}
          >
            X
          </a>
          {' | '}
          <a
            href="https://www.linkedin.com/in/gurkanfikretgunak"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: '#0066cc', 
              textDecoration: 'underline',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.25em 0',
            }}
          >
            LinkedIn
          </a>
        </p>
      </div>
      <div style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)', color: '#999' }}>
        <a
          href="https://github.com/gurkanfikretgunak/cursor"
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            color: '#999', 
            textDecoration: 'underline',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.25em 0',
          }}
        >
          View Source Code
        </a>
      </div>
    </footer>
  )
}

