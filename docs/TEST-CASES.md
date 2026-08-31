# Casos de Teste

| ID | Cenário | Tipo | Plataforma |
|---|---|---|---|
| TC01 | Login válido | Positivo | Android/iOS |
| TC02 | E-mail inválido | Negativo | Android/iOS |
| TC03 | Senha inválida | Negativo | Android/iOS |
| TC04 | Exibir cadastro | Positivo | Android/iOS |
| TC05 | Cadastro inválido | Negativo | Android/iOS |
| TC06 | Navegar para Login | Navegação | Android/iOS |
| TC07 | Navegar para Forms | Navegação | Android/iOS |
| TC08 | Navegar para Swipe | Navegação | Android/iOS |
| TC09 | Navegar para Drag | Navegação | Android/iOS |
| TC10 | Abrir Menu | Navegação | Android/iOS |

## Evidências

Em caso de falha:

1. O teste é marcado como failed.
2. O WebdriverIO captura screenshot.
3. O screenshot é salvo em `screenshots/`.
4. O Allure recebe o resultado.
5. O GitHub Actions publica o screenshot e o relatório como artifact.
