import styled from "styled-components";

export const sampleMarkdown =
  '# Titre\n## Sous-Titre \n### Titre plus profond\n\n***\n\nLes paragraphes sont séparés\npar une ligne vide.\n\nLaissé deux espaces à la fin d\'une ligne pour  \naller à la ligne.\n\nAttributs *italique*, **gras**, \n`monospace`, ~~rayé~~.\n\nListe:\n\n  * pommes\n  * oranges\n  * poires\n\nListe numérotée:\n\n  1. jambon\n  2. cornichon\n  3. pain \n\nLien automatique : https://walletoo.vercel.app \n\n``` console.log("hello"); ```';

export const MarkdownDiv = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
  }

  h1 {
    font-size: 1.7rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  h4 {
    font-size: 1.125rem;
  }

  h5 {
    font-size: 1rem;
  }

  h6 {
    font-size: 0.875rem;
  }

  p {
    margin: 1rem 0;
  }

  ul,
  ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    margin: 0.25rem 0;
  }

  blockquote {
    margin: 1rem 0;
    padding-left: 1rem;
    border-left: 0.25rem solid #e2e8f0;
  }

  a {
    color: #3182ce;
  }

  a:hover {
    color: #2c5282;
  }

  img {
    max-width: 100%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }

  th,
  td {
    padding: 0.5rem;
    border-bottom: 1px solid #e2e8f0;
  }

  th:first-child,
  td:first-child {
    padding-left: 0;
  }

  th:last-child,
  td:last-child {
    padding-right: 0;
  }

  pre {
    margin: 1rem 0;
    padding: 1rem;
    background-color: #edf2f7;
    border-radius: 0.375rem;
    overflow: auto;
  }

  code {
    font-family: monospace;
    font-size: 0.875rem;
    color: #db2777;
  }

  code::before,
  code::after {
    content: "\`";
  }

  hr {
    margin: 2rem 0;
    border-top: 1px solid #e2e8f0;
  }
`;
