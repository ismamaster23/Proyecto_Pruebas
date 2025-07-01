import numpy as np
import pandas as pd
import random
import json

def genetic_algorithm(klca_tot):
    products = [
        {"name": "Cereales S/G", "lipidos": 0.01, "klca": 70, "hco2": 15, "proteinas": 5},
        {"name": "Verduras", "lipidos": 0.01, "klca": 25, "hco2": 4, "proteinas": 2},
        {"name": "Cereales C/G", "lipidos": 5, "klca": 115, "hco2": 15, "proteinas": 2},
        {"name": "Frutas", "lipidos": 0.01, "klca": 60, "hco2": 15, "proteinas": 0.01},
        {"name": "Leguminosas", "lipidos": 1, "klca": 120, "hco2": 20, "proteinas": 8},
        {"name": "AOA MBAG", "lipidos": 1, "klca": 40, "hco2": 0.01, "proteinas": 7},
        {"name": "AOA BAG", "lipidos": 3, "klca": 55, "hco2": 0.01, "proteinas": 7},
        {"name": "AOA MAG", "lipidos": 5, "klca": 75, "hco2": 0.01, "proteinas": 7},
        {"name": "AOA AAG", "lipidos": 8, "klca": 100, "hco2": 0.01, "proteinas": 7},
        {"name": "Leche Des", "lipidos": 2, "klca": 95, "hco2": 12, "proteinas": 9},
        {"name": "Leche Semi", "lipidos": 4, "klca": 110, "hco2": 12, "proteinas": 9},
        {"name": "Leche Entera", "lipidos": 8, "klca": 150, "hco2": 12, "proteinas": 9},
        {"name": "Leche C/A", "lipidos": 5, "klca": 200, "hco2": 30, "proteinas": 8},
        {"name": "Aceites S/P", "lipidos": 5, "klca": 45, "hco2": 0.01, "proteinas": 0.01},
        {"name": "Aceites C/P", "lipidos": 5, "klca": 70, "hco2": 3, "proteinas": 3},
        {"name": "Azucar S/G", "lipidos": 0.01, "klca": 40, "hco2": 10, "proteinas": 0.01},
        {"name": "Aceites S/P", "lipidos": 5, "klca": 85, "hco2": 10, "proteinas": 0.01},
    ]

    # Total nutritional parameters
    lipidos_tot = (klca_tot * 0.25) / 8.99
    hco_tot = (klca_tot * 0.6) / 4
    proteina_tot = (klca_tot * 0.15) / 4

    # Genetic algorithm parameters
    population_size = 20
    num_products = len(products)
    num_generations = 500
    cross_probability = 0.85
    mutation_probability = 0.1

    # Initialize the population
    population = np.zeros((population_size, num_products), dtype=int)

    for i in range(population_size):
        while True:
            remaining_lipidos = lipidos_tot
            remaining_hco = hco_tot
            remaining_proteinas = proteina_tot
            remaining_klca = klca_tot
            for j in range(num_products):
                max_possible = min(5, remaining_lipidos / products[j]["lipidos"],
                                   remaining_hco / products[j]["hco2"],
                                   remaining_proteinas / products[j]["proteinas"],
                                   remaining_klca / products[j]["klca"])
                population[i, j] = random.randint(0, int(max_possible))
                remaining_klca -= population[i, j] * products[j]["klca"]
                remaining_lipidos -= population[i, j] * products[j]["lipidos"]
                remaining_hco -= population[i, j] * products[j]["hco2"]
                remaining_proteinas -= population[i, j] * products[j]["proteinas"]

            if (remaining_lipidos >= 0 and remaining_hco >= 0 and remaining_proteinas >= 0 and remaining_klca >= 0):
                break

    # Pandas DataFrame to manage the population easily
    population_df = pd.DataFrame(population, columns=[product["name"] for product in products])

    # JSON result container
    result_json = []

    # Generation loop
    for generation in range(num_generations):
        klca = population_df.mul([product["klca"] for product in products]).sum(axis=1).values
        lipidos = population_df.mul([product["lipidos"] for product in products]).sum(axis=1).values
        hco2 = population_df.mul([product["hco2"] for product in products]).sum(axis=1).values
        proteinas = population_df.mul([product["proteinas"] for product in products]).sum(axis=1).values

        temp_df = population_df.copy()
        temp_df["klca"] = klca
        temp_df["lipidos"] = lipidos
        temp_df["hco2"] = hco2
        temp_df["proteinas"] = proteinas

        temp_df["fitness"] = 1 / (1 + abs(lipidos_tot - lipidos) +
                                  abs(hco_tot - hco2) + abs(proteina_tot - proteinas) +
                                  abs(klca_tot - klca))

        selected_parents = temp_df.nlargest(n=population_size // 2, columns=["fitness"])

        new_population = []
        while len(new_population) < population_size:
            parent1, parent2 = selected_parents.sample(n=2).to_numpy()
            if random.random() < cross_probability:
                crossover_point = random.randint(0, num_products - 1)
                child1 = np.concatenate([parent1[:crossover_point], parent2[crossover_point:]])
                child2 = np.concatenate([parent2[:crossover_point], parent1[crossover_point:]])
            else:
                child1, child2 = parent1, parent2

            for child in [child1, child2]:
                if random.random() < mutation_probability:
                    mutation_index = random.randint(0, num_products - 1)
                    mutation_value = min(5, lipidos_tot / products[mutation_index]["lipidos"],
                                         hco_tot / products[mutation_index]["hco2"],
                                         proteina_tot / products[mutation_index]["proteinas"],
                                         klca_tot / products[mutation_index]["klca"])
                    child[mutation_index] = random.randint(0, int(mutation_value))
                new_population.append(child)

    # Store the top 3 individuals that best meet the limits
    top_individuals = temp_df.nlargest(n=3, columns=["fitness"])

    for index, individual in top_individuals.iterrows():
        individual_data = {
            "individual": individual[:-5].to_dict(),
            "klca_total": individual["klca"],
            "lipidos_total": individual["lipidos"],
            "hco2_total": individual["hco2"],
            "proteinas_total": individual["proteinas"],
            "fitness": individual["fitness"],
            "original_klca_tot": klca_tot,
            "original_lipidos_tot": lipidos_tot,
            "original_hco_tot": hco_tot,
            "original_proteina_tot": proteina_tot
        }
        result_json.append(individual_data)

    return result_json
