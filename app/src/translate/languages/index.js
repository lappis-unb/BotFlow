// Por último, importamos tudo e exportamos um único objeto

import { messages as ptBrTranslations } from './pt'
import { messages as enUsTranslations } from './en'

const messages={
  ...ptBrTranslations,
  ...enUsTranslations}


export default messages