import { Link } from "react-router-dom"
import './IndexPage.css'
import { pages } from "../../data/pages"

export const IndexPage = () => {
  return (
    <main className="IndexPage">
      <h1>Index</h1>
      <ul>
      {
        pages.map(page => (
          <li key={page.title}>
            <Link to={page.href}>{page.title}</Link>
            <span> - {page.description}</span>
          </li>
        ))
      }
      </ul>
    </main>
  )
}