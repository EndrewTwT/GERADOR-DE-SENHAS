from itertools import product

# Exemplo educativo: teste apenas esta senha fictícia.
senha_alvo = "cab"

# Conjunto pequeno de caracteres para manter o exercício rápido.
caracteres = "abc"
tamanho_maximo = 3

tentativas = 0
encontrada = False

print("Iniciando teste de combinações...")
print(f"Caracteres disponíveis: {caracteres}")
print(f"Tamanho máximo: {tamanho_maximo}\n")

for tamanho in range(1, tamanho_maximo + 1):
    for combinacao in product(caracteres, repeat=tamanho):
        tentativa = "".join(combinacao)
        tentativas += 1
        print(f"Tentativa {tentativas}: {tentativa}")

        if tentativa == senha_alvo:
            print(f"\nSenha de demonstração encontrada: {tentativa}")
            print(f"Total de tentativas: {tentativas}")
            encontrada = True
            break

    if encontrada:
        break

if not encontrada:
    print("\nSenha não encontrada com os caracteres e tamanho configurados.")
