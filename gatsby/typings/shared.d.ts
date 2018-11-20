export interface INamedAPIResource {
  name: string
  url: string
}

export interface GatsbyConnection<T> {
  edges: Array<{ node: T }>
}

export interface GatsbyFileImageSharp {
  id: string
  name: string
  childImageSharp: any
}
