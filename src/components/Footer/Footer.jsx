import './Footer.css';

const Footer = () => {
  return (
    <footer>
        <div className="wrapper footer-wrapper">
            <p >Test Task &copy; Mezit Tetyana  
              <a className="github-link"
                href="https://github.com/NemesisUA" target="_blank" 
                rel="noopener noreferrer">
                (my Github)
              </a>
            </p>
        </div>
    </footer>
  )
}

export { Footer }