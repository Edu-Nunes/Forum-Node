export class Slug {
  public value: string;

  constructor(value: string) {
    this.value = value;
  }

  /**
   * Recebe uma string e normaliza ela como um slug.
   *
   * Exemplo: "An example title " => "an-example-title"
   *
   * @param text {string} - Texto a ser convertido em slug
   * @returns {Slug} - Retorna uma instância de Slug com o texto normalizado
   */
  static createFromText(text: string): Slug {
    const slugText = text
      .normalize('NFKD') // Normaliza caracteres especiais
      .toLowerCase() // Transforma o texto em minúsculas
      .trim() // Remove espaços em branco no início e no final
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/[^\w-]+/g, '') // Remove caracteres não alfanuméricos, exceto hífens e underscores
      .replace(/_/g, '-') // Substitui underscores por hífens
      .replace(/--+/g, '-') // Substitui múltiplos hífens por um único hífen
      .replace(/-$/g, ''); // Remove hífens no final

    return new Slug(slugText);
  }

  /**
   * Converte o valor do slug para string.
   * 
   * @returns {string} - Retorna o valor do slug como string
   */
  toString(): string {
    return this.value;
  }

  /**
   * Compara se o valor de dois Slugs são iguais.
   * 
   * @param other {Slug} - Outro slug para comparar
   * @returns {boolean} - Retorna verdadeiro se os slugs forem iguais, falso caso contrário
   */
  equals(other: Slug): boolean {
    return this.value === other.value;
  }
}
