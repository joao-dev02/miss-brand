# Revisão do site — 06/10/2026

O site apresenta a Miss Brand e suas três unidades. O visitante navega pelas seções, consulta o FAQ e abre os canais de contato, mapas e Instagram. Não há API, banco de dados ou formulário de envio neste projeto.

## Correções

- Configuração do pnpm 11 em `pnpm-workspace.yaml`, com lockfile compatível e scripts de compilação das dependências nativas explicitamente definidos.
- Comandos de lint e verificação de tipos, com configuração do ESLint.
- Seções no fluxo do documento: a sobreposição fixa podia levar âncoras à seção errada.
- Conteúdo visível sem JavaScript, com animações de entrada aplicadas apenas após a inicialização.
- Imagens otimizadas pelo Next.js e carregamento adiado das fotos fora da primeira tela.
- Vídeo pausado quando o visitante prefere movimento reduzido.
- Link para pular ao conteúdo, relação entre perguntas e respostas do FAQ e foco no primeiro link ao expandir a navegação.

## Validação

- Instalação com `corepack pnpm install --frozen-lockfile`.
- Tipos, lint e build de produção.
- Chrome headless, larguras de 320, 390, 768 e 1440 px.
- Navegação e posição dos títulos das seções, FAQ, imagens, destinos de links e ausência de transbordamento horizontal.
- Movimento reduzido, conteúdo sem JavaScript e ausência de erros de execução ou respostas HTTP locais com erro.

Capturas e ferramentas temporárias de revisão ficam fora do Git.

## Dado pendente de confirmação

O telefone da matriz São Joaquim, `558698402822`, foi preservado conforme o arquivo original. Tem um dígito a menos que os outros celulares cadastrados e precisa ser confirmado pelo responsável. Os testes conferem a formação dos links; não comprovam a titularidade nem a disponibilidade dos números no WhatsApp.
