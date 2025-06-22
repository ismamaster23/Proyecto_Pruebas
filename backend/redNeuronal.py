import tensorflow as tf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from google.colab import drive
drive.mount('/content/drive')

df = pd.read_csv('/content/drive/My Drive/TT1/dataset_pacientes.txt', sep='\t')
#df.head()

#df['BRM'] = pd.to_numeric(df['BRM'])
brm = np.array(pd.to_numeric(df['BRM']))
cal = np.array(pd.to_numeric(df['Calorias para subir de peso']))
print('BRM', brm, 'Tamaño', len(brm))
print('Kcal', cal, 'Tamaño', len(cal))

#brm = np.array([1958.69, 2017.6, 1720.3, 1912.61, 1430.26, 1692.6, 1391.82, 2179.9, 1761.18, 1799.05, 1638.4], dtype=float)
#cal = np.array([2546.29, 2622.88, 2236.4, 2486.39, 1859.34, 2200.38, 1809.37, 2833.87, 2289.54, 2338.76, 2169.92], dtype=float)

#capa = tf.keras.layers.Dense(units = 1, input_shape = [1])
#modelo = tf.keras.Sequential([capa])

oculta1 = tf.keras.layers.Dense(units = 3, input_shape = [1])
oculta2 = tf.keras.layers.Dense(units = 3)
salida = tf.keras.layers.Dense(units = 1)
modelo = tf.keras.Sequential([oculta1, oculta2, salida])

modelo.compile(
    optimizer = tf.keras.optimizers.Adam(0.1),
    loss = 'mean_squared_error'
)

print("Comenzar entrenamiento...")
historial = modelo.fit(brm, cal, epochs=1500, verbose=False)
print("Modelo entrenado!")

plt.xlabel("# Epoca")
plt.ylabel("Magnitud de pérdida")
plt.plot(historial.history["loss"])

print("Hagamos un predicción!")
peso = 72
altura = 168
edad = 22
brm2 = 66 + (13.7 * peso) + (5 * altura) - (6.8 * edad)
resultado = modelo.predict([brm2])
print("Calorias necesarias " + str(resultado))

print("Variables internas del modelo")
print(oculta1.get_weights())
print(oculta2.get_weights())
print(salida.get_weights())