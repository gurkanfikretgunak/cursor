'use client'

export default function Header() {
  return (
    <header style={{
      padding: '1rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottom: '1px solid #ddd',
      minHeight: '60px',
    }}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: 'rotate 4s linear infinite',
        }}
      >
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="#333"
          stroke="#333"
          strokeWidth="1"
        />
      </svg>
    </header>
  )
}

