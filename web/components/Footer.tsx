export default function Footer() {
  return (
    <footer style={{
      marginTop: 'auto',
      padding: '1rem',
      textAlign: 'center',
      borderTop: '1px solid #ddd',
      fontSize: '0.9rem',
      color: '#666',
    }}>
      <p>
        Gurkan Fikret Gunak |{' '}
        <a
          href="https://github.com/gurkanfikretgunak"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0066cc', textDecoration: 'underline' }}
        >
          @gurkanfikretgunak
        </a>
      </p>
    </footer>
  )
}

