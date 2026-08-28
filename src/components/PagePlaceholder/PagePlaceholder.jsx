import './PagePlaceholder.css'

function PagePlaceholder({ title, description }) {
  return (
    <section className="page-placeholder" aria-labelledby="placeholder-heading">
      <h2 id="placeholder-heading">{title}</h2>
      <p>{description}</p>
    </section>
  )
}

export default PagePlaceholder
